import express from 'express'
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', authenticate, admin, createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
