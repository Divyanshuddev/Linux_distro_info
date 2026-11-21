'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { LINUX_DISTROS } from '@/data/distros';
import { LinuxDistro, DistroFamily } from '@/types';
import { CyberHeroControls } from '@/components/CyberHUD/CyberHeroControls';
import { CyberDistroDossier } from '@/components/CyberHUD/CyberDistroDossier';
import { cyberAudio } from '@/lib/cyberAudio';

// Dynamic import for 3D Distro Carousel
const CyberDistroDeck3D = dynamic(
  () => import('@/components/ThreeD/CyberDistroDeck3D').then((m) => m.CyberDistroDeck3D),
  {
    ssr: false,
    loading: () => (
      <div 
        className="w-full h-full flex flex-col items-center justify-center font-mono text-xs gap-3"
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '100vh', 
          background: 'linear-gradient(180deg, #A8D8F0 0%, #FFF0D6 48%, #FFA8CB 100%)', 
          color: '#2D2338' 
        }}
      >
        <div className="w-10 h-10 border-4 border-t-[#FF3B30] border-r-[#00D26A] border-b-[#4D7CFF] border-l-transparent rounded-full animate-spin" />
        <span className="tracking-widest font-black text-sm">★ LOADING DISTRO.LAND 3D ★</span>
      </div>
    )
  }
);

export default function DistroLandPage() {
  const [selectedDistro, setSelectedDistro] = useState<LinuxDistro | null>(null);
  const [activeFocusDistro, setActiveFocusDistro] = useState<LinuxDistro>(LINUX_DISTROS[0]);
  const [selectedFamily, setSelectedFamily] = useState<DistroFamily | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Filtered distros based on Family and Search
  const filteredDistros = useMemo(() => {
    return LINUX_DISTROS.filter((d) => {
      const matchFamily = selectedFamily === 'ALL' || d.family === selectedFamily;
      const matchSearch = searchQuery.trim() === '' || 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.desktopEnvironment.default.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFamily && matchSearch;
    });
  }, [selectedFamily, searchQuery]);

  const filteredDistroIds = useMemo(() => {
    return filteredDistros.map((d) => d.id);
  }, [filteredDistros]);

  // Navigate to previous distro in the current list
  const handlePrev = useCallback(() => {
    const list = filteredDistros.length > 0 ? filteredDistros : LINUX_DISTROS;
    const currentIdx = list.findIndex((d) => d.id === activeFocusDistro.id);
    const newIdx = currentIdx <= 0 ? list.length - 1 : currentIdx - 1;
    const nextDistro = list[newIdx];
    setActiveFocusDistro(nextDistro);
    if (isDossierOpen) {
      setSelectedDistro(nextDistro);
    }
  }, [filteredDistros, activeFocusDistro.id, isDossierOpen]);

  // Navigate to next distro in the current list
  const handleNext = useCallback(() => {
    const list = filteredDistros.length > 0 ? filteredDistros : LINUX_DISTROS;
    const currentIdx = list.findIndex((d) => d.id === activeFocusDistro.id);
    const newIdx = currentIdx === -1 || currentIdx >= list.length - 1 ? 0 : currentIdx + 1;
    const nextDistro = list[newIdx];
    setActiveFocusDistro(nextDistro);
    if (isDossierOpen) {
      setSelectedDistro(nextDistro);
    }
  }, [filteredDistros, activeFocusDistro.id, isDossierOpen]);

  // On clicking a badge in 3D
  const handleSelectDistro = useCallback((distro: LinuxDistro) => {
    setActiveFocusDistro(distro);
    setSelectedDistro(distro);
    setIsDossierOpen(true);
  }, []);

  // Roll random distro
  const handleRandomDistro = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * LINUX_DISTROS.length);
    const distro = LINUX_DISTROS[randomIdx];
    setActiveFocusDistro(distro);
    if (isDossierOpen) {
      setSelectedDistro(distro);
    }
  }, [isDossierOpen]);

  // Toggle Audio
  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    cyberAudio.setEnabled(next);
  }, [soundEnabled]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        cyberAudio.playClick();
        handlePrev();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        cyberAudio.playClick();
        handleNext();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isDossierOpen) {
          cyberAudio.playSelect();
          setSelectedDistro(activeFocusDistro);
          setIsDossierOpen(true);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRandomDistro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, handleRandomDistro, isDossierOpen, activeFocusDistro]);

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden font-mono select-none"
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
        background: 'linear-gradient(180deg, #A8D8F0 0%, #FFF0D6 48%, #FFA8CB 100%)', 
        color: '#2D2338' 
      }}
    >
      {/* Decorative 8-Bit Pixel Sparkles on the sides */}
      <div className="absolute left-8 top-28 pointer-events-none hidden xl:flex flex-col gap-8 opacity-60">
        <div className="text-xl text-[#FFF033]">✦</div>
        <div className="text-sm text-[#FF3B30] ml-4">★</div>
        <div className="text-lg text-[#00D26A]">✦</div>
      </div>

      <div className="absolute right-8 top-28 pointer-events-none hidden xl:flex flex-col gap-8 items-end opacity-60">
        <div className="text-xl text-[#4D7CFF]">✦</div>
        <div className="text-sm text-[#C400FF] mr-4">★</div>
        <div className="text-lg text-[#FF3B30]">✦</div>
      </div>

      {/* Primary 3D Distro Badges Carousel Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <CyberDistroDeck3D
          onSelectDistro={handleSelectDistro}
          selectedDistroId={activeFocusDistro?.id}
          filteredDistroIds={filteredDistroIds}
          onActiveIndexChange={(distro) => setActiveFocusDistro(distro)}
        />
      </div>

      {/* Retro Arcade HUD Header, Filters, Telemetry & Controls */}
      <CyberHeroControls
        distros={LINUX_DISTROS}
        activeDistro={activeFocusDistro}
        selectedFamily={selectedFamily}
        onSelectFamily={(family) => {
          setSelectedFamily(family);
          if (family !== 'ALL') {
            const firstMatch = LINUX_DISTROS.find((d) => d.family === family);
            if (firstMatch) {
              setActiveFocusDistro(firstMatch);
            }
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenDossier={() => {
          setSelectedDistro(activeFocusDistro);
          setIsDossierOpen(true);
        }}
        onRandomDistro={handleRandomDistro}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Distro Character Dossier Modal */}
      {isDossierOpen && (
        <CyberDistroDossier
          distro={selectedDistro}
          onClose={() => setIsDossierOpen(false)}
          onNextDistro={handleNext}
          onPrevDistro={handlePrev}
        />
      )}
    </main>
  );
}
