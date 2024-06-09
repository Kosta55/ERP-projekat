import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrders } from '../../redux/orders/orderActions'
import Spinner from '../../components/Spinner'
import Sidebar from '../../components/admin/Sidebar'
import Alert from '../../components/Alert'
import OrderItem from '../../components/admin/orders/OrderItem'
import useTitle from '../../hooks/useTitle'
import { useNavigate } from 'react-router-dom'

const OrderListPage = () => {
  useTitle('Orders Admin Page')

  const { orders, loading, error } = useSelector((state) => state.orders)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getAllOrders())
    // eslint-disable-next-line
  }, [dispatch])

  if (loading) return <Spinner />

  return (
    <>
     <div className='row m-0'>
        <div className='col-12 col-md-2 p-0'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-10'>
          <>
            <div className='mt-3'>
              {error && <Alert type='danger'>{error}</Alert>}
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className="d-flex justify-content-start align-items-center">
                <h1 className='text-dark'>All Orders</h1>
              </div>
            </div>
            <table className='table table-striped table-image table-bordered table-hover border'>
              <thead className='table-dark text-center'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Order Date</th>
                  <th scope='col'>Ordered by</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Paid</th>
                  <th scope='col'>Delivered</th>
                  <th scope='col'>Total</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders?.map((order, index) => (
                    <tr key={order._id} className='text-center'>
                      <th scope='row' className='align-middle text-center'>{index + 1}</th>
                      <OrderItem order={order} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>
    </>
  )
}

export default OrderListPage