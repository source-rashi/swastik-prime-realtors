import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  const lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });

  lenis.on('scroll', ScrollTrigger.update);
  lenis.on('scroll', ({ progress }) => {
    const fill = document.getElementById('scroll-bar-fill');
    if (fill) fill.style.width = (progress * 100) + '%';
  });

  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
