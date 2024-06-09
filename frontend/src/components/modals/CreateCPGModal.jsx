import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateCPGForm from '../forms/create-forms/CreateCPGForm'

const CreateCPGModal = ({ isOpen, onClose, type, createAction }) => {
  return (
    <Modal
      show={isOpen}
      onHide={() => onClose(false)}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateCPGForm
          createAction={createAction}
          type={type}
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

export default CreateCPGModal