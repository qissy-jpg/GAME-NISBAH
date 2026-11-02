import * as THREE from 'three';
import { AirplaneModel } from './AirplaneModel';
import { EnvironmentBuilder } from './EnvironmentBuilder';
import { soundManager } from '../audio/soundManager';
import { RatioQuestion, StageId, Lane, Altitude, STAGES_CONFIG } from '../types/game';
import { getQuestionsForStage } from '../data/questionBank';

export interface GameEvents {
  onScoreUpdate: (newScore: number) => void;
  onCoinsUpdate: (coins: number) => void;
  onLivesUpdate: (lives: number, lostLifeWarning?: boolean) => void;
  onStreakUpdate: (streak: number) => void;
  onDistanceUpdate: (distanceMeters: number) => void;
  onBoostMeterUpdate: (meter: number, isAvailable: boolean) => void;
  onQuestionTrigger: (question: RatioQuestion) => void;
  onQuizAnswered: (
    question: RatioQuestion,
    stage: StageId,
    chosenIndex: number,
    isCorrect: boolean,
    pointsDelta: number,
    streakBonusAwarded: number,
    fastBonusAwarded: boolean
  ) => void;
  onCollisionsUpdate: (collisions: number) => void;
  onStageProgressUpdate: (
    stage: StageId,
    stageCorrect: number,
    stageTarget: number,
    totalCorrect: number
  ) => void;
  onStageComplete: (completedStage: StageId, nextStage: StageId, bonusScore: number) => void;
  onGameOver: () => void;
  onVictory: (bonusScore: number) => void;
  onLevelUp: (newLevel: number) => void;
}

interface ActiveObstacle {
  mesh: THREE.Group;
  lane: Lane;
  altitude: Altitude;
  z: number;
  type: 'cloud' | 'balloon' | 'arch' | 'drone' | 'ring';
  hasPassedOrHit: boolean;
}

interface ActiveCollectible {
  mesh: THREE.Group;
  lane: Lane;
  altitude: Altitude;
  z: number;
  type: 'coin' | 'crystal';
  collected: boolean;
}

interface ActiveQuizGate {
  group: THREE.Group;
  z: number;
  question: RatioQuestion;
  spawnTimestamp: number;
  hasTriggeredEvent: boolean;
  hasResolved: boolean;
}

export class GameWorld {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private isSoftwareGl: boolean = false;

  private airplane: AirplaneModel;
  private events: GameEvents;

  // Game state
  public isRunning: boolean = false;
  public isPaused: boolean = false;
  private currentLane: Lane = 0;
  private currentAltitude: Altitude = 0;

  private score: number = 0;
  private distance: number = 0;
  private coins: number = 0;
  private lives: number = 3;
  private maxLives: number = 3;
  private streak: number = 0;
  private currentLevel: number = 1;
  private boostMeter: number = 0;
  private isBoosting: boolean = false;
  private boostDurationRemaining: number = 0;
  private invincibilityTimer: number = 0;
  private cameraShakeTimer: number = 0;

  // Single Continuous 3-Stage Progression
  private currentStage: StageId = 1;
  private stageCorrectCount: number = 0;
  private stageTargetCorrect: number = 5;
  private totalCorrectAnswers: number = 0;
  private collisionsCount: number = 0;
  private totalQuestionsAttempted: number = 0;

  // Speed - tailored per stage for comfortable educational pace (+20% increased)
  private baseSpeed: number = 16.6; // Stage 1 default
  private speedMultiplier: number = 1.0;

  // Spawning systems - ample room for Form 1 math solving
  private spawnZDistance: number = -95;
  private quizGateSpawnZ: number = -150; // Farther spawn distance gives 8.5 - 9 seconds calculation time
  private nextObstacleSpawnZ: number = -40;
  private nextCollectibleSpawnZ: number = -25;
  private nextQuizGateDistance: number = 90;
  private distanceSinceLastQuiz: number = 0;

