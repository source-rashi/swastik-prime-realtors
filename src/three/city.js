import * as THREE from 'three';

export function createCity(scene) {
  const cityGroup = new THREE.Group();

  const buildingConfigs = [
    // [x, z, w, d, h, emissiveIntensity]
    [6,   -2,  2.8, 2.2, 20, 0.18],
    [10,  -3,  2.2, 1.8, 14, 0.12],
    [13.5,-1,  3.2, 2.5, 26, 0.20],
    [17,  -2,  2.0, 1.6, 10, 0.10],
    [15,   2,  1.8, 1.5, 16, 0.14],
    [4,    1,  2.0, 1.6, 11, 0.11],
    [19,  -1,  2.8, 2.0, 18, 0.15],
    [10.5, 2,  2.2, 1.6, 9,  0.09],
    [21,  -2,  1.6, 1.6, 13, 0.12],
    [7,   -5,  2.2, 2.0, 8,  0.08],
    [14,  -5,  2.8, 2.2, 6,  0.07],
    [23,  -3,  2.0, 1.8, 15, 0.13],
    [8,    4,  1.4, 1.4, 7,  0.08],
    [17,   4,  1.6, 1.6, 10, 0.10],
    [20,   2,  2.4, 2.0, 12, 0.11],
    [3,   -4,  1.8, 1.6, 9,  0.09],
    [11,  -6,  1.6, 1.4, 5,  0.06],
    [25,  -1,  1.8, 1.8, 8,  0.08],
    [12,   5,  1.4, 1.2, 6,  0.07],
    [6,    6,  1.2, 1.2, 4,  0.05],
  ];

  buildingConfigs.forEach(([x, z, w, d, h, ei]) => {
    // Building body
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0c1525,
      emissive: 0xC9A84C,
      emissiveIntensity: ei,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.9,
    });
    const building = new THREE.Mesh(geo, mat);
    building.position.set(x, h / 2, z);
    building.castShadow = true;
    building.receiveShadow = true;
    scene.add(building);

    // Windows
    const windowGroup = createWindowGrid(x, z, w, d, h);
    scene.add(windowGroup);

    // Roof accent (gold trim)
    const roofGeo = new THREE.BoxGeometry(w + 0.1, 0.08, d + 0.1);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      emissive: 0xC9A84C,
      emissiveIntensity: 0.8,
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(x, h + 0.04, z);
    scene.add(roof);

    // Antenna on tall buildings
    if (h > 18) {
      const antGeo = new THREE.CylinderGeometry(0.03, 0.03, 3, 8);
      const antMat = new THREE.MeshStandardMaterial({ color: 0xC9A84C, emissive: 0xC9A84C, emissiveIntensity: 0.5 });
      const ant = new THREE.Mesh(antGeo, antMat);
      ant.position.set(x, h + 1.5 + 0.04, z);
      scene.add(ant);

      // Blinking light
      const blinkGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const blinkMat = new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0xff0000, emissiveIntensity: 2 });
      const blink = new THREE.Mesh(blinkGeo, blinkMat);
      blink.position.set(x, h + 3.1, z);
      scene.add(blink);

      // Animate blink
      let on = true;
      setInterval(() => {
        on = !on;
        blinkMat.emissiveIntensity = on ? 2 : 0.1;
      }, 1000 + Math.random() * 1000);
    }
  });

  return cityGroup;
}

function createWindowGrid(bx, bz, bw, bd, bh) {
  const group = new THREE.Group();
  group.userData.isWindowGroup = true;

  const rows = Math.floor(bh / 1.4);
  const cols = Math.floor(bw / 0.9);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.35) {
        const wGeo = new THREE.PlaneGeometry(0.28, 0.38);
        const isLit = Math.random() > 0.45;
        const wMat = new THREE.MeshStandardMaterial({
          color: isLit ? 0xE8C97A : 0x1a2a44,
          emissive: isLit ? 0xC9A84C : 0x0d1628,
          emissiveIntensity: isLit ? 0.85 : 0.05,
          transparent: true,
          opacity: isLit ? 1 : 0.8,
        });
        const win = new THREE.Mesh(wGeo, wMat);
        win.position.set(
          bx + (c - cols / 2) * 0.75 + 0.35,
          1.2 + r * 1.25,
          bz + bd / 2 + 0.01
        );
        win.userData.isLit = isLit;
        group.add(win);

        // Side windows (for 3D depth)
        if (Math.random() > 0.5) {
          const sideWin = win.clone();
          sideWin.rotation.y = Math.PI / 2;
          sideWin.position.set(bx + bw / 2 + 0.01, win.position.y, bz + (c - cols / 2) * 0.75 + 0.35);
          group.add(sideWin);
        }
      }
    }
  }

  return group;
}
