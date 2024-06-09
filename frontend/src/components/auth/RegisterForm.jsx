import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { register, resetErrorState } from '../../redux/auth/authActions'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/utils'
import PasswordInput from './PasswordInput'
import Alert from '../Alert'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const redirect = '/products'

  const { user, loading, error } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const registerData = {
      name,
      email,
      password
    }

    if (!name) return toast.error('Name is required')
    if (!email) return toast.error('Email is required')
    if (!validateEmail(email)) return toast.error('Email invalid')
    if (!password || !confirmPassword) return toast.error('Password is required')
    if (password !== confirmPassword) return toast.error('Passwords not match')
    if (password.length <= 7) return toast.error('Password must be at least 8 characters')

    dispatch(register(registerData))
    setTimeout(() => {
      dispatch(resetErrorState())
    }, 3500)
  }

  useEffect(() => {
    if (user) {
      toast.success(`Account created. Welcome aboard ${user.name}`)
      navigate(redirect)
    }
  }, [dispatch, user, error, navigate, location.state])

  return (
    <>
      {error && <Alert type='danger'>{error}</Alert>}
      <form className='needs-validation' noValidate onSubmit={handleSubmit}>
        <h4 className='text-center'>Register</h4>
        <label htmlFor='name'>Name</label>
        <div className='input-group mb-3'>
          <span className='input-group-text' id='inputGroupPrepend'>
            <span>
              <i className='fas fa-user'></i>
            </span>
          </span>
          <input
            name='name'
            id='name'
            type='text'
            value={name}
            placeholder='Name'
            className='form-control'
            onChange={onChange}
          />
          <div className='invalid-feedback'> Please fill the user name. </div>
        </div>
        <label htmlFor='email'>Email</label>
        <div className='input-group mb-3'>
          <span className='input-group-text'>
            <span>
              <i className='fas fa-envelope'></i>
            </span>
          </span>
          <input
            name='email'
            id='email'
            type='text'
            value={email}
            placeholder='Email'
            className='form-control'
            onChange={onChange}
          />
        </div>
        <label htmlFor='password'>Password</label>
        <div className='input-group mb-3'>
          <PasswordInput
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            onPaste={(e) => {
              e.preventDefault()
              return toast.error('Cannot paste into password field')
            }}
          />
        </div>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <div className='input-group mb-3'>
          <PasswordInput
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChange}
            onPaste={(e) => {
              e.preventDefault()
              return toast.error('Cannot paste into password field')
            }}
          />
        </div>
        <div className='d-grid'>
          {loading ? (
            <button className='btn btn-dark' type='button' disabled>
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>
            </button>
          ) : (
            <button className='btn btn-dark'>Register</button>
          )}
        </div>

        <div className='d-flex justify-content-center align-items-center mt-2'>
          <Link className='text-dark fw-semibold' to='/login'>
            Already have an account? Login here
          </Link>
        </div>

        <div className='clearfix'></div>
        <hr></hr>

        <div className='row'>
          <div className='col- text-center'>
            <p className='text-muted small'>Or you can join with</p>
          </div>
          <div className='col- text-center'>
            <Link to='/' className='btn btn-light text-white bg-twitter me-3'>
              <span>
                <i className='fab fa-twitter'></i>
              </span>
            </Link>
            <Link to='/' className='btn btn-light text-white me-3 bg-facebook'>
              <span>
                <i className='fab fa-facebook'></i>
              </span>
            </Link>
            <Link to='/' className='btn btn-light text-white me-3 bg-google'>
              <span>
                <i className='fab fa-google'></i>
              </span>
            </Link>
          </div>
        </div>
      </form>
    </>
  )
}

export default RegisterForm