import Order from '../models/Order.js'
import Product from '../models/Product.js'

// @desc   Create Order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  let { orderItems, shippingAddress, totalPrice } = req.body

  if (!orderItems || orderItems.length < 1)
    return res.status(400).json({ message: 'No order items' })

  orderItems.forEach(async (item) => {
    const product = await Product.findOne({ _id: item.product })
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    } else if (item.quantity > product.countInStock) {
      return res.status(400).json({ message: 'You cannot order more than available' })
    }

    product.countInStock -= item.quantity

    await product.save()
  })

  const order = await Order.create({
    orderItems,
    shippingAddress,
    totalPrice,
    user: req.user._id,
  })

  res.status(201).json(order)
}

// @desc Get orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email').select('-paymentDetails')

  return res.status(200).json(orders)
}

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').select('-paymentDetails')

  if (!order) return res.status(404).json({ message: 'Order not found' })

  res.status(200).json(order)
}

// @desc    Get my order
// @route   GET /api/my-order/:id
// @access  Private/Admin
const getMyOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email').select('-paymentDetails')

  if (!order) return res.status(404).json({ message: 'Order not found' })

  res.status(200).json(order)
}

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (order, data) => {
  if (order) {
    const orderToPaid = await Order.findOne({ _id: order._id })

    if (!orderToPaid) return res.status(404).json({ message: 'Order not found'})
  
    orderToPaid.isPaid = true 
    orderToPaid.paidAt = Date.now()
    orderToPaid.paymentDetails = {
      id: data.id,
      object: data.object,
      amount: data.amount / 100,
      status: data.status,
      currency: data.currency,
      customerId: data.customer,
    }
  
    await orderToPaid.save()
  } else {
    throw new Error('Order not found')
  }
}

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) return res.status(404).json({ message: 'Order not found' })

  order.isDelivered = true
  order.deliveredAt = Date.now()

  await order.save()

  res.status(200).json(order)
}

// @desc   Delete order
// @route  DELETE /orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  await order.remove()

  return res.status(200).json(order)
}

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).select('-paymentDetails')

  res.status(200).json(orders)
}

export {
  createOrder,
  getMyOrders,
  getOrders,
  getOrder,
  getMyOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
}
