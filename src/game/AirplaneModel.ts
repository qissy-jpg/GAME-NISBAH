import * as THREE from 'three';

export class AirplaneModel {
  public group: THREE.Group;
  private propeller: THREE.Group;
  private exhaustLeft: THREE.Mesh;
  private exhaustRight: THREE.Mesh;
  private shieldMesh: THREE.Mesh;

  // Animation values
  public targetX: number = 0;
  public targetY: number = 0;
  public currentX: number = 0;
  public currentY: number = 0;
  public rollAngle: number = 0;
  public pitchAngle: number = 0;
  public wobbleTimer: number = 0;
  public isInvincible: boolean = false;
  public isShielded: boolean = false;
  public crashAnimProgress: number = 0; // 0 = normal, >0 = crashing

  constructor() {
    this.group = new THREE.Group();

    // 1. Main Fuselage
    const fuselageGeom = new THREE.ConeGeometry(0.55, 2.6, 16);
    fuselageGeom.rotateX(Math.PI / 2);
    const fuselageMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Vibrant racing red
      roughness: 0.3,
      metalness: 0.2,
    });
    const fuselage = new THREE.Mesh(fuselageGeom, fuselageMat);
    fuselage.castShadow = true;
    fuselage.receiveShadow = true;
    fuselage.position.z = -0.2;
    this.group.add(fuselage);

    // Front Nose Cowling
    const noseGeom = new THREE.SphereGeometry(0.53, 16, 16);
    noseGeom.scale(1, 0.95, 1.2);
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Crisp cartoon white nose
      roughness: 0.25,
      metalness: 0.1,
    });
    const nose = new THREE.Mesh(noseGeom, noseMat);
    nose.position.z = -1.2;
    nose.castShadow = true;
    this.group.add(nose);

    // 2. Cockpit Canopy Glass
    const cockpitGeom = new THREE.SphereGeometry(0.38, 16, 16);
    cockpitGeom.scale(0.8, 1.1, 1.4);
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Sky blue reflective glass
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.85,
    });
    const cockpit = new THREE.Mesh(cockpitGeom, cockpitMat);
    cockpit.position.set(0, 0.35, -0.2);
    cockpit.castShadow = true;
    this.group.add(cockpit);

    // Pilot cute aviator helmet inside cockpit
    const helmetGeom = new THREE.SphereGeometry(0.18, 12, 12);
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber gold aviator helmet
      roughness: 0.4,
    });
    const helmet = new THREE.Mesh(helmetGeom, helmetMat);
    helmet.position.set(0, 0.32, -0.15);
    this.group.add(helmet);

    // Pilot Goggles
    const gogglesGeom = new THREE.BoxGeometry(0.24, 0.08, 0.08);
    const gogglesMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.8,
    });
    const goggles = new THREE.Mesh(gogglesGeom, gogglesMat);
    goggles.position.set(0, 0.34, -0.3);
    this.group.add(goggles);

    // 3. Main Wings (Biplane top & bottom or sturdy aerodynamic wings with struts)
    const wingGeom = new THREE.BoxGeometry(3.6, 0.08, 0.7);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.35,
      metalness: 0.1,
    });
    const wing = new THREE.Mesh(wingGeom, wingMat);
    wing.position.set(0, 0.05, -0.3);
    wing.castShadow = true;
    this.group.add(wing);

    // Wing Racing Stripes (Yellow)
    const stripeGeom = new THREE.BoxGeometry(0.35, 0.082, 0.71);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
    });
    const stripeLeft = new THREE.Mesh(stripeGeom, stripeMat);
    stripeLeft.position.set(-1.1, 0.05, -0.3);
    this.group.add(stripeLeft);

    const stripeRight = new THREE.Mesh(stripeGeom, stripeMat);
    stripeRight.position.set(1.1, 0.05, -0.3);
    this.group.add(stripeRight);

    // Wingtips (Vertical winglets)
    const wingletGeom = new THREE.BoxGeometry(0.06, 0.35, 0.4);
    const wingletMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
    const wingletL = new THREE.Mesh(wingletGeom, wingletMat);
    wingletL.position.set(-1.8, 0.15, -0.3);
    this.group.add(wingletL);

    const wingletR = new THREE.Mesh(wingletGeom, wingletMat);
    wingletR.position.set(1.8, 0.15, -0.3);
    this.group.add(wingletR);

    // 4. Tail Assembly
    // Vertical Stabilizer / Rudder
    const rudderGeom = new THREE.BoxGeometry(0.08, 0.8, 0.6);
    const rudderMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
    });
    const rudder = new THREE.Mesh(rudderGeom, rudderMat);
    rudder.position.set(0, 0.5, 0.9);
    rudder.rotation.x = -Math.PI / 8;
    rudder.castShadow = true;
    this.group.add(rudder);

    // Horizontal Stabilizer
    const horizTailGeom = new THREE.BoxGeometry(1.4, 0.06, 0.45);
    const horizTail = new THREE.Mesh(horizTailGeom, wingMat);
    horizTail.position.set(0, 0.15, 0.95);
    horizTail.castShadow = true;
    this.group.add(horizTail);

    // 5. Propeller Assembly
    this.propeller = new THREE.Group();
    this.propeller.position.set(0, 0, -1.8);

    const hubGeom = new THREE.CylinderGeometry(0.12, 0.15, 0.25, 12);
    hubGeom.rotateX(Math.PI / 2);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.2,
    });
    const hub = new THREE.Mesh(hubGeom, hubMat);
    this.propeller.add(hub);

    // Propeller Blades (Yellow & Black cartoon tipped)
    const bladeGeom = new THREE.BoxGeometry(0.12, 1.15, 0.02);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.3,
    });
    const blade1 = new THREE.Mesh(bladeGeom, bladeMat);
    const blade2 = new THREE.Mesh(bladeGeom, bladeMat);
    blade2.rotation.z = Math.PI / 2;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.group.add(this.propeller);

    // 6. Jet Exhaust / Thruster pipes on sides
    const exhaustGeom = new THREE.CylinderGeometry(0.1, 0.14, 0.35, 12);
    exhaustGeom.rotateX(Math.PI / 2);
    const exhaustMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2,
    });
    this.exhaustLeft = new THREE.Mesh(exhaustGeom, exhaustMat);
    this.exhaustLeft.position.set(-0.35, -0.1, 0.7);
    this.group.add(this.exhaustLeft);

    this.exhaustRight = new THREE.Mesh(exhaustGeom, exhaustMat);
    this.exhaustRight.position.set(0.35, -0.1, 0.7);
    this.group.add(this.exhaustRight);

    // 7. Floating Shield Bubble (shown when shielded or invincible)
    const shieldGeom = new THREE.SphereGeometry(2.2, 24, 24);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false,
    });
    this.shieldMesh = new THREE.Mesh(shieldGeom, shieldMat);
    this.group.add(this.shieldMesh);

    // Scale whole plane to nice friendly cartoon size
    this.group.scale.set(1.2, 1.2, 1.2);
    this.group.position.set(0, 1.8, 0);
  }

  public update(delta: number, speedMultiplier: number, isBoosting: boolean) {
    // 1. Spin propeller
    const propSpeed = (isBoosting ? 38 : 24) * speedMultiplier;
    this.propeller.rotation.z += propSpeed * delta;

    // 2. Smoothly glide position toward target (lane X & altitude Y)
    // Silky, controlled lerp factor suitable for comfortable student gameplay at higher speed
    const lerpFactor = 8.5 * delta;
    this.currentX = THREE.MathUtils.lerp(this.currentX, this.targetX, Math.min(1, lerpFactor));
    this.currentY = THREE.MathUtils.lerp(this.currentY, this.targetY, Math.min(1, lerpFactor));

    // Calculate velocity for dynamic banking
    const xDiff = this.targetX - this.currentX;
    const yDiff = this.targetY - this.currentY;

    // Roll angle: Smooth cartoon banking when changing lanes
    const targetRoll = -xDiff * 0.35;
    this.rollAngle = THREE.MathUtils.lerp(this.rollAngle, targetRoll, Math.min(1, 9 * delta));

    // Pitch angle: gentle nose up when climbing, nose down when diving
    const targetPitch = yDiff * 0.18;
    this.pitchAngle = THREE.MathUtils.lerp(this.pitchAngle, targetPitch, Math.min(1, 8 * delta));

    // 3. Gentle cartoon flight bobbing
    this.wobbleTimer += delta * 4;
    const idleBob = Math.sin(this.wobbleTimer) * 0.08;
    const idleRoll = Math.cos(this.wobbleTimer * 0.7) * 0.03;

    if (this.crashAnimProgress > 0) {
      // Crash spin out
      this.group.rotation.x += 8 * delta;
      this.group.rotation.y += 12 * delta;
      this.group.rotation.z += 10 * delta;
      this.group.position.y -= 3 * delta;
      return;
    }

    this.group.position.x = this.currentX;
    this.group.position.y = this.currentY + idleBob;
    this.group.rotation.z = this.rollAngle + idleRoll;
    this.group.rotation.x = this.pitchAngle;
    this.group.rotation.y = -xDiff * 0.12; // Slight yaw into turn

    // 4. Handle invincibility / shield visual feedback
    if (this.isShielded) {
      this.shieldMesh.visible = true;
      (this.shieldMesh.material as THREE.MeshStandardMaterial).opacity = 0.35 + Math.sin(this.wobbleTimer * 5) * 0.1;
      this.shieldMesh.rotation.y += delta * 2;
    } else if (this.isInvincible) {
      // Flashing airplane visibility
      const flash = Math.sin(this.wobbleTimer * 18) > 0;
      this.group.visible = flash;
      this.shieldMesh.visible = false;
    } else {
      this.group.visible = true;
      this.shieldMesh.visible = false;
    }
  }

  public setLanePosition(lane: -1 | 0 | 1, altitude: -1 | 0 | 1) {
    // 3 lanes: left (-3.2), center (0), right (3.2)
    this.targetX = lane * 3.2;
    // 3 altitudes: low (1.0), normal (1.8), high (2.8)
    const altMap = { '-1': 1.0, '0': 1.8, '1': 2.8 };
    this.targetY = altMap[altitude.toString() as keyof typeof altMap];
  }

  public triggerCrashAnimation() {
    this.crashAnimProgress = 1;
  }

  public resetFlight() {
    this.crashAnimProgress = 0;
    this.group.rotation.set(0, 0, 0);
    this.group.visible = true;
    this.shieldMesh.visible = false;
    this.currentX = 0;
    this.currentY = 1.8;
    this.targetX = 0;
    this.targetY = 1.8;
    this.rollAngle = 0;
    this.pitchAngle = 0;
  }
}
