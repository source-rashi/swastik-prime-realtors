import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHero() {
  const hero = document.getElementById('hero');

  hero.innerHTML = `
    <div style="max-width:760px;padding-top:120px;">

      <div class="t-overline gold-line" id="hero-overline" style="opacity:0;margin-bottom:28px;">
        Central India's Trusted Real Estate Advisory
      </div>

      <h1 class="t-display" id="hero-h1" style="margin-bottom:32px;">
        <span class="split-line"><span class="split-word">Your</span> <span class="split-word">Trusted</span></span>
        <span class="split-line"><span class="split-word t-italic">Partner</span> <span class="split-word">in</span></span>
        <span class="split-line"><span class="split-word">Real</span> <span class="split-word">Estate</span></span>
        <span class="split-line"><span class="split-word">Decisions</span></span>
      </h1>

      <p class="t-body" id="hero-sub" style="opacity:0;max-width:480px;margin-bottom:52px;">
        AI-powered insights, personalized guidance, and expert advisory for your property journey across Central India.
      </p>

      <div id="hero-ctas" style="display:flex;gap:20px;align-items:center;opacity:0;">
        <button class="btn btn--primary" data-cursor="view">
          Get AI Report
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn btn--outline">Explore Projects</button>
      </div>
    </div>

    <!-- Floating property card -->
    <div id="hero-card" style="
      position:absolute;right:80px;top:50%;transform:translateY(-50%);
      width:280px;opacity:0;
    ">
      <div class="glass-card" style="padding:32px;">
        <div style="font-family:var(--font-mono);font-size:9px;letter-spacing:2px;color:var(--navy);background:var(--gold);padding:4px 12px;display:inline-block;margin-bottom:20px;">PRE-LEASED</div>
        <div style="font-family:var(--font-display);font-size:38px;font-weight:600;color:var(--white);margin-bottom:6px;"><span style="font-size:20px;color:var(--gold);">&#8377;</span>1.2 Cr</div>
        <div style="font-family:var(--font-body);font-size:12px;color:var(--grey);margin-bottom:24px;letter-spacing:0.5px;">Vijay Nagar, Indore MP</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;">
          <span style="font-family:var(--font-mono);font-size:9px;color:rgba(245,245,240,0.5);border:1px solid rgba(245,245,240,0.1);padding:5px 10px;letter-spacing:1px;">COMMERCIAL</span>
          <span style="font-family:var(--font-mono);font-size:9px;color:rgba(245,245,240,0.5);border:1px solid rgba(245,245,240,0.1);padding:5px 10px;letter-spacing:1px;">2400 SQ.FT</span>
        </div>
        <div style="padding-top:20px;border-top:1px solid rgba(201,168,76,0.15);display:flex;justify-content:space-between;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:9px;color:var(--grey);letter-spacing:2px;text-transform:uppercase;">Fixed ROI</span>
          <span style="font-family:var(--font-display);font-size:28px;color:var(--gold);font-weight:600;">8.5%</span>
        </div>
        <div style="margin-top:16px;width:100%;height:1px;background:linear-gradient(90deg,var(--gold),transparent)"></div>
        <div style="margin-top:12px;font-family:var(--font-mono);font-size:9px;color:rgba(245,245,240,0.3);letter-spacing:1px;">Tenant: Fortune 500 Co.</div>
      </div>

      <!-- Second mini card peeking behind -->
      <div style="
        position:absolute;bottom:-16px;left:-16px;right:16px;height:80px;
        background:rgba(14,20,36,0.4);border:1px solid rgba(201,168,76,0.08);
        z-index:-1;backdrop-filter:blur(10px);
      "></div>
    </div>

    <!-- Stats bar -->
    <div id="hero-stats" style="
      position:absolute;bottom:60px;left:60px;right:60px;
      display:flex;gap:60px;opacity:0;
    ">
      ${[['500+','Projects Advised'],['5+','Years Expertise'],['\\u20B9200Cr+','Deals Closed'],['50+','Corporate Clients']].map(([num,label])=>`
        <div style="border-left:1px solid rgba(201,168,76,0.3);padding-left:24px;">
          <div style="font-family:var(--font-display);font-size:42px;font-weight:600;color:var(--gold);line-height:1;">${num}</div>
          <div class="t-label" style="margin-top:8px;">${label}</div>
        </div>
      `).join('')}
    </div>

    <!-- Scroll cue -->
    <div id="scroll-cue" style="
      position:absolute;bottom:60px;right:60px;
      display:flex;flex-direction:column;align-items:center;gap:10px;opacity:0;
    ">
      <span style="font-family:var(--font-mono);font-size:9px;color:rgba(201,168,76,0.5);letter-spacing:3px;writing-mode:vertical-rl;text-transform:uppercase;">Scroll</span>
      <div style="width:1px;height:60px;background:linear-gradient(to bottom,rgba(201,168,76,0.6),transparent);animation:scrollPulse 2s ease-in-out infinite;"></div>
    </div>

    <style>
      @keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.1)}}
    </style>
  `;

  // GSAP entrance timeline
  const tl = gsap.timeline({ delay: 0.3 });

  gsap.set('#hero-overline', { y: 20 });
  gsap.set('#hero-sub', { y: 20 });
  gsap.set('#hero-ctas', { y: 20 });
  gsap.set('#hero-card', { x: 40 });
  gsap.set('#hero-stats', { y: 20 });
  gsap.set('#scroll-cue', { opacity: 0 });

  tl.to('#hero-overline', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    .to('.split-word', { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.055 }, 0.3)
    .to('#hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.1)
    .to('#hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.4)
    .to('#hero-card', { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, 1.1)
    .to('#hero-stats', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.9)
    .to('#scroll-cue', { opacity: 1, duration: 0.8 }, 2.3);

  // Floating card animation
  gsap.to('#hero-card', {
    y: '-=18',
    duration: 3.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 2,
  });

  // Hero parallax on scroll
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set('#hero h1', { y: p * 80, opacity: 1 - p * 1.5 });
      gsap.set('#hero-sub', { y: p * 50, opacity: (1 - p * 2) });
      gsap.set('#hero-card', { y: -p * 60, opacity: 1 - p * 2 });
      gsap.set('#hero-stats', { y: p * 40, opacity: 1 - p * 3 });
    },
  });
}
