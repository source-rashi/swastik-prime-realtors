import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const DATA = [
  { n:'01', title:'Residential',    sub:'Homes & Apartments', desc:'Premium homes for families and individuals — from affordable plots to luxury villas across Indore, Bhopal, and Jabalpur.',       stat:'200+ Properties'  },
  { n:'02', title:'Commercial',     sub:'Office & Retail',     desc:'Grade-A offices, retail spaces, and mixed-use developments for businesses ready to plant roots in Central India.',               stat:'80+ Offices'      },
  { n:'03', title:'Land',           sub:'Plots & Agricultural',desc:'Prime land parcels for development, agriculture, and investment. Verified titles, strategic locations, zero surprises.',          stat:'500+ Acres'       },
  { n:'04', title:'Pre-Leased',     sub:'Fixed ROI Assets',    desc:'Tenant-occupied properties with locked leases from Day 1. Fixed monthly income. Zero operational hassle. 8–10% ROI.',           stat:'8–10% ROI'        },
  { n:'05', title:'Built-to-Suit',  sub:'Custom Development',  desc:"End-to-end custom builds tailored to corporate requirements — backed by Swastik Group's in-house EPC division.",               stat:'15+ BTS Projects'  },
  { n:'06', title:'Industrial',     sub:'Warehousing & Logistics', desc:"Warehouse parks, industrial plots, private freight terminals — leveraging Swastik Group's logistics network.",              stat:'2M+ sq.ft'        },
  { n:'07', title:'Investor Projects', sub:'High-Growth Assets', desc:'Curated investment opportunities in emerging Central India markets with AI-backed projections and due diligence.',             stat:'₹200Cr+ Advisory' },
];

export function initServices() {
  const sec = document.getElementById('services');
  sec.innerHTML = `
    <div class="container">
      <div class="services-header">
        <div>
          <div class="t-overline will-up" style="margin-bottom:18px;">What We Do</div>
          <h2 class="t-display-sm will-up">Every dimension<br/>of <em class="t-italic">real estate.</em></h2>
        </div>
        <p class="t-body will-right">Seven service verticals. One trusted advisory partner. Central India's most complete property platform.</p>
      </div>

      <div class="services-list">
        ${DATA.map(s => `
          <div class="service-row will-fade" data-cursor="view">
            <span class="sr-num">${s.n}</span>
            <div>
              <div class="sr-title">${s.title}</div>
              <div class="sr-sub">${s.sub}</div>
            </div>
            <p class="sr-desc">${s.desc}</p>
            <span class="sr-stat">${s.stat}</span>
            <span class="sr-arrow">→</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
