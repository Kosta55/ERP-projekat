import Search from '../components/apiFeatures/Search'
import useTitle from '../hooks/useTitle'

const NotFoundPage = () => {
  useTitle('Not Found Page')
  
  return (
      <div className='container text-center p-5'>
        <div className='display-1'>
          <span>
            <i className='fas fa-exclamation-triangle text-warning'></i>
          </span>
          404
        </div>
        <h1 className='mb-3'>Oops... Page Not Found!</h1>
        <div className='row justify-content-md-center'>
          <div className='col-md-6'>
            <Search />
          </div>
        </div>
      </div>
  )
}

export default NotFoundPage