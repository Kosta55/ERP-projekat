import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../../redux/auth/authActions'

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name)
  const [email] = useState(user?.email)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const profileData = { name }

    if (!name) return toast.error('Name is required')

    dispatch(updateUserProfile(profileData))
    toast.success('Profile updated')
  }

  return (
    <div className='card border-dark'>
      <h6 className='card-header bg-light'>
        <i className='fas fa-address-book'></i>
        &nbsp; Profile Details
      </h6>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name' className='fw-semibold'>
            Name
          </label>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <span>
                <i className='fas fa-user'></i>
              </span>
            </span>
            <input
              className='form-control'
              name='name'
              value={name}
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <label htmlFor='email' className='fw-semibold'>
            Email
          </label>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <span>
                <i className='fas fa-envelope'></i>
              </span>
            </span>
            <input
              className='form-control'
              name='email'
              value={email}
              placeholder='Email'
              disabled
            />
          </div>
          <button type='submit' className='btn btn-dark mt-3'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm