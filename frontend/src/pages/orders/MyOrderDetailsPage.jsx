import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils/utils'
import { getUserOrder } from '../../redux/orders/orderActions'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import useTitle from '../../hooks/useTitle'

const MyOrderDetailsPage = () => {
  useTitle('My Order')

  const dispatch = useDispatch()
  const params = useParams()

  const { myOrder, loading, error } = useSelector((state) => state.orders)

  const orderId = params.orderId

  useEffect(() => {
    dispatch(getUserOrder(orderId))
  }, [dispatch, orderId])

  if (loading) return <Spinner />

  return (
    <>
      <div className='container my-3'>
        <div className='px-3'>
          {error && <Alert type='danger'>{error}</Alert>}
        </div>
          <div className='col-12 col-md-12'>
            <h3>Order #{myOrder?._id}</h3>
            <div className='card'>
              <div className='card-header bg-light'>
                <h6>Order Information</h6>
              </div>
              <div className='card-body'>
                <div className="col-6 col-md-6">
                  <p><strong>Order ID: </strong> {myOrder?._id}</p>
                  <p><strong>Paid: </strong> 
                  {myOrder?.isPaid ? <i className='fas fa-check text-success'></i> : <i className='fas fa-times text-danger'></i>}
                  </p>
                  <p><strong>Delivered: </strong> 
                  {myOrder?.isDelivered ? <i className='fas fa-check text-success'></i> : <i className='fas fa-times text-danger'></i>}
                  </p>
                  <p><strong>Order date: </strong> {formatDate(myOrder?.createdAt)}</p>
                  <p><strong>Payment Method: </strong> {myOrder?.paymentMethod}</p>
                  <p><strong>Delivery: </strong> <span className='badge bg-success'>FREE</span> in Serbia</p>
                </div>
              </div>
            </div>
          </div>
        <div className='col-md-12'>
          <div className='card mt-3'>
            <div className='card-header bg-light'>
              <h6>Shipping Address</h6>
            </div>
            <div className='card-body'>
             <div className="d-flex flex-column">
              <p><strong>Name: </strong> {myOrder?.shippingAddress.name}</p>
              <p><strong>Phone Number: </strong> {myOrder?.shippingAddress.phoneNumber}</p>
              <p><strong>City: </strong> {myOrder?.shippingAddress.city}</p>
              <p><strong>Address: </strong> {myOrder?.shippingAddress.address}</p>
              <p><strong>Postal Code: </strong> {myOrder?.shippingAddress.postalCode}</p>
              <p><strong>Country: </strong> {myOrder?.shippingAddress.country}</p>
             </div>
            </div>
          </div>
        </div>
        <div className='col-md-12'>
          <div className='card mt-3'>
            <div className='card-header bg-light'>
              <h6>Order Items</h6>
            </div>
            <div className='card-body'>
            <table className='table table-image'>
              <thead className='text-center'>
                <tr>
                  <th scope='col'>Image</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                {myOrder &&
                  myOrder.orderItems?.map((item) => (
                    <tr key={item._id} className='text-center'>
                      <th scope='row' className='align-middle text-center'>
                      <img src={item?.image} alt={item.name} height='40px' width='40px' />
                      </th>
                      <th scope='row'>{item.name}</th>
                      <th scope='row'>{item.quantity}</th>
                      <th scope='row'>${item.price}</th>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <strong>Total: ${myOrder?.totalPrice}</strong> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrderDetailsPage