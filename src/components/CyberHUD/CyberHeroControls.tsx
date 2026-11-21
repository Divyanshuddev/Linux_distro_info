'use client';

import React, { useState } from 'react';
import { LinuxDistro, DistroFamily } from '@/types';
import { cyberAudio } from '@/lib/cyberAudio';
import {
  Volume2, VolumeX, Search, Dices, HelpCircle, X, ChevronLeft, ChevronRight,
  Sparkles, Gamepad2, Heart
} from 'lucide-react';

interface CyberHeroControlsProps {
  distros: LinuxDistro[];
  activeDistro: LinuxDistro | null;
  selectedFamily: DistroFamily | 'ALL';
  onSelectFamily: (family: DistroFamily | 'ALL') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenDossier: () => void;
  onRandomDistro: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CyberHeroControls: React.FC<CyberHeroControlsProps> = ({
  distros,
  activeDistro,
  selectedFamily,
  onSelectFamily,
  searchQuery,
  onSearchChange,
  onPrev,
  onNext,
  onOpenDossier,
  onRandomDistro,
  soundEnabled,
  onToggleSound
}) => {
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Five vibrant badge colors directly matching the 5 squircle badges in the uploaded image!
  const families: { label: string; value: DistroFamily | 'ALL'; color: string; bg: string }[] = [
    { label: 'ALL (18)', value: 'ALL', color: '#FFFFFF', bg: '#FF3B30' },          // Red like badge 1
    { label: 'DEBIAN', value: 'Debian', color: '#2D2338', bg: '#FFF033' },        // Yellow like badge 2
    { label: 'ARCH', value: 'Arch', color: '#FFFFFF', bg: '#00D26A' },            // Green like badge 3
    { label: 'RED HAT', value: 'Red Hat', color: '#FFFFFF', bg: '#4D7CFF' },      // Blue like badge 4
    { label: 'INDEPENDENT', value: 'Independent', color: '#FFFFFF', bg: '#C400FF' } // Purple like badge 5
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 sm:p-5 z-20 select-none">
      {/* ================= TOP ARCADE HEADER ================= */}
      <header className="pointer-events-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-[#2D2338] arcade-shadow">
            <div className="w-8 h-8 rounded-xl bg-[#FF3B30] flex items-center justify-center text-white font-black text-sm">
              🐧
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#2D2338] font-black text-base tracking-wide font-mono">
                  DISTRO.LAND
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#FFF033] rounded-full border border-[#2D2338] text-[#2D2338] font-black font-mono">
                  8-BIT
                </span>
              </div>
              <div className="text-[10px] text-[#7E6585] font-mono">
                18 KAWAII CHARACTERS ★ 3D GUIDE
              </div>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleSound}
              className="p-2 bg-white rounded-xl border-2 border-[#2D2338] text-[#2D2338] cursor-pointer arcade-shadow-sm arcade-btn"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00D26A]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 bg-white rounded-xl border-2 border-[#2D2338] text-[#2D2338] cursor-pointer arcade-shadow-sm arcade-btn"
            >
              <HelpCircle className="w-4 h-4 text-[#FF3B30]" />
            </button>
          </div>
        </div>

        {/* Center: The 5 Cute Squircle Badges Filters (Directly from uploaded image!) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {families.map((f) => {
            const isSelected = selectedFamily === f.value;
            return (
              <button
                key={f.value}
                onClick={() => {
                  cyberAudio.playClick();
                  onSelectFamily(f.value);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono font-black tracking-wide rounded-2xl border-2 border-[#2D2338] transition-all cursor-pointer whitespace-nowrap arcade-btn ${
                  isSelected
                    ? 'arcade-shadow scale-105 ring-2 ring-white'
                    : 'bg-white/85 text-[#2D2338] opacity-80 hover:opacity-100'
                }`}
                style={isSelected ? { backgroundColor: f.bg, color: f.color } : {}}
              >
                {isSelected ? `★ ${f.label}` : f.label}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Search Bar, Randomizer, Audio */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Friendly Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8E7696] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="SEARCH DISTRO..."
              className="w-36 focus:w-48 transition-all bg-white/90 border-2 border-[#2D2338] rounded-2xl text-[#2D2338] text-xs font-mono font-bold pl-8 pr-2 py-1.5 outline-none arcade-shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Random Roll */}
          <button
            onClick={() => {
              cyberAudio.playSelect();
              onRandomDistro();
            }}
            className="px-3 py-1.5 bg-[#FFF033] hover:bg-[#FFE600] border-2 border-[#2D2338] text-[#2D2338] text-xs font-mono font-black rounded-2xl cursor-pointer arcade-shadow-sm arcade-btn flex items-center gap-1.5"
            title="Roll Random Distro"
          >
            <Dices className="w-4 h-4 text-[#FF3B30]" />
            <span>RANDOM</span>
          </button>

          {/* Audio SFX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              cyberAudio.playClick();
            }}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border-2 border-[#2D2338] text-[#2D2338] text-xs font-mono font-black rounded-2xl cursor-pointer arcade-shadow-sm arcade-btn flex items-center gap-1.5"
            title="Toggle Chiptune 8-Bit SFX"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#00D26A]" />
                <span className="text-[#00D26A]">SFX:ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">SFX:OFF</span>
              </>
            )}
          </button>

          {/* Keybindings Help */}
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 bg-white hover:bg-[#FF3B30] hover:text-white border-2 border-[#2D2338] rounded-2xl text-[#2D2338] text-xs font-mono font-bold cursor-pointer arcade-shadow-sm arcade-btn"
            title="Help & Keybindings"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ================= BOTTOM ARCADE FOOTER ================= */}
      <footer className="pointer-events-auto flex flex-col md:flex-row items-stretch md:items-end justify-between gap-3">
        {/* Left: Active Distro Cute Card (Responsive title & layout) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-[#2D2338] p-3 sm:p-3.5 rounded-3xl w-full sm:w-auto max-w-full sm:max-w-md arcade-shadow">
          {activeDistro ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#7E6585] font-mono">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF3B30]" /> ACTIVE CHARACTER
                </span>
                <span className="px-2 py-0.5 bg-[#FFE4EE] rounded-full border border-[#E870A0] text-[#E870A0] font-black text-[10px]">
                  {activeDistro.family.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span 
                  className="w-3.5 h-3.5 rounded-lg shrink-0 border border-[#2D2338]"
                  style={{ backgroundColor: activeDistro.accentColor }} 
                />
                <h3 
                  className={`font-black text-[#2D2338] uppercase font-mono tracking-tight min-w-0 ${
                    activeDistro.name.length > 15
                      ? 'text-base sm:text-lg md:text-xl'
                      : activeDistro.name.length > 10
                      ? 'text-lg sm:text-xl md:text-2xl'
                      : 'text-xl sm:text-2xl md:text-3xl'
                  }`}
                  title={activeDistro.name}
                >
                  {activeDistro.name}
                </h3>
                <span className="text-[10px] sm:text-xs text-[#7E6585] font-mono px-2 py-0.5 bg-[#F6EEF8] rounded-md border border-[#E0D2E5] shrink-0">
                  {activeDistro.desktopEnvironment.default.slice(0, 16)}
                </span>
              </div>
              <p className="text-xs text-[#5D4666] font-mono truncate">
                {activeDistro.tagline}
              </p>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-mono">
              // SPIN THE CAROUSEL TO EXPLORE //
            </div>
          )}
        </div>

        {/* Center: Carousel Navigation Buttons */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              cyberAudio.playClick();
              onPrev();
            }}
            className="px-4 py-2.5 bg-white hover:bg-[#FFECC8] text-[#2D2338] border-2 border-[#2D2338] text-xs font-mono font-black rounded-2xl cursor-pointer arcade-shadow arcade-btn flex items-center gap-1"
            title="Previous (A / Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4 text-[#FF3B30]" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <div className="px-4 py-2 bg-white/80 border-2 border-[#2D2338] rounded-2xl text-xs text-[#2D2338] font-mono font-bold tracking-wider hidden sm:block text-center arcade-shadow-sm">
            <span className="text-[#FF3B30]">DRAG</span> OR <span className="text-[#00D26A]">SCROLL</span> TO SPIN 360°
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onNext();
            }}
            className="px-4 py-2.5 bg-white hover:bg-[#FFECC8] text-[#2D2338] border-2 border-[#2D2338] text-xs font-mono font-black rounded-2xl cursor-pointer arcade-shadow arcade-btn flex items-center gap-1"
            title="Next (D / Right Arrow)"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4 text-[#00D26A]" />
          </button>
        </div>

        {/* Right: Primary Call to Action -> Open Full Dossier */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              cyberAudio.playSelect();
              onOpenDossier();
            }}
            className="w-full md:w-auto px-5 py-3 bg-[#FF3B30] hover:bg-[#FF2418] text-white font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-[#2D2338] arcade-shadow arcade-btn cursor-pointer flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-4 h-4 text-white" />
            <span>EXPLORE GUIDE [SPACE]</span>
          </button>
        </div>
      </footer>

      {/* Keybindings Modal in Cute Retro Arcade Style */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 pointer-events-auto">
          <div className="bg-white border-3 border-[#2D2338] rounded-3xl arcade-shadow max-w-md w-full p-5 space-y-4 font-mono text-xs text-[#2D2338]">
            <div className="flex items-center justify-between border-b-2 border-[#EADBE6] pb-2">
              <span className="font-black text-sm text-[#FF3B30] flex items-center gap-1.5">
                ★ [DISTRO_LAND_MANUAL]
              </span>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-[#2D2338]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#FFF9EC] rounded-xl border border-[#2D2338]">
                <span className="text-[#00D26A] font-black">DRAG / TOUCH SWIPE</span>
                <span className="text-[#5D4666]">Spin the 3D carousel 360°</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FFF9EC] rounded-xl border border-[#2D2338]">
                <span className="text-[#4D7CFF] font-black">MOUSE WHEEL</span>
                <span className="text-[#5D4666]">Cycle through distros</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FFF9EC] rounded-xl border border-[#2D2338]">
                <span className="text-[#FF3B30] font-black">CLICK BADGE</span>
                <span className="text-[#5D4666]">View full specs & terminal</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FFF9EC] rounded-xl border border-[#2D2338]">
                <span className="text-[#C400FF] font-black">A / D or ← / →</span>
                <span className="text-[#5D4666]">Previous / Next distro</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FFF9EC] rounded-xl border border-[#2D2338]">
                <span className="text-[#2D2338] font-black">SPACE / ENTER</span>
                <span className="text-[#5D4666]">Open full guide dossier</span>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2.5 bg-[#00D26A] text-white font-black uppercase text-center rounded-2xl border-2 border-[#2D2338] arcade-shadow-sm arcade-btn cursor-pointer"
            >
              GOT IT! LET’S PLAY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
