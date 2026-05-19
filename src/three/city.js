// src/three/city.js — 3D City/Buildings
import * as THREE from 'three'

export function createCity(scene) {
  const cityGroup = new THREE.Group()
  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    metalness: 0.8,
    roughness: 0.3,
    emissive: 0x0a0a1a,
    emissiveIntensity: 0.1
  })

  // Generate procedural city grid
  for (let x = -10; x <= 10; x += 2.5) {
    for (let z = -15; z <= -3; z += 2.5) {
      const height = 1 + Math.random() * 6
      const width = 0.8 + Math.random() * 0.8
      const geo = new THREE.BoxGeometry(width, height, width)
      const mesh = new THREE.Mesh(geo, buildingMaterial.clone())
      mesh.position.set(x + Math.random() * 0.5, height / 2, z + Math.random() * 0.5)

      // Window emissive spots
      mesh.material.emissiveIntensity = 0.05 + Math.random() * 0.15
      cityGroup.add(mesh)
    }
  }

  scene.add(cityGroup)
  return cityGroup
}
