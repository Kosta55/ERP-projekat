import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../redux/users/userActions'

const UpdateUserForm = ({ userToUpdate, onClose }) => {
  const [name, setName] = useState(userToUpdate?.name)
  const [email, setEmail] = useState(userToUpdate?.email)
  const [isAdmin, setIsAdmin] = useState(userToUpdate?.isAdmin)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name, email, isAdmin
    }

    dispatch(updateUser(userToUpdate._id, userData))
    onClose(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-fluid'>
        <label htmlFor='name' className='fw-bold'>Name</label>
        <input
          className='form-control'
          name='name'
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          autoFocus
        />
        <label htmlFor='email' className='mt-2 fw-bold'>Email</label>
        <input
          className='form-control'
          name='email'
          id='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <div className="form-check form-switch mt-2 fw-bold">
          <label htmlFor='isAdmin'>Make this user ADMIN?</label>
          <input
            className='form-check-input'
            role='switch'
            name='isAdmin'
            id='isAdmin'
            type='checkbox'
            value={isAdmin}
            checked={isAdmin}
            onChange={(e) => setIsAdmin(!isAdmin)}
          />
        </div>
        <div className='d-grid gap-2 mx-auto mt-2'>
          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </div>
      </div>
    </form>
  )
}

export default UpdateUserForm