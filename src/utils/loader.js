import { gsap } from 'gsap';

export function initLoader() {
  const loader = document.getElementById('loader');
  const line = document.getElementById('loader-line');
  const pct = document.getElementById('loader-pct');
  let p = 0;

  const tick = setInterval(() => {
    p += Math.random() * 14;
    if (p >= 100) { p = 100; clearInterval(tick); setTimeout(reveal, 300); }
    line.style.width = p + '%';
    pct.textContent = Math.floor(p).toString().padStart(2,'0') + '%';
  }, 70);

  function reveal() {
    gsap.to(loader, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        document.dispatchEvent(new CustomEvent('loaderDone'));
      }
    });
  }
}
