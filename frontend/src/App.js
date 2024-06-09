import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ToastMessage from './components/ToastMessage'

import NotFoundPage from './pages/NotFoundPage'
import ProductsPage from './pages/products/ProductsPage'
import ProductDetailsPage from './pages/products/ProductDetailsPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import OrderSuccessPage from './pages/orders/OrderSuccessPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CategoryListPage from './pages/admin/CategoryListPage'
import PublisherListPage from './pages/admin/PublisherListPage'
import GenreListPage from './pages/admin/GenreListPage'
import ProductListPage from './pages/admin/ProductListPage'
import UserListPage from './pages/admin/UserListPage'
import ProfilePage from './pages/profile/ProfilePage'
import OrderListPage from './pages/admin/OrderListPage'
import OrderDetailsPage from './pages/admin/OrderDetailsPage'
import ReviewListPage from './pages/admin/ReviewListPage'
import CartPage from './pages/cart/CartPage'
import MyOrdersPage from './pages/orders/MyOrdersPage'
import OrderFailedPage from './pages/orders/OrderFailedPage'
import CheckoutPage from './pages/cart/CheckoutPage'
import PaymentPage from './pages/Payment/PaymentPage'
import OrderSummaryPage from './pages/cart/OrderSummaryPage'
import MyOrderDetailsPage from './pages/orders/MyOrderDetailsPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

const App = () => {
  return (
      <Router>
        <Header />
        <ToastMessage />
        <Routes>
          <Route path='/' element={<ProductsPage />} />

          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/search/:keyword' element={<ProductsPage />} />
          <Route path='/products/page/:page' element={<ProductsPage />} />
          <Route path='/products/search/:keyword/page/:page' element={<ProductsPage />} />
          <Route path='/product/:productId' element={<ProductDetailsPage />} />

          <Route path='/cart' element={<CartPage />} />

          <Route path='/checkout' element={<ProtectedRoute> <CheckoutPage /> </ProtectedRoute>} />

          <Route path='/order-summary' element={<ProtectedRoute> <OrderSummaryPage /> </ProtectedRoute>} />

          <Route path='/payment' element={<ProtectedRoute> <PaymentPage /> </ProtectedRoute>} />

          <Route path='/my-orders' element={<ProtectedRoute> <MyOrdersPage /> </ProtectedRoute>} />
          
          <Route path='/my-order/:orderId' element={<ProtectedRoute> <MyOrderDetailsPage /> </ProtectedRoute>} />

          <Route path='/order-success' element={<ProtectedRoute> <OrderSuccessPage /> </ProtectedRoute>} />
          
          <Route path='/order-failed' element={<ProtectedRoute> <OrderFailedPage /> </ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path='/admin-dashboard' element={<ProtectedRoute> <AdminDashboardPage /> </ProtectedRoute>} />

          <Route path='/admin/categories' element={<ProtectedRoute> <CategoryListPage /> </ProtectedRoute>} />

          <Route path='/admin/publishers' element={<ProtectedRoute> <PublisherListPage /> </ProtectedRoute>} />

          <Route path='/admin/genres' element={<ProtectedRoute> <GenreListPage /> </ProtectedRoute>} />

          <Route path='/admin/orders' element={<ProtectedRoute> <OrderListPage /> </ProtectedRoute>} />

          <Route path='/admin/order/:orderId' element={<ProtectedRoute> <OrderDetailsPage /> </ProtectedRoute>} />

          <Route path='/admin/reviews' element={<ProtectedRoute> <ReviewListPage /> </ProtectedRoute>} />

          <Route path='/admin/users' element={<ProtectedRoute> <UserListPage /> </ProtectedRoute>} />

          <Route path='/admin/products' element={<ProtectedRoute> <ProductListPage /> </ProtectedRoute>} />

          <Route path='/admin/products/page/:page' element={<ProtectedRoute> <ProductListPage /> </ProtectedRoute>} />

          <Route path='/admin/products/search/:keyword' element={<ProtectedRoute> <ProductListPage /> </ProtectedRoute>} />
          <Route path='/admin/products/search/:keyword/page/:page' element={<ProtectedRoute> <ProductListPage /> 
          </ProtectedRoute>} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          
          <Route path='/my-profile' element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />

          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App