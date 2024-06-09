import { useState } from 'react'
import { formatDate } from '../../../utils/utils'
import { Link } from 'react-router-dom'
import { deleteOrder } from '../../../redux/orders/orderActions'
import DeleteModal from '../../modals/DeleteModal'

const OrderItem = ({ order }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <td className='align-middle'>{formatDate(order.createdAt)}</td>
      <td className='align-middle text-wrap fw-semibold'>{order.shippingAddress.name}</td>
      <td className='align-middle'>{order?.user.email}</td>
      <td className='align-middle'>
        {order?.isPaid  
              ? <i className='fas fa-check text-success'></i> 
              : <i className='fas fa-times text-danger'></i>
        }
      </td>
      <td className='align-middle'>
        {order?.isDelivered  
              ? <i className='fas fa-check text-success'></i> 
              : <i className='fas fa-times text-danger'></i>
        }
      </td>
      <td className='align-middle fw-semibold'>${order?.totalPrice}</td>
      <td style={{ cursor: 'pointer' }} className='align-middle'>
        <Link to={`/admin/order/${order._id}`}>
          <i 
            className='fas fa-eye text-primary' 
            data-bs-toggle="tooltip" 
            title='View Order'>
          </i>
        </Link>
          <i 
            data-bs-toggle="tooltip" title='Delete Order'
            className='fas fa-trash text-danger mx-3'
            onClick={() => setIsOpenDeleteModal(true)}>
          </i>
      </td>

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          itemToDelete={order}
          deleteAction={deleteOrder}
        />
      )}
    </>
  )
}

export default OrderItem