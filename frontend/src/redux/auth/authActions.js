import axios from 'axios'
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  getProfile,
  updateProfile,
  resetError
} from '../auth/authSlice'
import { extractErrorMessage } from '../../utils/utils'

export const login = (userData) => async (dispatch) => {
  dispatch(setLoading(true))

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    const { data } = await axios.post('/api/auth/login', userData, config)
    dispatch(userLogin(data))
    localStorage.setItem('user', JSON.stringify(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('user')
  localStorage.removeItem('profile')
  localStorage.removeItem('subtotal')
  localStorage.removeItem('cart')
  localStorage.removeItem('shippingAddress')
  dispatch(userLogout())
}

export const register = (registerData) => async (dispatch) => {
  setLoading(true)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    const { data } = await axios.post('/api/auth/register', registerData, config)
    dispatch(userLogin(data))
    localStorage.setItem('user', JSON.stringify(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch(setLoading(true))

  const { auth: { user } } = getState()

  const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    }
  }

  try {
    const { data } = await axios.get(`/api/users/profile`, config)
    dispatch(getProfile(data))
    dispatch(resetError())
    localStorage.setItem('profile', JSON.stringify(data));
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  const { auth: { user } } = getState()
  
  const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    }
  }
  
  try {
    const { data } = await axios.put(`/api/users/profile`, profileData, config)
    dispatch(updateProfile(data))
    dispatch(resetError())
    localStorage.setItem('profile', JSON.stringify(data))
    localStorage.setItem('user', JSON.stringify(data))
  } catch (error) {
      dispatch(setError(extractErrorMessage(error)))
  }
}

export const resetErrorState = () => async (dispatch) => {
  dispatch(resetError())
}