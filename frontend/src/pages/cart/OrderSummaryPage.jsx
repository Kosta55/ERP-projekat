import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewOrder } from '../../redux/orders/orderActions.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const OrderSummaryPage = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const { cart, subtotal } = useSelector((state) => state.cart)
  const { shippingAddress, error } = useSelector((state) => state.orders)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createOrderHandler = (e) => {
    e.preventDefault()

    const orderData = {
      orderItems: cart,
      shippingAddress,
      totalPrice: Number(subtotal)
    }

    if (error) return toast.error(error)

    setButtonLoading(true)

    dispatch(createNewOrder(orderData))

    navigate('/payment')
  }

  return (
    <form onSubmit={createOrderHandler}>
      <div className='container'>
        <h1 className='display-6 mt-3'>Order Summary</h1>
        <div className='col-md-12 my-3'>
          <div className='card mb-3'>
            <div className='card-header'>
              <i className='fas fa-shopping-cart'></i> Order Summary
              <span className='badge bg-warning float-end'>
                <span className='text-dark'>{cart?.length}</span>
              </span>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                {cart &&
                  cart.map((cartItem, index) => (
                    <li
                      key={index}
                      className='list-group-item d-flex justify-content-between lh-sm'
                    >
                      <div>
                        <h6 className='my-0'>
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            width='30px'
                            height='30px'
                          />{' '}
                          {cartItem.quantity} x {cartItem.name}
                        </h6>
                        <small className='text-muted'>
                          Author: {cartItem.author}
                        </small>
                      </div>
                      <span className='text-dark fw-semibold'>
                        ${cartItem.price}
                      </span>
                    </li>
                  ))}
                <li className='list-group-item'>
                  <span>Payment methods we currently accept:</span>
                  <span>
                    <img
                      className='ms-1'
                      src='../../../images/payment/stripe.png'
                      alt='stripe'
                      width='40px'
                      height='40px'
                    />
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                  <span className='fw-bold'>Total (USD)</span>
                  <strong>${subtotal}</strong>
                </li>
              </ul>
              <hr />
              <div className='d-flex justify-content-end'>
                {buttonLoading ? (
                  <button className='btn btn-dark' type='button' disabled>
                    <span
                      className='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  </button>
                ) : (
                  <button className='btn btn-dark' type='submit'>
                    Go to Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default OrderSummaryPage