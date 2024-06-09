import { useState } from 'react'
import { deletePublisher, updatePublisher } from '../../../redux/publishers/publisherActions'
import UpdateCPGModal from '../../modals/UpdateCPGModal'
import DeleteModal from '../../modals/DeleteModal'

const PublisherItem = ({ publisher }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <td>{publisher?.name}</td>
      <td style={{ cursor: 'pointer' }}>
        <i 
          className='fas fa-pencil-alt text-dark' 
          onClick={() => setIsOpenUpdateModal(true)}>
        </i>
        <i 
          className='fas fa-trash text-danger mx-3' 
          onClick={() => setIsOpenDeleteModal(true)}>
        </i>
      </td>

      {isOpenUpdateModal && (
        <UpdateCPGModal
          isOpen={isOpenUpdateModal}
          onClose={setIsOpenUpdateModal}
          itemToUpdate={publisher}
          updateAction={updatePublisher}
          type='Publisher'
        />
      )}

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          deleteAction={deletePublisher}
          itemToDelete={publisher}
        />
      )}
    </>
  )
}

export default PublisherItem