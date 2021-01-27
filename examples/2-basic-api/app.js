const result = document.querySelector('.result')

const fetchData = async () => {
  const { data } = await axios.get('/api/2-basic-api')

  result.innerHTML = data
    .map((item) => {
      const {
        image: { url },
        name,
        price,
      } = item
      return `<article class="product">
      <img
        src="${url}"
        alt="${name}"
      />
      <div class="info">
        <h5>${name}</h5>
        <h5 class="price">$${price}</h5>
      </div>
    </article>`
    })
    .join('')
}

fetchData()
