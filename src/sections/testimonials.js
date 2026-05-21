import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: 'Swastik Prime identified a pre-leased asset in Vijay Nagar with 8.5% fixed ROI within 72 hours of our brief. Their understanding of Central India\'s commercial corridors is unmatched.',
    name: 'Rajesh Mehta',
    role: 'CFO',
    company: 'Clifton Group',
    initials: 'RM',
  },
  {
    quote: 'Their land acquisition expertise in Bhopal\'s peripheral zones saved us months of due diligence. The AI-backed market report they provided changed how we evaluate real estate entirely.',
    name: 'Vikram Singh',
    role: 'Director — Infrastructure',
    company: 'NRK Group',
    initials: 'VS',
  },
  {
    quote: 'I was skeptical about their AI property report, but it mapped my entire investment thesis to specific properties in Indore. I closed two deals in one month. Simply outstanding.',
    name: 'Priya Agarwal',
    role: 'Independent Investor',
    company: 'Indore',
    initials: 'PA',
  },
  {
    quote: 'The built-to-suit facility Swastik Prime coordinated for our warehousing needs was delivered 3 weeks ahead of schedule. The Swastik Group\'s EPC integration makes all the difference.',
    name: 'Suresh Tiwari',
    role: 'Head of Logistics',
    company: 'Fortune 500 Co.',
    initials: 'ST',
  },
];

export function initTestimonials() {
  const section = document.getElementById('testimonials');

  section.innerHTML = `
    <div class="container" style="position:relative;z-index:1;text-align:center;">
      <div class="t-overline gold-line" style="justify-content:center;margin-bottom:20px;opacity:0;" data-testi-reveal>
        Client Stories
      </div>
      <h2 class="t-display-sm" style="margin-bottom:80px;opacity:0;" data-testi-reveal>
        What Our Clients<br/><em style="color:var(--gold);">Are Saying</em>
      </h2>

      <div style="position:relative;max-width:800px;margin:0 auto;">
        <!-- Slides -->
        <div id="testi-track" style="overflow:hidden;">
          <div id="testi-slides" style="display:flex;transition:transform 0.7s cubic-bezier(0.4,0,0.2,1);">
            ${TESTIMONIALS.map((t, i) => `
              <div class="testi-slide" style="min-width:100%;padding:0 20px;">
                <div class="glass-card" style="padding:56px;text-align:left;position:relative;">
                  <!-- Large quote mark -->
                  <div style="
                    position:absolute;top:40px;right:48px;
                    font-family:var(--font-display);font-size:120px;line-height:1;
                    color:rgba(201,168,76,0.08);font-weight:700;pointer-events:none;
                  ">"</div>

                  <p style="
                    font-family:var(--font-display);font-size:22px;font-weight:400;
                    font-style:italic;color:var(--white);line-height:1.65;
                    margin-bottom:40px;position:relative;z-index:1;
                  ">"${t.quote}"</p>

                  <div style="display:flex;align-items:center;gap:16px;">
                    <div style="
                      width:48px;height:48px;border-radius:50%;
                      background:linear-gradient(135deg,var(--gold),var(--gold-light));
                      display:flex;align-items:center;justify-content:center;
                      font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--navy);
                      flex-shrink:0;
                    ">${t.initials}</div>
                    <div>
                      <div style="font-family:var(--font-display);font-size:18px;font-weight:600;color:var(--white);">${t.name}</div>
                      <div class="t-label">${t.role} — ${t.company}</div>
                    </div>

                    <div style="
                      margin-left:auto;
                      font-family:var(--font-mono);font-size:9px;letter-spacing:2px;
                      color:var(--gold);border:1px solid rgba(201,168,76,0.2);
                      padding:6px 14px;
                    ">VERIFIED</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Dots -->
        <div style="display:flex;justify-content:center;gap:10px;margin-top:40px;" id="testi-dots">
          ${TESTIMONIALS.map((_, i) => `
            <button class="testi-dot" data-i="${i}" style="
              width:${i===0?'32px':'8px'};height:8px;border-radius:4px;
              background:${i===0?'var(--gold)':'rgba(201,168,76,0.2)'};
              border:none;cursor:none;
              transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
            "></button>
          `).join('')}
        </div>

        <!-- Prev/Next -->
        <div style="display:flex;justify-content:center;gap:12px;margin-top:24px;">
          <button id="testi-prev" style="
            width:44px;height:44px;border:1px solid rgba(201,168,76,0.2);
            background:transparent;color:var(--gold);
            display:flex;align-items:center;justify-content:center;
            cursor:none;transition:all 0.3s ease;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button id="testi-next" style="
            width:44px;height:44px;border:1px solid rgba(201,168,76,0.2);
            background:transparent;color:var(--gold);
            display:flex;align-items:center;justify-content:center;
            cursor:none;transition:all 0.3s ease;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Reveal
  gsap.to('[data-testi-reveal]', {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '#testimonials', start: 'top 70%' },
  });

  // Carousel logic
  let current = 0;
  const slides = document.getElementById('testi-slides');
  const dots = document.querySelectorAll('.testi-dot');

  function goTo(index) {
    current = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => {
      d.style.width = i === current ? '32px' : '8px';
      d.style.background = i === current ? 'var(--gold)' : 'rgba(201,168,76,0.2)';
    });
  }

  document.getElementById('testi-next').addEventListener('click', () => goTo(current + 1));
  document.getElementById('testi-prev').addEventListener('click', () => goTo(current - 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.i))));

  // Auto-rotate
  let autoTimer = setInterval(() => goTo(current + 1), 5000);
  document.getElementById('testi-track').addEventListener('mouseenter', () => clearInterval(autoTimer));
  document.getElementById('testi-track').addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  });
}
