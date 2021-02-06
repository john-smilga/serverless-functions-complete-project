require('dotenv').config()
const axios = require('axios')
const url = 'https://api.buttondown.email/v1/subscribers'

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST Requests Allowed',
    }
  }
  const { email } = JSON.parse(event.body)
  if (!email) {
    return {
      statusCode: 400,
      body: 'Please provide email value',
    }
  }
  try {
    const data = await axios.post(
      url,
      { email },
      {
        headers: {
          Authorization: `Token ${process.env.EMAIL_KEY}`,
        },
      }
    )
    console.log(data)
    return {
      statusCode: 201,
      body: 'Success',
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.response.data),
    }
  }
}
