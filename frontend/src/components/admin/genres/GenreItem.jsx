import { useState } from 'react'
import { deleteGenre, updateGenre } from '../../../redux/genres/genreActions'
import UpdateCPGModal from '../../modals/UpdateCPGModal'
import DeleteModal from '../../modals/DeleteModal'

const GenreItem = ({ genre }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <td>{genre?.name}</td>
      <td style={{ cursor: 'pointer' }}>
          <i className='fas fa-pencil-alt text-dark' onClick={() => setIsOpenUpdateModal(true)}></i>
        <i className='fas fa-trash text-danger mx-3' onClick={() => setIsOpenDeleteModal(true)}></i>
      </td>

      {isOpenUpdateModal && (
        <UpdateCPGModal
          isOpen={isOpenUpdateModal}
          onClose={setIsOpenUpdateModal}
          itemToUpdate={genre}
          updateAction={updateGenre}
          type='Genre'
        />
      )}

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          deleteAction={deleteGenre}
          itemToDelete={genre}
        />
      )}

    </>
  )
}

export default GenreItem