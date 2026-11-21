'use client';

import React from 'react';
import {
  Compass, Monitor, Scale, Sparkles, BookOpen,
  Terminal, ShieldAlert, Cpu
} from 'lucide-react';

interface NavbarProps {
  onOpenMatchmaker: () => void;
  onOpenComparison: () => void;
  comparisonCount: number;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMatchmaker,
  onOpenComparison,
  comparisonCount,
  onScrollToSection
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#050508]/95 backdrop-blur-xl border-b border-[#1A1A26] shadow-2xl">
      {/* Top High-Voltage Cyberpunk Neon Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#FF003C] via-[#00F0FF] to-[#FFE600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Cyberpunk Brand Logo (XΔI Mecha Frame from Image 1) */}
        <div
          onClick={() => onScrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Angular Chamfered Badge */}
          <div className="relative">
            <div className="w-10 h-10 bg-[#09090F] border-2 border-[#FF003C] flex items-center justify-center font-mono font-black text-sm cyber-chamfer-tl group-hover:neon-glow-red transition-all">
              <span className="text-[#FF003C]">X</span>
              <span className="text-[#00F0FF] text-[10px]">Δ</span>
              <span className="text-[#FFE600] text-[10px]">I</span>
            </div>
            {/* Tech Corner Crosshairs */}
            <span className="absolute -top-1 -right-1 w-2 h-2 text-[#00F0FF] font-mono text-[9px] leading-none">+</span>
            <span className="absolute -bottom-1 -left-1 w-2 h-2 text-[#FF003C] font-mono text-[9px] leading-none">+</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-widest uppercase text-white font-mono glitch-hover">
                DISTRO<span className="text-[#FF003C]">.</span>VERSE
              </span>
              <span className="cyber-mono text-[9px] px-1.5 py-0.2 rounded-xs bg-[#FF003C]/20 border border-[#FF003C] text-[#FF003C] font-bold">
                CYBER_2077
              </span>
            </div>
            <div className="text-[10px] text-slate-400 cyber-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping inline-block" />
              <span>// NET.PROTO: SECURE_100% //</span>
            </div>
          </div>
        </div>

        {/* Center Cyber HUD Telemetry (Image 1 Sentry Style) */}
        <div className="hidden xl:flex items-center gap-3 cyber-mono text-[10px]">
          <div className="w-16 h-2 hazard-stripes-cyber rounded-xs" />
          <span className="text-slate-500">// SYS: LIVE //</span>
          <span className="text-[#00F0FF] font-bold">[18_DISTROS_ONLINE]</span>
          <div className="w-16 h-2 hazard-stripes-yellow rounded-xs" />
        </div>

        {/* Navigation & Action Buttons with Chamfered Corners */}
        <div className="flex items-center gap-2 cyber-mono">
          {/* 3D Celestial Map Jump */}
          <button
            onClick={() => onScrollToSection('galaxy-3d')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#0C0C14] hover:bg-[#141422] border border-[#262638] hover:border-[#00F0FF] text-xs font-bold text-slate-300 hover:text-[#00F0FF] transition-all cursor-pointer cyber-chamfer-tag"
          >
            <Compass className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>3D_GALAXY</span>
          </button>

          {/* Desktop Environments Jump */}
          <button
            onClick={() => onScrollToSection('de-studio')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0C0C14] hover:bg-[#141422] border border-[#262638] hover:border-[#FFE600] text-xs font-bold text-slate-300 hover:text-[#FFE600] transition-all cursor-pointer cyber-chamfer-tag"
          >
            <Monitor className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>DESKTOPS</span>
          </button>

          {/* Linux 101 Jump */}
          <button
            onClick={() => onScrollToSection('linux-101')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#0C0C14] hover:bg-[#141422] border border-[#262638] hover:border-[#B026FF] text-xs font-bold text-slate-300 hover:text-[#B026FF] transition-all cursor-pointer cyber-chamfer-tag"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#B026FF]" />
            <span>LINUX_101</span>
          </button>

          {/* Cyberpunk Matchmaker Button (High-Voltage Neon Red from Image 1) */}
          <button
            onClick={onOpenMatchmaker}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF003C] hover:bg-[#FF1A4B] text-white text-xs font-black tracking-wider transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,0,60,0.4)] cursor-pointer cyber-chamfer-tag border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white text-[#FF003C]" />
            <span>FIND_DISTRO</span>
          </button>

          {/* Comparison Matrix Modal Trigger */}
          <button
            onClick={onOpenComparison}
            className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-all cursor-pointer cyber-chamfer-tag ${
              comparisonCount > 0
                ? 'bg-[#151522] text-[#00F0FF] border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.3)] font-black'
                : 'bg-[#0C0C14] border-[#262638] text-slate-400 hover:text-white hover:border-[#FF003C]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">COMPARE</span>
            {comparisonCount > 0 && (
              <span className="w-4 h-4 rounded-xs bg-[#00F0FF] text-slate-950 text-[10px] font-black flex items-center justify-center">
                {comparisonCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
