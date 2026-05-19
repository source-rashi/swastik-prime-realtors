import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createCity } from './city.js';
import { createParticles } from './particles.js';

gsap.registerPlugin(ScrollTrigger);

let renderer, scene, camera, city, particles, sphere;
let mouseX = 0, mouseY = 0;
let targetCamX = 0, targetCamY = 8;

export function initScene() {
  const canvas = document.getElementById('three-canvas');

  // RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // SCENE
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050810, 0.018);

  // CAMERA
  camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 10, 30);

  // LIGHTING
  setupLighting();

  // OBJECTS
  city = createCity(scene);
  particles = createParticles(scene);

  // WIREFRAME SPHERE
  const sphereGeo = new THREE.IcosahedronGeometry(4, 1);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xC9A84C,
    wireframe: true,
    transparent: true,
    opacity: 0.07,
    emissive: 0xC9A84C,
    emissiveIntensity: 0.3,
  });
  sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.set(4, 14, -6);
  scene.add(sphere);

  // GROUND PLANE (reflective)
  const groundGeo = new THREE.PlaneGeometry(150, 150);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x050810,
    metalness: 0.95,
    roughness: 0.2,
    emissive: 0x0a0f18,
    emissiveIntensity: 0.3,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Ground grid lines
  for (let i = 0; i < 30; i++) {
    const geo = new THREE.PlaneGeometry(80, 0.015);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xC9A84C,
      transparent: true,
      opacity: 0.08,
    });
    const line = new THREE.Mesh(geo, mat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(15, 0.005, -20 + i * 3);
    scene.add(line);
  }
  for (let i = 0; i < 20; i++) {
    const geo = new THREE.PlaneGeometry(0.015, 80);
    const mat = new THREE.MeshBasicMaterial({ color: 0xC9A84C, transparent: true, opacity: 0.06 });
    const line = new THREE.Mesh(geo, mat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(-10 + i * 4, 0.005, 10);
    scene.add(line);
  }

  // SCROLL-DRIVEN CAMERA ANIMATION
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress;
      // Camera flies through city as user scrolls
      gsap.to(camera.position, {
        x: p * 8,
        y: 10 - p * 4,
        z: 30 - p * 12,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
  });

  // MOUSE PARALLAX
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // RESIZE
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // RENDER LOOP
  animate();
}

function setupLighting() {
  // Ambient
  scene.add(new THREE.AmbientLight(0x050810, 3));

  // Key light (gold)
  const key = new THREE.DirectionalLight(0xC9A84C, 2);
  key.position.set(15, 25, 10);
  key.castShadow = true;
  key.shadow.mapSize.width = 2048;
  key.shadow.mapSize.height = 2048;
  key.shadow.camera.far = 80;
  key.shadow.camera.left = -40;
  key.shadow.camera.right = 40;
  key.shadow.camera.top = 40;
  key.shadow.camera.bottom = -10;
  scene.add(key);

  // Rim light (orange)
  const rim = new THREE.DirectionalLight(0xE07B39, 1.2);
  rim.position.set(-20, 8, -15);
  scene.add(rim);

  // Point lights scattered through city
  const pointPositions = [[5,8,0],[14,12,2],[8,6,-5],[18,10,-2],[11,15,-8]];
  pointPositions.forEach(([x, y, z], i) => {
    const pt = new THREE.PointLight(i % 2 === 0 ? 0xC9A84C : 0xE8C97A, 4, 25);
    pt.position.set(x, y, z);
    scene.add(pt);
  });
}

const clock = new THREE.Clock();
let flickerTimer = 0;

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Camera mouse parallax (smooth)
  targetCamX += (mouseX * 3 - targetCamX) * 0.04;
  targetCamY += (-mouseY * 2 + 8 - targetCamY) * 0.04;
  camera.position.x += (targetCamX - camera.position.x) * 0.05;
  camera.lookAt(10, 6, 0);

  // Sphere animation
  sphere.rotation.x = t * 0.08;
  sphere.rotation.y = t * 0.12;
  sphere.position.y = 14 + Math.sin(t * 0.25) * 0.8;
  sphere.material.opacity = 0.05 + Math.sin(t * 0.5) * 0.02;

  // Particles drift
  if (particles) {
    particles.rotation.y = t * 0.008;
    particles.position.y = Math.sin(t * 0.08) * 0.3;
  }

  // Window flickering
  flickerTimer++;
  if (flickerTimer > 8) {
    flickerWindows();
    flickerTimer = 0;
  }

  renderer.render(scene, camera);
}

function flickerWindows() {
  scene.children.forEach(child => {
    if (child.userData.isWindowGroup) {
      child.children.forEach(win => {
        if (Math.random() > 0.996) {
          win.userData.isLit = !win.userData.isLit;
          win.material.emissive.setHex(win.userData.isLit ? 0xC9A84C : 0x0d1628);
          win.material.emissiveIntensity = win.userData.isLit ? 0.9 : 0.05;
        }
      });
    }
  });
}
