import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    getUsers: (state, action) => {
      state.loading = false
      state.error = null
      state.users = action.payload
    },
    getUser: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    userUpdate: (state, action) => {
      state.users = state.users.map((user) => user._id === action.payload._id ? action.payload : user)
      state.loading = false
      state.error = null
      toast.success('User updated')
    },
    userDelete: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload._id)
      state.error = null
      state.loading = false
      toast.success(`User ${action.payload.name} is deleted`)
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
  getUsers,
  getUser,
  userUpdate,
  userDelete,
  setError,
  resetError,
} = usersSlice.actions

export default usersSlice.reducer

export const usersSelector = (state) => state.users