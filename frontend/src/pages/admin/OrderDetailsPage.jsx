import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils/utils'
import { getOrderById, updateOrderToDelivered } from '../../redux/orders/orderActions'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import useTitle from '../../hooks/useTitle'

const OrderDetailsPage = () => {
  useTitle('Order Details Page')

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const { order, loading, error, orderSuccessUpdate } = useSelector((state) => state.orders)
  const { user } = useSelector((state) => state.auth)

  const orderId = params.orderId

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getOrderById(orderId))
    // eslint-disable-next-line
  }, [dispatch, orderId, orderSuccessUpdate])

  const handleDeliverOrder = () => {
    dispatch(updateOrderToDelivered(orderId))
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className='container mt-3'>
        <div className='px-3'>
          {error && <Alert type='danger'>{error}</Alert>}
        </div>
        <div className='d-flex justify-content-center'>
          <div className='col-md-6 p-3'>
            <div className='card mb-3 h-100'>
              <div className='card-header fw-bold'>Order Items</div>
              <div className='card-body'>
                {order?.orderItems.map((orderItem, index) => (
                  <>
                    <div className='d-flex justify-content-start align-items-center p-1'>
                      <img
                        width='40px'
                        height='40px'
                        src={orderItem?.image}
                        alt={orderItem.name}
                      />
                      <p className='card-text ms-2'>
                        {orderItem.quantity} x {orderItem.name} x{' '}
                        <strong>${orderItem?.price}</strong>
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className='col-md-6 p-3'>
            <div className='card mb-3 h-100'>
              <div className='card-header fw-bold'>Shipping Address</div>
              <div className='card-body'>
                <p className='card-text'>
                  Name: <strong>{order?.shippingAddress.name}</strong>
                </p>
                <p className='card-text'>
                  Phone: <strong>{order?.shippingAddress.phoneNumber}</strong>
                </p>
                <p className='card-text'>
                  Address: <strong>{order?.shippingAddress.address}</strong>
                </p>
                <p className='card-text'>
                  Postal Code:{' '}
                  <strong>{order?.shippingAddress.postalCode}</strong>
                </p>
                <p className='card-text'>
                  City: <strong>{order?.shippingAddress.city}</strong>
                </p>
                <p className='card-text'>
                  Country: <strong>{order?.shippingAddress.country}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-center align-items-center'>
          <div className='col-md-6 p-3'>
            <div className='card mb-3'>
              <div className='card-header fw-bold h-100'>Payment Details</div>
              <div className='card-body'>
                <div className='d-flex'>
                  <span>Paid: </span>
                  {order?.isPaid ? (
                    <span>
                      <i className='fas fa-check text-success ms-2'></i>
                    </span>
                  ) : (
                    <span>
                      <i className='fas fa-times text-danger ms-2'></i>
                    </span>
                  )}
                  <span className='mx-2'>Delivered: </span>
                  {order?.isDelivered ? (
                    <span>
                      <i className='fas fa-check text-success'></i>
                    </span>
                  ) : (
                    <span>
                      <i className='fas fa-times text-danger'></i>
                    </span>
                  )}
                  <span className='text-primary ms-2 fw-bold'>
                    Payment Method: {order?.paymentMethod}</span>
                </div>
                <div className="mt-2">
                {!order?.isPaid ? (
                  <Alert type='danger'>Not Paid Yet</Alert>
                ) : (
                  <Alert type='success'>Paid: {formatDate(order.paidAt)}</Alert>
                )}
                {!order?.isDelivered && order?.isPaid ? (
                  <Alert type='danger'>Not Delivered Yet</Alert>
                ) : (
                  <Alert type='success'>
                    Delivered: {formatDate(order?.deliveredAt)}
                  </Alert>
                )}
                {!order?.isDelivered ? (
                  <div className='d-grid'>
                    <button className='btn btn-dark' onClick={() => handleDeliverOrder()}>
                      <i className='fas fa-truck'></i> MARK AS DELIVERED
                    </button>
                  </div>
                ) : (
                  ''
                )}
                <h6 className='mt-3'>Items price: ${order?.itemsPrice}</h6>
                <h4 className='card-title'>Total amount of the order: ${order?.totalPrice}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetailsPage