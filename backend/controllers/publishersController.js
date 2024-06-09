import Publisher from '../models/Publisher.js'
import Product from '../models/Product.js'

// @desc    Get publishers
// @route   GET /api/publishers
// @access  Public
const getPublishers = async (req, res) => {
  const publishers = await Publisher.find({})

  res.status(200).json(publishers)
}

// @desc    POST Publisher
// @route   POST /api/publishers
// @access  Private
const createPublisher = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const publisherAlreadyExists = await Publisher.findOne({ name })

  if (publisherAlreadyExists) {
    return res.status(409).json({ message: 'Publisher already exists' })
  }

  const publisher = await Publisher.create({ name })
  res.status(201).json(publisher)
}

// @desc   Get single publisher
// @route  GET /publishers/:id
// @access  Private
const getPublisherById = async (req, res) => {
  const publisher = await Publisher.findById(req.params.id)

  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' })
  }

  res.status(200).json(publisher)
}

// @desc   Update publisher
// @route  PUT /publishers/:id
// @access  Private
const updatePublisher = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const publisher = await Publisher.findById(req.params.id)

  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' })
  }

  const publisherAlreadyExists = await Publisher.findOne({ name })

  if (publisherAlreadyExists) {
    return res.status(409).json({ message: 'Publisher already exists' })
  }

  publisher.name = name
  await publisher.save()

  res.status(200).json(publisher)
}

// @desc   Delete publisher
// @route  DELETE /publishers/:id
// @access  Private
const deletePublisher = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    return res.status(400).json({
      message: 'Please delete all products related with this publisher',
    })
  }

  const publisher = await Publisher.findById(req.params.id)

  if (!publisher) {
    return res.status(404).json({ message: 'Publisher not found' })
  }

  await publisher.remove()

  return res.status(200).json(publisher)
}

export {
  getPublishers,
  createPublisher,
  getPublisherById,
  updatePublisher,
  deletePublisher,
}
