import { formatDate } from '../../utils/utils'
import Rating from './Rating'

const ProductReviews = ({ productReview }) => {
  return (
    <>
      <div className='border-bottom mb-3'>
        <div className='mb-2'>
          <div className='d-flex justify-content-start'>
            <span className='text-muted'>
              Title: <strong>{productReview?.title}</strong>
            </span>
            &nbsp;
            <span>
              <Rating averageRating={productReview?.rating} />
            </span>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
            <span className='text-muted'>
              Reviewed by: <strong>{productReview?.user.name}</strong> &nbsp; |
              &nbsp; Reviewed on &nbsp;
              <i className='fw-bold'>{formatDate(productReview?.createdAt)}</i>
            </span>
          </div>
          <div className='d-flex justify-content-start align-items-center'>
            <span className='text-muted'>
              Comment: {productReview?.comment}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductReviews