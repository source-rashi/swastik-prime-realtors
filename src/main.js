import './style.css';
import { initLoader } from './utils/loader.js';
import { initCursor } from './utils/cursor.js';
import { initLenis } from './utils/lenis.js';

initLoader();

document.addEventListener('loaderDone', async () => {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const { initHero }         = await import('./sections/hero.js');
  const { initServices }     = await import('./sections/services.js');
  const { initAIReport }     = await import('./sections/ai-report.js');
  const { initWhyUs }        = await import('./sections/why-us.js');
  const { initTestimonials } = await import('./sections/testimonials.js');
  const { initContact }      = await import('./sections/contact.js');

  initCursor();
  const lenis = initLenis();

  await initHero();
  initServices();
  initAIReport();
  initWhyUs();
  initTestimonials();
  initContact();

  // Navbar scroll shrink
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) {
      nav.style.padding = '18px 64px';
      nav.style.background = 'rgba(247,245,241,0.92)';
      nav.style.backdropFilter = 'blur(16px)';
      nav.style.borderBottomColor = 'var(--cream-mid)';
    } else {
      nav.style.padding = '28px 64px';
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.borderBottomColor = 'transparent';
    }
  });

  // Nav link hover
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('mouseenter', () => a.style.color = 'var(--teal)');
    a.addEventListener('mouseleave', () => a.style.color = 'var(--charcoal-60)');
  });

  // openModal global
  window.openModal = function() {
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = '';
  };
});
