import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrders,
  getOrder,
  getMyOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
} from '../controllers/ordersController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authenticate, createOrder)
router.get('/', authenticate, admin, getOrders)
router.get('/my-orders', authenticate, getMyOrders)
router.get('/:id', authenticate, admin, getOrder)
router.get('/my-order/:id', authenticate, getMyOrder)
router.put('/:id/pay', authenticate, updateOrderToPaid)
router.put('/:id/deliver', authenticate, admin, updateOrderToDelivered)
router.delete('/:id', authenticate, admin, deleteOrder)

export default router