import React from 'react'
import Modal from 'react-bootstrap/Modal'
import UpdateUserForm from '../forms/update-forms/UpdateUserForm'

const UpdateUserModal = ({ isOpen, onClose, userToUpdate }) => {
  return (
    <Modal show={isOpen} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update {userToUpdate?.name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateUserForm userToUpdate={userToUpdate} onClose={onClose} />
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-danger' onClick={() => onClose(false)}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateUserModal