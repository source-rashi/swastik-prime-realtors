import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FORM_FIELDS = [
  { label: 'Full Name', id: 'm-name', type: 'text', placeholder: 'Your full name' },
  { label: 'Contact Number', id: 'm-phone', type: 'tel', placeholder: '+91 XXXXXXXXXX' },
  { label: 'Email Address', id: 'm-email', type: 'email', placeholder: 'you@example.com' },
  { label: 'Location (City / Locality)', id: 'm-loc', type: 'text', placeholder: 'Vijay Nagar, Indore' },
  { label: 'Size (sq.ft or acres)', id: 'm-size', type: 'text', placeholder: 'e.g. 2400 sq.ft' },
  { label: 'Expected Price / Rent', id: 'm-price', type: 'text', placeholder: 'e.g. ₹1.2 Cr or ₹45,000/month' },
];

function buildFormFields() {
  return FORM_FIELDS.map(function(f) {
    return '<div>' +
      '<label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:10px;">' + f.label + '</label>' +
      '<input id="' + f.id + '" type="' + f.type + '" placeholder="' + f.placeholder + '" style="' +
        'width:100%;background:rgba(245,245,240,0.04);' +
        'border:none;border-bottom:1px solid rgba(245,245,240,0.1);' +
        'color:var(--white);font-family:var(--font-body);font-size:15px;' +
        'padding:12px 0;outline:none;' +
        'transition:border-color 0.3s ease;' +
      '" onfocus="this.style.borderBottomColor=\'var(--gold)\'" onblur="this.style.borderBottomColor=\'rgba(245,245,240,0.1)\'"/>' +
    '</div>';
  }).join('');
}

