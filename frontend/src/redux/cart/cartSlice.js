import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const calculateSubtotal = (cartState) => {
  let total = 0
  cartState.map((item) => (total += item.quantity * item.price))
  return Number(total).toFixed(2)
}

export const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem('cart')) ?? [],
  subtotal: localStorage.getItem('cart') 
  ? calculateSubtotal(JSON.parse(localStorage.getItem('cart')))
  : 0
}

const updateLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
  localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)))
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    cartItemAdd: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.productId
      )

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.productId === existingItem.productId ? action.payload : item
        )
      } else {
        state.cart = [...state.cart, action.payload]
      }
      state.loading = false
      state.error = null
      state.subtotal = calculateSubtotal(state.cart)
      updateLocalStorage(state.cart)
    },
    cartItemRemove: (state, action) => {
      state.cart = [...state.cart].filter(
        (item) => item.productId !== action.payload
      )
      state.loading = false
      state.error = null
      state.subtotal = calculateSubtotal(state.cart)
      updateLocalStorage(state.cart)
      toast.success('Item has been removed from your cart')
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    clearCart: (state) => {
      localStorage.removeItem('cart')
      state.cart = []
      state.subtotal = 0
    },
  },
})

export const {
  setLoading,
  setError,
  cartItemAdd,
  cartItemRemove,
  setExpressShipping,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const cartSelector = (state) => state.cart