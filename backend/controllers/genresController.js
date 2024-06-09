import Genre from '../models/Genre.js'
import Product from '../models/Product.js'

// @desc    Get genres
// @route   GET /api/genres
// @access  Public
const getGenres = async (req, res) => {
  const genres = await Genre.find({})

  res.status(200).json(genres)
}

// @desc    POST Genre
// @route   POST /api/genres
// @access  Private
const createGenre = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const genreAlreadyExists = await Genre.findOne({ name })

  if (genreAlreadyExists) {
    return res.status(409).json({ message: 'Genre already exists' })
  }

  const genre = await Genre.create({ name })
  res.status(201).json(genre)
}

// @desc   Get single genre
// @route  GET /genres/:id
// @access  Private
const getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if (!genre) {
    return res.status(404).json({ message: 'Genre not found' })
  }

  res.status(200).json(genre)
}

// @desc   Update genre
// @route  PUT /genres/:id
// @access  Private
const updateGenre = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const genre = await Genre.findById(req.params.id)

  if (!genre) {
    return res.status(404).json({ message: 'Genre not found' })
  }

  const genreAlreadyExists = await Genre.findOne({ name })

  if (genreAlreadyExists) {
    return res.status(409).json({ message: 'Genre already exists' })
  }

  genre.name = name
  await genre.save()

  res.status(200).json(genre)
}

// @desc   Delete genre
// @route  DELETE /genres/:id
// @access  Private
const deleteGenre = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    return res.status(400).json({
      message: 'Please delete all products related with this genre',
    })
  }

  const genre = await Genre.findById(req.params.id)

  if (!genre) {
    return res.status(404).json({ message: 'Genre not found' })
  }

  await genre.remove()

  return res.status(200).json(genre)
}

export { getGenres, createGenre, getGenreById, updateGenre, deleteGenre }