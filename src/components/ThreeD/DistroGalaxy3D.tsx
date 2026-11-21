'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LINUX_DISTROS } from '@/data/distros';
import { LinuxDistro } from '@/types';
import { RotateCw, Crosshair, Terminal, Zap } from 'lucide-react';

interface DistroGalaxy3DProps {
  onSelectDistro: (distro: LinuxDistro) => void;
  selectedDistroId?: string;
}

export const DistroGalaxy3D: React.FC<DistroGalaxy3DProps> = ({
  onSelectDistro,
  selectedDistroId
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredDistro, setHoveredDistro] = useState<LinuxDistro | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040407, 0.0018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2000);
    camera.position.set(0, 220, 360);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Cosmic Cyberpunk Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x11111a, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xFF003C, 4.8, 950);
    sunLight.position.set(0, 40, 0);
    scene.add(sunLight);

    const cyanLight = new THREE.PointLight(0x00F0FF, 3.0, 750);
    cyanLight.position.set(130, -30, 90);
    scene.add(cyanLight);

    // 3. Cyberpunk Holographic Floor Grid (Matrix Wireframe)
    const gridHelper = new THREE.GridHelper(900, 45, 0xFF003C, 0x1A1A2E);
    gridHelper.position.y = -80;
    scene.add(gridHelper);

    // 4. Central Kernel Core Sun (Pulsing Cyber Core)
    const coreGeo = new THREE.SphereGeometry(22, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xFF003C,
      emissive: 0xD90429,
      emissiveIntensity: 1.2,
      roughness: 0.15,
      metalness: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Core Glowing Wireframe Icosahedron Shell
    const wireGeo = new THREE.IcosahedronGeometry(28, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // 5. Background Starfield with Neon Cyber Stipples
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 1400;
      starCoords[i + 1] = (Math.random() - 0.5) * 900;
      starCoords[i + 2] = (Math.random() - 0.5) * 1400;

      const rand = Math.random();
      if (rand < 0.25) {
        // Cyber Red
        starColors[i] = 1.0; starColors[i + 1] = 0.0; starColors[i + 2] = 0.23;
      } else if (rand < 0.5) {
        // Cyber Cyan
        starColors[i] = 0.0; starColors[i + 1] = 0.94; starColors[i + 2] = 1.0;
      } else {
        // High-contrast Ghost White
        starColors[i] = 0.85; starColors[i + 1] = 0.85; starColors[i + 2] = 0.95;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Neon Lineage Orbital Rings
    const familyRings = [
      { family: 'Debian', radius: 95, color: 0xFF003C },
      { family: 'Arch', radius: 175, color: 0x00F0FF },
      { family: 'Red Hat', radius: 245, color: 0xFFE600 },
      { family: 'Independent', radius: 315, color: 0xB026FF }
    ];

    familyRings.forEach((ring) => {
      const ringGeo = new THREE.RingGeometry(ring.radius - 0.6, ring.radius + 0.6, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ring.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);
    });

    // 7. Distro Celestial Nodes
    const planetMeshes: {
      mesh: THREE.Mesh;
      glow: THREE.Mesh;
      distro: LinuxDistro;
      angle: number;
      speed: number;
      radius: number;
      yOffset: number;
    }[] = [];

    const raycastTargets: THREE.Mesh[] = [];

    LINUX_DISTROS.forEach((distro, index) => {
      let baseRadius = 100;
      if (distro.family === 'Debian') baseRadius = 95;
      else if (distro.family === 'Arch') baseRadius = 175;
      else if (distro.family === 'Red Hat') baseRadius = 245;
      else baseRadius = 315;

      const angle = (index / LINUX_DISTROS.length) * Math.PI * 2 + Math.random() * 0.4;
      const speed = (0.0006 + (1 / (baseRadius + 50)) * 0.08) * (index % 2 === 0 ? 1 : 1.15);
      const yOffset = (Math.sin(index * 1.5) * 18);

      const color = new THREE.Color(distro.logoColor || '#FF003C');
      const size = distro.id === selectedDistroId ? 11 : 7.5;

      const pGeo = new THREE.SphereGeometry(size, 24, 24);
      const pMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: distro.id === selectedDistroId ? 0.95 : 0.5,
        roughness: 0.25,
        metalness: 0.75
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.userData = { distro };

      // Holographic Ring around each planet
      const pGlowGeo = new THREE.RingGeometry(size * 1.35, size * 1.7, 32);
      const pGlowMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55
      });
      const pGlowMesh = new THREE.Mesh(pGlowGeo, pGlowMat);
      pGlowMesh.rotation.x = Math.PI / 2;
      pMesh.add(pGlowMesh);

      scene.add(pMesh);
      raycastTargets.push(pMesh);

      planetMeshes.push({
        mesh: pMesh,
        glow: pGlowMesh,
        distro,
        angle,
        speed,
        radius: baseRadius,
        yOffset
      });
    });

    // 8. Raycasting for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((event.clientX - rect.left) / width) * 2 - 1,
        -((event.clientY - rect.top) / height) * 2 + 1
      );
      raycaster.setFromCamera(clickMouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const target = intersects[0].object as THREE.Mesh;
        if (target.userData.distro) {
          onSelectDistro(target.userData.distro);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // 9. Orbit Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let sphericalTheta = 0;
    let sphericalPhi = 1.0;
    let cameraRadius = 420;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onDragMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      sphericalTheta -= deltaX * 0.008;
      sphericalPhi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, sphericalPhi - deltaY * 0.008));

      camera.position.x = cameraRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
      camera.position.y = cameraRadius * Math.cos(sphericalPhi);
      camera.position.z = cameraRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
      camera.lookAt(0, 0, 0);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraRadius = Math.max(160, Math.min(650, cameraRadius + e.deltaY * 0.4));
      camera.position.x = cameraRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
      camera.position.y = cameraRadius * Math.cos(sphericalPhi);
      camera.position.z = cameraRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
      camera.lookAt(0, 0, 0);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDragMove);
    container.addEventListener('wheel', onWheel, { passive: false });

    // 10. Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 540;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let animId: number;
    let ticks = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ticks += 1;

      // Pulse Kernel Sun & rotate wireframe shell
      const pulse = 1 + Math.sin(ticks * 0.04) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);
      wireMesh.rotation.y += 0.006;
      wireMesh.rotation.x += 0.003;

      // Rotate Planets
      planetMeshes.forEach((item) => {
        if (isRotating) {
          item.angle += item.speed;
        }
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
        item.mesh.position.y = item.yOffset + Math.sin(ticks * 0.03 + item.angle) * 4;

        item.mesh.rotation.y += 0.02;
        item.glow.rotation.z += 0.015;
      });

      // Raycast hover check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);
      if (intersects.length > 0) {
        const found = intersects[0].object.userData.distro as LinuxDistro;
        setHoveredDistro(found);
        container.style.cursor = 'pointer';
      } else {
        setHoveredDistro(null);
        container.style.cursor = 'grab';
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onDragMove);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSelectDistro, selectedDistroId, isRotating]);

  return (
    <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden bg-[#040407] border-2 border-[#1E1E2C] shadow-2xl select-none cyber-chamfer-both cyber-card">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Cyberpunk Top Left HUD Bracket */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#08080E]/90 border border-[#FF003C] text-xs font-mono text-white cyber-chamfer-tag shadow-[0_0_12px_rgba(255,0,60,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-ping inline-block" />
          <span>// ORBITAL_SYS_HUD • GRID_SYNC //</span>
        </div>
      </div>

      {/* Orbit Controls (Cyberpunk Button) */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-3 py-1.5 border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer cyber-chamfer-tag ${
            isRotating
              ? 'bg-[#FF003C]/20 border-[#FF003C] text-[#FF003C] shadow-[0_0_12px_rgba(255,0,60,0.3)]'
              : 'bg-[#09090F] border-[#2A2A3C] text-slate-400'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          <span>{isRotating ? 'ORBIT_ACTIVE' : 'ORBIT_LOCKED'}</span>
        </button>
      </div>

      {/* Lineage Rings Legend */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#08080E]/90 border border-[#222232] text-[10px] font-mono text-slate-300 cyber-chamfer-tag">
        <span className="font-bold text-[#00F0FF]">// LINEAGE_RINGS:</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-[#FF003C]" /> DEBIAN
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-[#00F0FF]" /> ARCH
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-[#FFE600]" /> RED_HAT
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-xs bg-[#B026FF]" /> INDIE
        </span>
      </div>

      {/* Bottom Right Telemetry */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-[#08080E]/90 border border-[#222232] text-[10px] font-mono text-slate-400 cyber-chamfer-tag">
        <Crosshair className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span>DRAG TO ORBIT // SCROLL ZOOM // CLICK TARGET</span>
      </div>

      {/* Hover Tooltip (Cyberpunk Pop Window from Image 1 & 2) */}
      {hoveredDistro && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 animate-in fade-in zoom-in-95 duration-100"
          style={{ left: mousePos.x, top: mousePos.y - 14 }}
        >
          <div className="px-3.5 py-2.5 bg-[#07070C] border-2 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] text-left max-w-xs font-mono cyber-pop-shadow-dark">
            <div className="h-1 -mt-2.5 -mx-3.5 mb-2 bg-[#00F0FF]" />
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black text-white">{hoveredDistro.name}</span>
              <span className="cyber-mono text-[9px] px-1.5 py-0.2 rounded-xs bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50 font-bold">
                {hoveredDistro.family}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-300 font-sans line-clamp-2">
              {hoveredDistro.tagline}
            </p>
            <div className="mt-1.5 flex items-center gap-1 text-[9px] text-[#FF003C] font-mono font-black">
              <Zap className="w-3 h-3 fill-[#FF003C]" />
              <span>// CLICK TO DEPLOY DOSSIER //</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
