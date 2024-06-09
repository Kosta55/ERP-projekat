import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  page: null,
  pages: null,
  count: 0
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    getProducts: (state, action) => {
      state.loading = false
      state.error = null
      state.products = action.payload.products
      state.page = action.payload.page
      state.pages = action.payload.pages
      state.count = action.payload.count
    },
    getProduct: (state, action) => {
      state.product = action.payload
      state.loading = false
      state.error = null
    },
    createProduct: (state, action) => {
      state.products = [...state.products, action.payload]
      //state.products.push(action.payload)
      state.loading = false
      state.error = null
      toast.success(`Product ${action.payload.name} created`)
    },
    productUpdate: (state, action) => {
      state.products = state.products.map((product) => product._id === action.payload._id ? action.payload : product)
      toast.success(`Product ${action.payload.name} updated`)
      state.loading = false
      state.error = null
    },
    productDelete: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success(`Product ${action.payload.name} is deleted`)
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    resetError: (state) => {
      state.error = null
      state.loading = false
    },
  },
})

export const {
  setLoading,
  getProducts,
  getProduct,
  createProduct,
  productUpdate,
  productDelete,
  setError,
  resetError,
} = productsSlice.actions

export default productsSlice.reducer

export const productsSelector = (state) => state.products