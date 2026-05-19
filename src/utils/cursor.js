/**
 * MAGNETIC CUSTOM CURSOR
 * Gold dot + lagging ring + magnetic pull on interactive elements
 */
import gsap from 'gsap';

export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isHovering = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Magnetic hover on buttons and links
  document.querySelectorAll('button, a, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const type = el.dataset.cursor || 'hover';
      isHovering = true;

      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(201,168,76,0.9)';
      ring.style.background = 'rgba(201,168,76,0.08)';
      dot.style.opacity = '0';

      if (type === 'view') {
        label.textContent = 'VIEW';
        label.style.opacity = '1';
      } else if (type === 'drag') {
        label.textContent = 'DRAG';
        label.style.opacity = '1';
      } else if (type === 'play') {
        label.textContent = 'PLAY';
        label.style.opacity = '1';
      }
    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(201,168,76,0.5)';
      ring.style.background = 'transparent';
      dot.style.opacity = '1';
      label.style.opacity = '0';
    });

    // Magnetic pull effect
    el.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}
