import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../../redux/products/productActions'
import { getAllCategories } from '../../redux/categories/categoryActions'
import { getAllGenres } from '../../redux/genres/genreActions'
import { getAllPublishers } from '../../redux/publishers/publisherActions'
import CardProductGrid from '../../components/products/CardProductGrid'
import CardProductList from '../../components/products/CardProductList'
import useTitle from '../../hooks/useTitle'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import Pagination from '../../components/apiFeatures/Pagination'
import FilterCategory from '../../components/products/filter/FilterCategory'
import FilterGenre from '../../components/products/filter/FilterGenre'
import FilterPublisher from '../../components/products/filter/FilterPublisher'
import FilterRating from '../../components/products/filter/FilterRating'

const ProductsPage = () => {
  useTitle('Explore our products!')

  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')
  const [publisher, setPublisher] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState('')

  const params = useParams()
  const dispatch = useDispatch()

  const { loading, error, products, page, pages, count } = useSelector((state) => state.products)
  const { categories, error: errorCategories } = useSelector((state) => state.categories)
  const { genres, error: errorGenres } = useSelector((state) => state.genres)
  const { publishers, error: errorPublishers } = useSelector((state) => state.publishers)

  const pageNumber = params.page || 1
  const keyword = params.keyword

  useEffect(() => {
    dispatch(getAllProducts(keyword, pageNumber, sort, category, publisher, genre, rating))
    dispatch(getAllCategories())
    dispatch(getAllGenres())
    dispatch(getAllPublishers())
  }, [dispatch, keyword, pageNumber, sort, category, publisher, genre, rating])

  if (loading) return <Spinner />

  return (
    <>
      <div className='container-fluid mt-3'>
        {error && <Alert type='danger'>{error}</Alert>}
        {errorCategories && <Alert type='danger'>{errorCategories}</Alert>}
        {errorGenres && <Alert type='danger'>{errorGenres}</Alert>}
        {errorPublishers && <Alert type='danger'>{errorPublishers}</Alert>}
        <div className='row'>
          <div className='col-md-3 mt-4'>
            <div className='d-grid'>
              <button
                className='btn btn-outline-dark mb-2'
                onClick={() => {
                  setCategory('')
                  setPublisher('')
                  setGenre('')
                  setRating('')
                }}
              >
                All Products
              </button>
            </div>
            <FilterCategory
              category={category}
              setCategory={setCategory}
              categories={categories}
            />
            <FilterGenre genre={genre} setGenre={setGenre} genres={genres} />
            <FilterPublisher
              publisher={publisher}
              setPublisher={setPublisher}
              publishers={publishers}
            />
            <FilterRating rating={rating} setRating={setRating} />
          </div>
          <div className='col-md-9'>
            <div className='row'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-start align-items-center'>
                  <span>
                    Showing <strong>{page}</strong> - <strong>{products.length}</strong> of <strong>{count}</strong>
                  </span>
                </div>
                <div className='d-flex justify-content-end align-items-center'>
                  <span className='text-nowrap'>Sort by</span>
                  <select
                    className='form-select mw-210 float-start ms-3'
                    aria-label='Default select'
                    onChange={(e) => setSort(e.target.value)}
                    value={sort}
                  >
                    <option value='name'>Name A - Z</option>
                    <option value='-name'>Name Z - A</option>
                    <option value='price'>Price - Lowest first</option>
                    <option value='-price'>Price - Highest first</option>
                    <option value='createdAt'>Oldest</option>
                    <option value='-createdAt'>Newest</option>
                  </select>

                  <div className='btn-group ms-3' role='group'>
                    <button
                      aria-label='Grid'
                      type='button'
                      onClick={() => setView('grid')}
                      className={`btn ${
                        view === 'grid' ? 'btn-dark' : 'btn-outline-dark'
                      }`}
                    >
                      <span>
                        <i className='fas fa-th'></i>
                      </span>
                    </button>
                    <button
                      aria-label='List'
                      type='button'
                      onClick={() => setView('list')}
                      className={`btn ${
                        view === 'list' ? 'btn-dark' : 'btn-outline-dark'
                      }`}
                    >
                      <span>
                        <i className='fas fa-bars'></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='row g-3'>
              {view === 'grid' &&
                products.map((product, index) => {
                  return (
                    <div key={index} className='col-md-4'>
                      <CardProductGrid product={product} />
                    </div>
                  )
                })}
              {view === 'list' &&
                products.map((product, index) => {
                  return (
                    <div key={index} className='col-md-12'>
                      <CardProductList product={product} />
                    </div>
                  )
                })}
            </div>
           <div className='d-flex justify-content-start mt-3'>
           <Pagination
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ''}
            />
           </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage