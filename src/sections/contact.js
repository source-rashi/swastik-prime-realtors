// src/sections/contact.js
export function initContact() {
  const form = document.getElementById('contact-form')
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log('[Contact] Form submitted')
    })
  }
  console.log('[Section] Contact initialized')
}
