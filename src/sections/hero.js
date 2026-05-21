import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export async function initHero() {
  const section = document.getElementById('hero');

  // Build floor lines
  const floorLines = Array.from({length:12},(_,i) =>
    '<line x1="370" y1="' + (220+i*28) + '" x2="530" y2="' + (220+i*28) + '"/>'
  ).join('');

  // Build window grid
  const windowGrid = Array.from({length:10},(_,row) =>
    [0,1,2,3,4].map(col =>
      '<rect x="' + (382+col*28) + '" y="' + (212+row*28) + '" width="16" height="12" rx="1"/>'
    ).join('')
  ).join('');

  // Build act indicator dots
  const actDots = [1,2,3].map(n =>
    '<div class="act-dot" data-act="' + n + '" style="' +
    'width:6px;height:6px;border-radius:50%;' +
    'background:' + (n===1 ? 'var(--teal)' : 'var(--cream-mid)') + ';' +
    'transition:background 0.4s ease, transform 0.4s ease;' +
    '"></div>'
  ).join('');

  // Build stats bar
  const statsData = [['500+','Projects Advised'],['5+','Years Expertise'],['₹200Cr+','Deals Closed'],['50+','Corporate Clients']];
  const statsHtml = statsData.map(function(item) {
    return '<div style="' +
      'padding:28px 40px;' +
      'border-right:1px solid var(--cream-mid);' +
      '">' +
      '<div style="font-family:\'Playfair Display\',serif;font-size:32px;font-weight:500;color:var(--teal);line-height:1;margin-bottom:8px;">' + item[0] + '</div>' +
      '<div class="t-label">' + item[1] + '</div>' +
      '</div>';
  }).join('');

  section.innerHTML = `
    <!-- PINNED WRAPPER: 400vh tall so scroll = animation time -->
    <div id="hero-pin-wrap" style="height:400vh;">

      <!-- STICKY PANEL -->
      <div id="hero-sticky" style="
        position:sticky;top:0;height:100vh;overflow:hidden;
        background:var(--cream);display:flex;
      ">

        <!-- LEFT: TEXT COLUMN -->
        <div id="hero-text" style="
          position:relative;z-index:20;
          width:42%;padding:0 0 0 64px;
          display:flex;flex-direction:column;justify-content:center;
          padding-top:100px;
        ">

          <!-- ACT 1 text -->
          <div id="act1-text" style="position:absolute;left:64px;bottom:180px;max-width:480px;">
            <div class="t-overline will-reveal" style="margin-bottom:24px;">Central India's Trusted Advisory</div>
            <h1 class="t-display" style="margin-bottom:28px;">
              <span class="split-word"><span class="split-word-inner">Your Trusted</span></span><br/>
              <em class="t-italic" style="font-size:inherit;">Partner</em> in<br/>
              <span class="split-word"><span class="split-word-inner">Real Estate</span></span><br/>
              <span class="split-word"><span class="split-word-inner">Decisions</span></span>
            </h1>
            <p class="t-body will-reveal" style="max-width:400px;">
              AI-powered insights and expert advisory for your property journey across Central India.
            </p>
          </div>

          <!-- ACT 2 text (hidden initially) -->
          <div id="act2-text" style="position:absolute;left:64px;bottom:180px;max-width:480px;opacity:0;">
            <div class="t-overline" style="margin-bottom:24px;">From Land to Legacy</div>
            <h2 class="t-display-sm" style="margin-bottom:20px;">
              Every property,<br/>a story we help<br/><em class="t-italic">you write.</em>
            </h2>
            <p class="t-body">Residential. Commercial. Pre-Leased. Industrial. We cover every dimension of Central India's property market.</p>
          </div>

          <!-- ACT 3 text (hidden initially) -->
          <div id="act3-text" style="position:absolute;left:64px;bottom:160px;max-width:480px;opacity:0;">
            <div class="t-overline" style="margin-bottom:24px;">Your Journey Starts Here</div>
            <h2 class="t-display-sm" style="margin-bottom:28px;">
              Ready to find<br/>your <em class="t-italic">perfect space?</em>
            </h2>
            <div style="display:flex;gap:16px;flex-wrap:wrap;">
              <button class="btn btn--primary">Get AI Report →</button>
              <button class="btn btn--outline">Explore Projects</button>
            </div>
          </div>

        </div>

        <!-- RIGHT: SVG ILLUSTRATION -->
        <div id="hero-svg-wrap" style="
          position:absolute;right:0;top:0;bottom:0;
          width:65%;overflow:hidden;
        ">

          <!-- PROGRESS INDICATOR -->
          <div id="act-indicator" style="
            position:absolute;top:50%;right:48px;transform:translateY(-50%);
            z-index:30;display:flex;flex-direction:column;gap:12px;align-items:center;
          ">
            ${actDots}
          </div>

          <!-- THE SVG SCENE -->
          <svg id="city-svg" viewBox="0 0 900 700"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;height:100%;position:absolute;inset:0;"
            fill="none" stroke="#1C1C1E" stroke-linecap="round" stroke-linejoin="round">

            <!-- ── GROUND LINE ── -->
            <line x1="50" y1="560" x2="850" y2="560" stroke-opacity="0.15" stroke-width="1"/>

            <!-- ── BACKGROUND BUILDINGS (far, light) ── -->
            <g id="bg-buildings" stroke-opacity="0.12" stroke-width="1">
              <rect x="80"  y="420" width="40" height="140"/>
              <rect x="130" y="450" width="30" height="110"/>
              <rect x="170" y="400" width="50" height="160"/>
              <rect x="780" y="430" width="35" height="130"/>
              <rect x="820" y="410" width="45" height="150"/>
              <rect x="760" y="460" width="25" height="100"/>
            </g>

            <!-- ── MIDGROUND BUILDINGS ── -->
            <g id="mid-buildings" stroke-opacity="0.25" stroke-width="1.2">
              <rect x="220" y="350" width="60"  height="210"/>
              <rect x="290" y="380" width="45"  height="180"/>
              <rect x="640" y="360" width="55"  height="200"/>
              <rect x="700" y="390" width="40"  height="170"/>

              <!-- Windows mid -->
              <g stroke-opacity="0.3" stroke-width="0.8">
                <rect x="228" y="360" width="10" height="8"/> <rect x="244" y="360" width="10" height="8"/>
                <rect x="260" y="360" width="10" height="8"/> <rect x="228" y="376" width="10" height="8"/>
                <rect x="244" y="376" width="10" height="8"/> <rect x="260" y="376" width="10" height="8"/>
                <rect x="228" y="392" width="10" height="8"/> <rect x="244" y="392" width="10" height="8"/>
              </g>
            </g>

            <!-- ══════════════════════════════════════════════
                 THE HERO BUILDING (center — scales up in Act 2)
                 id="hero-building" — this is what we zoom into
                 ══════════════════════════════════════════════ -->
            <g id="hero-building" transform="translate(0,0) scale(1)" style="transform-origin:450px 560px;">

              <!-- Main structure -->
              <rect x="370" y="200" width="160" height="360" stroke-opacity="0.7" stroke-width="1.5"/>

              <!-- Left wing -->
              <rect x="320" y="280" width="50" height="280" stroke-opacity="0.5" stroke-width="1.2"/>

              <!-- Right wing -->
              <rect x="530" y="300" width="50" height="260" stroke-opacity="0.5" stroke-width="1.2"/>

              <!-- Roof detail -->
              <line x1="370" y1="200" x2="530" y2="200" stroke-opacity="0.7" stroke-width="1.5"/>
              <line x1="445" y1="200" x2="455" y2="170" stroke-opacity="0.5" stroke-width="1"/>
              <line x1="455" y1="170" x2="455" y2="140" stroke-opacity="0.4" stroke-width="1"/> <!-- antenna -->
              <circle cx="455" cy="138" r="3" fill="#C4714A" stroke="#C4714A"/> <!-- antenna light -->

              <!-- Floor lines -->
              <g stroke-opacity="0.15" stroke-width="0.8">
                ${floorLines}
              </g>

              <!-- Regular windows grid (always visible) -->
              <g id="window-grid" stroke-opacity="0.35" stroke-width="0.9">
                ${windowGrid}
              </g>

              <!-- THE FOCUS WINDOW (Act 3 — center window, 5th row) -->
              <g id="focus-window-group" transform="translate(450,340)" style="transform-origin:0px 0px;">

                <!-- Window frame -->
                <rect id="focus-frame" x="-20" y="-18" width="40" height="30" rx="1"
                  stroke-opacity="0.8" stroke-width="1.5"/>

                <!-- Left shutter -->
                <rect id="shutter-left" x="-20" y="-18" width="19" height="30"
                  fill="rgba(247,245,241,0.95)"
                  stroke-opacity="0.6" stroke-width="1.2"
                  style="transform-origin:-1px 0px;"/>

                <!-- Right shutter -->
                <rect id="shutter-right" x="1" y="-18" width="19" height="30"
                  fill="rgba(247,245,241,0.95)"
                  stroke-opacity="0.6" stroke-width="1.2"
                  style="transform-origin:20px 0px;"/>

                <!-- INTERIOR ROOM (hidden behind shutters, revealed in Act 3) -->
                <g id="room-interior" style="clip-path:url(#window-clip);opacity:0;">

                  <!-- Room warm fill -->
                  <rect x="-20" y="-18" width="40" height="30" fill="#F2E8DB" stroke="none"/>

                  <!-- Floor line -->
                  <line x1="-20" y1="10" x2="20" y2="10" stroke="#1C1C1E" stroke-opacity="0.2" stroke-width="0.5"/>

                  <!-- Back wall window -->
                  <rect x="-8" y="-14" width="16" height="14" fill="rgba(196,113,74,0.15)" stroke="#1C1C1E" stroke-opacity="0.3" stroke-width="0.5"/>

                  <!-- Desk -->
                  <rect x="-14" y="6" width="14" height="2" fill="none" stroke="#1C1C1E" stroke-opacity="0.35" stroke-width="0.6"/>
                  <line x1="-13" y1="8" x2="-13" y2="10" stroke="#1C1C1E" stroke-opacity="0.3" stroke-width="0.5"/>
                  <line x1="-2"  y1="8" x2="-2"  y2="10" stroke="#1C1C1E" stroke-opacity="0.3" stroke-width="0.5"/>

                  <!-- Chair silhouette -->
                  <rect x="5" y="4" width="8" height="6" rx="1" fill="rgba(45,91,90,0.3)" stroke="none"/>

                  <!-- Plant -->
                  <line x1="16" y1="10" x2="16" y2="4"  stroke="#2D5B5A" stroke-opacity="0.5" stroke-width="0.6"/>
                  <circle cx="16" cy="3" r="3" fill="rgba(45,91,90,0.25)" stroke="none"/>

                  <!-- Light glow from ceiling -->
                  <ellipse cx="0" cy="-18" rx="14" ry="3" fill="rgba(196,113,74,0.08)" stroke="none"/>
                </g>

                <defs>
                  <clipPath id="window-clip">
                    <rect x="-20" y="-18" width="40" height="30"/>
                  </clipPath>
                </defs>

              </g>
            </g>

            <!-- ── FOREGROUND ELEMENTS ── -->
            <!-- Street level detail -->
            <g id="street-detail" stroke-opacity="0.12" stroke-width="0.8">
              <rect x="390" y="540" width="30" height="20"/> <!-- door -->
              <line x1="405" y1="540" x2="405" y2="560"/>
              <!-- Trees -->
              <line x1="350" y1="560" x2="350" y2="520"/>
              <circle cx="350" cy="516" r="8" stroke-opacity="0.1"/>
              <line x1="570" y1="560" x2="570" y2="525"/>
              <circle cx="570" cy="521" r="7" stroke-opacity="0.1"/>
            </g>

            <!-- ── GRID / CITY MAP LINES (far below, fade in Act 1) ── -->
            <g id="city-map" stroke-opacity="0.06" stroke-width="0.7">
              <line x1="100" y1="580" x2="800" y2="580"/>
              <line x1="100" y1="590" x2="800" y2="590"/>
              <line x1="200" y1="565" x2="200" y2="600"/>
              <line x1="350" y1="565" x2="350" y2="600"/>
              <line x1="500" y1="565" x2="500" y2="600"/>
              <line x1="650" y1="565" x2="650" y2="600"/>
            </g>

          </svg>
          <!-- END SVG -->

          <!-- ACT LABELS (bottom right) -->
          <div id="act-label" style="
            position:absolute;bottom:48px;left:48px;
            font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;
            color:var(--charcoal-30);text-transform:uppercase;
            transition:opacity 0.4s ease;
          ">Aerial View — Central India</div>
        </div>
        <!-- END SVG WRAP -->

        <!-- STATS BAR (bottom, always visible) -->
        <div id="hero-stats" style="
          position:absolute;bottom:0;left:0;right:0;
          border-top:1px solid var(--cream-mid);
          display:grid;grid-template-columns:repeat(4,1fr);
          background:var(--cream);z-index:25;
          opacity:0;
        ">
          ${statsHtml}
        </div>

      </div>
      <!-- END STICKY PANEL -->

    </div>
    <!-- END PIN WRAP -->
  `;

  // ── GSAP ENTRANCE ──────────────────────────────────────────
  gsap.set('.split-word-inner', { yPercent: 105 });

  const entrance = gsap.timeline({ delay: 0.2 });
  entrance
    .to('.split-word-inner', { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.08 })
    .to('.will-reveal', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, 0.4)
    .to('#hero-stats', { opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.2);

  // ── SCROLL-DRIVEN PIN SEQUENCE ───────────────────────────────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-pin-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      pin: '#hero-sticky',
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: function(self) { updateActIndicator(self.progress); },
    }
  });

  const actLabel = document.getElementById('act-label');
  const labels = ['Aerial View — Central India', 'Zooming In — Hero Building', 'Interior — Your Future Space'];

  function updateActIndicator(p) {
    const act = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
    document.querySelectorAll('.act-dot').forEach(function(d, i) {
      d.style.background = i === act ? 'var(--teal)' : 'var(--cream-mid)';
      d.style.transform = i === act ? 'scale(1.6)' : 'scale(1)';
    });
    if (actLabel) actLabel.textContent = labels[act];
  }

  // ── ACT 1 → ACT 2: zoom into hero building ──
  tl.to('#hero-building', {
    scale: 3.5,
    x: -150,
    y: 80,
    duration: 1,
    ease: 'power2.inOut',
    transformOrigin: '450px 380px',
  }, 0.33)

  // Fade BG buildings away
  .to(['#bg-buildings', '#mid-buildings', '#street-detail', '#city-map'], {
    opacity: 0, duration: 0.6, ease: 'power2.in',
  }, 0.33)

  // Swap text Act 1 → Act 2
  .to('#act1-text', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 0.3)
  .to('#act2-text', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.45)

  // ── ACT 2 → ACT 3: window opens ──
  // Further zoom to focus window
  .to('#hero-building', {
    scale: 18,
    x: -5300,
    y: -3800,
    duration: 1,
    ease: 'power2.inOut',
    transformOrigin: '450px 340px',
  }, 0.67)

  // Swap text Act 2 → Act 3
  .to('#act2-text', { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' }, 0.64)
  .to('#act3-text', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.72)

  // Show room interior before shutters open
  .to('#room-interior', { opacity: 1, duration: 0.3 }, 0.70)

  // LEFT shutter swings open (rotateY perspective trick via scaleX)
  .to('#shutter-left', {
    scaleX: 0.05,
    duration: 0.5,
    ease: 'power3.inOut',
    transformOrigin: 'left center',
    attr: { 'stroke-opacity': 0 },
  }, 0.72)

  // RIGHT shutter swings open
  .to('#shutter-right', {
    scaleX: 0.05,
    duration: 0.5,
    ease: 'power3.inOut',
    transformOrigin: 'right center',
    attr: { 'stroke-opacity': 0 },
  }, 0.74);

  // ── Stats bar entry on first scroll ──
  ScrollTrigger.create({
    trigger: '#hero-pin-wrap',
    start: 'top+=50 top',
    once: true,
    onEnter: function() { gsap.to('#hero-stats', { opacity: 1, duration: 0.6 }); },
  });
}
