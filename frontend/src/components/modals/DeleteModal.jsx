import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

const DeleteModal = ({ isOpen, onClose, itemToDelete, deleteAction }) => {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deleteAction(itemToDelete._id))
    onClose(false)
  }

  return (
    <Modal
      show={isOpen}
      onHide={() => onClose(false)}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete {itemToDelete?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {itemToDelete.name}?
      </Modal.Body>
      <Modal.Footer>
        <button
          className='btn btn-danger btn-lg'
          onClick={() => onClose(false)}
        >
          <i className='fas fa-times'></i>
        </button>
        <button className='btn btn-success btn-lg' onClick={deleteHandler}>
          <i className='fas fa-check'></i>
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal