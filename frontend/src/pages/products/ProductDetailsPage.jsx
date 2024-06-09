import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductById } from '../../redux/products/productActions'
import { getSingleProductReviews, resetProductReviews } from '../../redux/reviews/reviewActions'
import { addToCart } from '../../redux/cart/cartActions'
import { toast } from 'react-hot-toast'
import CreateReviewForm from '../../components/forms/create-forms/CreateReviewForm'
import ProductReviews from '../../components/products/ProductReviews'
import Rating from '../../components/products/Rating'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import useTitle from '../../hooks/useTitle'

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const { productId } = useParams()

  const { product, loading, error } = useSelector((state) => state.products)
  const { productReviews } = useSelector((state) => state.reviews)
  const { cart } = useSelector((state) => state.cart)

  useTitle(product && product?.name)

  useEffect(() => {
    dispatch(getProductById(productId))
    dispatch(getSingleProductReviews(productId))
    dispatch(resetProductReviews())
  }, [dispatch, productId])

  const increaseQty = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQty = () => {
    setQuantity(quantity - 1)
  }

  const addItemToCart = (productId) => {
    if (cart.some((cartItem) => cartItem.productId === productId)) {
      toast.error('This item is already in your cart. Go to your cart to change the amount')
    } else {
      dispatch(addToCart(productId, quantity))
      toast.success('Item has been added to your cart')
    }
  }

  if (loading) return <Spinner />

  return (
    <div className='container-fluid mt-3'>
      {error && <Alert type='danger'>{error}</Alert>}
      <div className='row'>
        <div className='row mb-3'>
          <div className='col-md-5 text-center'>
            <img
              src={product?.image}
              className='img-fluid mb-3'
              alt={product?.name}
            />
          </div>
          <div className='col-md-7'>
            <h1 className='h4 d-inline me-2'>{product?.name}</h1>
            {product?.isNewProduct && (
              <span className='badge bg-success mx-2'>New</span>
            )}
            <span className='badge bg-danger'>Hot</span>
            <Rating
              averageRating={product?.averageRating}
              numOfReviews={product?.numOfReviews}
            />
            <dl className='row lg mb-3'>
              <dt className='col-sm-3'>Availability</dt>
              <dd className='col-sm-9'>
                {product?.countInStock <= 0 ? (
                  <span className='badge bg-danger'>
                    Out of STOCK
                  </span>
                ) : (
                  <span className='badge bg-success'>Available</span>
                )}
              </dd>
              <dt className='col-sm-3'>Author</dt>
              <dd className='col-sm-9'>{product?.author}</dd>
              <dt className='col-sm-3'>Category</dt>
              <dd className='col-sm-9'>{product?.category?.name}</dd>
              <dt className='col-sm-3'>Publisher</dt>
              <dd className='col-sm-9'>{product?.publisher?.name}</dd>
              <dt className='col-sm-3'>Genre</dt>
              <dd className='col-sm-9'>{product?.genre?.name}</dd>
            </dl>

            <div className='mb-3'>
              <span className='fw-bold h3 me-2'>${product?.price}</span>
            </div>
            <div className='mb-3'>
              <div className='d-inline float-start me-2'>
                <div className='input-group input-group-sm mw-140'>
                  <button
                    className='btn btn-dark text-white'
                    type='button'
                    disabled={quantity <= 1}
                    onClick={decreaseQty}
                  >
                    <span>
                      <i className='fas fa-minus'></i>
                    </span>
                  </button>
                  <input
                    type='number'
                    className='form-control text-center'
                    value={quantity}
                    readOnly
                  />
                  <button
                    className='btn btn-dark text-white'
                    type='button'
                    disabled={quantity >= product?.countInStock}
                    onClick={increaseQty}
                  >
                    <span>
                      <i className='fas fa-plus'></i>
                    </span>
                  </button>
                </div>
              </div>
              <button
                type='button'
                className='btn btn-sm btn-dark me-2'
                title='Add to cart'
                disabled={product?.countInStock <= 0}
                onClick={() => addItemToCart(product._id)}
              >
                <span>
                  <i className='fas fa-cart-plus'></i>
                </span>
              </button>
            </div>
            <div className='border'>
              <p className='fw-bold mx-2 mt-3 h3'>About book</p>
              <p className='h6 text-secondary mx-2'>{product?.description}</p>
            </div>
          </div>
        </div>
        <div className='row mx-3'>
          <div className='col-md-6'>
            <hr />
            <h3>Reviews</h3>
            {productReviews.length === 0 ? (
              <Alert type='dark'><span className='text-dark fw-bold'>No reviews</span></Alert>
            ) : (
              <>
                {productReviews &&
                  productReviews.map((productReview, index) => (
                    <ProductReviews key={index} productReview={productReview} />
                  ))}
              </>
            )}
          </div>
          <div className='col-md-6'>
            <hr />
            <h3>Write a customer review</h3>
            <CreateReviewForm productId={productId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage