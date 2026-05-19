// src/animations/gsap.config.js — GSAP + ScrollTrigger Setup
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initGSAP() {
  gsap.registerPlugin(ScrollTrigger)

  gsap.defaults({
    ease: 'power3.out',
    duration: 1
  })

  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    start: 'top 80%',
    end: 'bottom 20%'
  })

  console.log('[GSAP] Initialized with ScrollTrigger')
}

export { gsap, ScrollTrigger }
