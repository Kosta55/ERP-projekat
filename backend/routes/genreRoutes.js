import express from 'express'
import {
  getGenres,
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
} from '../controllers/genresController.js'
import { authenticate, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getGenres)
router.get('/:id', getGenreById)
router.post('/', authenticate, admin, createGenre)
router.put('/:id', authenticate, admin, updateGenre)
router.delete('/:id', authenticate, admin, deleteGenre)

export default router
