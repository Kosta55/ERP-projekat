import { useState } from 'react'

const ReadMoreText = ({ children }) => {
  const [readMore, setReadMore] = useState(true)
  const text = children || ''

  const toggleReadMore = () => {
    setReadMore(!readMore)
  }

  return (
    <p className='text-dark small'>
      {readMore && readMore ? text.slice(0, 300) : text}
      <span
        onClick={toggleReadMore}
        className='text-danger'
        style={{ cursor: 'pointer' }}
      >
        {readMore ? ' [...read more]' : ' [show less]'}
      </span>
    </p>
  )
}

export default ReadMoreText