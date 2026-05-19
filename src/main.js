// src/main.js — Entry Point
import './style.css'
import { initScene } from './three/scene.js'
import { initParticles } from './three/particles.js'
import { initGSAP } from './animations/gsap.config.js'
import { initScrollAnimations } from './animations/scroll.js'
import { initAmbientAudio } from './audio/ambient.js'
import { initHero } from './sections/hero.js'
import { initServices } from './sections/services.js'
import { initAIReport } from './sections/ai-report.js'
import { initWhyUs } from './sections/why-us.js'
import { initTestimonials } from './sections/testimonials.js'
import { initContact } from './sections/contact.js'
import { initCursor } from './utils/cursor.js'
import { initLoader } from './utils/loader.js'
import { initLenis } from './utils/lenis.js'

async function bootstrap() {
  // Phase 1: Loader
  const loader = initLoader()

  // Phase 2: Core systems
  initCursor()
  const scene = initScene()
  initParticles(scene)

  // Phase 3: Animations
  initGSAP()
  initLenis()

  // Phase 4: Sections
  initHero()
  initServices()
  initAIReport()
  initWhyUs()
  initTestimonials()
  initContact()

  // Phase 5: Scroll-driven
  initScrollAnimations()

  // Phase 6: Audio (user-initiated)
  initAmbientAudio()

  // Phase 7: Remove loader
  loader.complete()
}

bootstrap()
