import axios from 'axios'
import { extractErrorMessage } from '../../utils/utils'

import {
  getUsers,
  getUser,
  userUpdate,
  userDelete,
  setLoading,
  setError,
  resetError,
} from '../users/userSlice'

export const getAllUsers = () => async (dispatch, getState) => {
  dispatch(setLoading(true))

  const { auth: { user } } = getState()

  const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    }
  }
  try {
    const { data } = await axios.get('/api/users', config)
    dispatch(getUsers(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const getUserById = (userId) => async (dispatch, getState) => {
  dispatch(setLoading(true))

  const { auth: { user } } = getState()

  const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    }
  }

  try {
    const { data } = await axios.get(`/api/users/${userId}`, config)
    dispatch(getUser(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const updateUser = (userId, userData) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
      }
  }

  try {
    const { data } = await axios.put(`/api/users/${userId}`, userData, config)
    dispatch(userUpdate(data))
    dispatch(resetError())
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
      }
  }

  try {
    const { data } = await axios.delete(`/api/users/${userId}`, config)
    dispatch(userDelete(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const resetUserError = () => async (dispatch) => {
  dispatch(resetError())
}