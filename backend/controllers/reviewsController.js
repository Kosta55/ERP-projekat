import Review from '../models/Review.js'
import Product from '../models/Product.js'

const createReview = async (req, res) => {
  const { title, rating, comment, product } = req.body

  const existingProduct = await Product.findOne({ _id: product })

  if (!existingProduct) {
    return res.status(404).json({ message: 'Product not found' })
  }

  const alreadySubmittedReview = await Review.findOne({
    product: product,
    user: req.user._id,
  })

  if (alreadySubmittedReview) {
    return res.status(409).json({ message: 'Review already submited for this product' })
  }

  const review = await Review.create({
    title,
    rating: Number(rating),
    comment,
    product,
    user: req.user._id
  })

  res.status(201).json(review)
}

const getReviews = async (req, res) => {
  const reviews = await Review.find({}).populate('product', 'name').populate('user', 'name')

  if (!reviews?.length) return res.status(404).json({ message: 'No reviews found' })

  res.status(200).json(reviews)
}


// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
const getReview = async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) return res.status(404).json({ message: 'No review found' })

  res.status(200).json(review)
}

const updateReview = async (req, res) => {
  const { title, comment } = req.body

  const review = await Review.findById(req.params.id)

  if (!review) return res.status(404).json({ message: 'Review not found' })

  review.title = title || review.title 
  review.comment = comment || review.comment 
  review.user = req.user._id

  await review.save()

  return res.status(200).json(review)
}

const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) return res.status(404).json({ message: 'Review not found' })

  await review.remove()

  res.status(200).json(review)
}

const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id }).sort({ createdAt: 'desc' }).populate('user', 'name')

  if (!reviews?.length) return res.status(404).json({ message: 'No reviews'})

  return res.status(200).json(reviews)
}

export {
  createReview,
  deleteReview,
  getReviews,
  getReview,
  updateReview,
  getProductReviews 
}