import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from 'countries-list'
import { setShippingAddress } from '../../redux/orders/orderActions'
import { toast } from 'react-hot-toast'

const ShippingInformation = () => {
  const { shippingAddress } = useSelector((state) => state.orders)

  const countriesList = Object.values(countries)
  const [buttonLoading, setButtonLoading] = useState(false)

  const [name, setName] = useState(shippingAddress?.name || '')
  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createShippingAddressHandler = (e) => {
    e.preventDefault()

    const shippingAddressData = {
      name,
      address,
      city,
      phoneNumber,
      postalCode,
      country
    }

    if (!name) return toast.error('Name is required')
    if (!address) return toast.error('Address is required')
    if (!city) return toast.error('City is required')
    if (!phoneNumber) return toast.error('Phone Number is required')
    if (!postalCode) return toast.error('Postal Code is required')
    if (!country) return toast.error('Country is required')

    dispatch(setShippingAddress(shippingAddressData))

    setButtonLoading(true)

    setTimeout(() => {
      navigate('/order-summary')
    }, 800)
  }

  return (
    <>
      <form onSubmit={createShippingAddressHandler}>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-truck'></i> Shipping Infomation
          </div>
          <div className='card-body'>
            <div className='row g-3'>
              <div className='col-md-12'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Addresss'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Phone +381XXXXXXXX'
                  maxLength={13}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='postalCode'>Postal Code</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Postal Code'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className='col-md-4'>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className='col-md-4'>
                <label htmlFor='country'>Country</label>
                <select
                  className='form-select'
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {shippingAddress?.country ? (
                    <option>{shippingAddress?.country}</option>
                  ) : (
                    <option value>-- Country --</option>
                  )}
                  {countriesList.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='d-flex justify-content-end'>
                {buttonLoading ? (
                  <button className='btn btn-dark' type='button' disabled>
                    <span
                      className='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  </button>
                ) : (
                  <button className='btn btn-dark' type='submit'>
                    Go to Order Summary
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ShippingInformation
