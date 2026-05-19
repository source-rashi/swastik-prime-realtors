// src/audio/ambient.js — Howler.js Ambient Sound
import { Howl } from 'howler'

let ambientSound = null
let isPlaying = false

export function initAmbientAudio() {
  const toggle = document.getElementById('audio-toggle')
  if (!toggle) return

  toggle.addEventListener('click', () => {
    if (!ambientSound) {
      // Lazy-load audio on first interaction
      ambientSound = new Howl({
        src: ['/audio/ambient.mp3'],
        loop: true,
        volume: 0.15,
        html5: true
      })
    }

    if (isPlaying) {
      ambientSound.fade(0.15, 0, 500)
      setTimeout(() => ambientSound.pause(), 500)
      toggle.classList.remove('active')
    } else {
      ambientSound.play()
      ambientSound.fade(0, 0.15, 500)
      toggle.classList.add('active')
    }

    isPlaying = !isPlaying
  })

  console.log('[Audio] Ambient audio ready')
}
