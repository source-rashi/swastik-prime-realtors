// src/utils/loader.js — Preloader
import gsap from 'gsap'

export function initLoader() {
  const loader = document.getElementById('loader')
  const progress = document.querySelector('.loader-progress')
  let value = 0

  const interval = setInterval(() => {
    value += Math.random() * 15
    if (value > 100) value = 100
    if (progress) progress.style.width = value + '%'
    if (value >= 100) clearInterval(interval)
  }, 100)

  return {
    complete() {
      if (progress) progress.style.width = '100%'
      clearInterval(interval)

      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loader) loader.style.display = 'none'
        }
      })
    }
  }
}
