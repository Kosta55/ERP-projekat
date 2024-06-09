import LoginForm from '../../components/auth/LoginForm'
import useTitle from '../../hooks/useTitle'

const LoginPage = () => {
  useTitle('Login')

  return (
    <div className='d-flex justify-content-center align-items-center my-3 py-2'>
      <div className='border border-1 border-dark rounded'>
        <div className='m-4 p-4'>
          <LoginForm  />
        </div>
      </div>
    </div>
  )
}

export default LoginPage