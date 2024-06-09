import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateProductForm from '../forms/create-forms/CreateProductForm'

const CreateProductModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      show={isOpen}
      onHide={() => onClose(false)}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateProductForm onClose={onClose} />
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-danger' onClick={() => onClose(false)}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateProductModal