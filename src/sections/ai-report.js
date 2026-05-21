import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initAIReport() {
  const sec = document.getElementById('ai-report');
  sec.innerHTML = `
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;">

        <!-- LEFT: sticky explainer -->
        <div id="ai-left" style="position:sticky;top:120px;">
          <div class="t-overline will-reveal" style="margin-bottom:20px;">Core Feature</div>
          <h2 class="t-display-sm will-reveal" style="margin-bottom:24px;">
            Your AI<br/><em class="t-italic">Property Report</em>
          </h2>
          <p class="t-body will-reveal" style="margin-bottom:36px;max-width:380px;">
            Enter your requirements. Our AI cross-references 10,000+ data points across Central India's market to deliver a personalized property report in seconds.
          </p>
          <div style="display:flex;flex-direction:column;gap:16px;" class="will-reveal">
            ${[
              ['Market Overview','Real-time sector analysis for your chosen city & locality'],
              ['Best-Fit Matches','3–5 curated properties that fit your budget and goal'],
              ['Investment Forecast','Price trajectory and ROI projections backed by data'],
            ].map(([t,d])=>`
              <div style="display:flex;gap:16px;align-items:flex-start;padding:20px;background:var(--white);border:1px solid var(--cream-mid);border-radius:4px;">
                <div style="width:8px;height:8px;border-radius:50%;background:var(--teal);flex-shrink:0;margin-top:6px;"></div>
                <div>
                  <div style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;color:var(--charcoal);margin-bottom:4px;">${t}</div>
                  <div style="font-size:13px;color:var(--charcoal-60);">${d}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RIGHT: form -->
        <div style="background:var(--white);border:1px solid var(--cream-mid);border-radius:8px;padding:48px;" class="will-reveal-right">

          <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;color:var(--teal);margin-bottom:32px;">CONFIGURE YOUR REPORT</div>

          <!-- Budget -->
          <div class="field-wrap" style="margin-bottom:32px;">
            <label class="field-label">Budget Range</label>
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
              <span id="bmin" style="font-family:'Playfair Display',serif;font-size:20px;color:var(--teal);">₹25L</span>
              <span id="bmax" style="font-family:'Playfair Display',serif;font-size:20px;color:var(--teal);">₹1.5Cr</span>
            </div>
            <input type="range" id="bslider" min="1" max="10" value="5" style="
              width:100%;-webkit-appearance:none;appearance:none;
              height:2px;background:linear-gradient(90deg,var(--teal) 50%,var(--cream-mid) 50%);
              border:none;outline:none;cursor:none;
            "/>
          </div>

          <!-- Property Type pills -->
          <div class="field-wrap" style="margin-bottom:32px;">
            <label class="field-label">Property Type</label>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;" id="type-pills">
              ${['Residential','Commercial','Land','Pre-Leased','Industrial'].map((t,i)=>`
                <button class="type-pill" data-t="${t}" style="
                  font-family:'DM Mono',monospace;font-size:9px;letter-spacing:2px;
                  text-transform:uppercase;padding:9px 16px;
                  border:1.5px solid ${i===0?'var(--teal)':'var(--cream-mid)'};
                  background:${i===0?'var(--teal-dim)':'transparent'};
                  color:${i===0?'var(--teal)':'var(--charcoal-60)'};
                  border-radius:2px;cursor:none;transition:all 0.25s ease;
                ">${t}</button>
              `).join('')}
            </div>
          </div>

          <!-- Location -->
          <div class="field-wrap" style="margin-bottom:32px;">
            <label class="field-label">Location Preference</label>
            <input class="field-input" type="text" placeholder="e.g. Vijay Nagar, Indore"/>
          </div>

          <!-- Purpose toggle -->
          <div class="field-wrap" style="margin-bottom:40px;">
            <label class="field-label">Purpose</label>
            <div style="display:flex;background:var(--cream);border:1.5px solid var(--cream-mid);border-radius:4px;margin-top:10px;overflow:hidden;">
              <button class="purpose-btn" data-p="Self-Use" style="flex:1;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:12px;border:none;background:var(--teal);color:var(--white);cursor:none;transition:all 0.3s ease;">Self-Use</button>
              <button class="purpose-btn" data-p="Investment" style="flex:1;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:12px;border:none;background:transparent;color:var(--charcoal-60);cursor:none;transition:all 0.3s ease;">Investment</button>
            </div>
          </div>

          <button id="gen-btn" class="btn btn--primary" style="width:100%;justify-content:center;">
            <span id="gen-text">Generate AI Report</span>
            <div id="gen-spin" style="display:none;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;"></div>
          </button>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>

          <!-- Result panel -->
          <div id="ai-result" style="margin-top:32px;opacity:0;transform:translateY(20px);transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1);">
            <div style="height:1px;background:var(--cream-mid);margin-bottom:28px;"></div>
            <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;color:var(--teal);margin-bottom:8px;">REPORT GENERATED</div>
            <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:500;color:var(--charcoal);margin-bottom:20px;">Indore Market Overview</div>
            <div id="ai-text" style="font-size:14px;color:var(--charcoal-60);line-height:1.85;border-left:2px solid var(--teal);padding-left:16px;margin-bottom:24px;"></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${[
                {name:'Vijay Nagar Office',type:'Pre-Leased',price:'₹1.2Cr',roi:'8.5%'},
                {name:'AB Road Commercial',type:'Commercial',price:'₹85L',roi:'7.2%'},
                {name:'Scheme 54 Apartment',type:'Residential',price:'₹62L',roi:null},
              ].map(p=>`
                <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border:1px solid var(--cream-mid);border-left:2px solid var(--teal);border-radius:2px;">
                  <div>
                    <div style="font-size:13px;font-weight:500;color:var(--charcoal);">${p.name}</div>
                    <div style="font-family:'DM Mono',monospace;font-size:9px;letter-spacing:1px;color:var(--charcoal-30);margin-top:2px;">${p.type}</div>
                  </div>
                  <div style="text-align:right;">
                    <div style="font-family:'Playfair Display',serif;font-size:18px;color:var(--teal);">${p.price}</div>
                    ${p.roi?`<div style="font-family:'DM Mono',monospace;font-size:9px;color:#3D9A6A;letter-spacing:1px;">ROI ${p.roi}</div>`:''}
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="display:flex;gap:12px;margin-top:20px;">
              <button class="btn btn--teal" style="flex:1;justify-content:center;font-size:10px;">Download PDF</button>
              <button class="btn btn--ghost" style="flex:1;justify-content:center;font-size:10px;">Talk to Advisor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  gsap.to('#ai-report .will-reveal, #ai-report .will-reveal-right', {
    opacity:1, x:0, y:0, duration:0.9, ease:'power3.out', stagger:0.12,
    scrollTrigger:{ trigger:'#ai-report', start:'top 70%' }
  });

  // Slider
  const sl = document.getElementById('bslider');
  const labels = ['₹10L','₹25L','₹50L','₹75L','₹1Cr','₹1.5Cr','₹2Cr','₹3Cr','₹5Cr','₹10Cr+'];
  sl.addEventListener('input', () => {
    const v = +sl.value;
    document.getElementById('bmin').textContent = labels[Math.max(0,v-1)];
    document.getElementById('bmax').textContent = labels[Math.min(9,v+1)];
    const p = (v-1)/9*100;
    sl.style.background = `linear-gradient(90deg,var(--teal) ${p}%,var(--cream-mid) ${p}%)`;
  });

  // Pills
  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.type-pill').forEach(p => {
        p.style.borderColor='var(--cream-mid)'; p.style.background='transparent'; p.style.color='var(--charcoal-60)';
      });
      pill.style.borderColor='var(--teal)'; pill.style.background='var(--teal-dim)'; pill.style.color='var(--teal)';
    });
  });

  // Purpose
  document.querySelectorAll('.purpose-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.purpose-btn').forEach(b => { b.style.background='transparent'; b.style.color='var(--charcoal-60)'; });
      btn.style.background='var(--teal)'; btn.style.color='var(--white)';
    });
  });

  // Generate
  document.getElementById('gen-btn').addEventListener('click', async () => {
    document.getElementById('gen-text').textContent = 'Analyzing...';
    document.getElementById('gen-spin').style.display = 'block';
    document.getElementById('gen-btn').disabled = true;
    await new Promise(r => setTimeout(r, 2000));
    document.getElementById('gen-text').textContent = 'Regenerate';
    document.getElementById('gen-spin').style.display = 'none';
    document.getElementById('gen-btn').disabled = false;
    const result = document.getElementById('ai-result');
    result.style.opacity = '1'; result.style.transform = 'translateY(0)';
    typewriter(document.getElementById('ai-text'), 'The Indore residential and commercial market shows 12–15% YoY appreciation in Vijay Nagar and AB Road corridors. Pre-leased Fortune 500 tenanted assets offer stable 8–10% fixed returns — ideal for conservative investors. Q1 2025 data signals continued demand surge for Grade-A commercial spaces.', 20);
  });

  function typewriter(el, text, speed) {
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { el.textContent += text[i++]; }
      else clearInterval(interval);
    }, speed);
  }
}
