import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import CartItem from './CartItem'
import CartOrderSummary from './CartOrderSummary'

const CartPage = () => {
  useTitle('Cart')

  const { cart, loading, error } = useSelector((state) => state.cart)

  if (loading) return <Spinner />

  return (
    <>
      {error && <Alert type='danger'>{error}</Alert>}
      {cart.length <= 0 ? (
        <div className='m-2 p-2'>
          <Alert type='danger'>
            Cart is empty!{' '}
            <Link to='/products'>Click here to see our products</Link>
          </Alert>
        </div>
      ) : (
        <>
          <div className='bg-secondary border-top p-4 text-white mb-3'>
            <h1 className='display-6'>Shopping Cart</h1>
          </div>
          <div className='container mb-3'>
            <div className='row'>
              <div className='col-md-9'>
                {cart &&
                  cart.map((cartItem, index) => (
                    <CartItem key={index} cartItem={cartItem} />
                  ))}
                <div className='alert alert-success mt-3'>
                  <p className='m-0'>
                    <i className='fas fa-truck'></i> Free Delivery within 1-2
                    weeks
                  </p>
                </div>
              </div>
              <div className='col-md-3'>
                <CartOrderSummary />
                <div className='mt-3'>
                  <div className='d-flex justify-content-center'>
                    <div className='d-flex flex-column'>
                      <hr />
                      <span className='text-center'>or</span>
                      <hr />
                      <Link to='/' className='btn btn-secondary'>
                        Continue shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-light border-top p-4'>
            <div className='container'>
              <h6>Payment and refund policy</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CartPage