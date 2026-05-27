import * as THREE from 'three';

// ── EXPORTS ─────────────────────────────────────────────────────
export let renderer, scene, camera;
export const winGroups = [];

// ── INIT ────────────────────────────────────────────────────────
export function initScene(container) {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#06141A');
  scene.fog = new THREE.FogExp2('#06141A', 0.016);

  // Camera — starts wide/high for Act 1
  camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 300);
  camera.position.set(0, 22, 52);
  camera.lookAt(10, 5, 0);

  setupLights();
  buildCity();
  buildGround();
  buildParticles();
  buildWireframeSphere();

  window.addEventListener('resize', onResize);
  return renderer;
}

// ── LIGHTS ──────────────────────────────────────────────────────
function setupLights() {
  // Ambient — deep teal, low
  scene.add(new THREE.AmbientLight('#162E32', 2.2)); // slightly less ambient so buildings have more contrast

  // Key — warm gold, top-right, casts shadows
  const key = new THREE.DirectionalLight('#E8D5A8', 2.0); // cooler, cleaner gold
  key.position.set(14, 32, 12);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -50;
  key.shadow.camera.right = 50;
  key.shadow.camera.top = 50;
  key.shadow.camera.bottom = -8;
  key.shadow.camera.far = 100;
  key.shadow.bias = -0.001;
  scene.add(key);

  // Rim — terracotta, opposite side
  const rim = new THREE.DirectionalLight('#B85530', 1.2);
  rim.position.set(-18, 8, -14);
  scene.add(rim);

  // Point lights through city
  const ptData = [
    { pos: [5, 10, 2],   color: '#C8A96E', intensity: 6, dist: 30 },
    { pos: [14, 14, 1],  color: '#C8A96E', intensity: 5, dist: 25 },
    { pos: [10, 8, -5],  color: '#B85530', intensity: 4, dist: 22 },
    { pos: [20, 12, 2],  color: '#D4B87A', intensity: 5, dist: 28 },
    { pos: [8,  6,  6],  color: '#C8A96E', intensity: 3, dist: 20 },
  ];
  ptData.forEach(({ pos, color, intensity, dist }) => {
    const pt = new THREE.PointLight(color, intensity, dist);
    pt.position.set(...pos);
    scene.add(pt);
  });
}

// ── BUILDINGS ───────────────────────────────────────────────────
//  [x, z, width, depth, height, emissiveIntensity]
const BUILDING_DATA = [
  [6,   -2,  3.0, 2.4, 24, 0.22],
  [10.5,-3,  2.6, 2.0, 17, 0.15],
  [14,  -1.5,3.8, 2.8, 30, 0.24],
  [18,  -2,  2.4, 1.9, 13, 0.13],
  [15.5, 2.5,2.2, 1.8, 20, 0.17],
  [4.5,  1.0,2.4, 2.0, 14, 0.14],
  [20,  -1,  3.2, 2.2, 22, 0.18],
  [11,   2.5,2.6, 2.0, 11, 0.12],
  [22.5,-2,  2.0, 2.0, 16, 0.15],
  [7.5, -5,  2.8, 2.4, 10, 0.10],
  [15,  -5.5,3.2, 2.4,  8, 0.09],
  [24,  -1,  2.2, 2.2, 11, 0.11],
  [9,    4.5,1.8, 1.6,  9, 0.10],
  [18,   4,  2.0, 1.8, 13, 0.12],
  [21,   2,  2.8, 2.2, 15, 0.13],
  [3.5, -4.5,2.2, 2.0, 11, 0.11],
  [12,  -6.5,2.0, 1.8,  7, 0.08],
  [26,  -1.5,2.2, 2.2, 10, 0.10],
  [13,   5.5,1.8, 1.6,  8, 0.09],
  [6.5,  6,  1.6, 1.4,  6, 0.07],
  [2,   -2,  2.0, 1.8, 12, 0.12],
  [25,   2,  2.0, 1.8,  8, 0.09],
  [17,  -6,  2.4, 2.0,  6, 0.07],
];

function buildCity() {
  const bodyMat = (ei) => new THREE.MeshStandardMaterial({
    color: '#0A1E26',          // deeper, cleaner dark teal
    emissive: new THREE.Color('#C8A96E'),
    emissiveIntensity: ei * 0.7, // reduce so buildings look crisp not muddy
    metalness: 0.92,
    roughness: 0.18,
  });

  const roofMat = new THREE.MeshStandardMaterial({
    color: '#C8A96E',
    emissive: '#C8A96E',
    emissiveIntensity: 0.75,
  });

  BUILDING_DATA.forEach(([x, z, w, d, h, ei]) => {
    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat(ei));
    body.position.set(x, h / 2, z);
    body.castShadow = true;
    body.receiveShadow = true;
    scene.add(body);

    // Roof emissive strip
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.1, 0.07, d + 0.1),
      roofMat
    );
    roof.position.set(x, h + 0.035, z);
    scene.add(roof);

    // Windows
    const wg = buildWindowGrid(x, z, w, d, h);
    winGroups.push(wg);
    scene.add(wg);

    // Antenna + blink on tall buildings
    if (h > 20) {
      const ant = new THREE.Mesh(
        new THREE.CylinderGeometry(0.028, 0.028, 4.5, 8),
        new THREE.MeshStandardMaterial({ color: '#C8A96E', emissive: '#C8A96E', emissiveIntensity: 0.45 })
      );
      ant.position.set(x, h + 2.25, z);
      scene.add(ant);

      const blinkMat = new THREE.MeshStandardMaterial({ color: '#ff4040', emissive: '#ff0000', emissiveIntensity: 3 });
      const blink = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), blinkMat);
      blink.position.set(x, h + 4.6, z);
      scene.add(blink);

      let on = true;
      setInterval(() => {
        on = !on;
        blinkMat.emissiveIntensity = on ? 3 : 0.1;
      }, 900 + Math.random() * 800);
    }
  });
}

