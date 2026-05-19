// src/audio/ambient.js — Howler.js Ambient Sound
import { Howl } from 'howler';

let ambientSound = null;
let isPlaying = false;

export function initAudio() {
  if (ambientSound) return;

  ambientSound = new Howl({
    src: ['/audio/ambient.mp3'],
    loop: true,
    volume: 0.15,
    html5: true,
  });

  // Don't autoplay — just prepare. Toggle via UI if needed.
  console.log('[Audio] Ambient audio initialized');
}

export function toggleAudio() {
  if (!ambientSound) return;

  if (isPlaying) {
    ambientSound.fade(0.15, 0, 500);
    setTimeout(() => ambientSound.pause(), 500);
  } else {
    ambientSound.play();
    ambientSound.fade(0, 0.15, 500);
  }

  isPlaying = !isPlaying;
  return isPlaying;
}
