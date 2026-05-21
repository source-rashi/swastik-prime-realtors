import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    title: '5+ Years of Expertise',
    text: "Deep-rooted knowledge of Central India's real estate micro-markets — Indore, Bhopal, Jabalpur, and beyond.",
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    title: 'Clifton Group &amp; NRK Group',
    text: "Trusted by India's leading corporate conglomerates for land acquisition, warehousing, and built-to-suit projects.",
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    title: 'Swastik Group Backbone',
    text: "Backed by Swastik Group's EPC division, private freight terminal, and logistics network — end-to-end capability.",
  },
  {
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
    title: 'Timely Delivery',
    text: 'Zero-delay project timelines backed by in-house construction and project management expertise.',
  },
];

const STATS = [
  { num: 500, suffix: '+', label: 'Projects Advised', sublabel: 'Across Central India', prefix: '' },
  { num: 5, suffix: '+', label: 'Years Expertise', sublabel: 'Deep market roots', prefix: '' },
  { num: 200, suffix: 'Cr+', label: 'Deals Closed', sublabel: 'Total value advised', prefix: '₹' },
  { num: 50, suffix: '+', label: 'Corporate Clients', sublabel: 'Including Fortune 500', prefix: '' },
];

function buildFeatureRows() {
  return FEATURES.map(function(f, i) {
    return '<div class="feature-row" style="' +
      'display:flex;gap:20px;align-items:flex-start;' +
      'opacity:0;transform:translateX(-30px);' +
      '" data-feature-index="' + i + '">' +
      '<div style="' +
        'width:44px;height:44px;flex-shrink:0;' +
        'border:1px solid rgba(201,168,76,0.2);' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:var(--gold);' +
        'transition:all 0.3s ease;' +
      '">' +
        f.icon +
      '</div>' +
      '<div>' +
        '<div style="font-family:var(--font-display);font-size:20px;font-weight:600;color:var(--white);margin-bottom:6px;">' + f.title + '</div>' +
        '<p style="font-size:14px;color:rgba(245,245,240,0.45);line-height:1.75;">' + f.text + '</p>' +
      '</div>' +
    '</div>';
  }).join('');
}

function buildStatCards() {
  return STATS.map(function(s, i) {
    return '<div class="stat-card glass-card" style="' +
      'padding:36px 28px;opacity:0;transform:translateY(30px);' +
      '" data-stat-index="' + i + '">' +
      '<div style="' +
        'font-family:var(--font-display);font-size:48px;font-weight:600;' +
        'color:var(--gold);line-height:1;margin-bottom:12px;' +
      '">' +
        '<span style="font-size:24px;">' + s.prefix + '</span>' +
        '<span class="count-num" data-target="' + s.num + '" data-suffix="' + s.suffix + '">0</span>' + s.suffix +
      '</div>' +
      '<div style="font-family:var(--font-display);font-size:16px;font-weight:600;color:var(--white);margin-bottom:6px;">' + s.label + '</div>' +
      '<div class="t-label">' + s.sublabel + '</div>' +
      '<div style="margin-top:20px;width:40px;height:2px;background:linear-gradient(90deg,var(--gold),transparent);"></div>' +
    '</div>';
  }).join('');
}

export function initWhyUs() {
  const section = document.getElementById('why-us');

  section.innerHTML = `
    <div style="
      position:absolute;inset:0;
      background:linear-gradient(180deg, transparent, rgba(201,168,76,0.02) 50%, transparent);
      pointer-events:none;
    "></div>

    <div class="container" style="position:relative;z-index:1;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:100px;align-items:center;">

        <!-- LEFT: Content -->
        <div>
          <div class="t-overline gold-line" style="margin-bottom:24px;opacity:0;" data-why-reveal>
            Why Swastik Prime
          </div>
          <h2 class="t-display-sm" style="margin-bottom:48px;opacity:0;" data-why-reveal>
            Authority Built on<br/><em style="color:var(--gold);">Real Partnerships</em>
          </h2>

          <div style="display:flex;flex-direction:column;gap:32px;" id="feature-list">
            ${buildFeatureRows()}
          </div>
        </div>

        <!-- RIGHT: Stats -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          ${buildStatCards()}
        </div>
      </div>
    </div>
  `;

  // Feature rows scroll reveal
  gsap.to('.feature-row', {
    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '#feature-list', start: 'top 75%' },
  });

  // Stat cards scroll reveal
  gsap.to('.stat-card', {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
    scrollTrigger: { trigger: '.stat-card', start: 'top 80%' },
  });

  // Section headers
  gsap.to('[data-why-reveal]', {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '#why-us', start: 'top 70%' },
  });

  // COUNT UP animation
  ScrollTrigger.create({
    trigger: '.stat-card',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.count-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 25);
      });
    },
  });

  // Feature row hover effect
  document.querySelectorAll('.feature-row').forEach(row => {
    const iconBox = row.querySelector('div');
    row.addEventListener('mouseenter', () => {
      iconBox.style.borderColor = 'var(--gold)';
      iconBox.style.background = 'var(--gold-dim)';
    });
    row.addEventListener('mouseleave', () => {
      iconBox.style.borderColor = 'rgba(201,168,76,0.2)';
      iconBox.style.background = 'transparent';
    });
  });
}
