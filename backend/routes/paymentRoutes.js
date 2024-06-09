import express from 'express'
import { createPaymentIntent, webhook } from '../controllers/paymentsController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/create-payment-intent', authenticate, createPaymentIntent)
router.post('/webhook', express.raw({ type: 'application/json' }), webhook)

export default router