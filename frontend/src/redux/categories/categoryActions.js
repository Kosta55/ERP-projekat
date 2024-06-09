import axios from 'axios'
import { extractErrorMessage } from '../../utils/utils'
import {
  getCategories,
  createCategory,
  categoryUpdate,
  categoryDelete,
  setLoading,
  setError,
  resetError,
} from '../categories/categorySlice'

export const getAllCategories = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const { data } = await axios.get(`/api/categories`)
    dispatch(getCategories(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const createNewCategory = (name) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
  }

  try {
    const { data } = await axios.post(`/api/categories`, name, config)
    dispatch(createCategory(data))
    dispatch(resetError())
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const updateCategory = (categoryId, name) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  }

  try {
    const { data } = await axios.put(`/api/categories/${categoryId}`, { name }, config)
    dispatch(categoryUpdate(data))
    dispatch(resetError())
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  }

  try {
    const { data } = await axios.delete(`/api/categories/${categoryId}`, config)
    dispatch(categoryDelete(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const resetCategoryError = () => async (dispatch) => {
  dispatch(resetError())
}