const form = document.querySelector('.form')
const emailInput = document.querySelector('.email-input')
const alert = document.querySelector('.alert')
alert.style.display = 'none'
form.addEventListener('submit', async function (e) {
  e.preventDefault()
  form.classList.add('loading')
  alert.style.display = 'none'
  const email = emailInput.value
  try {
    await axios.post('/api/6-newsletter', {
      email,
    })
    form.classList.remove('loading')
    form.innerHTML = `<h4 class="success">Success! Please check your email</h4>`
  } catch (error) {
    // console.log(error.response.data)
    alert.style.display = 'block'
    form.classList.remove('loading')
    // alert.textContent = error.response.data[0]
    alert.textContent = 'Something went wrong. Please try again'
  }
})
