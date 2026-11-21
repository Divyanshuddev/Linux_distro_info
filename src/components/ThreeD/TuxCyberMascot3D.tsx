'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Terminal, Sparkles, AlertOctagon } from 'lucide-react';

const TUX_QUOTES = [
  "“Talk is cheap. Show me the code.” — Linus Torvalds",
  "“In Linux, you are the root superuser. With great power comes `sudo`!”",
  "“Over 96% of the world's top 1 million servers run Linux.”",
  "“Every Android device, Mars Rover, and top 500 supercomputers run Linux!”",
  "“SteamOS and Proton proved that PC gaming on Linux is phenomenal.”",
  "“Pick Linux Mint or Ubuntu if you're new; try Arch or NixOS when you crave adventure!”"
];

export const TuxCyberMascot3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState<number>(0);
  const [isWaving, setIsWaving] = useState<boolean>(false);

  const cycleQuote = () => {
    setIsWaving(true);
    setCurrentQuoteIdx((prev) => (prev + 1) % TUX_QUOTES.length);
    setTimeout(() => setIsWaving(false), 1200);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFF003C, 3.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00F0FF, 2.2);
    cyanRim.position.set(-3, 2, -2);
    scene.add(cyanRim);

    // Tux Group
    const tuxGroup = new THREE.Group();
    scene.add(tuxGroup);

    // Materials
    const tuxBodyMat = new THREE.MeshStandardMaterial({
      color: 0x08080E,
      roughness: 0.35,
      metalness: 0.35
    });

    const tuxBellyMat = new THREE.MeshStandardMaterial({
      color: 0xFAFAFA,
      roughness: 0.35
    });

    const tuxBeakMat = new THREE.MeshStandardMaterial({
      color: 0xFFE600,
      roughness: 0.25
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0xFF003C,
      emissive: 0xD90429,
      emissiveIntensity: 1.3,
      roughness: 0.1,
      metalness: 0.95
    });

    // Body
    const bodyGeo = new THREE.SphereGeometry(1.0, 32, 32);
    bodyGeo.scale(0.9, 1.15, 0.85);
    const bodyMesh = new THREE.Mesh(bodyGeo, tuxBodyMat);
    bodyMesh.position.y = 0.5;
    tuxGroup.add(bodyMesh);

    // Belly
    const bellyGeo = new THREE.SphereGeometry(0.72, 32, 32);
    bellyGeo.scale(0.85, 1.0, 0.45);
    const bellyMesh = new THREE.Mesh(bellyGeo, tuxBellyMat);
    bellyMesh.position.set(0, 0.45, 0.55);
    tuxGroup.add(bellyMesh);

    // Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.45, 0.05);
    tuxGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const headMesh = new THREE.Mesh(headGeo, tuxBodyMat);
    headGroup.add(headMesh);

    // Cyber Visor (Electric Crimson from Image 1)
    const visorGeo = new THREE.BoxGeometry(0.85, 0.24, 0.32);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.08, 0.52);
    headGroup.add(visorMesh);

    // Beak
    const beakGeo = new THREE.ConeGeometry(0.24, 0.45, 16);
    beakGeo.rotateX(Math.PI / 2);
    const beakMesh = new THREE.Mesh(beakGeo, tuxBeakMat);
    beakMesh.position.set(0, -0.12, 0.72);
    headGroup.add(beakMesh);

    // Wings
    const wingGeo = new THREE.CylinderGeometry(0.12, 0.22, 1.0, 16);
    wingGeo.scale(0.5, 1.0, 1.2);

    const leftWing = new THREE.Mesh(wingGeo, tuxBodyMat);
    leftWing.position.set(-0.95, 0.55, 0.1);
    leftWing.rotation.z = Math.PI / 6;
    tuxGroup.add(leftWing);

    const rightWingGroup = new THREE.Group();
    rightWingGroup.position.set(0.95, 0.85, 0.1);
    tuxGroup.add(rightWingGroup);

    const rightWing = new THREE.Mesh(wingGeo, tuxBodyMat);
    rightWing.position.set(0, -0.3, 0);
    rightWing.rotation.z = -Math.PI / 6;
    rightWingGroup.add(rightWing);

    // Feet
    const footGeo = new THREE.CylinderGeometry(0.32, 0.35, 0.12, 16);
    footGeo.scale(1.2, 1.0, 1.5);
    const leftFoot = new THREE.Mesh(footGeo, tuxBeakMat);
    leftFoot.position.set(-0.45, -0.55, 0.3);
    tuxGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, tuxBeakMat);
    rightFoot.position.set(0.45, -0.55, 0.3);
    tuxGroup.add(rightFoot);

    // Cyberpunk Floating Pedestal with dual rings (Red + Cyan)
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.18, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111118,
      metalness: 0.9,
      roughness: 0.2
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.75;
    tuxGroup.add(pedestal);

    // Red Outer Energy Ring
    const redRingGeo = new THREE.RingGeometry(1.6, 1.75, 48);
    const redRingMat = new THREE.MeshBasicMaterial({
      color: 0xFF003C,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const redRing = new THREE.Mesh(redRingGeo, redRingMat);
    redRing.rotation.x = Math.PI / 2;
    redRing.position.y = -0.7;
    tuxGroup.add(redRing);

    // Cyan Inner Energy Ring
    const cyanRingGeo = new THREE.RingGeometry(1.35, 1.45, 48);
    const cyanRingMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const cyanRing = new THREE.Mesh(cyanRingGeo, cyanRingMat);
    cyanRing.rotation.x = Math.PI / 2;
    cyanRing.position.y = -0.68;
    tuxGroup.add(cyanRing);

    // Mouse Tracking Target
    const targetHeadRot = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / width) * 2 - 1;
      const normY = -((e.clientY - rect.top) / height) * 2 + 1;
      targetHeadRot.y = THREE.MathUtils.clamp(normX * 0.45, -0.5, 0.5);
      targetHeadRot.x = THREE.MathUtils.clamp(-normY * 0.3, -0.3, 0.3);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId: number;
    let ticks = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ticks += 1;

      // Bobbing Tux motion
      tuxGroup.position.y = Math.sin(ticks * 0.04) * 0.08;
      redRing.rotation.z += 0.012;
      cyanRing.rotation.z -= 0.016;

      // Head tracking
      headGroup.rotation.y += (targetHeadRot.y - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRot.x - headGroup.rotation.x) * 0.08;

      // Waving
      if (isWaving) {
        rightWingGroup.rotation.z = Math.sin(ticks * 0.3) * 0.6 + 0.3;
      } else {
        rightWingGroup.rotation.z = Math.sin(ticks * 0.04) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isWaving]);

  return (
    <div className="relative w-full max-w-md mx-auto p-4 flex flex-col items-center select-none">
      {/* 3D Tux Mount */}
      <div
        ref={mountRef}
        onClick={cycleQuote}
        className="w-full h-[240px] cursor-pointer"
        title="Click Cyber Tux for Linux Wisdom!"
      />

      {/* Cyberpunk Comic Speech Bubble (Styled directly after Image 2's angular dialogue boxes!) */}
      <div
        onClick={cycleQuote}
        className="relative w-full mt-2 bg-[#09090F] border-2 border-[#FF003C] shadow-[4px_4px_0px_#000000] cyber-pop-shadow-red text-left cursor-pointer transform hover:scale-[1.02] transition-all cyber-chamfer-both p-4 font-mono"
      >
        {/* Accent Tag */}
        <div className="flex items-center justify-between text-xs font-black uppercase text-[#FF003C] mb-1.5">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> // CYBER_TUX.AI //
          </span>
          <span className="text-[10px] text-[#00F0FF] font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFE600]" /> [CLICK_CYCLE]
          </span>
        </div>

        <p className="text-xs text-[#FAFAFA] font-sans italic leading-relaxed">
          {TUX_QUOTES[currentQuoteIdx]}
        </p>

        {/* Diagonal Warning Accent Stripe on Bottom Corner */}
        <div className="mt-2.5 h-1.5 w-24 hazard-stripes-cyber rounded-xs" />
      </div>
    </div>
  );
};
