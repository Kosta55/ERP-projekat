import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const initialState = {
  loading: false,
  error: null,
  reviews: [],
  productReviews: [],
  review: null,
  reviewCreateSuccess: false
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    getReviews: (state, action) => {
      state.reviews = action.payload
      state.loading = false
      state.error = null
    },
    getReview: (state, action) => {
      state.review = action.payload
      state.productReviews = action.payload
      state.loading = false
      state.error = null
    },
    getProductReviews: (state, action) => {
      state.productReviews = action.payload
      state.loading = false
      state.error = null
      state.reviewCreateSuccess = false
    },
    createReview: (state, action) => {
      state.reviews = [...state.reviews, action.payload]
      //state.reviews.push(action.payload)
      state.loading = false
      state.error = null
      state.reviewCreateSuccess = true
      toast.success('Review submitted')
    },
    reviewDelete: (state, action) => {
      state.reviews = state.reviews.filter((revieww) => revieww._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success('Review is deleted')
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    resetError: (state) => {
      state.error = null
      state.loading = false
    },
    resetReviews: (state) => {
      state.error = null
      state.loading = false
      state.productReviews = []
    }
  },
})

export const {
  setLoading,
  getReviews,
  getReview,
  getProductReviews,
  createReview,
  reviewDelete,
  setError,
  resetError,
  resetReviews
} = reviewsSlice.actions

export default reviewsSlice.reducer

export const reviewsSelector = (state) => state.reviews