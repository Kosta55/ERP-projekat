import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

const UpdateCPGForm = ({ itemToUpdate, updateAction, onClose }) => {
  const [name, setName] = useState(itemToUpdate?.name)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) return toast.error('Name is required')
    dispatch(updateAction(itemToUpdate._id, name))
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
          placeholder='Category'
        />
        <div className='d-grid gap-2 mx-auto mt-2'>
          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </div>
      </div>
    </form>
  )
}

export default UpdateCPGForm