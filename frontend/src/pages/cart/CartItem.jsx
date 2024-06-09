import { useDispatch } from 'react-redux'
import { addToCart, removeCartItem } from '../../redux/cart/cartActions'

const CartItem = ({ cartItem }) => {
  const { productId, name, image, price, countInStock, quantity } = cartItem

  const dispatch = useDispatch()

  return (
    <div className='card mt-2'>
      <div className='card-header'>
        <div className='d-flex justify-content-end'>
          <div className='d-flex justify-content-end'>
            <i
              data-bs-toggle='tooltip'
              title='Remove item'
              className='fas fa-times text-danger'
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(removeCartItem(productId))}
            ></i>
          </div>
        </div>
      </div>
      <div className='card-body'>
        <table className='table table-image'>
          <thead className='text-center'>
            <tr>
              <th scope='col'>IMAGE</th>
              <th scope='col'>NAME</th>
              <th scope='col'>QUANTITY</th>
              <th scope='col'>PRICE</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td className='w-25'>
                <img src={image} alt={name} width='80px' height='80px' />
              </td>
              <td className='align-middle w-25'>
                <span>{name}</span>
              </td>
              <td className='align-middle w-25'>
                <select
                  className='form-select text-center'
                  value={quantity}
                  onChange={(e) => {
                    dispatch(addToCart(productId, e.target.value))
                  }}
                >
                  {[...Array(countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td className='align-middle w-25'>
                <strong>${price}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CartItem