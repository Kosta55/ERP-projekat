import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: '/images/sample.jpg'
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    isNewProduct: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publisher',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true
  }
)

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})

// when deleting product, remove all reviews associated with that product
productSchema.pre('remove', async function () {
  await this.model('Review').deleteMany({ product: this._id })
})

const Product = mongoose.model('Product', productSchema)

export default Product