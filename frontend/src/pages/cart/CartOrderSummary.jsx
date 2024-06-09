import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartOrderSummary = () => {
  const navigate = useNavigate()

  const [buttonLoading, setButtonLoading] = useState(false)

  const { subtotal } = useSelector((state) => state.cart)

  const checkoutHandler = () => {
    setButtonLoading(true)
    setTimeout(() => {
      navigate('/checkout')
    }, 800)
  }

  return (
    <div className='card mt-2'>
      <div className='card-header'>
        <span className='fw-semibold'>Order Summary</span>
      </div>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-center'>
          <span className='fw-bold h6'>Subtotal: </span>
          <span>${subtotal}</span>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <span className='fw-bold h6'>Shipping: </span>
          <span className='badge bg-success'>FREE</span>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <span className='fw-bold h6'>Total: </span>
          <span>${subtotal}</span>
        </div>
        <hr />
        <div className='d-grid'>
          {buttonLoading ? (
            <button className="btn btn-dark" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          ) : (
            <button className='btn btn-dark' onClick={() => checkoutHandler()}>Checkout</button>
          ) }
        </div>
      </div>
    </div>
  )
}

export default CartOrderSummary