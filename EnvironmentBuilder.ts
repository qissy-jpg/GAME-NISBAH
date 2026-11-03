import * as THREE from 'three';

export class EnvironmentBuilder {
  private static canvasTextureCache = new Map<string, THREE.CanvasTexture>();

  /**
   * Helper to create crisp high-resolution CanvasTexture for 3D text billboards
   */
  public static createTextTexture(
    text: string,
    subText: string = '',
    bgColor: string = '#1e1b4b',
    textColor: string = '#ffffff',
    borderColor: string = '#38bdf8'
  ): THREE.CanvasTexture {
    const key = `${text}_${subText}_${bgColor}_${textColor}_${borderColor}`;
    if (this.canvasTextureCache.has(key)) {
      return this.canvasTextureCache.get(key)!;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Background rounded rectangle
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 14;

    const r = 28;
    const w = canvas.width - 20;
    const h = canvas.height - 20;
    const x = 10;
    const y = 10;

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Subtle gloss top gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.5);
    grad.addColorStop(0, 'rgba(255,255,255,0.22)');
    grad.addColorStop(1, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Subtext (e.g. "LORONG KIRI / LEFT")
    if (subText) {
      ctx.fillStyle = borderColor;
      ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(subText.toUpperCase(), canvas.width / 2, 60);
    }

    // Main ratio text (e.g. "2 : 3")
    ctx.fillStyle = textColor;
    ctx.font = '900 68px "Fredoka", "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, subText ? 150 : 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    this.canvasTextureCache.set(key, texture);
    return texture;
  }

  /**
   * Builds a glowing Quiz Gate arch for a specific lane
   */
  public static createQuizGate(
    optionText: string,
    laneLabel: string,
    laneX: number,
    colorHex: number = 0x38bdf8
  ): THREE.Group {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(laneX, 0, 0);

    // Arch pillars (Left and Right)
    const pillarGeom = new THREE.CylinderGeometry(0.14, 0.16, 4.4, 12);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
      emissive: colorHex,
      emissiveIntensity: 0.25,
    });