  private obstacles: ActiveObstacle[] = [];
  private collectibles: ActiveCollectible[] = [];
  private activeGate: ActiveQuizGate | null = null;
  private backgroundScenery: THREE.Group[] = [];

  // Question pool & queue for current stage
  private questionPool: RatioQuestion[] = [];
  private questionQueue: RatioQuestion[] = [];

  // Animation frame loop
  private animFrameId: number = 0;
  private clock: THREE.Clock;

  // Particle systems
  private particleGroup: THREE.Group;
  private particles: {
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }[] = [];

  constructor(container: HTMLElement, events: GameEvents) {
    this.container = container;
    this.events = events;
    this.clock = new THREE.Clock();

    // 1. Detect software WebGL
    this.isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene & Fog (Soft cartoon sky blue)
    this.scene = new THREE.Scene();
    const skyColor = 0x7dd3fc;
    this.scene.background = new THREE.Color(skyColor);
    this.scene.fog = new THREE.FogExp2(skyColor, 0.012);

    // 3. Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(58, aspect, 0.1, 350);
    this.camera.position.set(0, 4.3, 5.8);
    this.camera.lookAt(0, 2.0, -10);

    // 4. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // 5. Lighting Rig
    this.setupLighting();

    // 6. Airplane Actor
    this.airplane = new AirplaneModel();
    this.scene.add(this.airplane.group);
    this.airplane.setLanePosition(this.currentLane, this.currentAltitude);

    // 7. Particle Group
    this.particleGroup = new THREE.Group();
    this.scene.add(this.particleGroup);

    // 8. Background Scenery (Sky Islands & Clouds)
    this.setupBackgroundScenery();

    // Resize listener
    window.addEventListener('resize', this.onWindowResize);

    // Load Stage 1 questions
    this.setStage(1);

    // Initial render
    this.renderer.render(this.scene, this.camera);
  }

