import express from 'express'
import {
  getPublishers,
  createPublisher,
  getPublisherById,
  updatePublisher,
  deletePublisher,
} from '../controllers/publishersController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getPublishers)
router.get('/:id', getPublisherById)
router.post('/', authenticate, admin, createPublisher)
router.put('/:id', authenticate, admin, updatePublisher)
router.delete('/:id', authenticate, admin, deletePublisher)

export default router
