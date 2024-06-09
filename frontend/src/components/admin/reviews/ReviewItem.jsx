import { useState } from 'react'
import { deleteReview } from '../../../redux/reviews/reviewActions'
import { formatDate } from '../../../utils/utils'
import Rating from '../../../components/products/Rating'
import ReadMoreText from '../../../components/products/ReadMoreText'
import DeleteModal from '../../modals/DeleteModal'

const ReviewItem = ({ review }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <div className='card'>
        <div className='card-header bg-light'>
          <div className='d-flex justify-content-between'>
            <Rating averageRating={review?.rating} />
            <span>
              <i
                className='fas fa-trash-alt text-danger'
                style={{ cursor: 'pointer' }}
                onClick={() => setIsOpenDeleteModal(true)}
              >
              </i>
            </span>
          </div>
        </div>

        <div className='card-body'>
          <div className='my-2'>
            <span className='h6'>Product: {review?.product.name}</span>
          </div>
          <p>Posted by: {review?.user.name}</p>

          <p className='fw-bold h6 text-muted'>
            Date: {formatDate(review?.createdAt)}
          </p>

          <div className='card-footer'>
            <span>
              <strong>Title: </strong>
              {review?.title}
            </span>
            <p>
              <strong>Comment: </strong>
              <ReadMoreText>{review?.comment}</ReadMoreText>
            </p>
          </div>
        </div>
      </div>

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          deleteAction={deleteReview}
          itemToDelete={review}
        />
      )}
    </>
  )
}

export default ReviewItem