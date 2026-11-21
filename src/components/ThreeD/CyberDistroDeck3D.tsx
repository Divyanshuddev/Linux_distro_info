'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { LINUX_DISTROS } from '@/data/distros';
import { LinuxDistro } from '@/types';
import { cyberAudio } from '@/lib/cyberAudio';
import { animate } from '@/lib/animeHelper';

interface CyberDistroDeck3DProps {
  onSelectDistro: (distro: LinuxDistro) => void;
  selectedDistroId?: string | null;
  filteredDistroIds?: string[];
  onActiveIndexChange?: (distro: LinuxDistro) => void;
}

// Pastel saturated badge background colors matching the uploaded reference image
const DISTRO_BADGE_COLORS: Record<string, string> = {
  ubuntu: '#FF3B30',      // Red squircle like badge 1
  arch: '#00C2FF',        // Bright Cyan
  fedora: '#4D7CFF',      // Blue squircle like badge 4
  debian: '#FF2A6D',      // Hot Rose
  mint: '#00D26A',        // Green squircle like badge 3
  pop_os: '#00BFA5',      // Bright Teal
  manjaro: '#00E676',     // Emerald Mint
  opensuse: '#76FF03',    // Lime
  kali: '#651FFF',        // Indigo
  nixos: '#00E5FF',       // Sky Cyan
  steamos: '#2979FF',     // Royal Blue
  zorin: '#00B0FF',       // Light Blue
  alpine: '#455A64',      // Slate Mountain
  tails: '#9C27B0',       // Purple squircle like badge 5
  elementary: '#5C6BC0',  // Soft Indigo
  gentoo: '#C400FF',      // Violet squircle like badge 5
  void: '#2E7D32',        // Forest Green
  endeavouros: '#AB47BC', // Sunset Purple
};

// Helper: Create rounded rectangle shape for 3D extrusion
function createSquircleShape(width = 2.32, height = 2.32, radius = 0.44): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const r = radius;

  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  return shape;
}

// Helper: Generate soft radial drop shadow texture
function createSoftShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(40, 26, 52, 0.55)');
    gradient.addColorStop(0.35, 'rgba(40, 26, 52, 0.32)');
    gradient.addColorStop(0.7, 'rgba(40, 26, 52, 0.08)');
    gradient.addColorStop(1, 'rgba(40, 26, 52, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Generate high-resolution Front Decal Texture with cute creature & eyes
function createDistroBadgeTexture(distro: LinuxDistro): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const badgeColor = DISTRO_BADGE_COLORS[distro.id] || distro.accentColor || '#4D7CFF';

  ctx.clearRect(0, 0, 512, 512);

  // 1. Rich Colored Inset Face
  ctx.save();
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(28, 28, 456, 456, 76);
  } else {
    ctx.rect(28, 28, 456, 456);
  }
  
  // Vibrant gradient matching toy block body
  const grad = ctx.createLinearGradient(0, 28, 0, 484);
  grad.addColorStop(0, badgeColor);
  grad.addColorStop(1, badgeColor);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle inner border ring giving a beveled recessed plate look
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Top gloss highlight curve
  const gloss = ctx.createLinearGradient(0, 28, 0, 220);
  gloss.addColorStop(0, 'rgba(255, 255, 255, 0.38)');
  gloss.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
  gloss.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = gloss;
  ctx.fill();
  ctx.restore();

  // 2. Central Solid Deep Black Silhouette Distro Creature (Directly matching uploaded image)
  ctx.save();
  ctx.translate(256, 235);
  ctx.fillStyle = '#14121E'; // Deep charcoal black
  ctx.strokeStyle = '#14121E';
  ctx.lineWidth = 16;

  drawAuthenticDistroSilhouette(ctx, distro.id);

  // 3. Two Adorable White Oval Eyes peering out (Directly matching uploaded image!)
  drawCuteOvalEyes(ctx, distro.id);
  ctx.restore();

  // 4. Responsive Arcade Tag Pill at bottom of badge face (Adapts dynamically to any name length)
  ctx.save();
  const rawName = distro.name.toUpperCase();

  // Dynamic font sizing based on text measurement to ensure long names never overflow
  let fontSize = 26;
  ctx.font = `900 ${fontSize}px monospace`;
  let measuredWidth = ctx.measureText(rawName).width;
  const maxTextWidth = 360; // Safe width within the 456px squircle face

  while (measuredWidth > maxTextWidth && fontSize > 14) {
    fontSize -= 1;
    ctx.font = `900 ${fontSize}px monospace`;
    measuredWidth = ctx.measureText(rawName).width;
  }

  // Dynamic pill size adapting cleanly to text width with comfortable padding
  const pillPadding = 32;
  const pillWidth = Math.min(420, Math.max(180, measuredWidth + pillPadding));
  const pillHeight = Math.max(46, fontSize + 22);
  const pillX = (512 - pillWidth) / 2;
  const pillY = 412 - (pillHeight - 50) / 2;

  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
  } else {
    ctx.rect(pillX, pillY, pillWidth, pillHeight);
  }
  ctx.fillStyle = 'rgba(20, 18, 30, 0.72)';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.stroke();

  // Render centered text with middle baseline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(rawName, 256, pillY + pillHeight / 2);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

