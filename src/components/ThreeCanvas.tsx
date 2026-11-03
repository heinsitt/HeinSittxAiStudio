import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { playNodeSelect } from '../utils/audio';

interface ThreeCanvasProps {
  currentSection: number; // 0: Hero, 1: About, 2: Experience, 3: Skills, 4: Projects, 5: Certs, 6: Contact
  scrollProgress: number; // 0 to 1
  wireframeOnly: boolean;
  neonTheme: 'cyan' | 'purple' | 'green';
  orbitMode: boolean;
  onSelectNode?: (nodeInfo: { name: string; status: string; role: string; metric: string }) => void;
}

// Pre-allocated math variables to avoid GC in animation loop
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3();
const _mouseTarget = new THREE.Vector2();
const _mouseCurrent = new THREE.Vector2();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  currentSection,
  scrollProgress,
  wireframeOnly,
  neonTheme,
  orbitMode,
  onSelectNode
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentSection,
    scrollProgress,
    wireframeOnly,
    neonTheme,
    orbitMode,
    isInteracting: false,
    dragStart: { x: 0, y: 0 },
    manualRot: { x: 0.15, y: -0.2 }
  });

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current.currentSection = currentSection;
    stateRef.current.scrollProgress = scrollProgress;
    stateRef.current.wireframeOnly = wireframeOnly;
    stateRef.current.neonTheme = neonTheme;
    stateRef.current.orbitMode = orbitMode;
  }, [currentSection, scrollProgress, wireframeOnly, neonTheme, orbitMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Initialize Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03070d, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4, 14);
    _currentLookAt.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
      stencil: false,
      depth: true
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Graceful fallback
    }

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0b1626, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f5ff, 2.5);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9d4edd, 1.8);
    fillLight.position.set(-10, -5, -8);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x00ff87, 2, 25);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // 5. Build Architectural Infrastructure Hierarchy
    const infraGroup = new THREE.Group();
    scene.add(infraGroup);

    // Neon Material Palettes
    const colors = {
      cyan: { main: 0x00f5ff, sec: 0x0077b6, glow: 0x00f5ff },
      purple: { main: 0xa855f7, sec: 0x7c3aed, glow: 0xc084fc },
      green: { main: 0x00ff87, sec: 0x059669, glow: 0x34d399 }
    };

    const getPalette = () => colors[stateRef.current.neonTheme] || colors.cyan;

    // --- Sub-component A: Blueprint Matrix Ground Plane ---
    const gridHelper = new THREE.GridHelper(36, 36, 0x00f5ff, 0x0c2136);
    gridHelper.position.y = -3.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    infraGroup.add(gridHelper);

    // Radial ground rings
    const groundRingGeom = new THREE.RingGeometry(4, 4.04, 64);
    const groundRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    });
    const groundRing = new THREE.Mesh(groundRingGeom, groundRingMat);
    groundRing.rotation.x = Math.PI / 2;
    groundRing.position.y = -3.48;
    infraGroup.add(groundRing);

    const groundRing2 = new THREE.Mesh(
      new THREE.RingGeometry(8, 8.05, 64),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.12 })
    );
    groundRing2.rotation.x = Math.PI / 2;
    groundRing2.position.y = -3.48;
    infraGroup.add(groundRing2);

    // --- Sub-component B: Central Core Cluster (Kubernetes Master & Ingress) ---
    const coreCluster = new THREE.Group();
    infraGroup.add(coreCluster);

    // Central Wireframe Icosahedron (Master Control Plane)
    const masterGeom = new THREE.IcosahedronGeometry(1.4, 0);
    const masterWireGeom = new THREE.EdgesGeometry(masterGeom);
    const masterWireMat = new THREE.LineBasicMaterial({ color: 0x00f5ff, linewidth: 2 });
    const masterWire = new THREE.LineSegments(masterWireGeom, masterWireMat);
    coreCluster.add(masterWire);

    const masterSolidMat = new THREE.MeshPhysicalMaterial({
      color: 0x07111e,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.7,
      wireframe: false
    });
    const masterSolid = new THREE.Mesh(masterGeom, masterSolidMat);
    coreCluster.add(masterSolid);

    // Inner glowing energy core
    const coreInnerGeom = new THREE.OctahedronGeometry(0.7, 0);
    const coreInnerMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true
    });
    const coreInner = new THREE.Mesh(coreInnerGeom, coreInnerMat);
    coreCluster.add(coreInner);

    // Ingress / Load Balancer Wireframe Torus Rings
    const torusGeom = new THREE.TorusGeometry(2.5, 0.04, 16, 64);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.65
    });
    const torus1 = new THREE.Mesh(torusGeom, torusMat);
    torus1.rotation.x = Math.PI / 3;
    coreCluster.add(torus1);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.03, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 })
    );
    torus2.rotation.y = Math.PI / 4;
    coreCluster.add(torus2);

    // --- Sub-component C: Worker Pods & Microservice Nodes ---
    const podsGroup = new THREE.Group();
    infraGroup.add(podsGroup);

    interface NodeUserData {
      name: string;
      status: string;
      role: string;
      metric: string;
    }

    const podNodes: { mesh: THREE.Group; orbitRadius: number; speed: number; angle: number; yOffset: number }[] = [];
    const podDefinitions: NodeUserData[] = [
      { name: 'WaveMoney-Prod-API', status: 'Healthy // 99.99%', role: 'Financial Gateway Ingress', metric: '14.2k req/s' },
      { name: 'Kube-Worker-Alpha', status: 'Ready // RKE2', role: 'Container Node (8 vCPU / 32GB)', metric: 'CPU 42%' },
      { name: 'Datadog-APM-Agent', status: 'Streaming Live', role: 'Telemetry Collector', metric: '0.001% err' },
      { name: 'Zabbix-Cluster-Monitor', status: 'Active 24/7', role: 'NOC Synthetic Pings', metric: 'Ping 1.2ms' },
      { name: 'Docker-Microservices', status: '5 Containers Running', role: 'Observability & WP Stack', metric: 'Mem 51%' }
    ];

    podDefinitions.forEach((def, i) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.userData = def;

      const pGeom = new THREE.OctahedronGeometry(0.55, 0);
      const pEdges = new THREE.EdgesGeometry(pGeom);
      const pWire = new THREE.LineSegments(
        pEdges,
        new THREE.LineBasicMaterial({ color: i % 2 === 0 ? 0x00f5ff : 0x00ff87 })
      );
      const pSolid = new THREE.Mesh(
        pGeom,
        new THREE.MeshStandardMaterial({
          color: 0x06101d,
          roughness: 0.2,
          metalness: 0.9,
          transparent: true,
          opacity: 0.85
        })
      );
      nodeSubGroup.add(pWire);
      nodeSubGroup.add(pSolid);

      // Connecting antenna line
      const antGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -0.6, 0)
      ]);
      const antLine = new THREE.Line(antGeom, new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.4 }));
      nodeSubGroup.add(antLine);

      podsGroup.add(nodeSubGroup);

      const orbitRadius = 4.2 + (i % 2) * 1.8;
      const speed = 0.35 + (i * 0.12);
      const angle = (i / podDefinitions.length) * Math.PI * 2;
      const yOffset = (i % 3 - 1) * 0.9;

      podNodes.push({ mesh: nodeSubGroup, orbitRadius, speed, angle, yOffset });
    });

    // --- Sub-component D: Architectural Server Rack Blocks (WaveMoney Infrastructure) ---
    const rackGroup = new THREE.Group();
    infraGroup.add(rackGroup);

    const rackBoxGeom = new THREE.BoxGeometry(0.8, 2.6, 0.8);
    const rackEdgesGeom = new THREE.EdgesGeometry(rackBoxGeom);

    const rackPositions = [
      { x: -5.5, z: -2.5, rotY: 0.3 },
      { x: -4.5, z: -4.0, rotY: 0.5 },
      { x: 5.5, z: -2.5, rotY: -0.3 },
      { x: 4.5, z: -4.0, rotY: -0.5 }
    ];

    rackPositions.forEach((pos, idx) => {
      const rackObj = new THREE.Group();
      rackObj.position.set(pos.x, -2.0, pos.z);
      rackObj.rotation.y = pos.rotY;

      // Outer server chassis wireframe
      const rackWire = new THREE.LineSegments(
        rackEdgesGeom,
        new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.4 })
      );
      rackObj.add(rackWire);

      const rackSolid = new THREE.Mesh(
        rackBoxGeom,
        new THREE.MeshStandardMaterial({
          color: 0x050b14,
          roughness: 0.4,
          metalness: 0.8,
          transparent: true,
          opacity: 0.6
        })
      );
      rackObj.add(rackSolid);

      // Server Blade LED shelves inside rack
      for (let s = -1.0; s <= 1.0; s += 0.4) {
        const shelfGeom = new THREE.BoxGeometry(0.72, 0.04, 0.72);
        const shelfMat = new THREE.MeshBasicMaterial({
          color: idx % 2 === 0 ? 0x00ff87 : 0x00f5ff,
          transparent: true,
          opacity: 0.7
        });
        const shelf = new THREE.Mesh(shelfGeom, shelfMat);
        shelf.position.y = s;
        rackObj.add(shelf);
      }

      rackGroup.add(rackObj);
    });

    // --- Sub-component E: Streaming Data Spline Particles ---
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities: { radius: number; speed: number; angle: number; y: number; ySpeed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 7.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.0;

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      particleVelocities.push({
        radius: r,
        speed: (0.2 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        angle,
        y,
        ySpeed: (Math.random() - 0.5) * 0.02
      });
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    infraGroup.add(particles);

    // --- Sub-component F: Architectural Elevation Axis Lines ---
    const axisGroup = new THREE.Group();
    infraGroup.add(axisGroup);

    for (let a = 0; a < 4; a++) {
      const angle = (a / 4) * Math.PI * 2;
      const x = Math.cos(angle) * 7.5;
      const z = Math.sin(angle) * 7.5;

      const pLineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -3.5, z),
        new THREE.Vector3(x, 2.5, z)
      ]);
      const pLine = new THREE.Line(
        pLineGeom,
        new THREE.LineBasicMaterial({ color: 0x0c253d, transparent: true, opacity: 0.5 })
      );
      axisGroup.add(pLine);

      // Top marker beacon
      const beacon = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.12, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x00f5ff })
      );
      beacon.position.set(x, 2.5, z);
      axisGroup.add(beacon);
    }

    // 6. Raycasting Setup for Interactive Node Inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;

      _mouseTarget.x = mouse.x * 0.4;
      _mouseTarget.y = mouse.y * 0.3;

      if (stateRef.current.isInteracting && stateRef.current.orbitMode) {
        const dx = e.clientX - stateRef.current.dragStart.x;
        const dy = e.clientY - stateRef.current.dragStart.y;
        stateRef.current.manualRot.y += dx * 0.005;
        stateRef.current.manualRot.x += dy * 0.005;
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (stateRef.current.orbitMode) {
        stateRef.current.isInteracting = true;
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }

      // Raycast test on click
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(podsGroup.children, true);
      if (intersects.length > 0) {
        let currentObj: THREE.Object3D | null = intersects[0].object;
        while (currentObj && !currentObj.userData?.name) {
          currentObj = currentObj.parent;
        }
        if (currentObj && currentObj.userData?.name) {
          playNodeSelect();
          onSelectNode?.(currentObj.userData as NodeUserData);
        }
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isInteracting = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation & Render Loop with Exponential Damping
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    // 7 Vantage Points corresponding to Portfolio Sections
    const sectionVantages = [
      // 0: Hero — Dynamic diagonal overview showing full multi-tier topology
      { pos: new THREE.Vector3(0, 3.8, 12.5), look: new THREE.Vector3(0, 0, 0), rotSpeed: 0.12 },
      // 1: About — Closer angled view focusing on Core Master Plane & Reliability
      { pos: new THREE.Vector3(3.2, 1.8, 8.5), look: new THREE.Vector3(0.5, 0.2, 0), rotSpeed: 0.08 },
      // 2: Experience (WaveMoney NOC) — Elevation side wireframe rack inspection
      { pos: new THREE.Vector3(-6.2, 0.5, 7.8), look: new THREE.Vector3(-3.5, -1.0, -1.5), rotSpeed: 0.05 },
      // 3: Skills Stack — Top-down blueprint constellation view
      { pos: new THREE.Vector3(0, 9.5, 7.5), look: new THREE.Vector3(0, -0.5, 0), rotSpeed: 0.15 },
      // 4: Projects Showcase — Isometric architecture perspective
      { pos: new THREE.Vector3(6.5, 4.2, 6.5), look: new THREE.Vector3(0, 0.2, 0), rotSpeed: 0.09 },
      // 5: Certifications — Vertical milestone elevation scanning
      { pos: new THREE.Vector3(-4.5, 2.5, 9.2), look: new THREE.Vector3(-0.5, 0.5, 0), rotSpeed: 0.07 },
      // 6: Contact — Frontal terminal uplink inspection
      { pos: new THREE.Vector3(0, 1.2, 8.2), look: new THREE.Vector3(0, 0.4, 0), rotSpeed: 0.04 }
    ];

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      _mouseCurrent.x = THREE.MathUtils.damp(_mouseCurrent.x, _mouseTarget.x, 3, delta);
      _mouseCurrent.y = THREE.MathUtils.damp(_mouseCurrent.y, _mouseTarget.y, 3, delta);

      // Section vantage interpolation
      const currentSec = Math.max(0, Math.min(sectionVantages.length - 1, stateRef.current.currentSection));
      const vantage = sectionVantages[currentSec];

      if (!stateRef.current.orbitMode) {
        _targetCamPos.copy(vantage.pos);
        _targetCamPos.x += _mouseCurrent.x * 1.5;
        _targetCamPos.y += _mouseCurrent.y * 1.0;
        _targetLookAt.copy(vantage.look);

        // Smooth camera damping
        camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 2.5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 2.5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 2.5, delta);

        _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 3.5, delta);
        _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 3.5, delta);
        _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 3.5, delta);
        camera.lookAt(_currentLookAt);

        // Subtle scene rotation based on section speed
        infraGroup.rotation.y += delta * vantage.rotSpeed;
      } else {
        // Manual orbit mode
        infraGroup.rotation.y = THREE.MathUtils.damp(infraGroup.rotation.y, stateRef.current.manualRot.y, 4, delta);
        infraGroup.rotation.x = THREE.MathUtils.damp(infraGroup.rotation.x, stateRef.current.manualRot.x, 4, delta);
      }

      // Rotate central cluster components
      masterWire.rotation.x += delta * 0.3;
      masterWire.rotation.y += delta * 0.4;
      masterSolid.rotation.x = masterWire.rotation.x;
      masterSolid.rotation.y = masterWire.rotation.y;

      coreInner.rotation.x -= delta * 0.5;
      coreInner.rotation.z += delta * 0.6;

      torus1.rotation.z += delta * 0.25;
      torus2.rotation.x += delta * 0.2;

      // Dynamic Palette updates
      const pal = getPalette();
      keyLight.color.setHex(pal.main);
      masterWireMat.color.setHex(pal.main);
      torusMat.color.setHex(pal.main);
      particleMat.color.setHex(pal.main);

      // Wireframe only toggle
      masterSolid.visible = !stateRef.current.wireframeOnly;
      rackGroup.children.forEach(c => {
        const solidMesh = c.children[1] as THREE.Mesh;
        if (solidMesh) solidMesh.visible = !stateRef.current.wireframeOnly;
      });

      // Orbit pod nodes
      podNodes.forEach((node) => {
        node.angle += delta * node.speed;
        const x = Math.cos(node.angle) * node.orbitRadius;
        const z = Math.sin(node.angle) * node.orbitRadius;
        node.mesh.position.set(x, node.yOffset + Math.sin(elapsed * 2 + node.orbitRadius) * 0.25, z);
        node.mesh.rotation.y += delta * 1.2;
        node.mesh.rotation.x += delta * 0.8;
      });

      // Animate Streaming Data Particles
      const posAttr = particleGeom.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        vel.angle += delta * vel.speed;
        vel.y += vel.ySpeed;

        // Wrap around y boundaries
        if (vel.y > 3.0) vel.y = -3.0;
        if (vel.y < -3.0) vel.y = 3.0;

        posArray[i * 3] = Math.cos(vel.angle) * vel.radius;
        posArray[i * 3 + 1] = vel.y;
        posArray[i * 3 + 2] = Math.sin(vel.angle) * vel.radius;
      }
      posAttr.needsUpdate = true;

      // Render frame
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // 9. Dispose & Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Clean Three.js resources
      scene.clear();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair overflow-hidden"
      style={{ touchAction: 'none' }}
      aria-label="3D Interactive DevOps Architecture Canvas"
    />
  );
};
