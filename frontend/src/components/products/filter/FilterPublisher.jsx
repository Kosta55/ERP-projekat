import React from 'react'

const FilterPublisher = ({ publisher, setPublisher, publishers }) => {
  return (
    <div className='card mb-3 accordion'>
      <div
        className='card-header fw-bold text-uppercase accordion-icon-button'
        data-bs-toggle='collapse'
        data-bs-target='#filterPublisher'
        aria-expanded='false'
        aria-controls='filterPublisher'
        style={{ cursor: 'pointer' }}
      >
        Publishers
      </div>
      <ul className='list-group list-group-flush show' id='filterPublisher'>
        {publishers &&
          publishers.map((result, index) => (
            <li className='list-group-item' key={index}>
              <input
                style={{ cursor: 'pointer' }}
                type='radio'
                className='form-check-input'
                name={result.name}
                value={result._id}
                id={result._id}
                checked={publisher === result._id}
                onChange={(e) => setPublisher(e.target.value)}
              />
              <label className='form-check-label mx-2' htmlFor={result._id}>
                {result.name}
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default FilterPublisher