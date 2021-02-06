const result = document.querySelector('.result')

const fetchData = async () => {
  try {
    // const { data } = await axios.get('/.netlify/functions/1-hello')
    const { data } = await axios.get('/api/1-hello')
    result.textContent = data
  } catch (error) {
    // console.log(error.response)
    result.textContent = error.response.data
  }
}

fetchData()
