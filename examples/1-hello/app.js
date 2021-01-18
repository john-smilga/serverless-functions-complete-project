const result = document.querySelector('.result')

const fetchData = async () => {
  const { data } = await axios.get('/.netlify/functions/1-hello')
  result.textContent = data
}

fetchData()