    const leftPillar = new THREE.Mesh(pillarGeom, pillarMat);
    leftPillar.position.set(-1.25, 2.2, 0);
    leftPillar.castShadow = true;
    gateGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeom, pillarMat);
    rightPillar.position.set(1.25, 2.2, 0);
    rightPillar.castShadow = true;
    gateGroup.add(rightPillar);

    // Top Arch Lintel
    const lintelGeom = new THREE.BoxGeometry(2.8, 0.35, 0.4);
    const lintel = new THREE.Mesh(lintelGeom, pillarMat);
    lintel.position.set(0, 4.3, 0);
    lintel.castShadow = true;
    gateGroup.add(lintel);

    // Glowing Neon Rings on Pillars
    const neonRingGeom = new THREE.TorusGeometry(0.2, 0.04, 8, 16);
    const neonMat = new THREE.MeshBasicMaterial({ color: colorHex });
    [-1.25, 1.25].forEach((px) => {
      [1.2, 2.4, 3.6].forEach((py) => {
        const ring = new THREE.Mesh(neonRingGeom, neonMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(px, py, 0);
        gateGroup.add(ring);
      });
    });

    // Answer Billboard Sign
    const signTex = this.createTextTexture(optionText, laneLabel, '#0f172a', '#ffffff', '#' + colorHex.toString(16).padStart(6, '0'));
    const signGeom = new THREE.PlaneGeometry(2.3, 1.15);
    const signMat = new THREE.MeshBasicMaterial({
      map: signTex,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const signMesh = new THREE.Mesh(signGeom, signMat);
    signMesh.position.set(0, 3.3, 0);
    gateGroup.add(signMesh);

    // Light barrier veil inside arch
    const veilGeom = new THREE.PlaneGeometry(2.3, 2.6);
    const veilMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const veilMesh = new THREE.Mesh(veilGeom, veilMat);
    veilMesh.position.set(0, 1.5, 0);
    gateGroup.add(veilMesh);

    return gateGroup;
  }

  /**
   * Procedural Storm Cloud Obstacle with lightning flash potential
   */
  public static createStormCloud(): THREE.Group {
    const cloud = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Dark storm grey
      roughness: 0.9,
      metalness: 0.05,
    });

    const spheres = [
      { r: 0.8, x: 0, y: 0, z: 0 },
      { r: 0.65, x: -0.6, y: -0.1, z: 0.2 },
      { r: 0.65, x: 0.65, y: -0.15, z: -0.1 },
      { r: 0.5, x: 0.3, y: 0.35, z: 0.1 },
      { r: 0.5, x: -0.35, y: 0.3, z: -0.15 },
    ];

    spheres.forEach((s) => {
      const geom = new THREE.SphereGeometry(s.r, 12, 12);
      const m = new THREE.Mesh(geom, mat);
      m.position.set(s.x, s.y, s.z);
      m.castShadow = true;
      cloud.add(m);
    });

    // Lightning bolt sprite / geometry
    const boltGeom = new THREE.ConeGeometry(0.12, 0.7, 4);
    const boltMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
    const bolt = new THREE.Mesh(boltGeom, boltMat);
    bolt.position.set(0, -0.65, 0.1);
    bolt.rotation.z = Math.PI;
    cloud.add(bolt);

    cloud.scale.set(1.4, 1.3, 1.4);
    return cloud;
  }

  /**
   * Procedural Hot Air Balloon Obstacle
   */
  public static createHotAirBalloon(): THREE.Group {
    const balloonGroup = new THREE.Group();

    // Balloon envelope (Sphere stretched on Y)
    const envelopeGeom = new THREE.SphereGeometry(1.2, 16, 16);
    envelopeGeom.scale(1, 1.35, 1);
    const envelopeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Orange & cream stripes
      roughness: 0.4,
    });
    const envelope = new THREE.Mesh(envelopeGeom, envelopeMat);
    envelope.position.y = 1.4;
    envelope.castShadow = true;
    balloonGroup.add(envelope);

    // Stripes ring
    const stripeGeom = new THREE.TorusGeometry(1.18, 0.1, 8, 24);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
    const stripe = new THREE.Mesh(stripeGeom, stripeMat);
    stripe.rotation.x = Math.PI / 2;
    stripe.position.y = 1.4;
    balloonGroup.add(stripe);

    // Basket
    const basketGeom = new THREE.BoxGeometry(0.5, 0.45, 0.5);
    const basketMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const basket = new THREE.Mesh(basketGeom, basketMat);
    basket.position.y = -0.4;
    basket.castShadow = true;
    balloonGroup.add(basket);

    // Ropes connecting basket to envelope
    const ropeGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.9, 4);
    const ropeMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    [
      [-0.2, -0.2],
      [0.2, -0.2],
      [-0.2, 0.2],
      [0.2, 0.2],
    ].forEach(([rx, rz]) => {
      const rope = new THREE.Mesh(ropeGeom, ropeMat);
      rope.position.set(rx, 0.1, rz);
      balloonGroup.add(rope);
    });

    balloonGroup.scale.set(1.1, 1.1, 1.1);
    return balloonGroup;
  }

  /**
   * Procedural Sky Arch / Ancient Floating Rock Bridge
   */
  public static createSkyArch(): THREE.Group {
    const archGroup = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.8,
      metalness: 0.1,
    });

    const leftCol = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.2, 0.8), rockMat);
    leftCol.position.set(-1.4, 1.6, 0);
    leftCol.castShadow = true;
    archGroup.add(leftCol);

    const rightCol = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.2, 0.8), rockMat);
    rightCol.position.set(1.4, 1.6, 0);
    rightCol.castShadow = true;
    archGroup.add(rightCol);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.6, 1.0), rockMat);
    bridge.position.set(0, 3.2, 0);
    bridge.castShadow = true;
    archGroup.add(bridge);

    return archGroup;
  }

  /**
   * Procedural Sky Drone / Glider Obstacle
   */
  public static createSkyDrone(): THREE.Group {
    const drone = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
    const redGlow = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.25, 8), bodyMat);
    drone.add(body);

    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), redGlow);
    eye.position.set(0, 0, -0.4);
    drone.add(eye);

    // 4 rotor arms
    const armGeom = new THREE.BoxGeometry(1.6, 0.05, 0.08);
    const arm1 = new THREE.Mesh(armGeom, bodyMat);
    drone.add(arm1);
    const arm2 = new THREE.Mesh(armGeom, bodyMat);
    arm2.rotation.y = Math.PI / 2;
    drone.add(arm2);

    drone.scale.set(1.3, 1.3, 1.3);
    return drone;
  }

  /**
   * Procedural Golden Coin
   */
  public static createCoin(): THREE.Group {
    const group = new THREE.Group();
    const geom = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 16);
    geom.rotateX(Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.2,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    group.add(mesh);

    // Inner embossed star or dollar symbol
    const starGeom = new THREE.OctahedronGeometry(0.18, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
    });
    const star = new THREE.Mesh(starGeom, starMat);
    star.position.z = 0.05;
    group.add(star);

    return group;
  }

  /**
   * Procedural Math Crystal Gem (+25 pts)
   */
  public static createCrystal(): THREE.Group {
    const group = new THREE.Group();
    const geom = new THREE.OctahedronGeometry(0.4, 0);
    geom.scale(1, 1.4, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan crystal
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.88,
      emissive: 0x0891b2,
      emissiveIntensity: 0.4,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    group.add(mesh);

    return group;
  }

  /**
   * Procedural Air Boost Ring (Fly through for boost & points!)
   */
  public static createAirRing(): THREE.Group {
    const ringGroup = new THREE.Group();
    const geom = new THREE.TorusGeometry(1.4, 0.12, 12, 24);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald neon
    });
    const ring = new THREE.Mesh(geom, mat);
    ringGroup.add(ring);

    // Outer glow chevrons
    const chevronGeom = new THREE.ConeGeometry(0.2, 0.4, 4);
    chevronGeom.rotateZ(Math.PI);
    const chevronMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    for (let i = 0; i < 4; i++) {
      const c = new THREE.Mesh(chevronGeom, chevronMat);
      const angle = (i * Math.PI) / 2;
      c.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0);
      c.rotation.z = angle - Math.PI / 2;
      ringGroup.add(c);
    }

    return ringGroup;
  }

  /**
   * Procedural Floating Island for scenic backdrop
   */
  public static createFloatingIsland(): THREE.Group {
    const island = new THREE.Group();

    // Top grassy plateau
    const topGeom = new THREE.CylinderGeometry(4.5, 3.8, 1.2, 8);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e, // Cartoon lush green
      roughness: 0.7,
      metalness: 0.1,
    });
    const top = new THREE.Mesh(topGeom, grassMat);
    top.position.y = 0.6;
    top.castShadow = true;
    island.add(top);

    // Inverted rocky mountain cone underneath
    const rockGeom = new THREE.ConeGeometry(3.8, 6.0, 8);
    rockGeom.rotateX(Math.PI);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x78716c, // Warm stone
      roughness: 0.85,
      metalness: 0.1,
    });
    const rock = new THREE.Mesh(rockGeom, rockMat);
    rock.position.y = -2.4;
    island.add(rock);

    // Add tiny low-poly trees on the island
    for (let i = 0; i < 4; i++) {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 0.6, 5),
        new THREE.MeshStandardMaterial({ color: 0x5c2e0b, roughness: 0.9 })
      );
      trunk.position.y = 0.3;
      tree.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1.1, 5),
        new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 })
      );
      foliage.position.y = 0.9;
      tree.add(foliage);

      const angle = (i * Math.PI) / 2 + 0.3;
      const radius = 2.0;
      tree.position.set(Math.cos(angle) * radius, 1.2, Math.sin(angle) * radius);
      island.add(tree);
    }

    // A glowing giant crystal on the island
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x9333ea,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      })
    );
    crystal.position.set(0, 1.8, 0);
    crystal.scale.set(0.8, 1.6, 0.8);
    island.add(crystal);

    return island;
  }

  /**
   * Fluffy white cumulus cloud for the sky environment
   */
  public static createSkyCloud(): THREE.Group {
    const cloud = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0,
    });

    const numSpheres = 5;
    for (let i = 0; i < numSpheres; i++) {
      const radius = 1.0 + Math.random() * 0.8;
      const geom = new THREE.SphereGeometry(radius, 8, 8);
      const mesh = new THREE.Mesh(geom, cloudMat);
      mesh.position.set(
        (i - numSpheres / 2) * 1.2 + (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.8
      );
      cloud.add(mesh);
    }

    return cloud;
  }
}
