const result = document.querySelector('.result')

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading...</h2>`

  try {
    // const id = '?id=1'
    const id = window.location.search
    const {
      data: { fields },
    } = await axios.get(`/api/3-z-complete${id}`)
    const { name, desc, price, image } = fields
    result.innerHTML = `<h1>${name}</h1>
  <article class="product">
    <img class="product-img"
    src="${image[0].url}"
    alt="${name}"
    />
    <div class="product-info">
      <h5 >${name}</h5>
      <h5 class="price">$${price}</h5>
      <p >${desc}</p>
    </div>
  </article>`
  } catch (error) {
    console.log(error.response)
    result.innerHTML = `<h2>${error.response.data}</h2>`
  }
}

fetchProduct()
