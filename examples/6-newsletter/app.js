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
    await axios.post('/api/6-newsletter', { email })
    form.innerHTML =
      '<h4 class="success">Success! Please check your email </h4>'
  } catch (error) {
    console.log(error.response)
    alert.style.display = 'block'
    alert.textContent = 'Something went wrong. Please try again'
  }
  form.classList.remove('loading')
})
