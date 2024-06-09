import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = ({ isAdmin }) => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (keyword.trim()) {
      if (isAdmin) {
        navigate(`/admin/products/search/${keyword}`)
      } else {
        navigate(`/products/search/${keyword}`)
      }
    } else if (isAdmin) {
      navigate('/admin/products')
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='search'>
      <div className='input-group'>
        <input
          id='search'
          name='search'
          type='text'
          className='form-control'
          placeholder='Search products...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <label className='visually-hidden' htmlFor='search'></label>
        <button
          className='btn btn-dark text-white'
          type='submit'
          aria-label='Search'
        >
          <span><i className='fas fa-search'></i></span>
        </button>
      </div>
    </form>
  )
}

export default Search