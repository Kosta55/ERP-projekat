import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const initialState = {
  loading: false,
  error: null,
  genres: [],
  genre: null,
}

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    getGenres: (state, action) => {
      state.loading = false
      state.error = null
      state.genres = action.payload
    },
    getGenre: (state, action) => {
      state.genre = action.payload
      state.loading = false
      state.error = null
    },
    createGenre: (state, action) => {
      state.genres = [...state.genres, action.payload]
      //state.genres.push(action.payload)
      state.loading = false
      state.error = null
      toast.success(`Genre ${action.payload.name} created`)
    },
    genreUpdate: (state, action) => {
      state.genres = state.genres.map((genre) => genre._id === action.payload._id ? action.payload : genre)
      state.loading = false
      state.error = null
      toast.success(`Genre updated to ${action.payload.name}`)
    },
    genreDelete: (state, action) => {
      state.genres = state.genres.filter((genre) => genre._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success(`Genre ${action.payload.name} is deleted`)
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
  getGenres,
  getGenre,
  createGenre,
  genreUpdate,
  genreDelete,
  setLoading,
  resetError,
} = genresSlice.actions

export default genresSlice.reducer

export const genresSelector = (state) => state.genres