import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAIReport() {
  const section = document.getElementById('ai-report');

  section.innerHTML = `
    <div style="
      position:absolute;inset:0;
      background:radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.04), transparent 70%);
      pointer-events:none;
    "></div>

    <div class="container" style="position:relative;z-index:1;">

      <!-- Header -->
      <div style="text-align:center;margin-bottom:80px;">
        <div class="t-overline gold-line" style="justify-content:center;margin-bottom:20px;opacity:0;" data-ai-reveal>
          Core Feature
        </div>
        <h2 class="t-display-sm" style="opacity:0;" data-ai-reveal>
          Generate Your<br/><em style="color:var(--gold);">AI Property Report</em>
        </h2>
        <p class="t-body" style="max-width:500px;margin:24px auto 0;opacity:0;" data-ai-reveal>
          Enter your requirements. Our AI analyzes 10,000+ data points across Central India's market to deliver a personalized report.
        </p>
      </div>

      <!-- Form + Result Layout -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;">

        <!-- FORM PANEL -->
        <div class="glass-card" style="padding:48px;opacity:0;" data-ai-reveal>
          <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:3px;color:var(--gold);margin-bottom:36px;">
            STEP 1 OF 4 — CONFIGURE
          </div>

          <!-- Step 1: Budget -->
          <div class="ai-field" style="margin-bottom:36px;">
            <label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:16px;">
              Budget Range
            </label>
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
              <span id="budget-min" style="font-family:var(--font-display);font-size:22px;color:var(--gold);">&#8377;25L</span>
              <span id="budget-max" style="font-family:var(--font-display);font-size:22px;color:var(--gold);">&#8377;1.5Cr</span>
            </div>
            <input type="range" id="budget-slider" min="1" max="10" value="5" style="
              width:100%;height:3px;
              background:linear-gradient(90deg,var(--gold) 50%,rgba(245,245,240,0.1) 50%);
              border:none;border-radius:2px;outline:none;cursor:none;
              -webkit-appearance:none;appearance:none;
            "/>
          </div>

          <!-- Step 2: Property Type -->
          <div class="ai-field" style="margin-bottom:36px;">
            <label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:16px;">
              Property Type
            </label>
            <div style="display:flex;flex-wrap:wrap;gap:10px;" id="type-pills">
              ${['Residential','Commercial','Land','Pre-Leased','Warehousing'].map((t,i) => `
                <button class="type-pill ${i===0?'active':''}" data-type="${t}" style="
                  font-family:var(--font-mono);font-size:10px;letter-spacing:2px;
                  padding:10px 18px;border:1px solid ${i===0?'var(--gold)':'rgba(245,245,240,0.1)'};
                  background:${i===0?'var(--gold-dim)':'transparent'};
                  color:${i===0?'var(--gold)':'rgba(245,245,240,0.4)'};
                  cursor:none;text-transform:uppercase;
                  transition:all 0.3s ease;clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
                ">${t}</button>
              `).join('')}
            </div>
          </div>

          <!-- Step 3: Location -->
          <div class="ai-field" style="margin-bottom:36px;">
            <label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:16px;">
              Location Preference
            </label>
            <input id="location-input" type="text" placeholder="e.g. Vijay Nagar, Indore" style="
              width:100%;background:rgba(245,245,240,0.04);
              border:1px solid rgba(245,245,240,0.1);
              border-bottom:1px solid rgba(201,168,76,0.4);
              color:var(--white);font-family:var(--font-body);font-size:15px;
              padding:14px 0;outline:none;
              transition:border-color 0.3s ease;
            "/>
          </div>

          <!-- Step 4: Purpose -->
          <div class="ai-field" style="margin-bottom:48px;">
            <label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:16px;">
              Purpose
            </label>
            <div style="display:flex;background:rgba(245,245,240,0.04);border:1px solid rgba(245,245,240,0.08);padding:4px;" id="purpose-toggle">
              <button class="purpose-btn active" data-p="Self-Use" style="
                flex:1;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;
                padding:12px;border:none;cursor:none;text-transform:uppercase;
                background:var(--gold);color:var(--navy);transition:all 0.3s ease;
              ">Self-Use</button>
              <button class="purpose-btn" data-p="Investment" style="
                flex:1;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;
                padding:12px;border:none;cursor:none;text-transform:uppercase;
                background:transparent;color:rgba(245,245,240,0.4);transition:all 0.3s ease;
              ">Investment</button>
            </div>
          </div>

          <!-- Generate Button -->
          <button id="generate-btn" class="btn btn--primary" style="width:100%;justify-content:center;">
            <span id="btn-text">Generate AI Report</span>
            <div id="btn-spinner" style="display:none;width:16px;height:16px;border:2px solid rgba(5,8,16,0.3);border-top-color:#050810;border-radius:50%;animation:spin 0.7s linear infinite;"></div>
          </button>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
        </div>

        <!-- RESULT PANEL -->
        <div id="ai-result" style="opacity:0;transform:translateY(30px);transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1);">
          <div class="glass-card" style="padding:48px;">
            <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:3px;color:var(--gold);margin-bottom:12px;">AI REPORT — GENERATED</div>
            <div style="font-family:var(--font-display);font-size:28px;font-weight:600;color:var(--white);margin-bottom:32px;">Indore Market Overview</div>

            <!-- Typewriter text area -->
            <div id="ai-typewriter" style="
              font-size:14px;color:rgba(245,245,240,0.55);line-height:1.9;
              margin-bottom:32px;min-height:80px;
              border-left:2px solid rgba(201,168,76,0.3);padding-left:20px;
            "></div>

            <!-- Mini property cards -->
            <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.3);text-transform:uppercase;margin-bottom:16px;">Top Matches</div>
            <div style="display:flex;flex-direction:column;gap:12px;" id="ai-matches">
              ${[
                {title:'Vijay Nagar Office',price:'₹1.2Cr',type:'Pre-Leased',roi:'8.5%'},
                {title:'AB Road Commercial',price:'₹85L',type:'Commercial',roi:'7.2%'},
                {title:'Scheme 54 Apartment',price:'₹62L',type:'Residential',roi:'—'},
              ].map(p=>`
                <div style="
                  display:flex;justify-content:space-between;align-items:center;
                  padding:16px 20px;background:rgba(245,245,240,0.03);
                  border:1px solid rgba(201,168,76,0.08);
                  border-left:2px solid var(--gold);
                ">
                  <div>
                    <div style="font-size:13px;color:var(--white);margin-bottom:4px;">${p.title}</div>
                    <div style="font-family:var(--font-mono);font-size:9px;color:var(--grey);letter-spacing:1px;">${p.type}</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-family:var(--font-display);font-size:18px;color:var(--gold);">${p.price}</div>
                    ${p.roi !== '—' ? `<div style="font-family:var(--font-mono);font-size:9px;color:rgba(37,211,102,0.7);letter-spacing:1px;">ROI ${p.roi}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(201,168,76,0.1);display:flex;gap:12px;">
              <button class="btn btn--primary" style="flex:1;justify-content:center;font-size:10px;">
                Download PDF
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
              <button class="btn btn--outline" style="flex:1;justify-content:center;font-size:10px;">Talk to Advisor</button>
            </div>
          </div>

          <!-- Placeholder state (before generation) -->
          <div id="ai-placeholder" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;">
            <div style="
              width:80px;height:80px;border:1px solid rgba(201,168,76,0.2);
              border-radius:50%;display:flex;align-items:center;justify-content:center;
              animation:placeholderPulse 2.5s ease-in-out infinite;
            ">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.4)" stroke-width="1.2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.2);text-align:center;text-transform:uppercase;">Fill the form to<br/>generate your report</p>
          </div>
          <style>
            @keyframes placeholderPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
          </style>
        </div>
      </div>
    </div>
  `;

  // Reveal animations
  gsap.to('[data-ai-reveal]', {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '#ai-report', start: 'top 70%' },
  });
  gsap.to('[data-ai-reveal] ~ .glass-card', {
    opacity: 1, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#ai-report', start: 'top 70%' },
  });

  // Type pills
  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.type-pill').forEach(p => {
        p.style.borderColor = 'rgba(245,245,240,0.1)';
        p.style.background = 'transparent';
        p.style.color = 'rgba(245,245,240,0.4)';
      });
      pill.style.borderColor = 'var(--gold)';
      pill.style.background = 'var(--gold-dim)';
      pill.style.color = 'var(--gold)';
    });
  });

  // Purpose toggle
  document.querySelectorAll('.purpose-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.purpose-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'rgba(245,245,240,0.4)';
      });
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy)';
    });
  });

  // Budget slider
  const slider = document.getElementById('budget-slider');
  const budgetLabels = ['₹10L','₹25L','₹50L','₹75L','₹1Cr','₹1.5Cr','₹2Cr','₹3Cr','₹5Cr','₹10Cr+'];
  slider.addEventListener('input', () => {
    const v = parseInt(slider.value);
    document.getElementById('budget-min').textContent = budgetLabels[Math.max(0,v-1)];
    document.getElementById('budget-max').textContent = budgetLabels[Math.min(9,v+1)];
    const pct = (v-1)/9 * 100;
    slider.style.background = `linear-gradient(90deg,var(--gold) ${pct}%,rgba(245,245,240,0.1) ${pct}%)`;
  });

  // GENERATE button
  const btn = document.getElementById('generate-btn');
  const btnText = document.getElementById('btn-text');
  const spinner = document.getElementById('btn-spinner');
  const result = document.getElementById('ai-result');
  const placeholder = document.getElementById('ai-placeholder');

  btn.addEventListener('click', async () => {
    // Loading state
    btnText.textContent = 'Analyzing Market...';
    spinner.style.display = 'block';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    await new Promise(r => setTimeout(r, 2200));

    // Show result
    placeholder.style.display = 'none';
    result.style.opacity = '1';
    result.style.transform = 'translateY(0)';

    btnText.textContent = 'Regenerate Report';
    spinner.style.display = 'none';
    btn.disabled = false;
    btn.style.opacity = '1';

    // Typewriter effect
    const text = 'The Indore residential and commercial market shows strong momentum in Q1 2025. Vijay Nagar and AB Road corridors are outperforming with 12-15% YoY appreciation. Pre-leased assets with Fortune 500 tenants offer stable 8-10% fixed returns, making them ideal for conservative investors seeking predictable income.';
    typewriter(document.getElementById('ai-typewriter'), text, 22);
  });
}

function typewriter(el, text, speed) {
  el.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.animation = 'blink 0.8s step-end infinite';
  cursor.style.color = 'var(--gold)';
  el.appendChild(cursor);

  const style = document.createElement('style');
  style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(style);

  const interval = setInterval(() => {
    if (i < text.length) {
      cursor.before(text[i]);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => cursor.remove(), 500);
    }
  }, speed);
}
