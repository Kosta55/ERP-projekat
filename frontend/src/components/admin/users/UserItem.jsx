import { useState } from 'react'
import { formatDate } from '../../../utils/utils'
import { deleteUser } from '../../../redux/users/userActions'
import UpdateUserModal from '../../modals/UpdateUserModal'
import DeleteModal from '../../modals/DeleteModal'

const UserItem = ({ user }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <td className='align-middle fw-semibold'>{user?.name}</td>
      <td className='align-middle'>{user?.email}</td>
      <td className='align-middle'>
        {user?.isAdmin  
              ? <i className='fas fa-check text-success'></i> 
              : <i className='fas fa-times text-danger'></i>
        }
      </td>
      <td className='align-middle'>{formatDate(user?.createdAt)}</td>
      <td style={{ cursor: 'pointer' }} className='align-middle'>
        <i
          className='fas fa-pencil-alt text-dark'
          onClick={() => setIsOpenUpdateModal(true)}
        >  
        </i>
        <i 
          hidden={user.isAdmin}
          className='fas fa-trash text-danger mx-3'
          onClick={() => setIsOpenDeleteModal(true)}
        ></i>
      </td>

      {isOpenUpdateModal && (
        <UpdateUserModal
          isOpen={isOpenUpdateModal}
          onClose={setIsOpenUpdateModal}
          userToUpdate={user}
        />
      )}

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          deleteAction={deleteUser}
          itemToDelete={user}
        />
      )}
    </>
  )
}

export default UserItem