import axios from 'axios'
import { extractErrorMessage } from '../../utils/utils'
import {
  getGenres,
  createGenre,
  genreUpdate,
  genreDelete,
  setLoading,
  setError,
  resetError,
} from '../genres/genreSlice'

export const getAllGenres = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const { data } = await axios.get(`/api/genres`)
    dispatch(getGenres(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const createNewGenre = (name) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  }

  try {
    const { data } = await axios.post(`/api/genres`, name, config)
    dispatch(createGenre(data))
    dispatch(resetError())
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const updateGenre = (genreId, name) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  }

  try {
    const { data } = await axios.put(`/api/genres/${genreId}`, { name }, config)
    dispatch(genreUpdate(data))
    dispatch(resetError())
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const deleteGenre = (genreId) => async (dispatch, getState) => {
  const { auth: { user } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  }

  try {
    const { data } = await axios.delete(`/api/genres/${genreId}`, config)
    dispatch(genreDelete(data))
  } catch (error) {
    dispatch(setError(extractErrorMessage(error)))
  }
}

export const resetCategoryError = () => async (dispatch) => {
  dispatch(resetError())
}