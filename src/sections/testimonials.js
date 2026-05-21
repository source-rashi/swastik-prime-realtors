import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const T = [
  { quote: 'Swastik Prime identified a pre-leased asset with 8.5% fixed ROI within 72 hours of our brief. Their understanding of Central India\'s commercial corridors is unmatched.', name: 'Rajesh Mehta', role: 'CFO, Clifton Group', initials: 'RM' },
  { quote: 'Their land acquisition expertise in Bhopal\'s peripheral zones saved us months of due diligence. The AI-backed market report changed how we evaluate real estate entirely.', name: 'Vikram Singh', role: 'Director of Infrastructure, NRK Group', initials: 'VS' },
  { quote: 'I was skeptical about the AI property report. It mapped my entire investment thesis to specific properties in Indore. I closed two deals in one month.', name: 'Priya Agarwal', role: 'Independent Investor, Indore', initials: 'PA' },
  { quote: 'The built-to-suit facility was delivered 3 weeks ahead of schedule. The Swastik Group EPC integration truly makes them a one-stop shop.', name: 'Suresh Tiwari', role: 'Head of Logistics, Fortune 500 Co.', initials: 'ST' },
];

export function initTestimonials() {
  const sec = document.getElementById('testimonials');
  // This section has bg:teal already in HTML, so text is white

  sec.innerHTML = `
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:80px;align-items:start;">

        <!-- Left sticky label -->
        <div style="position:sticky;top:120px;">
          <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:20px;display:flex;align-items:center;gap:14px;">
            <span style="width:32px;height:1px;background:rgba(255,255,255,0.4);display:inline-block;"></span>
            Client Stories
          </div>
          <h2 style="font-family:'Playfair Display',serif;font-size:clamp(34px,3.5vw,52px);font-weight:500;color:white;line-height:1.1;margin-bottom:28px;">
            What our clients<br/><em style="color:rgba(255,255,255,0.6);font-style:italic;">are saying.</em>
          </h2>
          <p style="font-size:14px;color:rgba(255,255,255,0.45);line-height:1.85;max-width:260px;">Trusted by corporate groups, family offices, and individual investors across Central India.</p>

          <!-- Dots nav -->
          <div style="display:flex;gap:10px;margin-top:48px;" id="t-dots">
            ${T.map((_,i)=>`
              <button class="t-dot" data-i="${i}" style="
                width:${i===0?'28px':'8px'};height:8px;border-radius:4px;
                background:${i===0?'white':'rgba(255,255,255,0.25)'};
                border:none;cursor:none;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
              "></button>
            `).join('')}
          </div>
        </div>

        <!-- Right: testimonial cards -->
        <div id="t-track" style="overflow:hidden;">
          <div id="t-slides" style="display:flex;transition:transform 0.7s cubic-bezier(0.4,0,0.2,1);">
            ${T.map(t=>`
              <div style="min-width:100%;padding:4px;">
                <div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:52px;">
                  <div style="font-family:'Playfair Display',serif;font-size:72px;line-height:0.6;color:rgba(255,255,255,0.12);margin-bottom:28px;font-weight:700;">"</div>
                  <p style="font-family:'Playfair Display',serif;font-size:22px;font-style:italic;font-weight:400;color:white;line-height:1.65;margin-bottom:40px;">"${t.quote}"</p>
                  <div style="display:flex;align-items:center;gap:16px;">
                    <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:12px;color:white;font-weight:500;flex-shrink:0;">${t.initials}</div>
                    <div>
                      <div style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:500;color:white;">${t.name}</div>
                      <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:1px;margin-top:2px;">${t.role}</div>
                    </div>
                    <div style="margin-left:auto;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:2px;color:rgba(255,255,255,0.35);border:1px solid rgba(255,255,255,0.15);padding:5px 12px;text-transform:uppercase;">Verified</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  let cur = 0;
  const slides = document.getElementById('t-slides');
  const dots = document.querySelectorAll('.t-dot');

  function goTo(i) {
    cur = (i + T.length) % T.length;
    slides.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, j) => {
      d.style.width = j === cur ? '28px' : '8px';
      d.style.background = j === cur ? 'white' : 'rgba(255,255,255,0.25)';
    });
  }

  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));
  let timer = setInterval(() => goTo(cur + 1), 5500);
  document.getElementById('t-track').addEventListener('mouseenter', () => clearInterval(timer));
  document.getElementById('t-track').addEventListener('mouseleave', () => { timer = setInterval(() => goTo(cur + 1), 5500); });
}
