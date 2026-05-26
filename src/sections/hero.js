import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { camera } from '../three/scene.js';

gsap.registerPlugin(ScrollTrigger);

// Camera keyframes for each act
// Each keyframe: { x, y, z, lx, ly } — position + lookAt target
const CAM = {
  act1: { x: 0,   y: 18, z: 42, lx: 10, ly: 5 },   // Wide aerial
  act2: { x: 7,   y: 9,  z: 28, lx: 13, ly: 7 },   // Between buildings
  act3: { x: 14,  y: 6,  z: 18, lx: 16, ly: 10 },  // Close to hero building
};

// ── INTERNAL STATE ───────────────────────────────────────────────
let curAct = -1;
let mouseX = 0, mouseY = 0;

// Smooth camera targets (parallax)
export const camTarget = {
  x: CAM.act1.x,
  y: CAM.act1.y,
  z: CAM.act1.z,
  lx: CAM.act1.lx,
  ly: CAM.act1.ly,
};

export function initHero() {
  // ── Mouse parallax
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── GSAP scroll-driven camera tween
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

  // Act 1 → Act 2 (0 → 0.45 normalized)
  tl.to(camTarget, {
    x: CAM.act2.x,
    y: CAM.act2.y,
    z: CAM.act2.z,
    lx: CAM.act2.lx,
    ly: CAM.act2.ly,
    duration: 1,
    ease: 'power2.inOut',
  }, 0.33)

  // Act 2 → Act 3 (0.45 → 1.0)
  .to(camTarget, {
    x: CAM.act3.x,
    y: CAM.act3.y,
    z: CAM.act3.z,
    lx: CAM.act3.lx,
    ly: CAM.act3.ly,
    duration: 1,
    ease: 'power2.inOut',
  }, 0.67);

  // ── Entrance animation (runs once after loader)
  gsap.set('#act1', { y: 30 });
  gsap.set('#stats-bar', { opacity: 0, y: 20 });
  gsap.set('#scroll-cue', { opacity: 0 });

  gsap.to('#act1', { opacity: 1, y: 0, duration: 1.3, ease: 'power4.out', delay: 0.3 });
  gsap.to('#stats-bar', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 });
  gsap.to('#scroll-cue', { opacity: 1, duration: 0.8, delay: 1.8 });
}

// ── ACT SWITCHING ────────────────────────────────────────────────
function updateAct(progress) {
  const newAct = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
  if (newAct === curAct) return;
  curAct = newAct;

  // Fade all panels out
  ['act1', 'act2', 'act3'].forEach(id => {
    gsap.to(`#${id}`, { opacity: 0, y: -22, duration: 0.4, ease: 'power2.in' });
  });

  // Fade new panel in
  const panels = ['act1', 'act2', 'act3'];
  gsap.set(`#${panels[newAct]}`, { y: 26 });
  gsap.to(`#${panels[newAct]}`, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.25 });

  // Update dots
  document.querySelectorAll('.act-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === newAct);
  });

  // Property card — only in Act 3
  if (newAct === 2) {
    gsap.to('#hero-card', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    gsap.to('#scroll-cue', { opacity: 0, duration: 0.4 });
  } else {
    gsap.to('#hero-card', { opacity: 0, x: 40, duration: 0.45, ease: 'power2.in' });
    if (newAct < 2) gsap.to('#scroll-cue', { opacity: 1, duration: 0.5 });
  }
}

// ── SCROLL PROGRESS BAR ──────────────────────────────────────────
function updateScrollProgress(p) {
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = (p * 100) + '%';
}

// ── TICK (called every frame from main loop) ─────────────────────
export function tickHero() {
  // Smooth parallax offset on top of scroll-driven position
  const parallaxX = mouseX * 1.8;
  const parallaxY = -mouseY * 1.2;

  camera.position.x += (camTarget.x + parallaxX - camera.position.x) * 0.055;
  camera.position.y += (camTarget.y + parallaxY - camera.position.y) * 0.055;
  camera.position.z += (camTarget.z - camera.position.z) * 0.055;
  camera.lookAt(camTarget.lx, camTarget.ly, 0);
}
