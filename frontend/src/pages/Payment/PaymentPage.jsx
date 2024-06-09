import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { order } = useSelector((state) => state.orders)
  const { subtotal } = useSelector((state) => state.cart)

  useEffect(() => {
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${user.token}` 
      },
      body: JSON.stringify({
        amount: Number(subtotal),
        name: user.name,
        email: user.email,
        order,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [subtotal, user, order])

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  return order ? (
    <div className='d-flex justify-content-center align-items-center align-content-center h-100 w-100 my-3'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  ) : (
    <div className='d-flex justify-content-center my-5'>
      <h3>Please complete full payment process</h3>
    </div>
  )
}