  private setupLighting() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xbae6fd, 0.85);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.3);
    sunLight.position.set(20, 40, 25);
    sunLight.castShadow = !this.isSoftwareGl;
    if (sunLight.castShadow) {
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 10;
      sunLight.shadow.camera.far = 120;
      sunLight.shadow.camera.left = -16;
      sunLight.shadow.camera.right = 16;
      sunLight.shadow.camera.top = 16;
      sunLight.shadow.camera.bottom = -16;
      sunLight.shadow.bias = -0.0005;
    }
    this.scene.add(sunLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    this.scene.add(ambient);
  }

  private setupBackgroundScenery() {
    for (let i = 0; i < 8; i++) {
      const island = EnvironmentBuilder.createFloatingIsland();
      const isLeft = i % 2 === 0;
      island.position.set(
        isLeft ? -22 - Math.random() * 12 : 22 + Math.random() * 12,
        -6 + Math.random() * 4,
        -i * 35 - 10
      );
      island.scale.setScalar(0.7 + Math.random() * 0.4);
      this.scene.add(island);
      this.backgroundScenery.push(island);
    }

    for (let i = 0; i < 16; i++) {
      const cloud = EnvironmentBuilder.createSkyCloud();
      cloud.position.set(
        (Math.random() - 0.5) * 60,
        -7 - Math.random() * 3,
        -i * 22
      );
      cloud.scale.setScalar(1.5 + Math.random() * 1.5);
      this.scene.add(cloud);
      this.backgroundScenery.push(cloud);
    }
  }

  public setStage(stage: StageId) {
    this.currentStage = stage;
    this.stageCorrectCount = 0;
    this.stageTargetCorrect = STAGES_CONFIG[stage].targetCorrect;
    this.baseSpeed = STAGES_CONFIG[stage].baseSpeed;

    if (stage === 1) {
      this.nextQuizGateDistance = 90;
    } else if (stage === 2) {
      this.nextQuizGateDistance = 96;
    } else {
      this.nextQuizGateDistance = 102;
    }

    // Load questions matching this stage's DSKP curriculum focus
    this.questionPool = getQuestionsForStage(stage);
    this.shuffleQuestions();

    this.events.onStageProgressUpdate(
      this.currentStage,
      this.stageCorrectCount,
      this.stageTargetCorrect,
      this.totalCorrectAnswers
    );
  }

  private shuffleQuestions() {
    this.questionQueue = [...this.questionPool].sort(() => Math.random() - 0.5);
  }

  public start() {
    this.isRunning = true;
    this.isPaused = false;
    this.clock.start();
    soundManager.startEngine();
    this.loop();
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
    this.clock.start();
  }

  public reset() {
    this.isRunning = false;
    this.isPaused = false;
    this.score = 0;
    this.distance = 0;
    this.coins = 0;
    this.lives = this.maxLives;
    this.streak = 0;
    this.currentLevel = 1;
    this.boostMeter = 0;
    this.isBoosting = false;
    this.invincibilityTimer = 0;
    this.cameraShakeTimer = 0;
    this.speedMultiplier = 1.0;
    this.distanceSinceLastQuiz = 0;
    this.currentLane = 0;
    this.currentAltitude = 0;

    // Reset tracking counters
    this.collisionsCount = 0;
    this.totalQuestionsAttempted = 0;
    this.totalCorrectAnswers = 0;

    // Reset to Stage 1 (Sky Cadet)
    this.setStage(1);

    // Reset airplane
    this.airplane.resetFlight();
    this.airplane.setLanePosition(0, 0);

    // Clean up active objects
    this.clearActiveObjects();

    // Trigger state callbacks
    this.events.onScoreUpdate(0);
    this.events.onCoinsUpdate(0);
    this.events.onLivesUpdate(this.lives, false);
    this.events.onCollisionsUpdate(0);
    this.events.onStreakUpdate(0);
    this.events.onDistanceUpdate(0);
    this.events.onBoostMeterUpdate(0, false);

    this.renderer.render(this.scene, this.camera);
  }

  private clearActiveObjects() {
    this.obstacles.forEach((o) => this.scene.remove(o.mesh));
    this.obstacles = [];

    this.collectibles.forEach((c) => this.scene.remove(c.mesh));
    this.collectibles = [];

    if (this.activeGate) {
      this.scene.remove(this.activeGate.group);
      this.activeGate = null;
    }

    this.particles.forEach((p) => this.particleGroup.remove(p.mesh));
    this.particles = [];
  }

  // --- Flight Controls ---
  public moveLeft() {
    if (!this.isRunning || this.isPaused) return;
    if (this.currentLane > -1) {
      this.currentLane = (this.currentLane - 1) as Lane;
      this.airplane.setLanePosition(this.currentLane, this.currentAltitude);
      soundManager.playWhoosh();
    }
  }

  public moveRight() {
    if (!this.isRunning || this.isPaused) return;
    if (this.currentLane < 1) {
      this.currentLane = (this.currentLane + 1) as Lane;
      this.airplane.setLanePosition(this.currentLane, this.currentAltitude);
      soundManager.playWhoosh();
    }
  }

  public moveUp() {
    if (!this.isRunning || this.isPaused) return;
    if (this.currentAltitude < 1) {
      this.currentAltitude = (this.currentAltitude + 1) as Altitude;
      this.airplane.setLanePosition(this.currentLane, this.currentAltitude);
      soundManager.playWhoosh();
    }
  }

  public moveDown() {
    if (!this.isRunning || this.isPaused) return;
    if (this.currentAltitude > -1) {
      this.currentAltitude = (this.currentAltitude - 1) as Altitude;
      this.airplane.setLanePosition(this.currentLane, this.currentAltitude);
      soundManager.playWhoosh();
    }
  }

  public triggerBoost() {
    if (!this.isRunning || this.isPaused || this.isBoosting || this.boostMeter < 100) return;
    this.isBoosting = true;
    this.boostDurationRemaining = 4.0;
    this.boostMeter = 0;
    this.airplane.isShielded = true;
    soundManager.playBoost();
    this.events.onBoostMeterUpdate(0, false);
  }

  // --- Main Animation Loop ---
  private loop = () => {
    if (!this.isRunning) return;
    this.animFrameId = requestAnimationFrame(this.loop);

    if (this.isPaused) return;

    const delta = Math.min(this.clock.getDelta(), 0.08); // cap frame spikes
    this.update(delta);
    this.renderer.render(this.scene, this.camera);
  };

  private update(delta: number) {
    // 1. Airplane Flight Speed
    let effectiveSpeed = this.baseSpeed * this.speedMultiplier;
    if (this.isBoosting) {
      effectiveSpeed *= 1.45;
      this.boostDurationRemaining -= delta;
      if (this.boostDurationRemaining <= 0) {
        this.isBoosting = false;
        this.airplane.isShielded = false;
      }
    }

    const forwardStep = effectiveSpeed * delta;
    this.distance += forwardStep;
    this.distanceSinceLastQuiz += forwardStep;
    this.events.onDistanceUpdate(Math.floor(this.distance));

    // Invincibility ticker (airplane blinks while invincible)
    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer -= delta;
      this.airplane.isInvincible = true;
    } else {
      this.airplane.isInvincible = false;
    }

    // 2. Update Airplane Actor
    this.airplane.update(delta, this.speedMultiplier, this.isBoosting);

    // 3. Parallax Floating Islands & Clouds
    this.backgroundScenery.forEach((scenery) => {
      scenery.position.z += forwardStep * 0.45;
      if (scenery.position.z > 25) {
        scenery.position.z = -180;
        scenery.position.x = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 15);
      }
    });

    // 4. Update Spawning Systems
    this.updateSpawning(forwardStep);

    // 5. Update Obstacles
    this.updateObstacles(forwardStep, delta);

    // 6. Update Collectibles
    this.updateCollectibles(forwardStep, delta);

    // 7. Update Quiz Gate
    this.updateQuizGate(forwardStep);

    // 8. Update Particles
    this.updateParticles(delta);

    // 9. Camera Track & Smooth Damping
    const targetCamX = this.airplane.currentX * 0.35;
    const targetCamY = 4.3 + (this.airplane.currentY - 1.8) * 0.4;
    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetCamX, 8 * delta);
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetCamY, 8 * delta);

    // Screen Shake effect on impact
    if (this.cameraShakeTimer > 0) {
      this.cameraShakeTimer -= delta;
      this.camera.position.x += (Math.random() - 0.5) * 0.3;
      this.camera.position.y += (Math.random() - 0.5) * 0.3;
    }

    // Dynamic Level Up scaling
    const targetLevel = 1 + Math.floor(this.distance / 380);
    if (targetLevel > this.currentLevel) {
      this.currentLevel = targetLevel;
      const maxCap = this.currentStage === 1 ? 1.15 : (this.currentStage === 2 ? 1.25 : 1.35);
      const growthRate = 0.03;
      this.speedMultiplier = Math.min(maxCap, 1.0 + (this.currentLevel - 1) * growthRate);
      soundManager.playLevelUp();
      this.events.onLevelUp(this.currentLevel);
      this.spawnLevelUpCelebration();
    }
  }

  private updateSpawning(forwardStep: number) {
    // Keep a generous clear runway before and around quiz gates so students can focus on math
    const isQuizGateAhead = this.activeGate && this.activeGate.z < 25 && this.activeGate.z > -135;

    // Spawn Quiz Gate with ample distance intervals
    if (!this.activeGate && this.distanceSinceLastQuiz >= this.nextQuizGateDistance) {
      this.spawnQuizGate();
      this.distanceSinceLastQuiz = 0;
      const baseSpacing = this.currentStage === 1 ? 130 : (this.currentStage === 2 ? 120 : 110);
      this.nextQuizGateDistance = baseSpacing + Math.random() * 30;
    }

    // Spawn obstacles if not blocked by quiz gate
    if (!isQuizGateAhead) {
      this.nextObstacleSpawnZ += forwardStep;
      if (this.nextObstacleSpawnZ >= 0) {
        this.spawnObstaclePattern();
        // Spacing varies by stage
        const spacing = this.currentStage === 1 ? -60 : (this.currentStage === 2 ? -50 : -42);
        this.nextObstacleSpawnZ = spacing - Math.random() * 20;
      }

      this.nextCollectibleSpawnZ += forwardStep;
      if (this.nextCollectibleSpawnZ >= 0) {
        this.spawnCollectibleLine();
        this.nextCollectibleSpawnZ = -30 - Math.random() * 18;
      }
    }
  }

  private spawnQuizGate() {
    if (this.questionQueue.length === 0) {
      this.shuffleQuestions();
    }
    const question = this.questionQueue.shift();
    if (!question) return;

    const gateGroup = new THREE.Group();
    gateGroup.position.z = this.quizGateSpawnZ;

    const lanes: Lane[] = [-1, 0, 1];
    const laneLabels = ['Lorong Kiri', 'Lorong Tengah', 'Lorong Kanan'];
    const colors = [0x38bdf8, 0xa855f7, 0x10b981];

    lanes.forEach((laneVal, idx) => {
      const arch = EnvironmentBuilder.createQuizGate(
        question.options[idx],
        laneLabels[idx],
        laneVal * 3.2,
        colors[idx]
      );
      gateGroup.add(arch);
    });

    this.scene.add(gateGroup);
    this.activeGate = {
      group: gateGroup,
      z: this.quizGateSpawnZ,
      question: question,
      spawnTimestamp: performance.now(),
      hasTriggeredEvent: false,
      hasResolved: false,
    };

    this.events.onQuestionTrigger(question);
  }

  private spawnObstaclePattern() {
    const lanes: Lane[] = [-1, 0, 1];
    lanes.sort(() => Math.random() - 0.5);

    // In Stage 1: Mostly 1 obstacle per wave, easy navigation
    // In Stage 2: Mix of 1 or 2
    // In Stage 3: Often 2 obstacles with 1 clear lane
    let lanesToOccupy: Lane[];
    if (this.currentStage === 1) {
      lanesToOccupy = Math.random() > 0.25 ? [lanes[0]] : [lanes[0], lanes[1]];
    } else if (this.currentStage === 2) {
      lanesToOccupy = Math.random() > 0.45 ? [lanes[0], lanes[1]] : [lanes[0]];
    } else {
      lanesToOccupy = Math.random() > 0.35 ? [lanes[0], lanes[1]] : [lanes[0]];
    }

    const types: ('cloud' | 'balloon' | 'arch' | 'drone' | 'ring')[] =
      this.currentStage === 1
        ? ['cloud', 'ring', 'balloon']
        : this.currentStage === 2
        ? ['cloud', 'balloon', 'arch', 'ring', 'drone']
        : ['drone', 'cloud', 'arch', 'balloon', 'ring'];

    lanesToOccupy.forEach((lane) => {
      const type = types[Math.floor(Math.random() * types.length)];
      let mesh: THREE.Group;
      let alt: Altitude = 0;

      if (type === 'ring') {
        mesh = EnvironmentBuilder.createAirRing();
        alt = (Math.random() > 0.5 ? 1 : 0) as Altitude;
        mesh.position.y = alt === 1 ? 2.8 : 1.8;
      } else if (type === 'balloon') {
        mesh = EnvironmentBuilder.createHotAirBalloon();
        alt = 0;
        mesh.position.y = 1.8;
      } else if (type === 'arch') {
        mesh = EnvironmentBuilder.createSkyArch();
        alt = 0;
      } else if (type === 'drone') {
        mesh = EnvironmentBuilder.createSkyDrone();
        alt = (Math.random() > 0.5 ? 0 : 1) as Altitude;
        mesh.position.y = alt === 1 ? 2.8 : 1.8;
      } else {
        mesh = EnvironmentBuilder.createStormCloud();
        alt = (Math.random() > 0.6 ? 1 : (Math.random() > 0.3 ? 0 : -1)) as Altitude;
        mesh.position.y = alt === 1 ? 3.0 : (alt === -1 ? 1.0 : 1.8);
      }

      mesh.position.x = lane * 3.2;
      mesh.position.z = this.spawnZDistance;

      this.scene.add(mesh);
      this.obstacles.push({
        mesh,
        lane,
        altitude: alt,
        z: this.spawnZDistance,
        type,
        hasPassedOrHit: false,
      });
    });
  }

  private spawnCollectibleLine() {
    const lane: Lane = ([-1, 0, 1][Math.floor(Math.random() * 3)]) as Lane;
    const isCrystal = Math.random() < 0.25;
    const count = isCrystal ? 1 : 4;
    const alt: Altitude = (Math.random() > 0.7 ? 1 : 0) as Altitude;
    const yPos = alt === 1 ? 2.8 : 1.8;

    for (let i = 0; i < count; i++) {
      const itemMesh = isCrystal
        ? EnvironmentBuilder.createCrystal()
        : EnvironmentBuilder.createCoin();

      const zPos = this.spawnZDistance - i * 3.5;
      itemMesh.position.set(lane * 3.2, yPos, zPos);
      this.scene.add(itemMesh);

      this.collectibles.push({
        mesh: itemMesh,
        lane,
        altitude: alt,
        z: zPos,
        type: isCrystal ? 'crystal' : 'coin',
        collected: false,
      });
    }
  }

  private updateObstacles(forwardStep: number, delta: number) {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.z += forwardStep;
      obs.mesh.position.z = obs.z;

      if (obs.type === 'drone') {
        obs.mesh.rotation.y += delta * 3;
      }

      if (!obs.hasPassedOrHit && Math.abs(obs.z) < 1.4) {
        const laneMatch = obs.lane === this.currentLane;
        const altMatch = Math.abs(obs.mesh.position.y - this.airplane.currentY) < 1.2;

        if (laneMatch && altMatch) {
          if (obs.type === 'ring') {
            obs.hasPassedOrHit = true;
            this.scene.remove(obs.mesh);
            this.obstacles.splice(i, 1);
            this.handleRingBonus();
            continue;
          } else {
            obs.hasPassedOrHit = true;
            this.handleObstacleHit(obs);
          }
        }
      }

      if (obs.z > 15) {
        this.scene.remove(obs.mesh);
        this.obstacles.splice(i, 1);
      }
    }
  }

  private updateCollectibles(forwardStep: number, delta: number) {
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const item = this.collectibles[i];
      item.z += forwardStep;
      item.mesh.position.z = item.z;

      item.mesh.rotation.y += delta * 4;
      if (item.type === 'crystal') {
        item.mesh.rotation.x += delta * 2;
      }

      if (!item.collected && Math.abs(item.z) < 1.6) {
        const laneMatch = item.lane === this.currentLane;
        const altMatch = Math.abs(item.mesh.position.y - this.airplane.currentY) < 1.4;

        if (laneMatch && altMatch) {
          item.collected = true;
          this.scene.remove(item.mesh);
          this.collectibles.splice(i, 1);

          if (item.type === 'coin') {
            this.coins += 1;
            this.score += 10;
            soundManager.playCoin();
            this.events.onCoinsUpdate(this.coins);
            this.events.onScoreUpdate(this.score);
            this.spawnPickupParticles(this.airplane.currentX, this.airplane.currentY, 0xfbbf24);
          } else {
            this.score += 20;
            soundManager.playCrystal();
            this.events.onScoreUpdate(this.score);
            this.spawnPickupParticles(this.airplane.currentX, this.airplane.currentY, 0x06b6d4);
          }

          this.addBoostMeter(item.type === 'crystal' ? 12 : 5);
          continue;
        }
      }

      if (item.z > 15) {
        this.scene.remove(item.mesh);
        this.collectibles.splice(i, 1);
      }
    }
  }

  private updateQuizGate(forwardStep: number) {
    if (!this.activeGate) return;

    this.activeGate.z += forwardStep;
    this.activeGate.group.position.z = this.activeGate.z;

    if (!this.activeGate.hasResolved && this.activeGate.z >= 0) {
      this.activeGate.hasResolved = true;

      const chosenGateIndex = this.currentLane + 1; // 0, 1, 2
      const isCorrect = chosenGateIndex === this.activeGate.question.correctIndex;
      const timeSpentSec = (performance.now() - this.activeGate.spawnTimestamp) / 1000;
      const isFast = isCorrect && timeSpentSec <= 9.0;

      if (isCorrect) {
        this.streak += 1;
        this.stageCorrectCount += 1;
        this.totalCorrectAnswers += 1;
        this.totalQuestionsAttempted += 1;

        let streakBonus = 0;
        if (this.streak === 3) {
          streakBonus = 50;
        } else if (this.streak === 5) {
          streakBonus = 100;
        }

        const fastBonus = isFast ? 20 : 0;
        const totalPointsDelta = 100 + fastBonus + streakBonus;
        this.score += totalPointsDelta;

        soundManager.playCorrect();
        this.events.onScoreUpdate(this.score);
        this.events.onStreakUpdate(this.streak);
        this.addBoostMeter(30);

        this.spawnCelebrationParticles(this.currentLane * 3.2, 2.5);

        this.events.onQuizAnswered(
          this.activeGate.question,
          this.currentStage,
          chosenGateIndex,
          true,
          totalPointsDelta,
          streakBonus,
          isFast
        );

        this.events.onStageProgressUpdate(
          this.currentStage,
          this.stageCorrectCount,
          this.stageTargetCorrect,
          this.totalCorrectAnswers
        );

        // Check for Stage Progression or Overall Ultimate Victory!
        if (this.stageCorrectCount >= this.stageTargetCorrect) {
          if (this.currentStage === 1) {
            // Stage 1 -> Stage 2
            const stageBonus = 100;
            this.score += stageBonus;
            this.events.onScoreUpdate(this.score);
            soundManager.playLevelUp();
            this.spawnCelebrationParticles(0, 3.5);

            this.events.onStageComplete(1, 2, stageBonus);
            this.setStage(2);
          } else if (this.currentStage === 2) {
            // Stage 2 -> Stage 3
            const stageBonus = 100;
            this.score += stageBonus;
            this.events.onScoreUpdate(this.score);
            soundManager.playLevelUp();
            this.spawnCelebrationParticles(0, 3.5);

            this.events.onStageComplete(2, 3, stageBonus);
            this.setStage(3);
          } else if (this.currentStage === 3) {
            // Stage 3 completed! Player completed all 3 stages (15 total questions)
            // Award: +100 stage completion + 100 all questions completed = +200 bonus points
            const finalBonus = 200;
            this.score += finalBonus;
            this.events.onScoreUpdate(this.score);
            soundManager.playLevelUp();
            this.spawnCelebrationParticles(0, 3.5);

            setTimeout(() => {
              this.triggerVictory(finalBonus);
            }, 1400);
          }
        }
      } else {
        // Wrong answer: -30 points, reset streak, no life lost, display explanation, keep flying
        this.streak = 0;
        this.totalQuestionsAttempted += 1;
        this.score = Math.max(0, this.score - 30);

        soundManager.playWrong();
        this.events.onScoreUpdate(this.score);
        this.events.onStreakUpdate(0);

        this.events.onQuizAnswered(
          this.activeGate.question,
          this.currentStage,
          chosenGateIndex,
          false,
          -30,
          0,
          false
        );

        this.events.onStageProgressUpdate(
          this.currentStage,
          this.stageCorrectCount,
          this.stageTargetCorrect,
          this.totalCorrectAnswers
        );
      }
    }

    if (this.activeGate && this.activeGate.z > 20) {
      this.scene.remove(this.activeGate.group);
      this.activeGate = null;
    }
  }

  private handleRingBonus() {
    this.score += 50;
    this.addBoostMeter(35);
    soundManager.playBoost();
    this.events.onScoreUpdate(this.score);
    this.spawnPickupParticles(this.airplane.currentX, this.airplane.currentY, 0x10b981);
  }

  private handleObstacleHit(_obs: ActiveObstacle) {
    if (this.isBoosting) {
      soundManager.playHit();
      this.spawnExplosionParticles(this.airplane.currentX, this.airplane.currentY, 0xef4444);
      return;
    }

    if (this.invincibilityTimer > 0) {
      return;
    }

    // Collision penalty: -20 points (score minimum zero)
    this.score = Math.max(0, this.score - 20);
    this.events.onScoreUpdate(this.score);

    // Remove one life
    this.lives = Math.max(0, this.lives - 1);
    this.streak = 0;
    this.collisionsCount += 1;
    this.events.onCollisionsUpdate(this.collisionsCount);
    this.events.onLivesUpdate(this.lives, true);
    this.events.onStreakUpdate(0);

    // 2 seconds invincibility
    this.invincibilityTimer = 2.0;
    this.cameraShakeTimer = 0.35;
    soundManager.playHit();
    this.spawnExplosionParticles(this.airplane.currentX, this.airplane.currentY, 0xef4444);

    if (this.lives <= 0) {
      this.triggerGameOver();
    }
  }

  private triggerGameOver() {
    this.airplane.triggerCrashAnimation();
    soundManager.stopEngine();
    setTimeout(() => {
      this.isRunning = false;
      this.events.onGameOver();
    }, 1400);
  }

  private triggerVictory(bonusScore: number) {
    this.isRunning = false;
    soundManager.stopEngine();
    this.events.onVictory(bonusScore);
  }

  private addBoostMeter(amount: number) {
    if (this.isBoosting) return;
    this.boostMeter = Math.min(100, this.boostMeter + amount);
    this.events.onBoostMeterUpdate(this.boostMeter, this.boostMeter >= 100);
  }

  // --- Particle FX ---
  private spawnPickupParticles(x: number, y: number, colorHex: number) {
    const geom = new THREE.SphereGeometry(0.12, 6, 6);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });

    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, y, 0);
      this.particleGroup.add(mesh);

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 + 2,
        (Math.random() - 0.5) * 4
      );

      this.particles.push({
        mesh,
        velocity: vel,
        life: 0.5,
        maxLife: 0.5,
      });
    }
  }

  private spawnCelebrationParticles(x: number, y: number) {
    const colors = [0xfacc15, 0x38bdf8, 0x4ade80, 0xf472b6];
    const geom = new THREE.BoxGeometry(0.18, 0.18, 0.18);

    for (let i = 0; i < 28; i++) {
      const color = colors[i % colors.length];
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, y, 0);
      this.particleGroup.add(mesh);

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.2) * 12,
        (Math.random() - 0.5) * 10
      );

      this.particles.push({
        mesh,
        velocity: vel,
        life: 1.0,
        maxLife: 1.0,
      });
    }
  }

  private spawnExplosionParticles(x: number, y: number, colorHex: number) {
    const geom = new THREE.DodecahedronGeometry(0.2, 0);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });

    for (let i = 0; i < 16; i++) {
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, y, 0);
      this.particleGroup.add(mesh);

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );

      this.particles.push({
        mesh,
        velocity: vel,
        life: 0.7,
        maxLife: 0.7,
      });
    }
  }

  private spawnLevelUpCelebration() {
    this.spawnCelebrationParticles(0, 3.5);
  }

  private updateParticles(delta: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= delta;

      if (p.life <= 0) {
        this.particleGroup.remove(p.mesh);
        this.particles.splice(i, 1);
        continue;
      }

      p.mesh.position.addScaledVector(p.velocity, delta);
      p.mesh.rotation.x += delta * 5;
      p.mesh.rotation.y += delta * 5;

      const scale = p.life / p.maxLife;
      p.mesh.scale.setScalar(scale);
    }
  }

  private onWindowResize = () => {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  public destroy() {
    this.isRunning = false;
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onWindowResize);

    soundManager.stopEngine();
    this.clearActiveObjects();

    this.scene.clear();
    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
