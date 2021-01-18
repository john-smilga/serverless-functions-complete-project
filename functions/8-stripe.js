require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)
exports.handler = async function (event, context) {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: '400',
      body: 'Only accepts post requests',
    }
  }
  const { purchase, total_amount, shipping_fee } = JSON.parse(event.body)

  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return shipping_fee + total_amount
  }
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'usd',
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
