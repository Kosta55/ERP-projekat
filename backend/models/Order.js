import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }
})

const orderSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      default: 'Stripe'
    },
    paymentDetails: {
      id: { type: String },
      object: { type: String },
      amount: { type: Number },
      currency: { type: String },
      customerId: { type: String },
      status: { type: String }
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Order', orderSchema)