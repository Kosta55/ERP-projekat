import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllProducts } from '../../redux/products/productActions'
import Spinner from '../../components/Spinner'
import Sidebar from '../../components/admin/Sidebar'
import Alert from '../../components/Alert'
import ProductItem from '../../components/admin/products/ProductItem'
import CreateProductModal from '../../components/modals/CreateProductModal'
import Pagination from '../../components/apiFeatures/Pagination'
import Search from '../../components/apiFeatures/Search'
import useTitle from '../../hooks/useTitle'

const ProductListPage = () => {
  useTitle('Product Admin Page')

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

  const { products, page, pages, loading, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const pageNumber = params.page || 1
  const keyword = params.keyword

  useEffect(() => {
    if (!user.isAdmin) navigate('/')
    dispatch(getAllProducts(keyword, pageNumber, ''))
    // eslint-disable-next-line
  }, [dispatch, keyword, pageNumber])

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
                <h1 className='text-dark'>All Products</h1>
              </div>
              <div className="d-flex justify-content-end align-items-center">
              <Search isAdmin={true} />
              <button
                className='btn btn-success ms-2'
                onClick={() => setIsOpenCreateModal(true)}
              >
                <i className='fas fa-plus'> </i> Create Product
              </button>
              </div>
            </div>
            <table className='table table-striped table-image table-bordered table-hover border'>
              <thead className='table-dark text-center text-uppercase'>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Product name</th>
                  <th scope='col'>Author</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Stock</th>
                  <th scope='col'>New</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products?.map((product, index) => (
                    <tr key={product._id} className='text-center'>
                      <th scope='row' className='align-middle text-center'>{index + 1}</th>
                      <ProductItem product={product} />
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination page={page} pages={pages} isAdmin={true} />
          </>
        </div>
      </div>

      {isOpenCreateModal && (
        <CreateProductModal
          isOpen={isOpenCreateModal}
          onClose={setIsOpenCreateModal}
        />
      )}
    </>
  )
}

export default ProductListPage