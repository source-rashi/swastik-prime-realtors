const T = [
  { quote:"Swastik Prime identified a pre-leased asset with 8.5% fixed ROI within 72 hours of our brief. Their understanding of Central India's commercial corridors is unmatched.", name:'Rajesh Mehta',   role:'CFO — Clifton Group',             initials:'RM' },
  { quote:"Their land acquisition expertise in Bhopal's peripheral zones saved us months of due diligence. The AI-backed market report changed how we evaluate real estate.",        name:'Vikram Singh',   role:'Director of Infrastructure, NRK Group', initials:'VS' },
  { quote:"I was skeptical about the AI property report. It mapped my entire investment thesis to specific properties in Indore. I closed two deals in one month.",                  name:'Priya Agarwal',  role:'Independent Investor, Indore',         initials:'PA' },
  { quote:"The built-to-suit facility was delivered 3 weeks ahead of schedule. Swastik Group's EPC integration makes them a true one-stop shop.",                                   name:'Suresh Tiwari',  role:'Head of Logistics, Fortune 500 Co.',    initials:'ST' },
];

export function initTestimonials() {
  const sec = document.getElementById('testimonials');
  sec.innerHTML = `
    <div class="container">
      <div class="testi-layout">
        <div class="testi-left">
          <div class="t-overline will-up">Client Stories</div>
          <h2 class="t-display-sm will-up" style="color:var(--cream);">What our clients<br/><em class="t-italic">are saying.</em></h2>
          <p class="will-up">Trusted by corporate groups, family offices, and individual investors across Central India.</p>
          <div class="testi-dots" id="testi-dots">
            ${T.map((_,i)=>`<button class="testi-dot${i===0?' on':''}" data-i="${i}"></button>`).join('')}
          </div>
        </div>

        <div class="testi-track">
          <div class="testi-slides" id="tslides">
            ${T.map(t=>`
              <div class="testi-slide">
                <div class="tcard">
                  <span class="quote-mark">"</span>
                  <p class="quote-text">"${t.quote}"</p>
                  <div class="tcard-meta">
                    <div class="tcard-avatar">${t.initials}</div>
                    <div>
                      <div class="tcard-name">${t.name}</div>
                      <div class="tcard-role">${t.role}</div>
                    </div>
                    <span class="tcard-verified">Verified</span>
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
  const slides = document.getElementById('tslides');
  const dots = document.querySelectorAll('.testi-dot');

  function goTo(i) {
    cur = (i + T.length) % T.length;
    slides.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('on', j === cur));
  }

  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));

  let timer = setInterval(() => goTo(cur + 1), 5500);
  document.getElementById('tslides')?.closest('.testi-track')?.addEventListener('mouseenter', () => clearInterval(timer));
  document.getElementById('tslides')?.closest('.testi-track')?.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(cur + 1), 5500); });
}
