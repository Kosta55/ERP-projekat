import express from 'express'
import {
  createReview,
  deleteReview,
  getProductReviews,
  getReview,
  getReviews,
  updateReview,
} from '../controllers/reviewsController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getReviews)
router.get('/:id/reviews', getProductReviews)
router.get('/:id', getReview)
router.post('/', authenticate, createReview)
router.put('/:id', authenticate, admin, updateReview)
router.delete('/:id', authenticate, admin, deleteReview)

export default router
