require('dotenv').config()
const mailgun = require('mailgun-js')

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 400,
      body: 'Accepts only POST requests',
    }
  }
  const { name, email, subject, message } = JSON.parse(event.body)
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: 'Please Provide All Values',
    }
  }
  const data = {
    from: 'John Doe <learncodetutorial@mail.com>',
    to: `${name} <${email}>`,
    subject: subject,
    text: message,
  }

  try {
    await mg.messages().send(data)
    return {
      statusCode: 200,
      body: 'Success',
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    }
  }
}
