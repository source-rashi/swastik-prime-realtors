import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const LABELS = ['₹10L','₹25L','₹50L','₹75L','₹1Cr','₹1.5Cr','₹2Cr','₹3Cr','₹5Cr','₹10Cr+'];
const MATCHES = [
  { name:'Vijay Nagar Office',  type:'Pre-Leased',  price:'₹1.2Cr', roi:'8.5%' },
  { name:'AB Road Commercial',  type:'Commercial',   price:'₹85L',   roi:'7.2%' },
  { name:'Scheme 54 Apartment', type:'Residential',  price:'₹62L',   roi:null   },
];
const REPORT_TEXT = 'The Indore residential and commercial market shows 12–15% YoY appreciation across Vijay Nagar and AB Road corridors. Pre-leased Fortune 500 tenanted assets offer stable 8–10% fixed returns — ideal for conservative investors. Q1 2025 data signals continued demand surge for Grade-A commercial spaces.';

export function initAIReport() {
  const sec = document.getElementById('ai-report');
  sec.innerHTML = `
    <div class="container">
      <div class="ai-layout">
        <!-- LEFT sticky explainer -->
        <div class="ai-sticky">
          <div class="t-overline will-up" style="margin-bottom:18px;">Core Feature</div>
          <h2 class="t-display-sm will-up">Your AI<br/><em class="t-italic">Property Report</em></h2>
          <p class="t-body will-up">Enter your requirements. Our AI cross-references 10,000+ data points across Central India's market to deliver a personalized report in seconds.</p>
          <div class="ai-feature-list will-up">
            ${[
              ['Market Overview','Real-time sector analysis for your chosen city and locality.'],
              ['Best-Fit Matches','3–5 curated properties matching your budget and goal.'],
              ['Investment Forecast','Price trajectory and ROI projections backed by live data.'],
            ].map(([t,d]) => `
              <div class="ai-feature">
                <div class="ai-feature-dot"></div>
                <div><div class="ai-feature-title">${t}</div><div class="ai-feature-desc">${d}</div></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RIGHT form card -->
        <div class="ai-form-card will-right">
          <div class="ai-step-label">Configure Your Report</div>

          <!-- Budget -->
          <div class="field">
            <div class="field-label">Budget Range</div>
            <div class="range-row">
              <span class="range-val" id="bmin">₹25L</span>
              <span class="range-val" id="bmax">₹1.5Cr</span>
            </div>
            <input type="range" id="bslider" min="1" max="10" value="5"/>
          </div>

          <!-- Type -->
          <div class="field">
            <div class="field-label">Property Type</div>
            <div class="pill-group" id="type-pills">
              ${['Residential','Commercial','Land','Pre-Leased','Industrial'].map((t,i) => `
                <button class="pill${i===0?' active':''}" data-t="${t}">${t}</button>
              `).join('')}
            </div>
          </div>

          <!-- Location -->
          <div class="field">
            <div class="field-label">Location Preference</div>
            <input class="field-input" type="text" placeholder="e.g. Vijay Nagar, Indore"/>
          </div>

          <!-- Purpose -->
          <div class="field" style="margin-bottom:36px;">
            <div class="field-label">Purpose</div>
            <div class="purpose-toggle">
              <button class="purpose-btn active" data-p="self">Self-Use</button>
              <button class="purpose-btn" data-p="invest">Investment</button>
            </div>
          </div>

          <button class="btn btn--terra" id="gen-btn" style="width:100%;justify-content:center;">
            <span id="gen-txt">Generate AI Report</span>
            <div id="gen-spin" style="display:none;width:13px;height:13px;border:2px solid rgba(255,255,255,0.25);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;"></div>
          </button>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>

          <!-- Result -->
          <div class="ai-result" id="ai-result">
            <div class="ai-result-head">Report Generated</div>
            <div class="ai-result-title">Indore Market Overview</div>
            <div class="ai-result-text" id="ai-text"></div>
            ${MATCHES.map(m => `
              <div class="match-row">
                <div><div class="match-name">${m.name}</div><div class="match-type">${m.type}</div></div>
                <div style="text-align:right;">
                  <div class="match-price">${m.price}</div>
                  ${m.roi ? `<div class="match-roi">ROI ${m.roi}</div>` : ''}
                </div>
              </div>
            `).join('')}
            <div class="result-ctas">
              <button class="btn btn--gold">Download PDF</button>
              <button class="btn btn--outline">Talk to Advisor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Slider
  const sl = document.getElementById('bslider');
  sl.addEventListener('input', () => {
    const v = +sl.value;
    document.getElementById('bmin').textContent = LABELS[Math.max(0, v-1)];
    document.getElementById('bmax').textContent = LABELS[Math.min(9, v+1)];
    const p = (v-1)/9*100;
    sl.style.background = `linear-gradient(90deg,var(--gold) ${p}%,var(--gold-15) ${p}%)`;
  });

  // Pills
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Purpose
  document.querySelectorAll('.purpose-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.purpose-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Generate
  const genBtn  = document.getElementById('gen-btn');
  const genTxt  = document.getElementById('gen-txt');
  const genSpin = document.getElementById('gen-spin');
  const result  = document.getElementById('ai-result');
  const aiText  = document.getElementById('ai-text');

  genBtn.addEventListener('click', async () => {
    genTxt.textContent = 'Analyzing Market…';
    genSpin.style.display = 'block';
    genBtn.disabled = true;
    genBtn.style.opacity = '0.7';

    await new Promise(r => setTimeout(r, 2000));

    genTxt.textContent = 'Regenerate Report';
    genSpin.style.display = 'none';
    genBtn.disabled = false;
    genBtn.style.opacity = '1';

    result.classList.add('visible');
    typewriter(aiText, REPORT_TEXT, 18);
  });
}

function typewriter(el, text, speed) {
  el.textContent = '';
  let i = 0;
  const int = setInterval(() => {
    if (i < text.length) { el.textContent += text[i++]; }
    else clearInterval(int);
  }, speed);
}
