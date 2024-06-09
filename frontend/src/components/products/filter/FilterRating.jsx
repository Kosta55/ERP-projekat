import React from 'react'

const FilterRating = ({ rating, setRating }) => {
  return (
    <div className='card mb-3'>
      <div
        style={{ cursor: 'pointer' }}
        className='card-header fw-bold text-uppercase accordion-icon-button'
        data-bs-toggle='collapse'
        data-bs-target='#filterStar'
        aria-expanded='false'
        aria-controls='filterStar'
      >
        Customer Review
      </div>
      <div className='card-body show' id='filterStar'>
        <div className='form-check'>
          <input
            style={{ cursor: 'pointer' }}
            className='form-check-input'
            type='radio'
            name='flexRadioDefault'
            id='flexRadioDefault5'
            value='5'
            checked={rating === '5'}
            onChange={(e) => setRating(e.target.value)}
          />
          <label
            className='form-check-label'
            htmlFor='flexRadioDefault5'
            aria-label='Star'
          >
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
          </label>
        </div>
        <div className='form-check'>
          <input
            style={{ cursor: 'pointer' }}
            className='form-check-input'
            type='radio'
            name='flexRadioDefault'
            value='4'
            checked={rating === '4'}
            onChange={(e) => setRating(e.target.value)}
          />
          <label
            className='form-check-label'
            htmlFor='flexRadioDefault4'
            aria-label='Star'
          >
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
          </label>
        </div>
        <div className='form-check'>
          <input
            style={{ cursor: 'pointer' }}
            className='form-check-input'
            type='radio'
            name='flexRadioDefault'
            id='flexRadioDefault3'
            value='3'
            checked={rating === '3'}
            onChange={(e) => setRating(e.target.value)}
          />
          <label
            className='form-check-label'
            htmlFor='flexRadioDefault3'
            aria-label='Star'
          >
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
          </label>
        </div>
        <div className='form-check'>
          <input
            style={{ cursor: 'pointer' }}
            className='form-check-input'
            type='radio'
            name='flexRadioDefault'
            id='flexRadioDefault2'
            value='2'
            checked={rating === '2'}
            onChange={(e) => setRating(e.target.value)}
          />
          <label
            className='form-check-label'
            htmlFor='flexRadioDefault2'
            aria-label='Star'
          >
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
          </label>
        </div>
        <div className='form-check'>
          <input
            style={{ cursor: 'pointer' }}
            className='form-check-input'
            type='radio'
            name='flexRadioDefault'
            id='flexRadioDefault1'
            value='1'
            checked={rating === '1'}
            onChange={(e) => setRating(e.target.value)}
          />
          <label
            className='form-check-label'
            htmlFor='flexRadioDefault1'
            aria-label='Star'
          >
            <i className='fas fa-star text-warning me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
            <i className='fas fa-star text-secondary me-1 mb-2'></i>
          </label>
        </div>
      </div>
    </div>
  )
}

export default FilterRating