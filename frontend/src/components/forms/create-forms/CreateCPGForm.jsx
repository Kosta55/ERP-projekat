import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

const CreateCPGForm = ({ createAction, type, onClose }) => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) return toast.error('Name is required')

    dispatch(createAction({ name }))
    onClose(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container-fluid'>
        <label htmlFor='name'>Name</label>
        <input
          className='form-control'
          name='name'
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={type}
          autoFocus
        />
        <div className='d-grid gap-2 mx-auto mt-2'>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateCPGForm