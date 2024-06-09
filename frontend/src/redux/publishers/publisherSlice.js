import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const initialState = {
  loading: false,
  error: null,
  publishers: [],
  publisher: null,
}

export const publishersSlice = createSlice({
  name: 'publishers',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    getPublishers: (state, action) => {
      state.loading = false
      state.error = null
      state.publishers = action.payload
    },
    getPublisher: (state, action) => {
      state.publisher = action.payload
      state.loading = false
      state.error = null
    },
    createPublisher: (state, action) => {
      state.publishers = [...state.publishers, action.payload]
      //state.publishers.push(action.payload)
      state.loading = false
      state.error = null
      toast.success(`Publisher ${action.payload.name} created`)
    },
    publisherUpdate: (state, action) => {
      state.publishers = state.publishers.map((publisher) => publisher._id === action.payload._id ? action.payload : publisher)
      toast.success(`Publisher updated to ${action.payload.name}`)
      state.loading = false
      state.error = null
    },
    publisherDelete: (state, action) => {
      state.publishers = state.publishers.filter((publisher) => publisher._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success(`Publisher ${action.payload.name} is deleted`)
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
  getPublishers,
  getPublisher,
  createPublisher,
  publisherUpdate,
  publisherDelete,
  setLoading,
  resetError,
} = publishersSlice.actions

export default publishersSlice.reducer

export const publishersSelector = (state) => state.publishers