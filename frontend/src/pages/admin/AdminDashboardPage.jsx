import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/categories/categoryActions'
import { getAllPublishers } from '../../redux/publishers/publisherActions'
import { getAllGenres } from '../../redux/genres/genreActions'
import { getAllProducts } from '../../redux/products/productActions'
import { getAllUsers } from '../../redux/users/userActions'
import { getAllReviews } from '../../redux/reviews/reviewActions'
import { getAllOrders } from '../../redux/orders/orderActions'

import Sidebar from '../../components/admin/Sidebar'
import Spinner from '../../components/Spinner'
import useTitle from '../../hooks/useTitle'

const AdminDashboardPage = () => {
  useTitle('Admin Dashboard')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { categories, loading } = useSelector((state) => state.categories)
  const { publishers } = useSelector((state) => state.publishers)
  const { genres } = useSelector((state) => state.genres)
  const { users } = useSelector((state) => state.users)
  const { orders } = useSelector((state) => state.orders)
  const { reviews } = useSelector((state) => state.reviews)
  const { products, count } = useSelector((state) => state.products)

  let outOfStock = 0
  products.forEach((product) => {
    if (product.countInStock === 0) {
      outOfStock += 1
    }
  })

  let totalProfit = 0
  orders.forEach((order) => (
    (totalProfit += order.totalPrice).toFixed(2)
  ))

  useEffect(() => {
    if(!user.isAdmin) navigate('/')
    dispatch(getAllCategories())
    dispatch(getAllPublishers())
    dispatch(getAllGenres())
    dispatch(getAllProducts())
    dispatch(getAllUsers())
    dispatch(getAllOrders())
    dispatch(getAllReviews())
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <>
      <div className='row m-0'>

        <div className='col-12 col-md-2 p-0' >
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <h1 className='my-3 mx-3'>Dashboard</h1>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className='row pr-4 mx-2'>
                <div className='col-xl-12 col-sm-12 mb-3'>
                  <div className='card bg-primary o-hidden h-100'>
                    <div className='card-body text-white'>
                      <div className='text-center'>
                        <h5 className="card-title">Total Profit</h5>
                        <p className="card-text fs-5">${totalProfit && totalProfit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row pr-4 mx-2'>
                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-success o-hidden h-100'>
                    <div className='card-body text-white'>
                    <div className='text-center'>
                        <h5 className="card-title">Products</h5>
                        <p className="card-text fs-3">{products && count}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/products'
                    >
                     <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-danger o-hidden h-100'>
                    <div className='card-body text-white'>
                    <div className='text-center'>
                        <h5 className="card-title">Categories</h5>
                        <p className="card-text fs-3">{categories && categories.length}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/categories'
                    >
                     <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-secondary o-hidden h-100'>
                    <div className='card-body text-white'>
                    <div className='text-center'>
                        <h5 className="card-title">Publishers</h5>
                        <p className="card-text fs-3">{publishers && publishers.length}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/publishers'
                    >
                     <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-dark o-hidden h-100'>
                    <div className='card-body text-white'>
                    <div className='text-center'>
                        <h5 className="card-title">Genres</h5>
                        <p className="card-text fs-3">{genres && genres.length}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/genres'
                    >
                     <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-dark o-hidden h-100'>
                    <div className='card-body text-white'>
                      <div className='text-center'>
                        <h5 className="card-title">Orders</h5>
                        <p className="card-text fs-3">{orders && orders.length}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/orders'
                    >
                      <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-secondary o-hidden h-100'>
                    <div className='card-body text-white'>
                      <div className='text-center'>
                        <h5 className="card-title">Users</h5>
                        <p className="card-text fs-3">{users && users.length}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/users'
                    >
                      <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-danger o-hidden h-100'>
                    <div className='card-body text-white'>
                      <div className='text-center'>
                        <h5 className="card-title">Reviews</h5>
                        <p className="card-text fs-3">{reviews && reviews.length}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/reviews'
                    >
                      <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className='col-xl-3 col-sm-6 mb-3'>
                  <div className='card bg-success o-hidden h-100'>
                    <div className='card-body text-white'>
                    <div className='text-center'>
                        <h5 className="card-title">Out of Stock</h5>
                        <p className="card-text fs-3">{outOfStock}</p>
                      </div>
                    </div>
                    <Link
                      className='card-footer text-white clearfix small z-1'
                      to='/admin/products'
                    >
                      <div className="d-flex justify-content-between">
                        <span className='text-small'>View Details</span>
                        <span><i className='fas fa-angle-right'></i></span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminDashboardPage