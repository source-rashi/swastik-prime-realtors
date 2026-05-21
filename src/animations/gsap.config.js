import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  markers: false,
});

// Batch reveal for generic [data-reveal-batch] elements throughout the page
ScrollTrigger.batch('[data-reveal-batch]', {
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
    });
  },
  start: 'top 85%',
});

export { gsap, ScrollTrigger };
