import express from 'express'
import {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', authenticate, admin, createProduct)
router.put('/:id', authenticate, admin, updateProduct)
router.delete('/:id', authenticate, admin, deleteProduct)

export default router