function buildWindowGrid(bx, bz, bw, bd, bh) {
  const group = new THREE.Group();
  group.userData.isWinGroup = true;

  const rows = Math.floor(bh / 1.55);
  const cols = Math.floor(bw / 1.0);
  const sideCols = Math.floor(bd / 1.0);

  // Front face windows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.30) {
        const lit = Math.random() > 0.45;
        const wm = new THREE.MeshStandardMaterial({
          color: lit ? '#F0E0B0' : '#0e2030',
          emissive: lit ? '#E8C878' : '#080e14',
          emissiveIntensity: lit ? 1.1 : 0.03,
        });
        const w = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.44), wm);
        w.position.set(bx + (c - cols / 2) * 0.82 + 0.38, 1.1 + r * 1.45, bz + bd / 2 + 0.012);
        w.userData.lit = lit;
        group.add(w);
      }
    }
  }

  // Right side windows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < sideCols; c++) {
      if (Math.random() > 0.45) {
        const lit = Math.random() > 0.50;
        const wm = new THREE.MeshStandardMaterial({
          color: lit ? '#C8B878' : '#162828',
          emissive: lit ? '#C8A96E' : '#0a1818',
          emissiveIntensity: lit ? 0.65 : 0.04,
        });
        const w = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.44), wm);
        w.rotation.y = Math.PI / 2;
        w.position.set(bx + bw / 2 + 0.012, 1.1 + r * 1.45, bz + (c - sideCols / 2) * 0.82 + 0.38);
        w.userData.lit = lit;
        group.add(w);
      }
    }
  }

  return group;
}

// ── GROUND ──────────────────────────────────────────────────────
function buildGround() {
  // Main ground plane
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({
      color: '#060F12',
      metalness: 0.92,
      roughness: 0.22,
      emissive: '#091518',
      emissiveIntensity: 0.25,
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Gold grid lines — horizontal
  for (let i = 0; i < 36; i++) {
    const m = new THREE.MeshBasicMaterial({ color: '#C8A96E', transparent: true, opacity: 0.055 });
    const line = new THREE.Mesh(new THREE.PlaneGeometry(90, 0.013), m);
    line.rotation.x = -Math.PI / 2;
    line.position.set(13, 0.005, -22 + i * 3.2);
    scene.add(line);
  }

  // Gold grid lines — vertical
  for (let i = 0; i < 24; i++) {
    const m = new THREE.MeshBasicMaterial({ color: '#C8A96E', transparent: true, opacity: 0.038 });
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.013, 90), m);
    line.rotation.x = -Math.PI / 2;
    line.position.set(-8 + i * 3.8, 0.005, 8);
    scene.add(line);
  }
}

// ── PARTICLES ───────────────────────────────────────────────────
let particleSystem;

function buildParticles() {
  const count = 220;
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const gold = new THREE.Color('#C8A96E');
  const terra = new THREE.Color('#B85530');

  for (let i = 0; i < count; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 90;
    pos[i*3+1] = Math.random() * 38;
    pos[i*3+2] = (Math.random() - 0.5) * 70;
    const c = Math.random() > 0.65 ? terra : gold;
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  particleSystem = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.11,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  }));
  scene.add(particleSystem);
}

// ── WIREFRAME SPHERE (ambient depth) ────────────────────────────
let wfSphere;
function buildWireframeSphere() {
  wfSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(5.5, 1),
    new THREE.MeshStandardMaterial({
      color: '#C8A96E',
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      emissive: '#C8A96E',
      emissiveIntensity: 0.18,
    })
  );
  wfSphere.position.set(6, 17, -9);
  scene.add(wfSphere);
}

// ── ANIMATE (called from main loop) ─────────────────────────────
let flickTimer = 0;

export function tickScene(elapsed) {
  if (wfSphere) {
    wfSphere.rotation.x = elapsed * 0.06;
    wfSphere.rotation.y = elapsed * 0.10;
    wfSphere.position.y = 17 + Math.sin(elapsed * 0.20) * 0.9;
  }
  if (particleSystem) {
    particleSystem.rotation.y = elapsed * 0.007;
    particleSystem.position.y = Math.sin(elapsed * 0.08) * 0.35;
  }

  // Window flicker
  flickTimer++;
  if (flickTimer > 9) {
    flickTimer = 0;
    winGroups.forEach(wg => {
      wg.children.forEach(w => {
        if (Math.random() > 0.996) {
          w.userData.lit = !w.userData.lit;
          w.material.emissiveIntensity = w.userData.lit ? 0.85 : 0.04;
          w.material.emissive.setHex(w.userData.lit ? 0xC8A96E : 0x0a1818);
        }
      });
    });
  }
}

// ── RESIZE ──────────────────────────────────────────────────────
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
