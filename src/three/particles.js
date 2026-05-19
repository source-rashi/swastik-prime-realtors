// src/three/particles.js — Particle Systems
import * as THREE from 'three'

export function initParticles({ scene }) {
  const count = 2000
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = Math.random() * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    sizes[i] = Math.random() * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    color: 0xc9a84c,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Animate particles
  function animateParticles() {
    requestAnimationFrame(animateParticles)
    const positions = particles.geometry.attributes.position.array
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] += 0.002
      if (positions[i] > 20) positions[i] = 0
    }
    particles.geometry.attributes.position.needsUpdate = true
    particles.rotation.y += 0.0002
  }

  animateParticles()
  return particles
}
