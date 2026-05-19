import './style.css';
import { initLoader } from './utils/loader.js';
import { initCursor } from './utils/cursor.js';
import { initLenis } from './utils/lenis.js';

// Initialize loader immediately
initLoader();

// After loader completes, boot everything else
document.addEventListener('loaderComplete', async () => {
  const { initScene } = await import('./three/scene.js');
  const { initHero } = await import('./sections/hero.js');
  const { initServices } = await import('./sections/services.js');
  const { initAIReport } = await import('./sections/ai-report.js');
  const { initWhyUs } = await import('./sections/why-us.js');
  const { initTestimonials } = await import('./sections/testimonials.js');
  const { initContact } = await import('./sections/contact.js');
  const { initAudio } = await import('./audio/ambient.js');

  initCursor();
  const lenis = initLenis();

  initScene();
  initHero();
  initServices();
  initAIReport();
  initWhyUs();
  initTestimonials();
  initContact();

  // Audio — user must interact first
  document.addEventListener('click', () => initAudio(), { once: true });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(5,8,16,0.85)';
      nav.style.backdropFilter = 'blur(24px)';
      nav.style.padding = '16px 60px';
      nav.style.borderBottom = '1px solid rgba(201,168,76,0.1)';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.padding = '24px 60px';
      nav.style.borderBottom = 'none';
    }
  });
});