export function initContact() {
  // ── Contact Section ──────────────────────────────────────────────
  const section = document.getElementById('contact');

  section.innerHTML = `
    <div style="
      position:absolute;inset:0;
      background:radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04), transparent 70%);
      pointer-events:none;
    "></div>

    <div class="container" style="position:relative;z-index:1;text-align:center;">
      <div class="t-overline gold-line" style="justify-content:center;margin-bottom:20px;opacity:0;" data-contact-reveal>
        Get in Touch
      </div>
      <h2 class="t-display-sm" style="margin-bottom:24px;opacity:0;" data-contact-reveal>
        Ready to Make Your<br/><em style="color:var(--gold);">Best Property Decision?</em>
      </h2>
      <p class="t-body" style="max-width:480px;margin:0 auto 60px;opacity:0;" data-contact-reveal>
        Whether you're buying, selling, or investing — our advisory team is ready to provide AI-backed insights and personalized guidance.
      </p>

      <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;opacity:0;" data-contact-reveal>
        <button class="btn btn--primary" style="font-size:12px;" onclick="document.getElementById('sell-modal').style.display='flex'">
          List My Property
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <a href="https://wa.me/91XXXXXXXXXX" class="btn btn--outline" style="font-size:12px;text-decoration:none;">
          WhatsApp Us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      </div>
    </div>
  `;

  gsap.to('[data-contact-reveal]', {
    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
    scrollTrigger: { trigger: '#contact', start: 'top 70%' },
  });

  // ── Sell/Rent Modal ──────────────────────────────────────────────
  const modal = document.getElementById('sell-modal');

  modal.innerHTML = `
    <div style="
      position:absolute;inset:0;
      background:rgba(5,8,16,0.7);backdrop-filter:blur(20px);
    " onclick="document.getElementById('sell-modal').style.display='none'"></div>

    <div class="glass-card" style="
      position:relative;z-index:1;
      width:100%;max-width:640px;max-height:90vh;overflow-y:auto;
      padding:56px;
      animation:modalIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
    ">
      <button onclick="document.getElementById('sell-modal').style.display='none'" style="
        position:absolute;top:24px;right:24px;
        width:36px;height:36px;border-radius:50%;
        border:1px solid rgba(245,245,240,0.1);
        background:transparent;color:rgba(245,245,240,0.5);
        display:flex;align-items:center;justify-content:center;cursor:none;
        transition:all 0.3s ease;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:3px;color:var(--gold);margin-bottom:12px;">SELLER / LANDLORD FORM</div>
      <div style="font-family:var(--font-display);font-size:32px;font-weight:600;color:var(--white);margin-bottom:8px;">List Your Property</div>
      <p style="font-size:14px;color:rgba(245,245,240,0.4);margin-bottom:40px;">Our team will contact you within 24 hours with a market valuation.</p>

      <div id="modal-form" style="display:flex;flex-direction:column;gap:24px;">
        ${buildFormFields()}

        <!-- Property Type -->
        <div>
          <label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:10px;">Property Type</label>
          <select id="m-type" style="
            width:100%;background:rgba(245,245,240,0.04);
            border:none;border-bottom:1px solid rgba(201,168,76,0.3);
            color:var(--white);font-family:var(--font-body);font-size:15px;
            padding:12px 0;outline:none;cursor:none;
          ">
            <option value="" style="background:#0a1020">Select type...</option>
            <option value="residential" style="background:#0a1020">Residential</option>
            <option value="commercial" style="background:#0a1020">Commercial</option>
            <option value="land" style="background:#0a1020">Land / Plot</option>
            <option value="preleased" style="background:#0a1020">Pre-Leased</option>
            <option value="warehousing" style="background:#0a1020">Warehousing / Industrial</option>
          </select>
        </div>

        <!-- File Upload -->
        <div>
          <label style="display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.4);text-transform:uppercase;margin-bottom:10px;">Documents / Images (Optional)</label>
          <div id="drop-zone" style="
            border:1px dashed rgba(201,168,76,0.3);padding:32px;
            text-align:center;cursor:none;
            transition:all 0.3s ease;
          "
          ondragover="event.preventDefault();this.style.borderColor='var(--gold)';this.style.background='var(--gold-dim)'"
          ondragleave="this.style.borderColor='rgba(201,168,76,0.3)';this.style.background='transparent'"
          ondrop="handleDrop(event)"
          onclick="document.getElementById('file-input').click()"
          >
            <input type="file" id="file-input" multiple accept=".pdf,.jpg,.png,.jpeg" style="display:none" onchange="handleFileChange(this.files)"/>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" stroke-width="1.5" style="margin:0 auto 12px;display:block;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div id="drop-label" style="font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(245,245,240,0.3);text-transform:uppercase;">Drop files here or click to browse</div>
          </div>
        </div>

        <button id="modal-submit" class="btn btn--primary" style="width:100%;justify-content:center;margin-top:8px;" onclick="submitModalForm()">
          Submit Property Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Success State (hidden initially) -->
      <div id="modal-success" style="display:none;text-align:center;padding:40px 0;">
        <div style="
          width:72px;height:72px;border-radius:50%;
          background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.3);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 24px;
          animation:successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        ">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(37,211,102,0.9)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style="font-family:var(--font-display);font-size:28px;font-weight:600;color:var(--white);margin-bottom:12px;">Thank You!</div>
        <p style="font-size:14px;color:rgba(245,245,240,0.5);line-height:1.8;margin-bottom:32px;">Our team will contact you within 24 hours with a market valuation and next steps.</p>
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:2px;color:rgba(201,168,76,0.6);text-transform:uppercase;">— Swastik Prime Realtors Team</div>
      </div>
    </div>

    <style>
      @keyframes modalIn { from { opacity:0; transform:scale(0.9) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
      @keyframes successPop { from { transform:scale(0); } to { transform:scale(1); } }
    </style>
  `;

  // Global functions for modal
  window.submitModalForm = function() {
    const form = document.getElementById('modal-form');
    const success = document.getElementById('modal-success');
    gsap.to(form, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in', onComplete: () => {
      form.style.display = 'none';
      success.style.display = 'block';
      gsap.from(success, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
    }});
  };

  window.handleDrop = function(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    document.getElementById('drop-zone').style.borderColor = 'rgba(201,168,76,0.3)';
    document.getElementById('drop-zone').style.background = 'transparent';
    document.getElementById('drop-label').textContent = files.length + ' file(s) selected';
  };

  window.handleFileChange = function(files) {
    document.getElementById('drop-label').textContent = files.length + ' file(s) selected';
  };
}
