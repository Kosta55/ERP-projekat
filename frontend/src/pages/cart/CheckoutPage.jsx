import ShippingInformation from './ShippingInformation'
import useTitle from '../../hooks/useTitle'

const CheckoutPage = () => {
  useTitle('Checkout')

  return (
    <div className='container'>
      <h1 className='display-6 mt-3'>Checkout</h1>
      <div className='row'>
        <div className='col-md-12 mb-3'>
          <ShippingInformation />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage