import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewReview } from '../../../redux/reviews/reviewActions'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Alert from '../../Alert'

const CreateReviewForm = ({ productId }) => {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(1)
  const [hover, setHover] = useState(0)

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { productReviews, loading } = useSelector((state) => state.reviews)

  const handleSubmit = (e) => {
    e.preventDefault()

    const reviewData = {
      title,
      comment,
      rating,
      product: productId
    }

    if (!title) return toast.error('Title is required')
    if (!comment) return toast.error('Comment is required')

    if (productReviews.some((review) => review.user._id === user._id)) return toast.error('You have already submitted review for this product')

    dispatch(createNewReview(reviewData))
    setTitle('')
    setComment('')
    setRating(1)
  }

  return (
    <form onSubmit={handleSubmit} className='mb-3'>
      {user ? (
        <>
          <div className='d-flex justify-content-start align-items-center'>
            <span className='text-muted'>Choose rating from 1 to 5</span>
              {[...Array(5)].map((star, index) => {
                index += 1
                console.log('hover ' + hover)
                console.log('rating ' + rating)
                return (
                  <button
                    type='button'
                    key={index}
                    className={`btn btn-border-none ? ${
                      index <= (hover || rating) ? 'on' : 'off'
                    }`}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    onDoubleClick={() => {
                      setRating(0)
                      setHover(0)
                    }}
                  >
                    <span><i className='fas fa-star'></i></span>
                  </button>
                )
              })}
            </div>
          <label htmlFor='title' className='text-muted'>
            Title
          </label>
          <input
            className='form-control'
            style={{ width: '400px' }}
            name='title'
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor='comment' className='text-muted mt-2'>
            Comment
          </label>
          <input
            className='form-control'
            style={{ width: '400px' }}
            name='comment'
            value={comment}
            placeholder='Comment'
            onChange={(e) => setComment(e.target.value)}
          />
          {loading ? (
            <button className='btn btn-dark mt-3' type='button' disabled>
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>
            </button>
          ) : (
            <button className='btn btn-dark mt-3'>Submit</button>
          )}
        </>
      ) : (
        <Alert type='dark'>
          <Link className='text-dark fw-bold' to='/login'>
            Please login to write a review
          </Link>
        </Alert>
      )}
    </form>
  )
}

export default CreateReviewForm