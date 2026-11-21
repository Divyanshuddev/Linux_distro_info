'use client';

import React, { useState, useEffect, useRef } from 'react';
import { animate } from '@/lib/animeHelper';
import { DESKTOP_ENVIRONMENTS } from '@/data/distros';
import {
  Monitor, CheckCircle2, Terminal, Folder, Globe, Settings,
  Maximize2, X, LayoutGrid, Cpu
} from 'lucide-react';

export const DesktopEnvironmentShowcase: React.FC = () => {
  const [selectedDeId, setSelectedDeId] = useState<string>('gnome');
  const [isAppMenuOpen, setIsAppMenuOpen] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const activeDe = DESKTOP_ENVIRONMENTS.find((d) => d.id === selectedDeId) || DESKTOP_ENVIRONMENTS[0];

  useEffect(() => {
    if (!previewRef.current) return;

    animate(previewRef.current, {
      opacity: [0, 1],
      scale: [0.98, 1],
      ease: 'out(2)',
      duration: 320
    });
  }, [selectedDeId]);

  return (
    <div className="w-full bg-[#08080D] border-2 border-[#1E1E2C] p-6 md:p-8 space-y-6 shadow-2xl cyber-chamfer-tl cyber-card relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A1A28] pb-5">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] cyber-mono font-bold">
            <Monitor className="w-3.5 h-3.5" />
            <span>// DESKTOP_COMPOSITOR_LAB //</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">
            Interactive Desktop Shell Studio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-xl font-sans">
            Linux separates the kernel engine from the visual interface. Switch seamlessly between GNOME, KDE Plasma, Cinnamon, and auto-tiling Wayland compositors.
          </p>
        </div>

        {/* DE Switcher Pills (Image 2 Angular Pop Chips) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono">
          {DESKTOP_ENVIRONMENTS.map((de) => {
            const isSelected = de.id === selectedDeId;
            return (
              <button
                key={de.id}
                onClick={() => {
                  setSelectedDeId(de.id);
                  setIsAppMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap cyber-chamfer-tag ${
                  isSelected
                    ? 'bg-[#00F0FF] text-slate-950 font-black shadow-[0_0_12px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-[#0E0E16] text-slate-400 hover:text-white border border-[#222232]'
                }`}
              >
                {de.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main DE Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
        {/* Left Column: DE Specs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-[#0B0B12] border border-[#1E1E2C] space-y-3 cyber-chamfer-tl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">{activeDe.name}</h3>
              <span className="cyber-mono text-[9px] px-2 py-0.5 bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-bold cyber-chamfer-tag">
                {activeDe.panelPosition.replace('-', '_').toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-[#00F0FF] font-bold">{activeDe.tagline}</p>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeDe.vibe}</p>

            <div className="pt-3 border-t border-[#181824] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">IDLE_RAM_DRAIN:</span>
                <span className="text-emerald-400 font-bold">{activeDe.memoryUsage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">CUSTOMIZATION:</span>
                <span className="text-amber-400 font-bold">{activeDe.customizability}</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="p-4 bg-[#0B0B12] border border-[#1E1E2C] space-y-2 cyber-chamfer-tl">
            <span className="cyber-mono text-slate-400 block">
              // ARCHITECTURAL_ATTRIBUTES //
            </span>
            <div className="space-y-1.5 text-xs text-slate-300 font-sans">
              {activeDe.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prominent Distros */}
          <div className="p-3.5 bg-[#0B0B12] border border-[#1E1E2C] space-y-2 cyber-chamfer-tag">
            <span className="cyber-mono text-slate-400 block">// PRELOADED_DISTROS //</span>
            <div className="flex flex-wrap gap-1.5">
              {activeDe.distrosFeaturing.map((distroName, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[#141420] border border-[#252538] text-[10px] text-slate-300"
                >
                  {distroName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Mock Desktop */}
        <div className="lg:col-span-7">
          <div
            ref={previewRef}
            className="relative w-full h-[420px] bg-[#050508] border-2 border-[#1E1E2C] shadow-2xl overflow-hidden flex flex-col justify-between cyber-chamfer-both"
          >
            {/* Top Bar (for GNOME or Hyprland) */}
            {activeDe.panelPosition === 'top' && (
              <div className="h-8 px-4 bg-[#08080E]/95 border-b border-[#181824] flex items-center justify-between text-xs text-white z-20">
                <button
                  onClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
                  className="px-2 py-0.5 bg-[#141422] text-[#00F0FF] font-bold cursor-pointer cyber-chamfer-tag"
                >
                  ACTIVITIES
                </button>
                <div className="text-[11px] text-slate-400">WED 13:45</div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-3 h-3 text-[#00F0FF]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </div>
              </div>
            )}

            {/* Simulated Desktop Window Canvas */}
            <div className="relative flex-1 p-4 flex items-center justify-center">
              {/* App Menu Flyout if opened */}
              {isAppMenuOpen && (
                <div className="absolute top-2 left-2 z-30 w-56 p-2.5 bg-[#08080E]/95 border-2 border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.3)] animate-in zoom-in-95 duration-100 space-y-1 cyber-chamfer-tl">
                  <div className="cyber-mono text-[#00F0FF] px-2 py-0.5">// BINARY_APPS //</div>
                  <div className="space-y-0.5 text-xs">
                    <div className="px-2.5 py-1.5 hover:bg-[#141422] flex items-center gap-2 cursor-pointer text-slate-200">
                      <Globe className="w-3.5 h-3.5 text-[#00F0FF]" /> Firefox Browser
                    </div>
                    <div className="px-2.5 py-1.5 hover:bg-[#141422] flex items-center gap-2 cursor-pointer text-slate-200">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Terminal Emulator
                    </div>
                    <div className="px-2.5 py-1.5 hover:bg-[#141422] flex items-center gap-2 cursor-pointer text-slate-200">
                      <Folder className="w-3.5 h-3.5 text-amber-400" /> Files Manager
                    </div>
                    <div className="px-2.5 py-1.5 hover:bg-[#141422] flex items-center gap-2 cursor-pointer text-slate-200">
                      <Settings className="w-3.5 h-3.5 text-slate-400" /> System Settings
                    </div>
                  </div>
                </div>
              )}

              {/* Mock App Window */}
              <div
                className={`transition-all duration-150 bg-[#08080E] border-2 border-[#1E1E2C] shadow-2xl overflow-hidden flex flex-col ${
                  isMaximized
                    ? 'w-full h-full'
                    : activeDe.id === 'hyprland'
                    ? 'w-[90%] h-[85%] border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.2)] cyber-chamfer-both'
                    : 'w-[84%] h-[78%] cyber-chamfer-tl'
                }`}
              >
                {/* Window Titlebar */}
                <div className="px-3 py-1.5 bg-[#0B0B12] border-b border-[#181824] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-bold">
                    <Terminal className="w-3 h-3 text-[#00F0FF]" />
                    <span className="cyber-mono text-[10px]">terminal@localhost: ~</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsMaximized(!isMaximized)}
                      className="p-1 hover:bg-[#141422] text-slate-400"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setIsAppMenuOpen(false)}
                      className="p-1 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Window Body */}
                <div className="p-4 flex-1 text-xs text-slate-300 space-y-2 font-mono overflow-y-auto cyber-scanlines">
                  <div className="text-[#00F0FF] font-bold">
                    $ echo &ldquo;Running {activeDe.name} Wayland Compositor&rdquo;
                  </div>
                  <div>Running {activeDe.name} Wayland Compositor</div>
                  <div className="text-slate-500 text-[10px] pt-1">
                    WINDOW_MANAGER:{' '}
                    <strong className="text-white">
                      {activeDe.id === 'hyprland' ? 'Hyprland (Dynamic Auto-Tiling)' : 'Floating Compositor'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar (for Cinnamon, KDE, XFCE) */}
            {activeDe.panelPosition === 'bottom' && (
              <div className="h-9 px-3 bg-[#08080E]/95 border-t border-[#181824] flex items-center justify-between text-xs text-white z-20">
                <button
                  onClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-[#00F0FF] text-slate-950 font-black cursor-pointer shadow-md cyber-chamfer-tag"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>MENU</span>
                </button>

                <div className="px-2 py-0.5 bg-[#141422] border border-[#252538] text-[10px] text-slate-300">
                  Terminal
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="text-white font-bold">13:45</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
