import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/authActions'
import { toast } from 'react-hot-toast'
import { resetCart } from '../../redux/cart/cartActions'
import { clearShippingAddress } from '../../redux/orders/orderActions'
import useTitle from '../../hooks/useTitle'
import { useEffect } from 'react'
import { clearCart } from '../../redux/cart/cartSlice'

const OrderSuccessPage = () => {
  useTitle('Order Success!')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(resetCart())
    dispatch(clearShippingAddress())
    toast.success('You have been logged out')
    navigate('/')
  }

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='card col-md-6 bg-success shadow-md py-5 my-5'>
        <div className='mb-4 text-center text-white'>
          <span>
            <i className='fas fa-check-circle fs-3'></i>
          </span>
          <h4>Thank you for your payment!</h4>
        </div>
        <div className='d-flex flex-column justify-content-center align-items center mx-auto'>
          <Link to='/my-orders' className='btn btn-outline-light'>
            Your Orders
          </Link>
          <Link to='/products' className='btn btn-outline-light mt-2'>
            Products
          </Link>
          <button className='btn btn-outline-light mt-2' onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage