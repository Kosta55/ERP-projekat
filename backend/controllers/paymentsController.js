import Stripe from 'stripe'
import { updateOrderToPaid } from './ordersController.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

let order

const createPaymentIntent = async (req, res) => {
  const { amount, email, name } = req.body

  order = req.body.order

  const customer = await stripe.customers.create({
    name: name,
    email: email,
  })

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}

const webhook = async (req, res) => {
  let endpointSecret = process.env.WEBHOOK_SECRET
  let event = req.body
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature']

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      )
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message)
      return res.status(400).send(`⚠️ Webhook Error: ${err.message}`)
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    console.log(`PaymentIntent for $${paymentIntent.amount / 100} was successful!`)
    updateOrderToPaid(order, paymentIntent)
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntentFailed = event.data.object
    console.log(`PaymentIntent for $${paymentIntentFailed.amount / 100} failed!`)
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send()
}

export { createPaymentIntent, webhook }
