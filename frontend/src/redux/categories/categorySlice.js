import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const initialState = {
  loading: false,
  error: null,
  categories: [],
  category: null,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    getCategories: (state, action) => {
      state.loading = false
      state.error = null
      state.categories = action.payload
    },
    getCategory: (state, action) => {
      state.category = action.payload
      state.loading = false
      state.error = null
    },
    createCategory: (state, action) => {
      state.categories = [...state.categories, action.payload]
      //state.categories.push(action.payload)
      state.loading = false
      state.error = null
      toast.success(`Category ${action.payload.name} created`)
    },
    categoryUpdate: (state, action) => {
      state.categories = state.categories.map((category) => category._id === action.payload._id ? action.payload : category)
      toast.success(`Category updated to ${action.payload.name}`)
      state.loading = false
      state.error = null
    },
    categoryDelete: (state, action) => {
      state.categories = state.categories.filter((category) => category._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success(`Category ${action.payload.name} is deleted`)
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
  setError,
  getCategories,
  getCategory,
  createCategory,
  categoryUpdate,
  categoryDelete,
  setLoading,
  resetError,
} = categoriesSlice.actions

export default categoriesSlice.reducer

export const categoriesSelector = (state) => state.categories