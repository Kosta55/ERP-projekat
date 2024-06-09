import express from 'express'
import {
  getUsers,
  getUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  deleteUser,
} from '../controllers/usersController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/profile', authenticate, getUserProfile)
router.put('/profile', authenticate, updateUserProfile)
router.get('/', authenticate, admin, getUsers)
router.get('/:id', authenticate, admin, getUser)
router.put('/:id', authenticate, admin, updateUser)
router.delete('/:id', authenticate, admin, deleteUser)

export default router
