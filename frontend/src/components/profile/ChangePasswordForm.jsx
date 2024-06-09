import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { updateUserProfile } from '../../redux/auth/authActions'
import PasswordInput from '../auth/PasswordInput'

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const passwordData = { password }
    
    if (!oldPassword || !password || !newPassword) return toast.error('Password is required')
    if (oldPassword === password) return toast.error('New password cannot be same as old password')
    if (password !== newPassword) return toast.error('Passwords must match')

    dispatch(updateUserProfile(passwordData))
    toast.success('Password updated')
    setOldPassword('')
    setPassword('')
    setNewPassword('')
  }

  return (
    <div className='card border-dark'>
      <h6 className='card-header bg-light'>
        <i className='fas fa-key'></i> Change Password
      </h6>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='oldPassword' className='fw-semibold'>Old Password</label>
          <PasswordInput
            className='form-control mb-3'
            name='oldPassword'
            value={oldPassword}
            placeholder='Old password'
            onChange={(e) => setOldPassword(e.target.value)}
            onPaste={(e) => {
              e.preventDefault()
              return toast.error('Cannot paste into password field')
            }}
          />
          <label htmlFor='password' className='fw-semibold'>New Password</label>
          <PasswordInput
            className='form-control mb-3'
            name='password'
            value={password}
            placeholder='New password'
            onChange={(e) => setPassword(e.target.value)}
            onPaste={(e) => {
              e.preventDefault()
              return toast.error('Cannot paste into password field')
            }}
          />
          <label htmlFor='newPassword' className='fw-semibold'>Confirm New Password</label>
          <PasswordInput
            className='form-control mb-3'
            name='newPassword'
            value={newPassword}
            placeholder='Confirm new password'
            onChange={(e) => setNewPassword(e.target.value)}
            onPaste={(e) => {
              e.preventDefault()
              return toast.error('Cannot paste into password field')
            }}
          />
          <button type='submit' className='btn btn-dark'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordForm