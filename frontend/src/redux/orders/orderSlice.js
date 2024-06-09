import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))

export const initialState = {
  loading: false,
  error: null,
  orders: [],
  order: null,
  myOrder: null,
  myOrders: [],
  shippingAddress: shippingAddress ? shippingAddress : {},
  orderSuccessUpdate: false
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
    removeShippingAddress: (state) => {
      state.loading = false
      state.shippingAddress = {}
    },
    getOrders: (state, action) => {
      state.orders = action.payload
      state.loading = false
      state.error = null
    },
    getOrder: (state, action) => {
      state.loading = false
      state.error = null
      state.order = action.payload
      state.orderSuccessUpdate = false
    },
    getMyOrder: (state, action) => {
      state.loading = false
      state.error = null
      state.myOrder = action.payload
    },
    getMyOrders: (state, action) => {
      state.loading = false
      state.error = null
      state.myOrders = action.payload
    },
    createOrder: (state, action) => {
      state.orders = [...state.orders, action.payload]
      state.order = action.payload
      //state.orders.push(action.payload)
      state.loading = false
      state.error = null
    },
    deliverOrder: (state, action) => {
      state.orders = state.orders.map((order) => order._id === action.payload._id ? action.payload : order)
      state.loading = false
      state.error = null
      state.orderSuccessUpdate = true
      toast.success('Order delivered')
    },
    orderDelete: (state, action) => {
      state.orders = state.orders.filter((order) => order._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success(`Order is deleted`)
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    resetError: (state) => {
      state.error = null
      state.loading = false
    },
    resetMyOrders: (state) => {
      state.error = null 
      state.myOrders = []
    }
  },
})

export const {
  setLoading,
  addShippingAddress,
  removeShippingAddress,
  getOrders,
  getOrder,
  getMyOrders,
  getMyOrder,
  createOrder,
  deliverOrder,
  orderDelete,
  setError,
  resetError,
  resetMyOrders
} = ordersSlice.actions

export default ordersSlice.reducer

export const ordersSelector = (state) => state.orders