// Generate Back of 3D Collectible Cartridge Plate
function createCartridgeBackTexture(distro: LinuxDistro): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const badgeColor = DISTRO_BADGE_COLORS[distro.id] || distro.accentColor || '#4D7CFF';

  ctx.clearRect(0, 0, 512, 512);

  // Main Casing
  ctx.save();
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(28, 28, 456, 456, 76);
  } else {
    ctx.rect(28, 28, 456, 456);
  }
  ctx.fillStyle = badgeColor;
  ctx.fill();

  // Inset Cartridge Grip Plate
  ctx.fillStyle = '#1A1824';
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(64, 64, 384, 384, 40);
  } else {
    ctx.rect(64, 64, 384, 384);
  }
  ctx.fill();

  // Horizontal grip vents
  ctx.fillStyle = '#2C2738';
  for (let y = 110; y <= 230; y += 24) {
    ctx.fillRect(96, y, 320, 10);
  }

  // Cartridge Spec Label
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`DISTRO-ROM // ${distro.id.toUpperCase()}`, 256, 290);

  ctx.fillStyle = '#FFEB3B';
  ctx.font = 'bold 15px monospace';
  ctx.fillText(`ARCH: 64-BIT // ${distro.family.toUpperCase()}`, 256, 322);

  // Retro Barcode
  ctx.fillStyle = '#FFFFFF';
  const bars = [4, 2, 7, 3, 2, 6, 4, 3, 8, 2, 5, 3, 6, 2, 8, 3, 4];
  let bx = 110;
  for (const b of bars) {
    ctx.fillRect(bx, 355, b, 34);
    bx += b + 8;
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Draw the iconic two vertical white oval eyes peering out of the silhouette
function drawCuteOvalEyes(ctx: CanvasRenderingContext2D, id: string) {
  const eyeWidth = 16;
  const eyeHeight = 28;
  const eyeDistance = 26;
  let offsetY = -4;

  if (id === 'arch') offsetY = 14;
  if (id === 'debian') offsetY = 2;
  if (id === 'ubuntu') offsetY = 0;
  if (id === 'kali') offsetY = 6;

  ctx.fillStyle = '#FFFFFF';

  // Left Eye (Vertical Oval)
  ctx.beginPath();
  ctx.ellipse(-eyeDistance / 2, offsetY, eyeWidth / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right Eye (Vertical Oval)
  ctx.beginPath();
  ctx.ellipse(eyeDistance / 2, offsetY, eyeWidth / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tiny dark pupils looking curiously forward
  ctx.fillStyle = '#14121E';
  ctx.beginPath();
  ctx.arc(-eyeDistance / 2 + 1, offsetY + 3, 4, 0, Math.PI * 2);
  ctx.arc(eyeDistance / 2 + 1, offsetY + 3, 4, 0, Math.PI * 2);
  ctx.fill();

  // White sparkle catchlight in each pupil
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(-eyeDistance / 2 - 0.5, offsetY + 1.5, 1.5, 0, Math.PI * 2);
  ctx.arc(eyeDistance / 2 - 0.5, offsetY + 1.5, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

// Draw the bold black creature/silhouette logo for each distro
function drawAuthenticDistroSilhouette(ctx: CanvasRenderingContext2D, id: string) {
  switch (id) {
    case 'arch': {
      // Arch Delta Creature (Badge 5 style triangular silhouette)
      ctx.beginPath();
      ctx.moveTo(0, -100);
      ctx.lineTo(92, 80);
      ctx.lineTo(44, 80);
      ctx.lineTo(0, -8);
      ctx.lineTo(-44, 80);
      ctx.lineTo(-92, 80);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'ubuntu': {
      // Ubuntu Circle of Friends Creature
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(0, 0, 72, 0, Math.PI * 2);
      ctx.stroke();

      for (let a = 0; a < 3; a++) {
        const rad = (a * Math.PI * 2) / 3 - Math.PI / 6;
        const nx = Math.cos(rad) * 96;
        const ny = Math.sin(rad) * 96;
        ctx.beginPath();
        ctx.arc(nx, ny, 19, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'debian': {
      // Debian Swirl Creature
      ctx.lineWidth = 24;
      ctx.beginPath();
      for (let t = 0.5; t < Math.PI * 3.6; t += 0.08) {
        const r = t * 8.2;
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        if (t === 0.5) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      break;
    }

    case 'fedora': {
      // Fedora Infinity Loop Creature
      ctx.lineWidth = 26;
      ctx.beginPath();
      ctx.arc(-42, 0, 48, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(42, 0, 48, Math.PI / 2, (3 * Math.PI) / 2);
      ctx.stroke();

      ctx.fillRect(-24, -14, 48, 28);
      break;
    }

    case 'mint': {
      // Linux Mint Leaf Creature
      ctx.lineWidth = 22;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-70, -70, 140, 140, [38, 8, 38, 8]);
      } else {
        ctx.rect(-70, -70, 140, 140);
      }
      ctx.fill();
      break;
    }

    case 'manjaro': {
      // Manjaro 3 Pillar Creature (Badge 4 robot style)
      ctx.fillRect(-74, -80, 34, 160);
      ctx.fillRect(-28, -38, 34, 118);
      ctx.fillRect(18, -80, 60, 38);
      ctx.fillRect(44, -38, 34, 118);
      break;
    }

    case 'pop_os': {
      // Pop!_OS Rounded Circle Creature
      ctx.beginPath();
      ctx.arc(0, 0, 84, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'opensuse': {
      // openSUSE Chameleon Creature (Spiky burst like badge 2)
      ctx.beginPath();
      for (let i = 0; i < 14; i++) {
        const a = (i * Math.PI * 2) / 14;
        const r = (i % 2 === 0) ? 90 : 58;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'kali': {
      // Kali Dragon Creature (Badge 1 star style)
      ctx.beginPath();
      ctx.moveTo(0, -96);
      ctx.quadraticCurveTo(22, -22, 92, 0);
      ctx.quadraticCurveTo(22, 22, 0, 96);
      ctx.quadraticCurveTo(-22, 22, -92, 0);
      ctx.quadraticCurveTo(-22, -22, 0, -96);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'nixos': {
      // NixOS 6-Arm Snowflake Creature
      ctx.lineWidth = 18;
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -75);
        ctx.lineTo(24, -52);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'steamos': {
      // Steam Crank Creature
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(0, 0, 76, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-26, 22, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(34, -28, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'alpine': {
      // Alpine Mountain Creature (Pixel diamond like badge 3)
      ctx.beginPath();
      ctx.moveTo(0, -90);
      ctx.lineTo(80, 0);
      ctx.lineTo(0, 90);
      ctx.lineTo(-80, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }

    default: {
      // Four-point Kawaii Star Creature (Badge 1 style)
      ctx.beginPath();
      ctx.moveTo(0, -90);
      ctx.quadraticCurveTo(16, -16, 90, 0);
      ctx.quadraticCurveTo(16, 16, 0, 90);
      ctx.quadraticCurveTo(-16, 16, -90, 0);
      ctx.quadraticCurveTo(-16, -16, 0, -90);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
}

export const CyberDistroDeck3D: React.FC<CyberDistroDeck3DProps> = ({
  onSelectDistro,
  selectedDistroId,
  filteredDistroIds,
  onActiveIndexChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectedDistroIdRef = useRef<string | null>(selectedDistroId || null);
  selectedDistroIdRef.current = selectedDistroId || null;

  // Deck carousel radius and distros
  const deckRadius = 9.4;
  const numDistros = LINUX_DISTROS.length;
  const angleStep = (Math.PI * 2) / numDistros;

  // Interaction tracking state
  const rotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  // Mesh references
  const badgeMeshesRef = useRef<THREE.Mesh[]>([]);
  const deckGroupRef = useRef<THREE.Group | null>(null);
  const hoveredBadgeIndexRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Find nearest distro to front camera (angle = 0)
  const updateActiveDistroFromRotation = useCallback(() => {
    let rot = (-rotationRef.current) % (Math.PI * 2);
    if (rot < 0) rot += Math.PI * 2;
    const index = Math.round(rot / angleStep) % numDistros;
    const active = LINUX_DISTROS[index];
    if (active && onActiveIndexChange) {
      onActiveIndexChange(active);
    }
  }, [angleStep, numDistros, onActiveIndexChange]);

  // Smoothly rotate deck to center a specific distro
  const rotateToDistro = useCallback((distroId: string) => {
    const targetIdx = LINUX_DISTROS.findIndex((d) => d.id === distroId);
    if (targetIdx === -1) return;

    // Calculate shortest angular path
    const targetAngle = -targetIdx * angleStep;
    const current = targetRotationRef.current;
    const diff = ((targetAngle - current) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
    targetRotationRef.current = current + diff;

    // Audio cue
    cyberAudio.playHover();
  }, [angleStep]);

  // Sync external selectedDistroId
  useEffect(() => {
    if (selectedDistroId) {
      rotateToDistro(selectedDistroId);
    }
  }, [selectedDistroId, rotateToDistro]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 1200;
    const height = container.clientHeight || window.innerHeight || 800;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Charming pastel fog matching the horizon
    scene.fog = new THREE.FogExp2(0xFFD6E8, 0.022);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 14.8);
    camera.lookAt(0, 0.7, 0);
    cameraRef.current = camera;

    // 2. WebGL Renderer with High-DPI and Antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Sculpted 3D Lighting (Tuned for physical beveled depth & bevel specular glints)
    // Ambient light kept moderate so side shadows and bevels stand out distinctly!
    const ambientLight = new THREE.AmbientLight(0xFFFAF0, 1.6);
    scene.add(ambientLight);

    // Primary Directional Sun Light (High top-right angle creates crisp edge highlights)
    const sunLight = new THREE.DirectionalLight(0xFFFBE8, 2.8);
    sunLight.position.set(7, 14, 9);
    scene.add(sunLight);

    // Key Rim Light from left-back gives beveled edges a glowing cyan/sky edge definition
    const rimLight = new THREE.DirectionalLight(0x90CAF9, 1.6);
    rimLight.position.set(-8, 6, -4);
    scene.add(rimLight);

    // Warm pink candy bounce light from below
    const pastelBounceLight = new THREE.PointLight(0xFF80AB, 1.6, 25);
    pastelBounceLight.position.set(0, -2.5, 4);
    scene.add(pastelBounceLight);

    // 4. Floating 8-Bit Pixel Clouds in the Sky Background (Matching image)
    const cloudsGroup = new THREE.Group();
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xFFF0F5, transparent: true, opacity: 0.85 });

    for (let c = 0; c < 6; c++) {
      const cloud = new THREE.Group();
      const cx = (c - 2.5) * 8;
      const cy = 4.8 + (c % 2) * 1.5;
      const cz = -10 + (c % 3) * 2;

      // Cluster of stepped boxes forming an 8-bit cloud
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 0.5), cloudMat);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 0.5), cloudMat);
      b2.position.set(0, 0.7, 0);
      const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.5), cloudMat);
      b3.position.set(0.4, 1.3, 0);

      cloud.add(b1);
      cloud.add(b2);
      cloud.add(b3);
      cloud.position.set(cx, cy, cz);
      cloudsGroup.add(cloud);
    }
    scene.add(cloudsGroup);

    // 5. Pastel Pink Rolling Landscape Hills on Floor (Matching image)
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -2.2;

    const groundGeo = new THREE.CylinderGeometry(18, 20, 1.2, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xF48FB1, // Candy Pink
      roughness: 0.85,
      metalness: 0.05
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.6;
    floorGroup.add(groundMesh);

    // Cute decorative pastel pediment ring
    const ringGeo = new THREE.RingGeometry(8.9, 9.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFFE082, // Pastel Gold
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    floorGroup.add(ringMesh);

    scene.add(floorGroup);

    // 6. Floating 8-Bit Pixel Sparkles / Cross Stars (+) (Matching image)
    const sparklesCount = 45;
    const sparkleGroup = new THREE.Group();
    const sparkleColors = [0xFFEB3B, 0x00E5FF, 0xEA80FC, 0xFF4081];

    for (let s = 0; s < sparklesCount; s++) {
      const sColor = sparkleColors[s % sparkleColors.length];
      const sMat = new THREE.MeshBasicMaterial({ color: sColor });
      const cross = new THREE.Group();
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.07, 0.02), sMat);
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.25, 0.02), sMat);
      cross.add(hBar);
      cross.add(vBar);

      cross.position.set(
        (Math.random() - 0.5) * 26,
        Math.random() * 8 + 0.5,
        (Math.random() - 0.5) * 22
      );
      sparkleGroup.add(cross);
    }
    scene.add(sparkleGroup);

    // 7. Squircles Distro Deck Carousel with TANGIBLE 3D BEVELED CARTRIDGES!
    const deckGroup = new THREE.Group();
    deckGroupRef.current = deckGroup;
    badgeMeshesRef.current = [];

    // Shared 3D Extruded Beveled Geometry for the Chunky Toy Casing
    const squircleShape = createSquircleShape(2.32, 2.32, 0.44);
    const squircle3DGeo = new THREE.ExtrudeGeometry(squircleShape, {
      depth: 0.40,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.10,
      bevelThickness: 0.10,
    });
    squircle3DGeo.center(); // Center around origin: Z goes from -0.30 to +0.30

    // Shared plane geometries for decals & shadow
    const faceDecalGeo = new THREE.PlaneGeometry(2.30, 2.30);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowTexture = createSoftShadowTexture();

    LINUX_DISTROS.forEach((distro, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * deckRadius;
      const z = Math.cos(angle) * deckRadius;

      // Container for this distro's unit
      const distroUnit = new THREE.Group();
      distroUnit.position.set(x, 0.8, z);
      distroUnit.rotation.y = angle;

      // A. CHUNKY 3D EXTRUDED BODY (Glossy Toy Plastic with Beveled Edges)
      const badgeColorHex = DISTRO_BADGE_COLORS[distro.id] || distro.accentColor || '#4D7CFF';
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(badgeColorHex),
        roughness: 0.22,
        metalness: 0.10,
        emissive: new THREE.Color(badgeColorHex),
        emissiveIntensity: 0.06,
      });
      const bodyMesh = new THREE.Mesh(squircle3DGeo, bodyMaterial);
      distroUnit.add(bodyMesh);

      // B. FRONT DECAL FACE PLATE (Shows Cute Distro Silhouette & Oval Eyes)
      const frontTexture = createDistroBadgeTexture(distro);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        transparent: true,
        roughness: 0.25,
        metalness: 0.06,
        emissive: new THREE.Color(badgeColorHex),
        emissiveIntensity: 0.04,
      });
      const frontMesh = new THREE.Mesh(faceDecalGeo, frontMaterial);
      frontMesh.position.z = 0.305; // Placed right on the front face of the 3D block
      distroUnit.add(frontMesh);

      // C. REAR CARTRIDGE DETAIL (So 360° carousel rotation reveals authentic physical cartridge backs!)
      const backTexture = createCartridgeBackTexture(distro);
      const backMaterial = new THREE.MeshStandardMaterial({
        map: backTexture,
        transparent: true,
        roughness: 0.35,
        metalness: 0.10,
      });
      const backMesh = new THREE.Mesh(faceDecalGeo, backMaterial);
      backMesh.position.z = -0.305;
      backMesh.rotation.y = Math.PI;
      distroUnit.add(backMesh);

      // D. REALISTIC SOFT GROUND CONTACT SHADOW
      const shadowMaterial = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
      shadowMesh.position.y = -2.18;
      shadowMesh.rotation.x = -Math.PI / 2;
      distroUnit.add(shadowMesh);

      // Metadata attached to main bodyMesh for raycasting & animation
      bodyMesh.userData = {
        distro,
        index: i,
        baseY: 0.8,
        distroUnit,
        bodyMaterial,
        frontMaterial,
        shadowMesh,
        badgeColor: badgeColorHex
      };

      deckGroup.add(distroUnit);
      badgeMeshesRef.current.push(bodyMesh);
    });

    scene.add(deckGroup);

    // 8. Pointer & Raycasting Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle drag rotation
      if (isDraggingRef.current) {
        const deltaX = e.clientX - prevMouseXRef.current;
        prevMouseXRef.current = e.clientX;
        const dragSpeed = 0.0055;
        targetRotationRef.current += deltaX * dragSpeed;
        velocityRef.current = deltaX * dragSpeed;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDraggingRef.current = true;
        prevMouseXRef.current = e.clientX;
        velocityRef.current = 0;
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const wheelDelta = e.deltaY * 0.0018;
      targetRotationRef.current += wheelDelta;
    };

    const onClick = (e: MouseEvent) => {
      if (Math.abs(velocityRef.current) > 0.005) return;

      const rect = container.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(clickMouse, camera);
      const intersects = raycaster.intersectObjects(badgeMeshesRef.current);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const data = clickedMesh.userData;
        if (data && data.distro) {
          cyberAudio.playSelect();

          // Elevate 3D badge with playful bouncy Anime.js spring
          const unit = data.distroUnit as THREE.Group;
          animate(unit.position, {
            y: data.baseY + 0.65,
            duration: 350,
            easing: 'easeOutElastic(1, .6)',
            complete: () => {
              animate(unit.position, {
                y: data.baseY,
                duration: 400,
                easing: 'easeOutQuad'
              });
            }
          });

          // Rotate deck to face this badge
          rotateToDistro(data.distro.id);

          // Trigger selection callback
          onSelectDistro(data.distro);
        }
      }
    };

    // Touch events for mobile/tablet support
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        prevMouseXRef.current = touchStartX;
        isDraggingRef.current = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - prevMouseXRef.current;
        prevMouseXRef.current = currentX;
        targetRotationRef.current += deltaX * 0.006;
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    // Attach listeners
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('click', onClick);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animateLoop = () => {
      animationFrameId = requestAnimationFrame(animateLoop);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping interpolation for deck rotation
      rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.09;
      if (deckGroupRef.current) {
        deckGroupRef.current.rotation.y = rotationRef.current;
      }

      // Update active distro telemetry based on rotation
      updateActiveDistroFromRotation();

      // Handle inertia decay when not dragging
      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.0001) {
        targetRotationRef.current += velocityRef.current;
        velocityRef.current *= 0.92;
      }

      // Slow gentle floating motion for clouds in the sky
      cloudsGroup.children.forEach((cloud, idx) => {
        cloud.position.x += 0.004 * (idx % 2 === 0 ? 1 : 1.2);
        if (cloud.position.x > 18) cloud.position.x = -18;
      });

      // Subtle twinkling on 8-bit sparkles
      sparkleGroup.children.forEach((s, idx) => {
        s.rotation.z = elapsedTime * 0.5 + idx;
      });

      // Raycasting hover check against 3D body meshes
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(badgeMeshesRef.current);

      let foundHoverIdx: number | null = null;
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        foundHoverIdx = hoveredMesh.userData.index;
        container.style.cursor = 'pointer';
      } else {
        container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }

      // Trigger hover sound if changed
      if (foundHoverIdx !== hoveredBadgeIndexRef.current) {
        if (foundHoverIdx !== null) {
          cyberAudio.playHover();
        }
        hoveredBadgeIndexRef.current = foundHoverIdx;
      }

      // Update 3D card physics, interactive 3D parallax tilt, buoyant floating elevation, and lighting
      const activeFilterSet = filteredDistroIds && filteredDistroIds.length > 0
        ? new Set(filteredDistroIds)
        : null;

      badgeMeshesRef.current.forEach((mesh, idx) => {
        const isHovered = (idx === foundHoverIdx);
        const isSelected = (mesh.userData.distro.id === selectedDistroIdRef.current);
        const isDimmed = activeFilterSet ? !activeFilterSet.has(mesh.userData.distro.id) : false;

        const unit = mesh.userData.distroUnit as THREE.Group;
        const shadow = mesh.userData.shadowMesh as THREE.Mesh;
        const bodyMat = mesh.userData.bodyMaterial as THREE.MeshStandardMaterial;
        const frontMat = mesh.userData.frontMaterial as THREE.MeshStandardMaterial;

        // Bouncy floating elevation
        const targetY = mesh.userData.baseY + (isHovered ? 0.42 : (isSelected ? 0.22 : 0)) + Math.sin(elapsedTime * 2.2 + idx) * 0.06;
        unit.position.y += (targetY - unit.position.y) * 0.16;

        // Smooth physical bouncy scale on hover
        const targetScale = isHovered ? 1.15 : (isSelected ? 1.08 : 1.0);
        unit.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.18);

        // Ground shadow responds dynamically to card height and scale
        const targetShadowScale = isHovered ? 1.35 : (isSelected ? 1.15 : 1.0);
        shadow.scale.lerp(new THREE.Vector3(targetShadowScale, targetShadowScale, 1.0), 0.16);
        const targetShadowOpacity = isHovered ? 0.75 : (isSelected ? 0.6 : 0.4);
        (shadow.material as THREE.MeshBasicMaterial).opacity += (targetShadowOpacity - (shadow.material as THREE.MeshBasicMaterial).opacity) * 0.15;

        // DYNAMIC 3D PARALLAX TILT PHYSICS!
        // This is what makes the 3D card feel incredibly tangible, revealing its beveled side thickness!
        if (isHovered) {
          // Interactive 3D tilt responding to mouse pointer coordinates
          const targetTiltX = mouse.y * 0.38;
          const targetTiltZ = -mouse.x * 0.32;
          unit.rotation.x += (targetTiltX - unit.rotation.x) * 0.16;
          unit.rotation.z += (targetTiltZ - unit.rotation.z) * 0.16;
        } else {
          // Idle gentle 3D breathing tilt (so bevels and 3D depth are always subtly catching light)
          const idleTiltX = Math.sin(elapsedTime * 1.5 + idx * 0.7) * 0.04;
          const idleTiltZ = Math.cos(elapsedTime * 1.2 + idx * 0.7) * 0.03;
          unit.rotation.x += (idleTiltX - unit.rotation.x) * 0.12;
          unit.rotation.z += (idleTiltZ - unit.rotation.z) * 0.12;
        }

        // Lighting up the 3D card body and front face
        if (isDimmed) {
          bodyMat.opacity = 0.35;
          bodyMat.emissiveIntensity = 0.0;
          frontMat.opacity = 0.35;
          frontMat.emissiveIntensity = 0.0;
        } else if (isHovered) {
          // Hovered: bright, cheerful self-illumination & specular gleam!
          bodyMat.opacity = 1.0;
          bodyMat.emissiveIntensity = 0.35;
          frontMat.opacity = 1.0;
          frontMat.emissiveIntensity = 0.28;
        } else if (isSelected) {
          bodyMat.opacity = 1.0;
          bodyMat.emissiveIntensity = 0.18;
          frontMat.opacity = 1.0;
          frontMat.emissiveIntensity = 0.14;
        } else {
          // Resting state
          bodyMat.opacity = 1.0;
          bodyMat.emissiveIntensity = 0.06;
          frontMat.opacity = 0.95;
          frontMat.emissiveIntensity = 0.04;
        }
      });

      renderer.render(scene, camera);
    };

    animateLoop();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('click', onClick);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [deckRadius, numDistros, angleStep, onSelectDistro, rotateToDistro, filteredDistroIds, updateActiveDistroFromRotation]);

  return (
    <div 
      className="relative w-full h-full select-none overflow-hidden"
      style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative' }}
    >
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing" 
        style={{ width: '100%', height: '100%', minHeight: '100vh', display: 'block' }}
      />

      {/* Playful Corner Tag */}
      <div className="absolute top-4 left-4 pointer-events-none text-xs text-[#6B5A75] font-mono tracking-wider hidden sm:block">
        <span className="font-bold text-[#FF3B30]">★ [DISTRO_LAND_3D]</span>
        <div className="text-[#8E7B99] pl-3">18 3D COLLECTIBLE BADGES // 360° ORBIT</div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none text-xs text-[#6B5A75] font-mono tracking-wider text-right hidden sm:block">
        <span className="font-bold text-[#4D7CFF]">[CONTROLS] ★</span>
        <div className="text-[#8E7B99] pr-3">DRAG TO SPIN // HOVER FOR 3D TILT</div>
      </div>
    </div>
  );
};
