import axios from 'axios'
import { extractErrorMessage } from '../../utils/utils'
import {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemove,
  clearCart,
} from '../cart/cartSlice'

export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`)

    const productToAdd = {
      productId: data._id,
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      author: data.author,
      quantity,
    }
    
    dispatch(cartItemAdd(productToAdd))
  } catch (error) {
    dispatch(setError(extractErrorMessage))
  }
}

export const removeCartItem = (productId) => async (dispatch) => {
  dispatch(setLoading(true))
  dispatch(cartItemRemove(productId))
}

export const resetCart = () => (dispatch) => {
  dispatch(clearCart())
}