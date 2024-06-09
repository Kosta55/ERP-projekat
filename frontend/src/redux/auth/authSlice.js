import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))
const profile = JSON.parse(localStorage.getItem('profile'))

export const initialState = {
  loading: false,
  error: null,
  user: user ? user : null,
  profile: profile ? profile : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    userLogin: (state, action) => {
      state.user = action.payload
      state.error = null
      state.loading = false
    },
    userLogout: (state) => {
      state.loading = false
      state.error = null
      state.user = null
      state.profile = null
    },
    getProfile: (state, action) => {
      state.profile = action.payload
      state.loading = false
      state.error = null
    },
    updateProfile: (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload
      state.profile = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    resetError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setError,
  userLogin,
  userLogout,
  getProfile,
  updateProfile,
  resetError,
} = authSlice.actions

export default authSlice.reducer

export const authSelector = (state) => state.auth