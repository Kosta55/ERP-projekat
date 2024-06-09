import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { addToCart } from '../../redux/cart/cartActions'
import Rating from './Rating'
import ReadMoreText from './ReadMoreText'

const CardProductList = ({ product }) => {
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state.cart)

  const addItemToCart = (productId) => {
    if (cart.some((cartItem) => cartItem.productId === productId)) {
      toast.error('This item is already in your cart. Go to your cart to change the amount'
      )
    } else {
      dispatch(addToCart(productId, 1))
      toast.success('Item has been added to your cart')
    }
  }

  return (
    <div className='card mb-3'>
      <div className='row g-0'>
        <div className='col-md-3 text-center'>
          <Link to={`/product/${product._id}`}>
            <img
              className='img-fluid'
              src={product?.image}
              alt={product?.name}
            />
          </Link>
        </div>
        <div className='col-md-6'>
          <div className='card-body'>
            <h6 className='card-subtitle me-2 d-inline'>
              <Link
                to={`/product/${product._id}`}
                className='text-decoration-none'
              >
                {product?.name}
              </Link>
            </h6>
            {product.isNewProduct && (
              <span className='badge bg-success me-2'>New</span>
            )}
            {product.isHot && <span className='badge bg-danger me-2'>Hot</span>}
            <Rating
              averageRating={product?.averageRating}
              numOfReviews={product?.numOfReviews}
            />
            <ReadMoreText>{product?.description}</ReadMoreText>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card-body'>
            <div className='mb-2'>
              <span className='fw-bold h5'>${product?.price}</span>
            </div>
            <p className='text-success small mb-2'>
              <span>
                <i className='fas fa-truck'></i>
              </span>
              Free Shipping
            </p>
            <div className='btn-group d-flex gap-2' role='group'>
              <button
                type='button'
                className='btn btn-dark rounded'
                title='Add to cart'
                onClick={() => addItemToCart(product._id)}
              >
                <span>
                  <i className='fas fa-cart-plus'></i>
                </span>
              </button>
              <Link
                to={`/product/${product._id}`}
                className='btn btn-dark rounded'
              >
                <i title='View Product' className='fas fa-eye'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProductList