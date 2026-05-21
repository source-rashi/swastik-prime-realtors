import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initContact() {
  // ── CONTACT SECTION ───────────────────────────────
  const sec = document.getElementById('contact');
  sec.innerHTML = `
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:100px;align-items:center;">

        <!-- Left -->
        <div>
          <div class="t-overline will-reveal" style="margin-bottom:20px;">Get in Touch</div>
          <h2 class="t-display-sm will-reveal" style="margin-bottom:24px;">
            Ready to make your<br/><em class="t-italic">best property decision?</em>
          </h2>
          <p class="t-body will-reveal" style="margin-bottom:48px;max-width:400px;">
            Whether you're buying, selling, or investing — our advisory team will provide AI-backed insights and guide you through every step.
          </p>
          <div style="display:flex;gap:16px;flex-wrap:wrap;" class="will-reveal">
            <button class="btn btn--primary" onclick="openModal()">List My Property →</button>
            <a href="https://wa.me/91XXXXXXXXXX" class="btn btn--outline" style="text-decoration:none;">WhatsApp Us</a>
          </div>
        </div>

        <!-- Right: contact info cards -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" class="will-reveal-right">
          ${[
            {label:'Headquarters',val:'Indore, MP',sub:'Madhya Pradesh'},
            {label:'Also Present In',val:'Bhopal & Jabalpur',sub:'Central India'},
            {label:'Email',val:'advisory@swastikprime.in',sub:'Response within 24h'},
            {label:'Group Backing',val:'Swastik Group',sub:'EPC + Logistics + RE'},
          ].map(c=>`
            <div class="card" style="padding:28px 24px;">
              <div class="t-label" style="margin-bottom:12px;">${c.label}</div>
              <div style="font-family:'Playfair Display',serif;font-size:17px;font-weight:500;color:var(--teal);margin-bottom:4px;">${c.val}</div>
              <div style="font-size:12px;color:var(--charcoal-30);">${c.sub}</div>
            </div>
          `).join('')}
        </div>

      </div>
    </div>
  `;

  gsap.to('#contact .will-reveal, #contact .will-reveal-right', {
    opacity:1, x:0, y:0, duration:0.9, ease:'power3.out', stagger:0.1,
    scrollTrigger:{ trigger:'#contact', start:'top 70%' }
  });

  // ── SELL/RENT MODAL ───────────────────────────────────
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div style="position:absolute;inset:0;" onclick="closeModal()"></div>
    <div style="
      position:relative;z-index:1;
      background:var(--cream);
      border-radius:8px;
      width:100%;max-width:600px;max-height:90vh;overflow-y:auto;
      padding:52px;
      animation:slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
    ">
      <!-- Close -->
      <button onclick="closeModal()" style="
        position:absolute;top:20px;right:20px;
        width:36px;height:36px;border-radius:50%;border:1px solid var(--cream-mid);
        background:transparent;color:var(--charcoal-60);
        display:flex;align-items:center;justify-content:center;cursor:none;
        transition:all 0.3s ease;font-size:18px;
      ">×</button>

      <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;color:var(--teal);margin-bottom:12px;">LIST YOUR PROPERTY</div>
      <div style="font-family:'Playfair Display',serif;font-size:30px;font-weight:500;color:var(--charcoal);margin-bottom:8px;">Sell or Rent with Us</div>
      <p style="font-size:14px;color:var(--charcoal-60);margin-bottom:36px;">Our team will contact you within 24 hours with a market valuation.</p>

      <div id="mform" style="display:flex;flex-direction:column;gap:24px;">
        ${[
          {l:'Full Name',t:'text',p:'Your full name'},
          {l:'Contact Number',t:'tel',p:'+91 XXXXXXXXXX'},
          {l:'Email Address',t:'email',p:'you@example.com'},
          {l:'Location (City / Locality)',t:'text',p:'e.g. Vijay Nagar, Indore'},
          {l:'Size (sq.ft or acres)',t:'text',p:'e.g. 2400 sq.ft'},
          {l:'Expected Price / Rent',t:'text',p:'e.g. ₹1.2 Cr or ₹45,000/month'},
        ].map(f=>`
          <div class="field-wrap">
            <label class="field-label">${f.l}</label>
            <input class="field-input" type="${f.t}" placeholder="${f.p}"/>
          </div>
        `).join('')}

        <div class="field-wrap">
          <label class="field-label">Property Type</label>
          <select class="field-input" style="cursor:none;">
            <option value="">Select type…</option>
            <option>Residential</option><option>Commercial</option>
            <option>Land / Plot</option><option>Pre-Leased</option><option>Industrial</option>
          </select>
        </div>

        <!-- Drag drop -->
        <div>
          <div class="field-label" style="margin-bottom:12px;">Documents / Images (Optional)</div>
          <div id="dropzone" style="
            border:1.5px dashed var(--cream-mid);border-radius:4px;
            padding:32px;text-align:center;cursor:none;
            transition:border-color 0.3s ease,background 0.3s ease;
          "
          ondragover="event.preventDefault();this.style.borderColor='var(--teal)';this.style.background='var(--teal-dim)'"
          ondragleave="this.style.borderColor='var(--cream-mid)';this.style.background='transparent'"
          ondrop="this.style.borderColor='var(--cream-mid)';this.style.background='transparent';document.getElementById('dzlabel').textContent=event.dataTransfer.files.length+' file(s) selected'"
          onclick="document.getElementById('mfile').click()">
            <input type="file" id="mfile" style="display:none" multiple onchange="document.getElementById('dzlabel').textContent=this.files.length+' file(s) selected'"/>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal-30)" stroke-width="1.5" style="margin:0 auto 10px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div id="dzlabel" style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;color:var(--charcoal-30);text-transform:uppercase;">Drop files or click to browse</div>
          </div>
        </div>

        <button class="btn btn--primary" style="width:100%;justify-content:center;" onclick="submitForm()">
          Submit Property Details →
        </button>
      </div>

      <!-- Success -->
      <div id="msuccess" style="display:none;text-align:center;padding:60px 0;">
        <div style="
          width:64px;height:64px;border-radius:50%;
          background:rgba(45,91,90,0.1);border:1px solid rgba(45,91,90,0.3);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 24px;
          animation:successPop 0.5s cubic-bezier(0.34,1.56,0.64,1);
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:500;color:var(--charcoal);margin-bottom:12px;">Thank You</div>
        <p style="font-size:14px;color:var(--charcoal-60);line-height:1.85;max-width:300px;margin:0 auto;">Our advisory team will contact you within 24 hours with a market valuation and next steps.</p>
        <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;color:var(--teal);margin-top:28px;text-transform:uppercase;">— Swastik Prime Realtors</div>
      </div>
    </div>

    <style>
      @keyframes slideUp { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes successPop { from{transform:scale(0)} to{transform:scale(1)} }
    </style>
  `;

  window.submitForm = function() {
    const form = document.getElementById('mform');
    const success = document.getElementById('msuccess');
    gsap.to(form, { opacity:0, y:-16, duration:0.35, ease:'power2.in', onComplete: () => {
      form.style.display = 'none';
      success.style.display = 'block';
      gsap.from(success, { opacity:0, y:16, duration:0.5, ease:'power3.out' });
    }});
  };
}
