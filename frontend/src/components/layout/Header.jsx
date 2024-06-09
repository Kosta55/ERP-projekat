import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/auth/authActions'
import { toast } from 'react-hot-toast'
import { resetCart } from '../../redux/cart/cartActions'
import { clearShippingAddress } from '../../redux/orders/orderActions'
import Search from '../apiFeatures/Search'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)

  const onLogout = () => {
    dispatch(logout())
    dispatch(resetCart())
    dispatch(clearShippingAddress())
    toast.success('You have been logged out')
    navigate('/')
  }

  return (
    <>
      <header className='p-4 bg-light'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex justify-content-center align-items-center'>
            <Link to='/' className='text-decoration-none fs-3'>
              <strong className='text-warning'>Book</strong>
              <strong className='text-dark'>shop</strong>
            </Link>
            <div className='mx-3'>
              <Search />
            </div>
          </div>

          <div className='d-flex justify-content-center align-items-center'>
            <div className='position-relative d-inline me-3'>
              <Link to='/cart' className='btn btn-outline-dark'>
                <span>
                  <i className='fas fa-shopping-cart'></i>
                </span>
                <div className='position-absolute top-0 start-100 translate-middle badge bg-warning rounded-circle'>
                  {cart?.length}
                </div>
              </Link>
            </div>
            {user ? (
              <div className='dropdown'>
                <button
                  className='btn btn-outline-dark dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {user?.name}
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                  {user && user?.isAdmin && (
                    <li>
                      <Link to='/admin-dashboard' className='dropdown-item'>
                        <i className='fas fa-user-shield'></i> Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to='/my-profile' className='dropdown-item'>
                      <i className='fas fa-user'></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to='/my-orders' className='dropdown-item'>
                      <i className='fas fa-shopping-cart'></i> My Orders
                    </Link>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <button className='dropdown-item' onClick={onLogout}>
                      <i className='fas fa-arrow-left'></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className='btn-group'>
                <Link className='btn btn-outline-dark rounded me-2' to='/login'>
                  <span>
                    <i className='fas fa-arrow-right'></i>
                  </span>
                  Login
                </Link>
                <Link className='btn btn-outline-dark rounded' to='/register'>
                  <span>
                    <i className='fas fa-user-plus'></i>
                  </span>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
