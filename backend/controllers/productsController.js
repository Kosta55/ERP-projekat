import Product from '../models/Product.js'
import APIFeatures from '../apiFeatures/apiFeatures.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = 9
  const page = Number(req.query.page) || 1
  const count = await Product.countDocuments()

  const apiFeatures = new APIFeatures(Product.find().populate('category').populate('publisher').populate('genre').populate('user', 'name'), req.query).sort().search().filter().pagination(pageSize, page)

  const products = await apiFeatures.query 

  //if (!products?.length) return res.status(404).json({ message: 'No products' })

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize), count })
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name').populate('genre', 'name').populate('publisher', 'name')

  if (!product) return res.status(404).json({ message: 'Product not found' })

  res.status(200).json(product)
}

// @desc    Create product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  const { name, image, author, description, price, countInStock, isNewProduct, genre, category, publisher } = req.body
  
  const product = await Product.create({
    name,
    image,
    author,
    description,
    price,
    countInStock,
    isNewProduct,
    genre,
    category,
    publisher,
    user: req.user._id,
  })

  if (product) {
    res.status(201).json(product)
  } else {
    throw createHttpError(400, 'Invalid product data received')
  }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { name, image, author, description, price, countInStock, isNewProduct, genre, category, publisher } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) return res.status(404).json({ message: 'Product not found' })

  if (product.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not Authorized'})

  product.name = name || product.name 
  product.image = image || product.image 
  product.author = author || product.author 
  product.description = description || product.description 
  product.price = price || product.price 
  product.countInStock = countInStock || product.countInStock 
  product.genre = genre || product.genre 
  product.category = category || product.category 
  product.publisher = publisher || product.publisher
  product.isNewProduct = isNewProduct
  product.user = req.user._id

  await product.save()

  return res.status(200).json(product)
}

// @desc    Delete product
// @route   GET /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) return res.status(404).json({ message: 'Product not found' })

  await product.remove()

  res.status(200).json(product)
}

export { getProducts, createProduct, getProduct, updateProduct, deleteProduct }