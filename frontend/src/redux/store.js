import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categories/categorySlice'
import publisherReducer from './publishers/publisherSlice'
import genreReducer from './genres/genreSlice'
import orderReducer from './orders/orderSlice'
import productReducer from './products/productSlice'
import userReducer from './users/userSlice'
import reviewReducer from './reviews/reviewSlice'
import authReducer from './auth/authSlice'
import cartReducer from './cart/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    publishers: publisherReducer,
    genres: genreReducer,
    users: userReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    cart: cartReducer
  }
})
