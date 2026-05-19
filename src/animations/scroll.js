// src/animations/scroll.js — Scroll-driven animations
import { gsap, ScrollTrigger } from './gsap.config.js'

export function initScrollAnimations() {
  // Fade-in sections
  gsap.utils.toArray('.section').forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 20%',
        scrub: 1
      },
      opacity: 0,
      y: 60,
      duration: 1
    })
  })

  console.log('[Scroll] Animations initialized')
}
