import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num:500, suffix:'+', label:'Projects Advised',    sub:'Across Central India' },
  { num:5,   suffix:'+', label:'Years of Expertise',  sub:'Deep market roots'    },
  { num:200, suffix:'Cr+', label:'₹ Deals Closed',    sub:'Total value advised', prefix:'₹' },
  { num:50,  suffix:'+', label:'Corporate Clients',   sub:'Including Fortune 500'},
];
const FEATURES = [
  { icon:'◈', title:'5+ Years of Expertise',      desc:"Deep-rooted knowledge of Central India's property micro-markets — Indore, Bhopal, Jabalpur." },
  { icon:'◆', title:'Clifton & NRK Group',         desc:"Trusted by India's leading corporate conglomerates for land, warehousing, and BTS projects." },
  { icon:'◉', title:'Swastik Group Backbone',      desc:"Backed by Swastik Group's EPC division, private freight terminal, and logistics network."   },
  { icon:'◇', title:'Timely Delivery',             desc:"Zero-delay project timelines with in-house construction and project management expertise."   },
];

export function initWhyUs() {
  const sec = document.getElementById('why-us');
  sec.innerHTML = `
    <div class="container">
      <div style="text-align:center;max-width:580px;margin:0 auto 96px;">
        <div class="t-overline will-up" style="justify-content:center;margin-bottom:18px;">Why Swastik Prime</div>
        <h2 class="t-display-sm will-up">Authority built on<br/><em class="t-italic">real partnerships.</em></h2>
      </div>

      <div class="why-grid">
        <!-- LEFT: features -->
        <div>
          <h3 class="t-display-sm will-up" style="margin-bottom:8px;">What makes us<br/><em class="t-italic">different.</em></h3>
          <div class="feature-list">
            ${FEATURES.map(f => `
              <div class="feature-item will-left">
                <div class="feature-icon">${f.icon}</div>
                <div>
                  <div class="feature-title">${f.title}</div>
                  <div class="feature-desc">${f.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RIGHT: stat cards -->
        <div class="why-right">
          ${STATS.map(s => `
            <div class="stat-card will-up">
              <div class="big-stat">
                <span class="count-el" data-target="${s.num}" data-suffix="${s.suffix}" data-prefix="${s.prefix||''}">0</span>${s.suffix}
              </div>
              <div class="big-stat-label">${s.label}</div>
              <div class="big-stat-sub">${s.sub}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Count up on scroll
  ScrollTrigger.create({
    trigger: '.why-right',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.count-el').forEach(el => {
        const target = +el.dataset.target;
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = target / 55;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = prefix + Math.floor(cur);
        }, 22);
      });
    },
  });
}
