import React from 'react'

const FilterCategory = ({ category, setCategory, categories }) => {
  return (
    <div className='card mb-3 accordion'>
      <div
        className='card-header fw-bold text-uppercase accordion-icon-button'
        data-bs-toggle='collapse'
        data-bs-target='#filterCategory'
        aria-expanded='true'
        aria-controls='filterCategory'
        style={{ cursor: 'pointer' }}
      >
        Categories
      </div>
      <ul className='list-group list-group-flush show' id='filterCategory'>
        {categories &&
          categories.map((result, index) => (
            <li className='list-group-item' key={index}>
              <input
                style={{ cursor: 'pointer' }}
                type='radio'
                className='form-check-input'
                name={result.name}
                value={result._id}
                id={result._id}
                checked={category === result._id}
                onChange={(e) => setCategory(e.target.value)}
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

export default FilterCategory