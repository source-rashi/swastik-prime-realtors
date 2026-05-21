import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { num:'01', title:'Residential', sub:'Homes & Apartments', desc:'Premium homes for families and individuals — from affordable plots to luxury villas across Indore, Bhopal, and Jabalpur.', stat:'200+ Properties' },
  { num:'02', title:'Commercial', sub:'Office & Retail', desc:'Grade-A offices, retail spaces, and mixed-use developments for businesses ready to plant roots in Central India.', stat:'80+ Offices' },
  { num:'03', title:'Land', sub:'Plots & Agricultural', desc:'Prime land parcels for development, agriculture, and investment. Verified titles, strategic locations, zero surprises.', stat:'500+ Acres' },
  { num:'04', title:'Pre-Leased', sub:'Fixed ROI Assets', desc:'Tenant-occupied properties with locked leases from Day 1. Fixed monthly income. Zero operational hassle. 8–10% ROI.', stat:'8–10% Avg. ROI' },
  { num:'05', title:'Built-to-Suit', sub:'Custom Development', desc:'End-to-end custom builds tailored to corporate requirements — backed by Swastik Group\'s in-house EPC division.', stat:'15+ BTS Projects' },
  { num:'06', title:'Industrial', sub:'Warehousing & Logistics', desc:'Warehouse parks, industrial plots, private freight terminals — leveraging Swastik Group\'s logistics network.', stat:'2M+ sq.ft' },
  { num:'07', title:'Investor Projects', sub:'High-Growth Assets', desc:'Curated investment opportunities in emerging Central India markets with AI-backed projections and due diligence.', stat:'₹200Cr+ Advisory' },
];

export function initServices() {
  const sec = document.getElementById('services');
  sec.innerHTML = `
    <div class="container">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:80px;gap:40px;">
        <div>
          <div class="t-overline will-reveal" style="margin-bottom:20px;">What We Do</div>
          <h2 class="t-display-sm will-reveal">
            Every dimension<br/>of <em class="t-italic">real estate.</em>
          </h2>
        </div>
        <p class="t-body will-reveal" style="max-width:340px;text-align:right;">
          Seven service verticals. One trusted advisory partner. Central India's most complete property platform.
        </p>
      </div>

      <!-- HORIZONTAL SCROLL LIST -->
      <div style="display:grid;grid-template-columns:1fr;gap:1px;background:var(--cream-mid);">
        ${SERVICES.map((s,i)=>`
          <div class="service-row will-reveal" data-cursor="view" style="
            display:grid;grid-template-columns:60px 1fr 2fr 160px 80px;
            align-items:center;gap:40px;
            padding:28px 0;background:var(--cream);
            transition:background 0.3s ease, padding 0.4s ease;
            cursor:none;
          ">
            <span style="font-family:'DM Mono',monospace;font-size:11px;letter-spacing:2px;color:var(--charcoal-30);">${s.num}</span>
            <div>
              <div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:500;color:var(--charcoal);transition:color 0.3s ease;">${s.title}</div>
              <div class="t-label" style="margin-top:4px;">${s.sub}</div>
            </div>
            <p style="font-size:14px;color:var(--charcoal-60);line-height:1.75;max-width:440px;opacity:0;transition:opacity 0.4s ease;" class="row-desc">${s.desc}</p>
            <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--teal);letter-spacing:1px;">${s.stat}</div>
            <div style="display:flex;align-items:center;justify-content:flex-end;">
              <span style="font-size:20px;color:var(--teal);transition:transform 0.3s ease;display:inline-block;" class="row-arrow">→</span>
            </div>
          </div>
        `).join('<div style="height:1px;background:var(--cream-mid);"></div>')}
      </div>
    </div>
  `;

  // GSAP reveal
  gsap.to('.will-reveal', { opacity:1, y:0, duration:0.9, ease:'power3.out', stagger:0.12,
    scrollTrigger:{ trigger:'#services', start:'top 75%' }
  });
  gsap.to('.service-row.will-reveal', { opacity:1, y:0, duration:0.7, stagger:0.07,
    scrollTrigger:{ trigger:'#services', start:'top 65%' }
  });

  // Row hover expand
  document.querySelectorAll('.service-row').forEach(row => {
    const desc = row.querySelector('.row-desc');
    const arrow = row.querySelector('.row-arrow');
    const title = row.querySelector('[style*="Playfair"]');

    row.addEventListener('mouseenter', () => {
      row.style.background = 'var(--cream-dark)';
      row.style.paddingLeft = '16px';
      desc.style.opacity = '1';
      arrow.style.transform = 'translateX(6px)';
      title.style.color = 'var(--teal)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = 'var(--cream)';
      row.style.paddingLeft = '0';
      desc.style.opacity = '0';
      arrow.style.transform = 'translateX(0)';
      title.style.color = 'var(--charcoal)';
    });
  });
}
