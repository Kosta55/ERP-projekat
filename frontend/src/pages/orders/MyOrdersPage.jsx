import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders, resetUserOrders } from '../../redux/orders/orderActions'
import { formatDate } from '../../utils/utils'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import useTitle from '../../hooks/useTitle'

const MyOrdersPage = () => {
  useTitle('My Orders')

  const dispatch = useDispatch()

  const { myOrders, loading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(getUserOrders())
    dispatch(resetUserOrders())
  }, [dispatch])

  if (loading) return <Spinner />

  return (
    <div className='container my-3'>
      <h3>My Orders</h3>
      <>
        {error && <Alert type='danger'>{error}</Alert>}
        <table className='table table-striped table-image table-bordered table-hover border'>
          <thead className='table-dark text-center'>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Buyer</th>
              <th scope='col'>No. of Products</th>
              <th scope='col'>Order Date</th>
              <th scope='col'>Paid</th>
              <th scope='col'>Delivered</th>
              <th scope='col'>Total</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders &&
              myOrders?.map((order, index) => (
                <tr key={order._id} className='text-center'>
                  <td className='align-middle'>{index + 1}</td>
                  <td className='align-middle text-wrap fw-semibold'>
                    {order.shippingAddress.name}
                  </td>
                  <td className='align-middle text-wrap fw-semibold'>
                    {order.orderItems.length}
                  </td>
                  <td className='align-middle'>
                    {formatDate(order.createdAt)}
                  </td>
                  <td className='align-middle'>
                    {order.isPaid ? (
                      <i className='fas fa-check text-success'></i>
                    ) : (
                      <i className='fas fa-times text-danger'></i>
                    )}
                  </td>
                  <td className='align-middle'>
                    {order.isDelivered ? (
                      <i className='fas fa-check text-success'></i>
                    ) : (
                      <i className='fas fa-times text-danger'></i>
                    )}
                  </td>
                  <td className='align-middle fw-semibold'>
                    ${order.totalPrice}
                  </td>
                  <td style={{ cursor: 'pointer' }} className='align-middle'>
                    <Link to={`/my-order/${order._id}`}>
                      <i
                        className='fas fa-eye text-primary'
                        data-bs-toggle='tooltip'
                        title='View My Order'
                      ></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </div>
  )
}

export default MyOrdersPage
