import React from 'react'

const FilterGenre = ({ genre, setGenre, genres }) => {
  return (
    <div className='card mb-3 accordion'>
      <div
        className='card-header fw-bold text-uppercase accordion-icon-button'
        data-bs-toggle='collapse'
        data-bs-target='#filterGenre'
        aria-expanded='false'
        aria-controls='filterGenre'
        style={{ cursor: 'pointer' }}
      >
        Genres
      </div>
      <ul className='list-group list-group-flush show' id='filterGenre'>
        {genres &&
          genres.map((result, index) => (
            <li className='list-group-item' key={index}>
              <input
                style={{ cursor: 'pointer' }}
                type='radio'
                className='form-check-input'
                name={result.name}
                value={result._id}
                id={result._id}
                checked={genre === result._id}
                onChange={(e) => setGenre(e.target.value)}
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

export default FilterGenre