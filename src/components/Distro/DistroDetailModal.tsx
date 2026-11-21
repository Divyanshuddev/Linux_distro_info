'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate } from '@/lib/animeHelper';
import { LinuxDistro } from '@/types';
import {
  X, ExternalLink, Cpu, MemoryStick,
  Monitor, Palette, Package, Terminal, Star,
  CheckCircle2, AlertTriangle, ShieldCheck,
  Copy, Check
} from 'lucide-react';

interface DistroDetailModalProps {
  distro: LinuxDistro | null;
  onClose: () => void;
  onCompare: (distro: LinuxDistro) => void;
  isInComparison: boolean;
}

export const DistroDetailModal: React.FC<DistroDetailModalProps> = ({
  distro,
  onClose,
  onCompare,
  isInComparison
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'desktop' | 'theme' | 'packages' | 'neofetch'>('overview');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!distro || !modalRef.current || !backdropRef.current) return;

    animate(backdropRef.current, {
      opacity: [0, 1],
      ease: 'out(2)',
      duration: 250
    });

    animate(modalRef.current, {
      scale: [0.94, 1],
      translateY: [15, 0],
      opacity: [0, 1],
      ease: 'out(3)',
      duration: 380
    });
  }, [distro]);

  useEffect(() => {
    if (!tabContentRef.current) return;

    animate(tabContentRef.current, {
      opacity: [0, 1],
      translateY: [8, 0],
      ease: 'out(2)',
      duration: 280
    });
  }, [activeTab]);

  useEffect(() => {
    if (distro) {
      setTerminalOutput([
        `[0x7FFF5FBFF] // SENTRY_KERNEL_INIT // ${distro.name} READY.`,
        `[SEC] Sandboxed environment active. Click command below to simulate package tool.`
      ]);
    }
  }, [distro]);

  if (!distro) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const simulateTerminalCommand = (cmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setTerminalOutput((prev) => [...prev, `$ ${cmd}`]);

    setTimeout(() => {
      if (cmd.includes('install') || cmd.includes('add') || cmd.includes('-S')) {
        setTerminalOutput((prev) => [
          ...prev,
          `[MEM 0x004A] Resolving dependencies for fastfetch... [OK]`,
          `[NET 0x011B] Encrypted stream fetching package archive... [==========] 100%`,
          `[SHA256] Checksum verified: 8f2b3e9...`,
          `✓ SUCCESS: Installed fastfetch on ${distro.name}.`
        ]);
      } else if (cmd.includes('update') || cmd.includes('upgrade') || cmd.includes('-Syu') || cmd.includes('dup')) {
        setTerminalOutput((prev) => [
          ...prev,
          `[NET] Mirror sync: 14 mirrors reached with 0 errors.`,
          `[SYS] All packages verified and operating at latest checksum.`,
          `[KRN] Running Linux kernel: ${distro.terminalNeofetch.kernel}`,
          `[OK] Status: 100% NOMINAL.`
        ]);
      } else {
        setTerminalOutput((prev) => [
          ...prev,
          `[EXEC] ${cmd}`,
          `[EXIT 0] Process completed.`
        ]);
      }
      setIsTyping(false);
    }, 500);
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: Star },
    { id: 'requirements', label: 'SYSTEM_SPECS', icon: Cpu },
    { id: 'desktop', label: 'DESKTOP_WM', icon: Monitor },
    { id: 'theme', label: 'THEME_STYLE', icon: Palette },
    { id: 'packages', label: 'PACKAGE_MGR', icon: Package },
    { id: 'neofetch', label: 'NEOFETCH_ASCII', icon: Terminal },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#050508]/85 backdrop-blur-md transition-opacity"
      />

      {/* Cyberpunk Modal Dialog Card (Image 1 Sentry Keys Style) */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#08080E] border-2 border-[#1E1E2C] shadow-2xl overflow-hidden z-10 cyber-chamfer-both cyber-pop-shadow-red"
      >
        {/* Top Solid Red Header Accent Bar */}
        <div className="h-1.5 w-full bg-[#FF003C]" />

        {/* Top Header Banner with Stacked Sentry Decals */}
        <div className="p-5 sm:p-6 bg-[#0D0D14] border-b border-[#1C1C28] flex items-center justify-between text-white relative font-mono">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl font-black shadow-lg border-2 border-white/20 shrink-0 cyber-chamfer-tl"
              style={{ backgroundColor: distro.logoColor }}
            >
              {distro.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{distro.name}</h2>
                <span className="cyber-mono text-[9px] px-2 py-0.5 bg-[#FF003C]/20 border border-[#FF003C] text-[#FF003C] font-bold cyber-chamfer-tag">
                  // {distro.family.toUpperCase()} //
                </span>
                <span className="cyber-mono text-[9px] px-2 py-0.5 bg-[#181824] text-[#00F0FF] border border-[#00F0FF]/40 font-bold cyber-chamfer-tag">
                  {distro.releaseModel.toUpperCase()}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300 max-w-xl font-sans">
                {distro.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onCompare(distro)}
              className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer hidden sm:flex items-center gap-1.5 cyber-chamfer-tag border ${
                isInComparison
                  ? 'bg-[#00F0FF] text-slate-950 border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-[#14141E] border-[#2B2B3C] text-slate-300 hover:text-white hover:border-[#FF003C]'
              }`}
            >
              {isInComparison ? '[IN_COMPARE]' : '+ COMPARE'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 bg-[#14141E] hover:bg-[#20202E] border border-[#2B2B3C] text-slate-300 hover:text-white transition-all cursor-pointer cyber-chamfer-tag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar (Cyberpunk Tabs) */}
        <div className="px-4 py-2 bg-[#06060A] border-b border-[#181824] flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer cyber-chamfer-tag ${
                  isActive
                    ? 'bg-[#FF003C] text-white shadow-[0_0_10px_rgba(255,0,60,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-[#12121C]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div
          ref={tabContentRef}
          className="p-6 overflow-y-auto max-h-[60vh] space-y-6 text-slate-200 text-sm font-mono"
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-2 hazard-stripes-cyber rounded-xs" />
                  <h4 className="cyber-mono text-[#00F0FF] font-bold">
                    // DOSSIER_LOG //
                  </h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {distro.longOverview}
                </p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0C0C14] border border-[#1E1E2C] space-y-2 cyber-chamfer-tl">
                  <h5 className="cyber-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> // SYSTEM_ADVANTAGES //
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    {distro.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#0C0C14] border border-[#1E1E2C] space-y-2 cyber-chamfer-tl">
                  <h5 className="cyber-mono text-[#FF003C] font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> // CAUTION_NOTES //
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    {distro.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FF003C] font-bold">!</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best For */}
              <div className="p-4 bg-[#0C0C14] border border-[#1E1E2C] flex items-start gap-3 cyber-chamfer-tag">
                <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <div className="cyber-mono text-[#00F0FF]">OPTIMAL_TARGET:</div>
                  <div className="text-xs text-slate-200 mt-0.5 font-sans">
                    {distro.bestFor}
                  </div>
                </div>
              </div>

              {/* Official Download Link */}
              <div className="flex items-center justify-between p-4 bg-[#0C0C14] border border-[#1E1E2C] cyber-chamfer-both">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">ISO PAYLOAD SIZE:</div>
                  <div className="text-xs text-[#00F0FF] font-bold">{distro.downloadSize}</div>
                </div>
                <a
                  href={distro.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FF003C] hover:bg-[#FF1A4B] text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(255,0,60,0.3)] cyber-chamfer-tag"
                >
                  <span>OFFICIAL_SOURCE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="space-y-6">
              <div>
                <h4 className="cyber-mono text-[#00F0FF] font-bold mb-1">
                  // HARDWARE_SPECIFICATIONS //
                </h4>
                <p className="text-xs text-slate-400">
                  RESOURCE_DEMAND: <strong className="text-[#FF003C]">{distro.resourceUsage}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0C0C14] border border-[#1E1E2C] space-y-3 cyber-chamfer-tl">
                  <div className="cyber-mono text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" /> [MINIMUM_BASELINE]
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-[#181824] pb-1.5">
                      <span className="text-slate-500">CPU:</span>
                      <span className="font-bold text-white">{distro.systemRequirements.minCpu}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#181824] pb-1.5">
                      <span className="text-slate-500">RAM:</span>
                      <span className="font-bold text-[#FF003C]">{distro.systemRequirements.minRam}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">STORAGE:</span>
                      <span className="font-bold text-white">{distro.systemRequirements.minStorage}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0C0C14] border-2 border-[#00F0FF]/40 space-y-3 cyber-chamfer-tl shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                  <div className="cyber-mono text-[#00F0FF] flex items-center gap-1.5">
                    <MemoryStick className="w-3.5 h-3.5" /> [RECOMMENDED_SMOOTH]
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-[#181824] pb-1.5">
                      <span className="text-slate-500">CPU:</span>
                      <span className="font-bold text-white">{distro.systemRequirements.recCpu}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#181824] pb-1.5">
                      <span className="text-slate-500">RAM:</span>
                      <span className="font-bold text-emerald-400">{distro.systemRequirements.recRam}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">STORAGE:</span>
                      <span className="font-bold text-white">{distro.systemRequirements.recStorage}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#0C0C14] border border-[#1E1E2C] flex items-center justify-between text-xs cyber-chamfer-tag">
                <span className="text-slate-500">ARCHITECTURES:</span>
                <span className="font-bold text-[#00F0FF]">{distro.systemRequirements.architecture}</span>
              </div>
            </div>
          )}

          {/* TAB 3: DESKTOP & WINDOW MANAGER */}
          {activeTab === 'desktop' && (
            <div className="space-y-6">
              <div>
                <h4 className="cyber-mono text-[#00F0FF] font-bold mb-1">
                  // DESKTOP_COMPOSITOR_LAYER //
                </h4>
              </div>

              <div className="p-5 bg-[#0C0C14] border border-[#1E1E2C] space-y-3 cyber-chamfer-tl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">DEFAULT_DE:</span>
                  <span className="text-sm font-black text-white">{distro.desktopEnvironment.default}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">WINDOW_MANAGER:</span>
                  <span className="text-xs text-[#00F0FF] font-bold">{distro.desktopEnvironment.windowManager}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#181824] pt-2 text-xs">
                  <span className="text-slate-500">DISPLAY_SERVER:</span>
                  <span className="text-emerald-400 font-bold">
                    {distro.desktopEnvironment.waylandDefault ? 'WAYLAND (PRIMARY)' : 'X11 / XORG'}
                  </span>
                </div>
              </div>

              <div>
                <div className="cyber-mono text-slate-400 mb-2">// FLAVOR_SPINS //</div>
                <div className="flex flex-wrap gap-2">
                  {distro.desktopEnvironment.alternatives.map((alt, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#0C0C14] border border-[#1E1E2C] text-xs text-slate-300 cyber-chamfer-tag"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: THEME & STYLE */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h4 className="cyber-mono text-[#00F0FF] font-bold mb-1">
                  // PALETTE_&_AESTHETIC //
                </h4>
              </div>

              <div className="p-5 bg-[#0C0C14] border border-[#1E1E2C] space-y-4 cyber-chamfer-tl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">STYLE_NAME:</span>
                  <span className="text-xs font-bold text-white">{distro.themeStyle.styleName}</span>
                </div>

                <div>
                  <span className="cyber-mono text-slate-500 block mb-2">HEX_PALETTE:</span>
                  <div className="flex items-center gap-3">
                    {distro.themeStyle.accentColors.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 border-2 border-white/20 inline-block cyber-chamfer-tag shadow-md"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-slate-300">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#181824]">
                  <span className="cyber-mono text-slate-500 block mb-1">VIBE_LOG:</span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {distro.themeStyle.desktopVibe}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PACKAGE MANAGER & TERMINAL SIMULATOR */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div>
                <h4 className="cyber-mono text-[#00F0FF] font-bold mb-1">
                  // BINARY_TOOLCHAIN //
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#0C0C14] border border-[#1E1E2C] space-y-1 cyber-chamfer-tl">
                  <div className="cyber-mono text-slate-500">INSTALL_CMD:</div>
                  <div className="flex items-center justify-between text-xs text-[#00F0FF] font-bold">
                    <span>{distro.packageManager.cliCommand}</span>
                    <button
                      onClick={() => copyToClipboard(distro.packageManager.cliCommand)}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCmd === distro.packageManager.cliCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-[#0C0C14] border border-[#1E1E2C] space-y-1 cyber-chamfer-tl">
                  <div className="cyber-mono text-slate-500">UPDATE_CMD:</div>
                  <div className="flex items-center justify-between text-xs text-[#FFE600] font-bold">
                    <span>{distro.packageManager.updateCommand}</span>
                    <button
                      onClick={() => copyToClipboard(distro.packageManager.updateCommand)}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedCmd === distro.packageManager.updateCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terminal Simulator with CRT Scanlines */}
              <div className="rounded-xl bg-black border-2 border-[#1E1E2C] overflow-hidden shadow-2xl cyber-scanlines">
                <div className="px-4 py-2 bg-[#0A0A10] border-b border-[#181824] flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF003C]" />
                    <span className="cyber-mono text-[#00F0FF]">
                      user@{distro.id}: ~
                    </span>
                  </div>
                  <span className="cyber-mono text-[#FFE600] font-bold">[INTERACTIVE_CLI]</span>
                </div>

                <div className="p-4 text-xs text-slate-300 space-y-1.5 h-44 overflow-y-auto">
                  {terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={line.startsWith('$') ? 'text-[#00F0FF] font-bold' : line.startsWith('✓') ? 'text-emerald-400 font-bold' : 'text-slate-300'}
                    >
                      {line}
                    </div>
                  ))}
                  {isTyping && <div className="text-[#FFE600] animate-pulse">[PROCESSING_BINARY_STREAM...]</div>}
                </div>

                <div className="p-2.5 bg-[#0A0A10] border-t border-[#181824] flex items-center gap-2 flex-wrap">
                  <span className="cyber-mono text-slate-500 font-bold">TRIGGER:</span>
                  <button
                    onClick={() => simulateTerminalCommand(`${distro.packageManager.cliCommand.replace('<package>', 'fastfetch')}`)}
                    className="px-2.5 py-1 bg-[#141422] hover:bg-[#202034] text-slate-200 text-xs cursor-pointer border border-[#2B2B3E] cyber-chamfer-tag"
                  >
                    Deploy fastfetch
                  </button>
                  <button
                    onClick={() => simulateTerminalCommand(`${distro.packageManager.updateCommand}`)}
                    className="px-2.5 py-1 bg-[#141422] hover:bg-[#202034] text-[#00F0FF] text-xs cursor-pointer border border-[#2B2B3E] cyber-chamfer-tag"
                  >
                    Sync Repositories
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: NEOFETCH ASCII DOSSIER */}
          {activeTab === 'neofetch' && (
            <div className="space-y-4">
              <div className="p-5 bg-black border-2 border-[#1E1E2C] text-xs text-slate-200 overflow-x-auto shadow-2xl cyber-scanlines cyber-chamfer-both">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <pre
                    className="font-bold leading-tight select-none"
                    style={{ color: distro.logoColor }}
                  >
                    {distro.terminalNeofetch.asciiArt.join('\n')}
                  </pre>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-[#00F0FF] font-black border-b border-[#181824] pb-1">
                      user@{distro.id}
                    </div>
                    <div><span className="text-slate-500">OS: </span>{distro.terminalNeofetch.os}</div>
                    <div><span className="text-slate-500">Kernel: </span>{distro.terminalNeofetch.kernel}</div>
                    <div><span className="text-slate-500">Uptime: </span>{distro.terminalNeofetch.uptime}</div>
                    <div><span className="text-slate-500">Packages: </span>{distro.terminalNeofetch.packages}</div>
                    <div><span className="text-slate-500">Shell: </span>{distro.terminalNeofetch.shell}</div>
                    <div><span className="text-slate-500">DE: </span>{distro.terminalNeofetch.de}</div>
                    <div><span className="text-slate-500">WM: </span>{distro.terminalNeofetch.wm}</div>
                    <div><span className="text-slate-500">Init: </span>{distro.initSystem}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#06060A] border-t border-[#181824] flex items-center justify-between text-xs font-mono text-slate-400">
          <div>
            EASE_RATING: <strong className="text-amber-400">{distro.beginnerFriendlyScore} / 5</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#12121C] hover:bg-[#1E1E2E] text-white font-bold cursor-pointer transition-colors border border-[#26263A] cyber-chamfer-tag"
          >
            [CLOSE_DOSSIER]
          </button>
        </div>
      </div>
    </div>
  );
};
