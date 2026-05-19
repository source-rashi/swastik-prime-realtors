// src/three/scene.js — Three.js Main Scene Manager
import * as THREE from 'three'

let scene, camera, renderer, clock

export function initScene() {
  const canvas = document.getElementById('webgl-canvas')

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0a0a0f, 0.015)

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 2, 8)

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  clock = new THREE.Clock()

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x404060, 0.5)
  scene.add(ambientLight)

  // Key light
  const dirLight = new THREE.DirectionalLight(0xc9a84c, 0.8)
  dirLight.position.set(5, 10, 5)
  scene.add(dirLight)

  // Rim light
  const rimLight = new THREE.PointLight(0x5b8fb9, 0.6, 50)
  rimLight.position.set(-5, 3, -5)
  scene.add(rimLight)

  window.addEventListener('resize', onResize)
  animate()

  return { scene, camera, renderer }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  const elapsed = clock.getElapsedTime()

  // Gentle camera sway
  camera.position.x = Math.sin(elapsed * 0.1) * 0.3
  camera.position.y = 2 + Math.sin(elapsed * 0.15) * 0.15

  renderer.render(scene, camera)
}

export { scene, camera, renderer }
