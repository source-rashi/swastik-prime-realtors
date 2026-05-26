import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initContact() {
  // ── Contact section ─────────────────────────────────────────
  const sec = document.getElementById('contact');
  sec.innerHTML = `
    <div class="container">
      <div class="contact-layout">
        <div>
          <div class="t-overline will-up" style="margin-bottom:18px;">Get in Touch</div>
          <h2 class="t-display-sm will-up" style="margin-bottom:20px;">Ready to make your<br/><em class="t-italic">best property decision?</em></h2>
          <p class="t-body will-up" style="margin-bottom:44px;max-width:400px;">Whether you're buying, selling, or investing — our advisory team is ready to guide you with AI-backed insights every step of the way.</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap;" class="will-up">
            <button class="btn btn--terra" onclick="window.openModal()">List My Property →</button>
            <a class="btn btn--outline" href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener">WhatsApp Us</a>
          </div>
        </div>
        <div class="contact-info-cards will-right">
          ${[
            {l:'Headquarters',     v:'Indore, MP',         s:'Madhya Pradesh'},
            {l:'Also Present In',  v:'Bhopal & Jabalpur',  s:'Central India'},
            {l:'Advisory Email',   v:'hello@swastikprime', s:'Response within 24h'},
            {l:'Group Backing',    v:'Swastik Group',      s:'EPC + Logistics + RE'},
          ].map(c => `
            <div class="info-card">
              <div class="t-label">${c.l}</div>
              <div class="info-card-val">${c.v}</div>
              <div class="info-card-sub">${c.s}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // ── Modal ────────────────────────────────────────────────────
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div style="position:absolute;inset:0;" onclick="window.closeModal()"></div>
    <div class="modal-card">
      <button class="modal-close" onclick="window.closeModal()">×</button>
      <div class="t-overline">Seller / Landlord Form</div>
      <div class="modal-title">List Your Property</div>
      <div class="modal-sub">Our team will contact you within 24 hours with a market valuation.</div>

      <div class="modal-form" id="mform">
        ${[
          {l:'Full Name',                   t:'text',  p:'Your full name'},
          {l:'Contact Number',              t:'tel',   p:'+91 XXXXXXXXXX'},
          {l:'Email Address',               t:'email', p:'you@example.com'},
          {l:'Location (City / Locality)',  t:'text',  p:'e.g. Vijay Nagar, Indore'},
          {l:'Size (sq.ft or acres)',        t:'text',  p:'e.g. 2400 sq.ft'},
          {l:'Expected Price / Rent',       t:'text',  p:'e.g. ₹1.2 Cr'},
        ].map(f => `
          <div class="field">
            <div class="field-label">${f.l}</div>
            <input class="field-input" type="${f.t}" placeholder="${f.p}"/>
          </div>
        `).join('')}

        <div class="field">
          <div class="field-label">Property Type</div>
          <select class="field-input">
            <option value="">Select type…</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Land / Plot</option>
            <option>Pre-Leased</option>
            <option>Industrial</option>
          </select>
        </div>

        <div>
          <div class="field-label" style="margin-bottom:10px;">Documents / Images (optional)</div>
          <div class="dropzone" id="dropzone"
            ondragover="event.preventDefault();this.classList.add('drag')"
            ondragleave="this.classList.remove('drag')"
            ondrop="this.classList.remove('drag');document.getElementById('dzlbl').textContent=event.dataTransfer.files.length+' file(s) selected';event.preventDefault()"
            onclick="document.getElementById('mfile').click()">
            <input type="file" id="mfile" style="display:none" multiple
              onchange="document.getElementById('dzlbl').textContent=this.files.length+' file(s) selected'"/>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cream-30)" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div class="dropzone-label" id="dzlbl">Drop files or click to browse</div>
          </div>
        </div>

        <button class="btn btn--terra" style="width:100%;justify-content:center;" onclick="window.submitModal()">
          Submit Property Details →
        </button>
      </div>

      <div class="modal-success" id="msuccess">
        <div class="success-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="success-title">Thank You</div>
        <div class="success-sub">Our advisory team will contact you within 24 hours with a market valuation and next steps.</div>
        <div class="t-overline" style="justify-content:center;color:var(--gold);">— Swastik Prime Realtors</div>
      </div>
    </div>
  `;

  window.submitModal = function () {
    const form = document.getElementById('mform');
    const success = document.getElementById('msuccess');
    gsap.to(form, {
      opacity: 0, y: -16, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        form.style.display = 'none';
        success.style.display = 'block';
        gsap.from(success, { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' });
      }
    });
  };
}
