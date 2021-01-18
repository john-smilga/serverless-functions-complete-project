require('dotenv').config()
const Airtable = require('airtable-node')
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appRpwOOjOyiPQHi9')
  .table('survey')

exports.handler = async (event, context) => {
  const method = event.httpMethod
  // Get Survey Results
  if (method === 'GET') {
    try {
      const { records } = await airtable.list()
      const survey = records.map((item) => {
        const { id } = item
        const { room, votes } = item.fields
        return { id, room, votes }
      })
      return {
        statusCode: 200,
        body: JSON.stringify(survey),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Server Error',
      }
    }
  }
  // PUT RESPONSE
  if (method === 'PUT') {
    try {
      const { id, votes } = JSON.parse(event.body)
      if (!id || !votes) {
        return {
          statusCode: 400,
          body: 'Please provide id and votes values',
        }
      }
      const fields = {
        votes: Number(votes) + 1,
      }
      const item = await airtable.update(id, { fields })

      if (item.error) {
        return {
          statusCode: 400,
          body: JSON.stringify(item),
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: 'Please provide id and votes values',
      }
    }
  }
  // Default Response
  return {
    statusCode: 400,
    body: 'Only GET and PUT Requests Allowed',
  }
}
