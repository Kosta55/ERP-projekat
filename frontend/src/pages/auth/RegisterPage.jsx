import RegisterForm from '../../components/auth/RegisterForm'
import useTitle from '../../hooks/useTitle'

const RegisterPage = () => {
  useTitle('Register')

  return (
    <div className='d-flex justify-content-center align-items-center my-3 py-2'>
      <div className='border border-1 border-dark rounded'>
        <div className='m-4 p-4'>
          <RegisterForm  />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage