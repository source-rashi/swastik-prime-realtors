import './style.css';
import * as THREE from 'three';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScene, renderer, scene, camera, tickScene } from './three/scene.js';
import { initHero, tickHero } from './sections/hero.js';

gsap.registerPlugin(ScrollTrigger);

// ── LOADER ────────────────────────────────────────────────────────
;(function loader() {
  const loaderEl = document.getElementById('loader');
  const barEl    = document.getElementById('loader-bar');
  const pctEl    = document.getElementById('loader-pct');
  let p = 0;

  const tick = setInterval(() => {
    p += Math.random() * 14;
    if (p >= 100) {
      p = 100;
      clearInterval(tick);
      setTimeout(boot, 300);
    }
    barEl.style.width = p + '%';
    pctEl.textContent = Math.floor(p).toString().padStart(2, '0') + '%';
  }, 65);

  async function boot() {
    // Slide loader away
    gsap.to(loaderEl, {
      yPercent: -100,
      duration: 1.1,
      ease: 'power4.inOut',
      onComplete: () => { loaderEl.style.display = 'none'; }
    });

    // Init scene — append canvas to hero-sticky
    const heroSticky = document.getElementById('hero-sticky');
    initScene(heroSticky);

    // Init hero scroll system
    initHero();

    // Init Lenis
    const lenis = new Lenis({ duration: 1.35, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // Cursor
    initCursor();

    // Navbar
    initNav();

    // Lazy-load remaining sections
    const { initServices }     = await import('./sections/services.js');
    const { initAIReport }     = await import('./sections/ai-report.js');
    const { initWhyUs }        = await import('./sections/why-us.js');
    const { initTestimonials } = await import('./sections/testimonials.js');
    const { initContact }      = await import('./sections/contact.js');

    initServices();
    initAIReport();
    initWhyUs();
    initTestimonials();
    initContact();

    // Scroll reveals — batch
    ScrollTrigger.batch('.will-up', {
      onEnter: els => gsap.to(els, { opacity:1, y:0, duration:0.85, ease:'power3.out', stagger:0.1 }),
      start: 'top 85%',
    });
    ScrollTrigger.batch('.will-left', {
      onEnter: els => gsap.to(els, { opacity:1, x:0, duration:0.85, ease:'power3.out', stagger:0.1 }),
      start: 'top 85%',
    });
    ScrollTrigger.batch('.will-right', {
      onEnter: els => gsap.to(els, { opacity:1, x:0, duration:0.85, ease:'power3.out', stagger:0.1 }),
      start: 'top 85%',
    });
    ScrollTrigger.batch('.will-fade', {
      onEnter: els => gsap.to(els, { opacity:1, duration:0.85, ease:'power3.out', stagger:0.1 }),
      start: 'top 85%',
    });

    // Render loop
    const clock = new THREE.Clock();
    function frame() {
      requestAnimationFrame(frame);
      const t = clock.getElapsedTime();
      tickScene(t);
      tickHero();
      renderer.render(scene, camera);
    }
    frame();
  }
})();

// ── CURSOR ────────────────────────────────────────────────────────
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  ;(function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '54px';
      ring.style.height = '54px';
      ring.style.borderColor = 'rgba(200,169,110,0.85)';
      ring.style.background  = 'rgba(200,169,110,0.07)';
      dot.style.opacity = '0';
      gsap.to(el, { x: 0, y: 0, duration: 0 });
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '38px';
      ring.style.height = '38px';
      ring.style.borderColor = 'rgba(200,169,110,0.45)';
      ring.style.background  = 'transparent';
      dot.style.opacity = '1';
      gsap.to(el, { x:0, y:0, duration:0.5, ease:'elastic.out(1,0.5)' });
    });
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width  / 2) * 0.18,
        y: (e.clientY - r.top  - r.height / 2) * 0.18,
        duration: 0.35, ease: 'power2.out',
      });
    });
  });
}

// ── NAV ──────────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  document.querySelectorAll('.nav-list a').forEach(a => {
    a.addEventListener('mouseenter', () => a.style.color = 'var(--gold)');
    a.addEventListener('mouseleave', () => a.style.color = 'var(--cream-30)');
  });

  // Sell button opens modal
  document.getElementById('nav-sell-btn')?.addEventListener('click', () => {
    window.openModal?.();
  });
}

// Expose for inline onclick
window.openModal  = () => { const m=document.getElementById('modal'); if(m){m.style.display='flex'; document.body.style.overflow='hidden'; } };
window.closeModal = () => { const m=document.getElementById('modal'); if(m){m.style.display='none';  document.body.style.overflow=''; } };
