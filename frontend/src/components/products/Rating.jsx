const Rating = ({ averageRating, numOfReviews, color }) => {
  return (
    <div>
      <span>
        <i
          style={{ color }}
          className={
            averageRating >= 1
              ? 'fas fa-star'
              : averageRating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            averageRating >= 2
              ? 'fas fa-star'
              : averageRating >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            averageRating >= 3
              ? 'fas fa-star'
              : averageRating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            averageRating >= 4
              ? 'fas fa-star'
              : averageRating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            averageRating >= 5
              ? 'fas fa-star'
              : averageRating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span className='text-secondary mx-1'>
        {numOfReviews
          ? `(${numOfReviews}) ${numOfReviews === 1 ? 'Review' : 'Reviews'}`
          : ''}
      </span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating