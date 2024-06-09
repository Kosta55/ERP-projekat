import Category from '../models/Category.js'
import Product from '../models/Product.js'

// @desc    Get categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  const categories = await Category.find({})
  
  res.status(200).json(categories)
}

// @desc    POST Category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const categoryAlreadyExists = await Category.findOne({ name })

  if (categoryAlreadyExists) {
    return res.status(409).json({ message: 'Category already exists' })
  }

  const category = await Category.create({ name })
  res.status(201).json(category)
}

// @desc   Get single category
// @route  GET /categories/:id
// @access  Private
const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  res.status(200).json(category)
}

// @desc   Update category
// @route  PUT /categories/:id
// @access  Private
const updateCategory = async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }

  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  const categoryAlreadyExists = await Category.findOne({ name })

  if (categoryAlreadyExists) {
    return res.status(409).json({ message: 'Category already exists' })
  }

  category.name = name
  await category.save()

  res.status(200).json(category)
}

// @desc   Delete category
// @route  DELETE /categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    return res.status(400).json({
      message: 'Please delete all products related with this category',
    })
  }

  const category = await Category.findById(req.params.id)

  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }

  await category.remove()

  return res.status(200).json(category)
}

export {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
}