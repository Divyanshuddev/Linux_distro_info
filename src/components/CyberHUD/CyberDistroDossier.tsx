'use client';

import React, { useState, useEffect } from 'react';
import { LinuxDistro } from '@/types';
import { cyberAudio } from '@/lib/cyberAudio';
import {
  X, Cpu, HardDrive, Terminal as TerminalIcon, ExternalLink,
  ChevronLeft, ChevronRight, Check, Palette, Monitor, Zap,
  Play, Shield, Gauge, Layers, Sparkles
} from 'lucide-react';

interface CyberDistroDossierProps {
  distro: LinuxDistro | null;
  onClose: () => void;
  onNextDistro: () => void;
  onPrevDistro: () => void;
}

type TabType = 'overview' | 'hardware' | 'desktop' | 'theme' | 'terminal';

export const CyberDistroDossier: React.FC<CyberDistroDossierProps> = ({
  distro,
  onClose,
  onNextDistro,
  onPrevDistro
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [terminalRunning, setTerminalRunning] = useState<boolean>(false);

  // Reset tab and terminal when distro changes
  useEffect(() => {
    if (distro) {
      setActiveTab('overview');
      setTerminalOutput([
        `★ LINUX_DISTRO_BOOT: ${distro.id.toUpperCase()}_KERNEL ★`,
        `[OK] Initializing ${distro.name} environment...`,
        `[OK] Package Manager '${distro.packageManager.name}' standing by.`,
        `Click a command below to test package install or system update!`
      ]);
    }
  }, [distro?.id, distro?.name, distro?.packageManager.name]);

  // Keyboard shortcut: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!distro) return;
      if (e.key === 'Escape') {
        cyberAudio.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [distro, onClose]);

  if (!distro) return null;

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    cyberAudio.playClick();
    setTimeout(() => setCopiedColor(null), 1600);
  };

  // Run simulated package manager command in terminal
  const executeTerminalCommand = (cmdType: 'install' | 'update' | 'neofetch') => {
    if (terminalRunning) return;
    setTerminalRunning(true);
    cyberAudio.playSelect();

    if (cmdType === 'install') {
      const pkg = 'fastfetch vlc htop neovim';
      setTerminalOutput((prev) => [
        ...prev,
        `\n$ ${distro.packageManager.cliCommand} ${pkg}`,
        `[PAC_MGR] Resolving dependencies for ${distro.name}...`,
        `[PAC_MGR] Downloading packages (14.2 MB)... [100%]`,
        `[PAC_MGR] Unpacking and verifying checksums... [VERIFIED]`,
        `[SUCCESS] 4 packages installed into /usr/bin! ★`
      ]);
      setTerminalRunning(false);
    } else if (cmdType === 'update') {
      setTerminalOutput((prev) => [
        ...prev,
        `\n$ ${distro.packageManager.updateCommand}`,
        `[SYNC] Synchronizing remote repositories...`,
        `[SYNC] Fetching mirror signatures for ${distro.family}...`,
        `[OK] All package databases are up to date. System is clean and ready! ★`
      ]);
      setTerminalRunning(false);
    } else if (cmdType === 'neofetch') {
      const art = distro.terminalNeofetch.asciiArt.join('\n');
      setTerminalOutput((prev) => [
        ...prev,
        `\n$ neofetch --kawaii`,
        art,
        `OS: ${distro.terminalNeofetch.os}`,
        `Kernel: ${distro.terminalNeofetch.kernel}`,
        `Uptime: ${distro.terminalNeofetch.uptime}`,
        `Packages: ${distro.terminalNeofetch.packages} (${distro.packageManager.name})`,
        `Shell: ${distro.terminalNeofetch.shell}`,
        `DE: ${distro.terminalNeofetch.de}`,
        `WM: ${distro.terminalNeofetch.wm}`,
        `Theme: ${distro.themeStyle.styleName}`
      ]);
      setTerminalRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/35 backdrop-blur-xs pointer-events-auto p-2 sm:p-4 lg:p-6 transition-all duration-300">
      {/* Background backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Slide-out Retro Arcade Panel */}
      <div 
        className="relative w-full max-w-2xl h-[92vh] max-h-[850px] bg-[#FFFDF9] border-3 border-[#2D2338] rounded-3xl arcade-shadow flex flex-col z-10 overflow-hidden text-[#2D2338] font-mono select-none"
      >
        {/* Top Header */}
        <div className="bg-[#FFF4E8] border-b-2 border-[#2D2338] p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FF3B30] text-white font-black text-xs rounded-xl border border-[#2D2338]">
                ★ CHARACTER DOSSIER
              </span>
              <span className="text-xs text-[#826A89] font-mono">
                {distro.id.toUpperCase()} // UNIT
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="p-1.5 bg-white hover:bg-[#FF3B30] hover:text-white rounded-xl border-2 border-[#2D2338] transition-colors cursor-pointer arcade-shadow-sm arcade-btn"
              title="Close [ESC]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Distro Name and Sub-lineage Header (Responsive for long distro names) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-1 min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span 
                  className="w-4 h-4 rounded-md inline-block border-2 border-[#2D2338] shrink-0"
                  style={{ backgroundColor: distro.accentColor }} 
                />
                <h2 
                  className={`font-black text-[#2D2338] tracking-tight uppercase min-w-0 ${
                    distro.name.length > 15
                      ? 'text-lg sm:text-xl md:text-2xl'
                      : distro.name.length > 10
                      ? 'text-xl sm:text-2xl md:text-3xl'
                      : 'text-2xl sm:text-3xl md:text-4xl'
                  }`}
                  title={distro.name}
                >
                  {distro.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 bg-[#FFF033] rounded-full border border-[#2D2338] text-[#2D2338] font-black shrink-0">
                  {distro.family.toUpperCase()}
                </span>
                <span className="text-xs px-2 py-0.5 bg-white rounded-full border border-[#2D2338] text-[#7A5B80] hidden sm:inline shrink-0">
                  {distro.releaseModel}
                </span>
              </div>
              <p className="text-xs text-[#6B5273] mt-1 font-sans truncate sm:whitespace-normal">
                ★ {distro.tagline}
              </p>
            </div>

            {/* Quick Prev / Next Distro in Dossier */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onPrevDistro();
                }}
                className="px-2.5 py-1 bg-white hover:bg-[#FFECC8] text-[#2D2338] border-2 border-[#2D2338] rounded-xl text-xs font-black transition-all arcade-shadow-sm arcade-btn flex items-center gap-1"
                title="Previous Distro"
              >
                <ChevronLeft className="w-4 h-4 text-[#FF3B30]" />
                <span className="hidden sm:inline">PREV</span>
              </button>
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onNextDistro();
                }}
                className="px-2.5 py-1 bg-white hover:bg-[#FFECC8] text-[#2D2338] border-2 border-[#2D2338] rounded-xl text-xs font-black transition-all arcade-shadow-sm arcade-btn flex items-center gap-1"
                title="Next Distro"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-4 h-4 text-[#00D26A]" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Cute Chunky Pill Buttons) */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab('overview');
              }}
              className={`px-3 py-1.5 font-black rounded-xl border-2 border-[#2D2338] transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#FF3B30] text-white arcade-shadow-sm scale-105'
                  : 'bg-white text-[#2D2338] hover:bg-slate-50'
              }`}
            >
              [1] OVERVIEW
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab('hardware');
              }}
              className={`px-3 py-1.5 font-black rounded-xl border-2 border-[#2D2338] transition-all cursor-pointer ${
                activeTab === 'hardware'
                  ? 'bg-[#FFF033] text-[#2D2338] arcade-shadow-sm scale-105'
                  : 'bg-white text-[#2D2338] hover:bg-slate-50'
              }`}
            >
              [2] SYSTEM SPECS
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab('desktop');
              }}
              className={`px-3 py-1.5 font-black rounded-xl border-2 border-[#2D2338] transition-all cursor-pointer ${
                activeTab === 'desktop'
                  ? 'bg-[#00D26A] text-white arcade-shadow-sm scale-105'
                  : 'bg-white text-[#2D2338] hover:bg-slate-50'
              }`}
            >
              [3] DESKTOP GUI
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab('theme');
              }}
              className={`px-3 py-1.5 font-black rounded-xl border-2 border-[#2D2338] transition-all cursor-pointer ${
                activeTab === 'theme'
                  ? 'bg-[#C400FF] text-white arcade-shadow-sm scale-105'
                  : 'bg-white text-[#2D2338] hover:bg-slate-50'
              }`}
            >
              [4] COLOR THEME
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab('terminal');
              }}
              className={`px-3 py-1.5 font-black rounded-xl border-2 border-[#2D2338] transition-all cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-[#4D7CFF] text-white arcade-shadow-sm scale-105'
                  : 'bg-white text-[#2D2338] hover:bg-slate-50'
              }`}
            >
              [5] 8-BIT CLI
            </button>
          </div>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D2338] leading-relaxed text-[#4A3B52] space-y-2 arcade-shadow-sm font-sans text-xs sm:text-sm">
                <div className="text-[#FF3B30] font-black font-mono text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> ★ LINUX DISTRO BRIEFING
                </div>
                <p>{distro.longOverview}</p>
              </div>

              {/* Candy-colored Game Meters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-white rounded-2xl border-2 border-[#2D2338] arcade-shadow-sm">
                  <div className="text-[10px] text-[#7A5B80] font-black flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#00D26A]" /> STABILITY
                  </div>
                  <div className="text-base font-black text-[#2D2338] mt-1">
                    {distro.stabilityScore} / 5
                  </div>
                  <div className="w-full bg-[#FFE4EE] rounded-full h-2 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-[#00D26A] h-full rounded-full" 
                      style={{ width: `${(distro.stabilityScore / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border-2 border-[#2D2338] arcade-shadow-sm">
                  <div className="text-[10px] text-[#7A5B80] font-black flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#FF3B30]" /> GAMING
                  </div>
                  <div className="text-base font-black text-[#2D2338] mt-1">
                    {distro.gamingScore} / 5
                  </div>
                  <div className="w-full bg-[#FFE4EE] rounded-full h-2 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-[#FF3B30] h-full rounded-full" 
                      style={{ width: `${(distro.gamingScore / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border-2 border-[#2D2338] arcade-shadow-sm">
                  <div className="text-[10px] text-[#7A5B80] font-black flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#C400FF]" /> CUSTOMIZE
                  </div>
                  <div className="text-base font-black text-[#2D2338] mt-1">
                    {distro.customizabilityScore} / 5
                  </div>
                  <div className="w-full bg-[#FFE4EE] rounded-full h-2 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-[#C400FF] h-full rounded-full" 
                      style={{ width: `${(distro.customizabilityScore / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border-2 border-[#2D2338] arcade-shadow-sm">
                  <div className="text-[10px] text-[#7A5B80] font-black flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-[#4D7CFF]" /> RESOURCE
                  </div>
                  <div className="text-base font-black text-[#4D7CFF] mt-1 truncate">
                    {distro.resourceUsage}
                  </div>
                  <div className="text-[10px] text-[#7A5B80] mt-1">
                    Memory load
                  </div>
                </div>
              </div>

              {/* Target User & Pros / Cons */}
              <div className="p-3 bg-[#FFF9EC] rounded-2xl border-2 border-[#2D2338] space-y-1 arcade-shadow-sm">
                <div className="text-[#2D2338] font-black text-xs">
                  ★ RECOMMENDED AUDIENCE:
                </div>
                <div className="text-sm font-black text-[#FF3B30] font-sans">
                  {distro.bestFor}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#E8F8F0] rounded-2xl border-2 border-[#2D2338] space-y-1.5 arcade-shadow-sm">
                  <div className="text-[#00D26A] font-black text-xs flex items-center gap-1">
                    <Check className="w-4 h-4" /> HIGHLIGHTS & PERKS
                  </div>
                  <ul className="space-y-1 text-[#334D40] font-sans text-xs">
                    {distro.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#00D26A] font-black">★</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-[#FFF0F2] rounded-2xl border-2 border-[#2D2338] space-y-1.5 arcade-shadow-sm">
                  <div className="text-[#FF3B30] font-black text-xs flex items-center gap-1">
                    <X className="w-4 h-4" /> THINGS TO KEEP IN MIND
                  </div>
                  <ul className="space-y-1 text-[#543338] font-sans text-xs">
                    {distro.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#FF3B30] font-black">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM REQUIREMENTS */}
          {activeTab === 'hardware' && (
            <div className="space-y-4">
              <div className="text-xs text-[#6B5273]">
                Hardware recommendations to run {distro.name} smoothly:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D2338] space-y-2 arcade-shadow-sm">
                  <div className="text-[#4D7CFF] font-black flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> CPU / PROCESSOR
                  </div>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[#7A5B80]">MINIMUM: </span>
                      <span className="font-bold">{distro.systemRequirements.minCpu}</span>
                    </div>
                    <div>
                      <span className="text-[#7A5B80]">RECOMMENDED: </span>
                      <span className="font-black text-[#2D2338]">{distro.systemRequirements.recCpu}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D2338] space-y-2 arcade-shadow-sm">
                  <div className="text-[#FF3B30] font-black flex items-center gap-1.5">
                    <Gauge className="w-4 h-4" /> RAM MEMORY
                  </div>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[#7A5B80]">MINIMUM: </span>
                      <span className="font-bold">{distro.systemRequirements.minRam}</span>
                    </div>
                    <div>
                      <span className="text-[#7A5B80]">RECOMMENDED: </span>
                      <span className="font-black text-[#FF3B30]">{distro.systemRequirements.recRam}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D2338] space-y-2 arcade-shadow-sm">
                  <div className="text-[#00D26A] font-black flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4" /> DISK STORAGE
                  </div>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[#7A5B80]">MINIMUM: </span>
                      <span className="font-bold">{distro.systemRequirements.minStorage}</span>
                    </div>
                    <div>
                      <span className="text-[#7A5B80]">RECOMMENDED: </span>
                      <span className="font-black text-[#2D2338]">{distro.systemRequirements.recStorage}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D2338] space-y-2 arcade-shadow-sm">
                  <div className="text-[#C400FF] font-black flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> ARCH & ISO FOOTPRINT
                  </div>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[#7A5B80]">SUPPORTED ARCH: </span>
                      <span className="font-black text-[#2D2338]">{distro.systemRequirements.architecture}</span>
                    </div>
                    <div>
                      <span className="text-[#7A5B80]">ISO DOWNLOAD: </span>
                      <span className="font-black text-[#00D26A]">{distro.downloadSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Management */}
              <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D2338] space-y-2 arcade-shadow-sm">
                <div className="text-[#2D2338] font-black text-xs">
                  ★ SOFTWARE STORE & PACKAGE MANAGER:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[#7A5B80] block">CLI BINARY:</span>
                    <span className="font-black text-[#FF3B30]">{distro.packageManager.name}</span>
                  </div>
                  <div>
                    <span className="text-[#7A5B80] block">INIT SYSTEM:</span>
                    <span className="font-black text-[#2D2338]">{distro.initSystem}</span>
                  </div>
                  <div>
                    <span className="text-[#7A5B80] block">FLATPAK:</span>
                    <span className={distro.packageManager.supportsFlatpak ? 'text-[#00D26A] font-black' : 'text-slate-400'}>
                      {distro.packageManager.supportsFlatpak ? '[SUPPORTED]' : '[OPTIONAL]'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7A5B80] block">SNAP:</span>
                    <span className={distro.packageManager.supportsSnap ? 'text-[#4D7CFF] font-black' : 'text-slate-400'}>
                      {distro.packageManager.supportsSnap ? '[SUPPORTED]' : '[DISABLED]'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DESKTOP GUI */}
          {activeTab === 'desktop' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-[#2D2338] space-y-3 arcade-shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-[#2D2338] font-black text-sm flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-[#4D7CFF]" />
                    <span>DEFAULT GUI: {distro.desktopEnvironment.default.toUpperCase()}</span>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border-2 border-[#2D2338] font-black ${
                    distro.desktopEnvironment.waylandDefault 
                      ? 'bg-[#E8F8F0] text-[#00D26A]' 
                      : 'bg-[#FFF9EC] text-[#FF9100]'
                  }`}>
                    {distro.desktopEnvironment.waylandDefault ? 'WAYLAND [DEFAULT]' : 'X11 [DEFAULT]'}
                  </span>
                </div>

                <div className="text-xs text-[#5D4666]">
                  <span className="text-[#7A5B80]">WINDOW COMPOSITOR: </span>
                  <span className="font-black text-[#2D2338]">{distro.desktopEnvironment.windowManager}</span>
                </div>

                <div>
                  <span className="text-[#7A5B80] block text-xs mb-1.5 font-bold">OFFICIAL DESKTOP EDITIONS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {distro.desktopEnvironment.alternatives.map((alt, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#F5EEF7] border border-[#2D2338] rounded-xl text-[#2D2338] text-xs font-bold">
                        ★ {alt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: THEME & PALETTE */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-[#2D2338] space-y-3 arcade-shadow-sm">
                <div className="text-[#2D2338] font-black flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#C400FF]" />
                  <span>STYLE: {distro.themeStyle.styleName}</span>
                </div>

                <p className="text-xs text-[#5D4666] leading-relaxed font-sans">
                  {distro.themeStyle.desktopVibe}
                </p>

                {/* Color Palette Swatches */}
                <div>
                  <div className="text-[#7A5B80] text-xs mb-2 font-bold">
                    OFFICIAL SIGNATURE COLORS (Click swatch to copy HEX code):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {distro.themeStyle.accentColors.map((hex, i) => (
                      <button
                        key={i}
                        onClick={() => copyHex(hex)}
                        className="p-2.5 bg-white border-2 border-[#2D2338] rounded-xl text-left flex items-center gap-2 cursor-pointer arcade-shadow-sm arcade-btn"
                      >
                        <span 
                          className="w-6 h-6 rounded-lg border border-black/20 shrink-0"
                          style={{ backgroundColor: hex }} 
                        />
                        <div className="overflow-hidden">
                          <span className="text-[11px] font-black text-[#2D2338] block truncate">
                            {hex}
                          </span>
                          <span className="text-[9px] text-[#7A5B80]">
                            {copiedColor === hex ? 'COPIED! ★' : 'CLICK COPY'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 8-BIT TERMINAL SIMULATOR */}
          {activeTab === 'terminal' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#7A5B80] font-black mr-1">★ TEST COMMANDS:</span>
                <button
                  onClick={() => executeTerminalCommand('neofetch')}
                  className="px-3 py-1 bg-white hover:bg-[#FFECC8] border-2 border-[#2D2338] rounded-xl text-xs font-black transition-all arcade-shadow-sm arcade-btn flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 text-[#FF3B30]" />
                  <span>neofetch</span>
                </button>
                <button
                  onClick={() => executeTerminalCommand('install')}
                  className="px-3 py-1 bg-white hover:bg-[#E8F8F0] border-2 border-[#2D2338] rounded-xl text-xs font-black transition-all arcade-shadow-sm arcade-btn flex items-center gap-1.5"
                >
                  <TerminalIcon className="w-3.5 h-3.5 text-[#00D26A]" />
                  <span>{distro.packageManager.cliCommand.split(' ')[0]} install</span>
                </button>
                <button
                  onClick={() => executeTerminalCommand('update')}
                  className="px-3 py-1 bg-white hover:bg-[#FFF9EC] border-2 border-[#2D2338] rounded-xl text-xs font-black transition-all arcade-shadow-sm arcade-btn flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-[#4D7CFF]" />
                  <span>update system</span>
                </button>
              </div>

              {/* Terminal Screen Box (GameBoy Dark Green / Retro Screen) */}
              <div className="bg-[#1B221B] border-3 border-[#2D2338] rounded-2xl p-3.5 text-xs font-mono text-[#86E886] min-h-[260px] max-h-[340px] overflow-y-auto space-y-1 select-text arcade-shadow">
                <div className="text-[#4E784E] text-[10px] pb-1 border-b border-[#2B3B2B] flex justify-between">
                  <span>8-BIT CONSOLE // {distro.id.toUpperCase()}</span>
                  <span>STATUS: READY</span>
                </div>
                {terminalOutput.map((line, idx) => (
                  <pre key={idx} className="whitespace-pre-wrap font-mono leading-tight">
                    {line}
                  </pre>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FFF4E8] border-t-2 border-[#2D2338] p-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <a
              href={distro.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playSelect()}
              className="px-4 py-2 bg-[#FF3B30] hover:bg-[#FF2418] text-white font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-[#2D2338] arcade-shadow arcade-btn flex items-center gap-1.5 cursor-pointer"
            >
              <span>OFFICIAL WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-[11px] text-[#7E6585] font-mono">
            PRESS [ESC] TO CLOSE
          </div>
        </div>
      </div>
    </div>
  );
};
