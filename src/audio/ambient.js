import { Howl } from 'howler';

let ambientSound;
let initialized = false;

export function initAudio() {
  if (initialized) return;
  initialized = true;

  // Using Web Audio API to generate a subtle ambient drone
  generateAmbientTone();

  // Audio toggle button
  createAudioToggle();
}

function generateAmbientTone() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  // Subtle ambient drone - two detuned oscillators
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'sine';
  osc1.frequency.value = 55; // A1
  osc2.type = 'sine';
  osc2.frequency.value = 55.3; // Slight detune for warmth

  filter.type = 'lowpass';
  filter.frequency.value = 400;

  gain.gain.value = 0;

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start();
  osc2.start();

  // Fade in slowly
  gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3);

  window._audioCtx = ctx;
  window._audioGain = gain;
}

function createAudioToggle() {
  const toggle = document.createElement('button');
  toggle.id = 'audio-toggle';
  toggle.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  `;
  Object.assign(toggle.style, {
    position: 'fixed',
    bottom: '40px',
    left: '40px',
    zIndex: '50',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid rgba(201,168,76,0.3)',
    color: '#C9A84C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'none',
    transition: 'all 0.3s ease',
  });

  let muted = false;
  toggle.addEventListener('click', () => {
    muted = !muted;
    if (window._audioGain) {
      window._audioGain.gain.linearRampToValueAtTime(
        muted ? 0 : 0.04,
        window._audioCtx.currentTime + 0.5
      );
    }
    toggle.style.opacity = muted ? '0.4' : '1';
  });

  document.body.appendChild(toggle);
}
