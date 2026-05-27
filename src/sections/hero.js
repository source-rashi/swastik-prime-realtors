import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { camera } from '../three/scene.js';

gsap.registerPlugin(ScrollTrigger);

const CAM = {
  act1: { x: 0,  y: 22, z: 52, lx: 10, ly: 5  },
  act2: { x: 6,  y: 11, z: 36, lx: 13, ly: 7  },
  act3: { x: 13, y: 7,  z: 22, lx: 16, ly: 10 },
};

export const camTarget = {
  x: CAM.act1.x, y: CAM.act1.y, z: CAM.act1.z,
  lx: CAM.act1.lx, ly: CAM.act1.ly,
};

let curAct = 0; // Start at 0, not -1
let mouseX = 0, mouseY = 0;

export function initHero() {
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── SCROLL camera tween
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-pin-spacer',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      onUpdate(self) {
        updateAct(self.progress);
        updateScrollProgress(self.progress);
      },
    },
  });

  tl.to(camTarget, {
    x: CAM.act2.x, y: CAM.act2.y, z: CAM.act2.z,
    lx: CAM.act2.lx, ly: CAM.act2.ly,
    duration: 1, ease: 'power2.inOut',
  }, 0.33)
  .to(camTarget, {
    x: CAM.act3.x, y: CAM.act3.y, z: CAM.act3.z,
    lx: CAM.act3.lx, ly: CAM.act3.ly,
    duration: 1, ease: 'power2.inOut',
  }, 0.67);

  // ── ENTRANCE: act1 is already opacity:1 in HTML.
  // Just animate it up from below.
  gsap.set('#act1', { opacity: 1, y: 30 });
  gsap.set(['#act2', '#act3', '#hero-card'], { opacity: 0 });
  gsap.set('#stats-bar', { opacity: 0, y: 20 });
  gsap.set('#scroll-cue', { opacity: 0 });

  gsap.to('#act1',      { y: 0, duration: 1.3, ease: 'power4.out', delay: 0.4 });
  gsap.to('#stats-bar', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 });
  gsap.to('#scroll-cue',{ opacity: 1, duration: 0.8, delay: 1.9 });
}

function updateAct(progress) {
  const newAct = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
  if (newAct === curAct) return; // Only run on actual change
  curAct = newAct;

  const panels = ['act1', 'act2', 'act3'];

  // Fade ALL out
  panels.forEach(id => {
    gsap.to(`#${id}`, { opacity: 0, y: -20, duration: 0.38, ease: 'power2.in' });
  });

  // Fade new one in with a slight delay so out finishes first
  gsap.set(`#${panels[newAct]}`, { y: 24 });
  gsap.to(`#${panels[newAct]}`, {
    opacity: 1, y: 0,
    duration: 0.7, ease: 'power3.out',
    delay: 0.28,
  });

  // Dots
  document.querySelectorAll('.act-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === newAct);
  });

  // Card: only in Act 3
  if (newAct === 2) {
    gsap.to('#hero-card',  { opacity: 1, x: 0,  duration: 0.85, ease: 'power3.out', delay: 0.35 });
    gsap.to('#scroll-cue', { opacity: 0, duration: 0.35 });
  } else {
    gsap.to('#hero-card',  { opacity: 0, x: 40, duration: 0.38, ease: 'power2.in' });
    gsap.to('#scroll-cue', { opacity: 1, duration: 0.5, delay: 0.3 });
  }
}

function updateScrollProgress(p) {
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = (p * 100) + '%';
}

export function tickHero() {
  camera.position.x += (camTarget.x + mouseX * 1.8 - camera.position.x) * 0.055;
  camera.position.y += (camTarget.y - mouseY * 1.2 - camera.position.y) * 0.055;
  camera.position.z += (camTarget.z - camera.position.z)                 * 0.055;
  camera.lookAt(camTarget.lx, camTarget.ly, 0);
}
