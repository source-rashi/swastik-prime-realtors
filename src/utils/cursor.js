import { gsap } from 'gsap';

export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    label.style.left = rx + 'px';
    label.style.top = (ry + 28) + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('button, a, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const type = el.dataset.cursor;
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(45,91,90,0.7)';
      ring.style.background = 'rgba(45,91,90,0.06)';
      dot.style.opacity = '0';
      if (type) { label.textContent = type.toUpperCase(); label.style.opacity = '1'; }
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(45,91,90,0.4)';
      ring.style.background = 'transparent';
      dot.style.opacity = '1';
      label.style.opacity = '0';
    });
    // Magnetic pull
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width/2) * 0.2, y: (e.clientY - r.top - r.height/2) * 0.2, duration: 0.35, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });
}
