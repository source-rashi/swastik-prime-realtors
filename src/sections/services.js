import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 'residential',
    label: '01',
    title: 'Residential',
    subtitle: 'Homes & Apartments',
    description: 'Premium residential properties for families and individuals. From affordable homes to luxury villas across Central India.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    stat: '200+',
    statLabel: 'Properties',
  },
  {
    id: 'commercial',
    label: '02',
    title: 'Commercial',
    subtitle: 'Office & Retail Spaces',
    description: 'Strategic commercial real estate for businesses. Grade-A offices, retail outlets, and mixed-use developments.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    stat: '80+',
    statLabel: 'Offices',
  },
  {
    id: 'land',
    label: '03',
    title: 'Land',
    subtitle: 'Plots & Agricultural',
    description: 'Prime land parcels for development, agriculture, and investment. Verified titles, strategic locations.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
    stat: '500+',
    statLabel: 'Acres Advised',
  },
  {
    id: 'preleased',
    label: '04',
    title: 'Pre-Leased',
    subtitle: 'Fixed ROI Assets',
    description: 'Tenant-occupied properties with locked-in leases from Day 1. Fixed monthly income, zero operational hassle.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
    stat: '8-10%',
    statLabel: 'Average ROI',
  },
  {
    id: 'builttosit',
    label: '05',
    title: 'Built-to-Suit',
    subtitle: 'Custom Development',
    description: 'End-to-end custom construction tailored to corporate client specifications. Backed by Swastik Group EPC expertise.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    stat: '15+',
    statLabel: 'BTS Projects',
  },
  {
    id: 'industrial',
    label: '06',
    title: 'Industrial',
    subtitle: 'Warehousing & Logistics',
    description: 'Industrial plots, warehouses, and private freight terminals. Leveraging Swastik Group logistics infrastructure.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    stat: '2M+',
    statLabel: 'Sq.ft Managed',
  },
  {
    id: 'investor',
    label: '07',
    title: 'Investor Projects',
    subtitle: 'High-Growth Assets',
    description: 'Curated investment opportunities in emerging Central India markets. Data-backed projections, AI-powered analysis.',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    stat: '₹200Cr+',
    statLabel: 'Under Advisory',
  },
];

export function initServices() {
  const section = document.getElementById('services');

  section.innerHTML = `
    <div class="container">
      <div style="text-align:center;margin-bottom:80px;">
        <div class="t-overline gold-line" style="justify-content:center;margin-bottom:20px;opacity:0;" data-reveal>
          What We Offer
        </div>
        <h2 class="t-display-sm" style="opacity:0;" data-reveal>
          Every Dimension of<br/><em style="color:var(--gold);">Real Estate</em>
        </h2>
      </div>

      <div id="services-grid" style="
        display:grid;
        grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));
        gap:20px;
      ">
        ${SERVICES.map((s, i) => `
          <div class="service-card glass-card" data-index="${i}" style="
            padding:40px 36px;position:relative;overflow:hidden;
            cursor:none;opacity:0;transform:translateY(40px);
            transition:border-color 0.4s ease;
          " data-cursor="view">
            <!-- Number -->
            <div style="
              font-family:var(--font-mono);font-size:10px;color:rgba(201,168,76,0.3);
              letter-spacing:3px;margin-bottom:32px;
            ">${s.label}</div>

            <!-- Icon -->
            <div style="color:var(--gold);margin-bottom:24px;opacity:0.8;">${s.icon}</div>

            <!-- Content -->
            <div style="font-family:var(--font-display);font-size:28px;font-weight:600;color:var(--white);margin-bottom:6px;">${s.title}</div>
            <div class="t-label" style="margin-bottom:20px;color:rgba(245,245,240,0.35);">${s.subtitle}</div>
            <p style="font-size:14px;color:rgba(245,245,240,0.5);line-height:1.75;margin-bottom:32px;">${s.description}</p>

            <!-- Stat -->
            <div style="display:flex;align-items:baseline;gap:8px;padding-top:24px;border-top:1px solid rgba(201,168,76,0.1);">
              <span style="font-family:var(--font-display);font-size:26px;font-weight:600;color:var(--gold);">${s.stat}</span>
              <span class="t-label">${s.statLabel}</span>
            </div>

            <!-- CTA -->
            <div style="margin-top:20px;display:flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(201,168,76,0.6);text-transform:uppercase;transition:color 0.3s;" class="card-cta">
              Know More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>

            <!-- Hover border sweep -->
            <div class="card-sweep" style="
              position:absolute;bottom:0;left:0;width:0;height:2px;
              background:linear-gradient(90deg,var(--gold),var(--gold-light));
              transition:width 0.5s cubic-bezier(0.34,1.56,0.64,1);
            "></div>

            <!-- Glow bg on hover -->
            <div class="card-glow" style="
              position:absolute;inset:0;
              background:radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06), transparent 70%);
              opacity:0;transition:opacity 0.4s ease;pointer-events:none;
            "></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // SCROLL REVEAL — stagger cards
  gsap.to('.service-card', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '#services-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Headings reveal
  gsap.to('[data-reveal]', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '#services',
      start: 'top 75%',
    },
  });

  // 3D TILT on each card
  document.querySelectorAll('.service-card').forEach(card => {
    const sweep = card.querySelector('.card-sweep');
    const glow = card.querySelector('.card-glow');
    const cta = card.querySelector('.card-cta');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      const rotX = -dy * 8;
      const rotY = dx * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseenter', () => {
      sweep.style.width = '100%';
      glow.style.opacity = '1';
      cta.style.color = 'var(--gold)';
      card.style.borderColor = 'rgba(201,168,76,0.35)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      sweep.style.width = '0';
      glow.style.opacity = '0';
      cta.style.color = 'rgba(201,168,76,0.6)';
      card.style.borderColor = 'rgba(201,168,76,0.15)';
    });
  });
}
