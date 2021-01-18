require('dotenv').config()
const axios = require('axios')
const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&&appid=${process.env.OPEN_WEATHER_API_KEY}&q=`
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'Please Provide The City Name in POST Request',
    }
  }

  const { city } = JSON.parse(event.body)
  try {
    const resp = await axios.get(`${url}${city}`)
    return {
      statusCode: 200,
      body: JSON.stringify(resp.data),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
    }
  }
}
