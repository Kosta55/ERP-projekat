import React from 'react'
import Modal from 'react-bootstrap/Modal'
import UpdateCPGForm from '../forms/update-forms/UpdateCPGForm'

const UpdateCPGModal = ({ isOpen, onClose, itemToUpdate, updateAction, type }) => {
  return (
    <Modal show={isOpen} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Update {type} {itemToUpdate.name}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateCPGForm
          itemToUpdate={itemToUpdate}
          updateAction={updateAction}
          onClose={onClose}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-danger' onClick={() => onClose(false)}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateCPGModal