import { useState } from 'react'
import { deleteCategory, updateCategory } from '../../../redux/categories/categoryActions'
import UpdateCPGModal from '../../modals/UpdateCPGModal'
import DeleteModal from '../../modals/DeleteModal'

const CategoryItem = ({ category }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <td>{category.name}</td>
      <td style={{ cursor: 'pointer' }}>
        <i
          className='fas fa-pencil-alt text-dark'
          onClick={() => setIsOpenUpdateModal(true)}
        ></i>
        <i
          className='fas fa-trash text-danger mx-3'
          onClick={() => setIsOpenDeleteModal(true)}
        ></i>
      </td>

      {isOpenUpdateModal && (
        <UpdateCPGModal
          isOpen={isOpenUpdateModal}
          onClose={setIsOpenUpdateModal}
          itemToUpdate={category}
          updateAction={updateCategory}
          type='Category'
        />
      )}

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          deleteAction={deleteCategory}
          itemToDelete={category}
        />
      )}
    </>
  )
}

export default CategoryItem