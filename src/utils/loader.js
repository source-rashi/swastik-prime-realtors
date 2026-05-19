/**
 * CINEMATIC LOADER
 * Full-screen preloader with animated counter and reveal
 */
import gsap from 'gsap';

export function initLoader() {
  const loaderEl = document.getElementById('loader');
  const counterEl = document.getElementById('loader-counter');
  const progressEl = document.getElementById('loader-progress');
  const logoEl = document.getElementById('loader-logo');

  let progress = 0;

  // Simulate asset loading progress
  const interval = setInterval(() => {
    progress += Math.random() * 12;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(revealSite, 400);
    }
    counterEl.textContent = Math.floor(progress).toString().padStart(2, '0');
    progressEl.style.transform = `scaleX(${progress / 100})`;
  }, 80);

  function revealSite() {
    const tl = gsap.timeline();
    tl.to(logoEl, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      .to('#loader-progress-wrap', { opacity: 0, duration: 0.3 }, '<')
      .to(loaderEl, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
      })
      .set(loaderEl, { display: 'none' })
      .call(() => {
        document.dispatchEvent(new CustomEvent('loaderComplete'));
      });
  }
}
