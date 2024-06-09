import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide comment'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

//only one review per product per user
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

// average rating of product
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: productId,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ])

  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        // optional chaining -> ?   // javascript will complain if there is no ratings, so it cannot calculate average rating on something that does not exist
        averageRating: Math.round(result[0]?.averageRating) || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}

// this.product will match productId to calcuate average rating
reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product)
})

// same when deleting review
reviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product)
})

export default mongoose.model('Review', reviewSchema)