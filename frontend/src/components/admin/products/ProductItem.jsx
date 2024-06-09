import { useState } from 'react'
import { deleteProduct } from '../../../redux/products/productActions'
import { Link } from 'react-router-dom'
import DeleteModal from '../../modals/DeleteModal'
import UpdateProductModal from '../../modals/UpdateProductModal'

const ProductItem = ({ product }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  return (
    <>
      <td className='align-middle'>
        <img className='img-fluid rounded' width='75px' height='75px' src={product.image} alt={product.name} />
      </td>
      <td className='align-middle text-wrap fw-semibold'>
        <Link className='text-decoration-none text-dark' to={`/product/${product._id}`}>  {product.name}
        </Link>
      </td>
      <td className='align-middle'>{product.author}</td>
      <td className='align-middle'>${product.price}</td>
      <td className='align-middle'>
        {product.countInStock <= 0 
          ? <span className='badge bg-danger me-2'>Out of Stock</span> 
          : <span className='badge bg-dark me-2'>{product.countInStock}</span>}
      </td>
      <td className='align-middle'>
        {product.isNewProduct 
          ? <span className='badge bg-success me-2'>New</span> 
          : <span className='badge bg-danger me-2'>Old</span>}
      </td>
      <td style={{ cursor: 'pointer' }} className='align-middle'>
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
        <UpdateProductModal
          isOpen={isOpenUpdateModal}
          onClose={setIsOpenUpdateModal}
          productToUpdate={product}
        />
      )}

      {isOpenDeleteModal && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          onClose={setIsOpenDeleteModal}
          deleteAction={deleteProduct}
          itemToDelete={product}
        />
      )}
    </>
  )
}

export default ProductItem