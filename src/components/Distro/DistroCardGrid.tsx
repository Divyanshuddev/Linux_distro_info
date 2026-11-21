'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { animate, stagger } from '@/lib/animeHelper';
import { LinuxDistro } from '@/types';
import {
  Search, Star, Gamepad2, Shield,
  Terminal, Scale, ChevronRight, Zap
} from 'lucide-react';

interface DistroCardGridProps {
  distros: LinuxDistro[];
  onSelectDistro: (distro: LinuxDistro) => void;
  onCompareDistro: (distro: LinuxDistro) => void;
  comparisonList: LinuxDistro[];
}

export const DistroCardGrid: React.FC<DistroCardGridProps> = ({
  distros,
  onSelectDistro,
  onCompareDistro,
  comparisonList
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const gridRef = useRef<HTMLDivElement | null>(null);

  const categories: { id: string; label: string; code: string; color: string }[] = [
    { id: 'all', label: 'ALL_UNITS', code: '00', color: '#FAFAFA' },
    { id: 'beginner', label: 'BEGINNER', code: '01', color: '#00F0FF' },
    { id: 'gaming', label: 'GAMING_RIGS', code: '02', color: '#FF003C' },
    { id: 'power-user', label: 'POWER_ROLLING', code: '03', color: '#FFE600' },
    { id: 'enterprise', label: 'ENTERPRISE', code: '04', color: '#00F0FF' },
    { id: 'security', label: 'SECURITY_PENTEST', code: '05', color: '#FF003C' },
    { id: 'minimal', label: 'ULTRA_MINIMAL', code: '06', color: '#B026FF' }
  ];

  const families: { id: string; label: string }[] = [
    { id: 'all', label: '// ALL LINEAGES //' },
    { id: 'Debian', label: 'DEBIAN LINEAGE' },
    { id: 'Arch', label: 'ARCH LINEAGE' },
    { id: 'Red Hat', label: 'RED HAT LINEAGE' },
    { id: 'Independent', label: 'INDEPENDENT' }
  ];

  const filteredDistros = useMemo(() => {
    return distros.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.desktopEnvironment.default.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.packageManager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.family.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
      const matchesFam = selectedFamily === 'all' || d.family === selectedFamily;

      return matchesSearch && matchesCat && matchesFam;
    });
  }, [distros, searchQuery, selectedCategory, selectedFamily]);

  // Anime.js Staggered Entrance
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.distro-grid-card');
    if (cards.length === 0) return;

    animate(cards, {
      translateY: [20, 0],
      opacity: [0, 1],
      scale: [0.97, 1],
      delay: stagger(35, { start: 30 }),
      ease: 'out(3)',
      duration: 350
    });
  }, [filteredDistros]);

  const isInCompare = (distroId: string) => {
    return comparisonList.some((c) => c.id === distroId);
  };

  const renderBlocks = (score: number, max = 5) => {
    return (
      <span className="font-mono text-xs tracking-widest">
        {'■'.repeat(score)}
        <span className="text-slate-700">{'□'.repeat(max - score)}</span>
      </span>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Bar & Cyber Filters Controls */}
      <div className="p-4 md:p-6 bg-[#08080D] border-2 border-[#1E1E2C] shadow-2xl space-y-4 cyber-chamfer-tl relative cyber-card">
        {/* Top Hazard Warning Line */}
        <div className="h-1 w-full hazard-stripes-cyber -mt-4 md:-mt-6 -mx-4 md:-mx-6 mb-4 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)]" />

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF003C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH BY DISTRO, DESKTOP (GNOME, KDE), PACKAGE TOOL (APT, PACMAN)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0D0D14] border border-[#252538] text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-[#FF003C] cyber-chamfer-tag transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 cyber-mono text-[9px] text-slate-400 hover:text-white px-2 py-0.5 bg-[#181824] border border-[#2A2A3C]"
              >
                [RESET]
              </button>
            )}
          </div>

          {/* Family Dropdown Filter */}
          <div className="w-full md:w-auto shrink-0 flex items-center gap-2">
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="w-full md:w-auto px-3.5 py-2.5 bg-[#0D0D14] border border-[#252538] text-xs font-mono text-slate-200 focus:outline-none focus:border-[#00F0FF] cursor-pointer cyber-chamfer-tag"
            >
              {families.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills Slider (Cyberpunk Chamfered Chips) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-black tracking-wider whitespace-nowrap transition-all cursor-pointer cyber-chamfer-tag ${
                  isSelected
                    ? 'bg-[#FF003C] text-white shadow-[0_0_12px_rgba(255,0,60,0.4)] scale-105 border border-white/30'
                    : 'bg-[#0D0D14] text-slate-400 hover:text-white border border-[#222232] hover:border-[#00F0FF]'
                }`}
              >
                <span className="text-[9px] text-[#00F0FF] opacity-80">[{cat.code}]</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Metrics */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-2 hazard-stripes-cyber inline-block rounded-xs" />
          <span>
            OPERATIONAL_UNITS: <strong className="text-[#00F0FF]">{filteredDistros.length}</strong> / <strong>{distros.length}</strong>
          </span>
        </div>
        {comparisonList.length > 0 && (
          <span className="text-[#FF003C] font-bold flex items-center gap-1">
            <Scale className="w-3.5 h-3.5" /> QUEUE: {comparisonList.length} UNITS
          </span>
        )}
      </div>

      {/* Grid of Distro Cards (Cyberpunk Chamfered Mecha Cards) */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filteredDistros.map((distro) => {
          const inCompare = isInCompare(distro.id);

          return (
            <div
              key={distro.id}
              className="distro-grid-card group relative flex flex-col justify-between bg-[#08080D] border-2 border-[#1E1E2C] hover:border-[#FF003C] transition-all duration-200 shadow-2xl overflow-hidden cyber-chamfer-both cyber-card"
            >
              {/* Top Solid Red Accent Header */}
              <div className="h-1.5 w-full bg-[#FF003C]" />

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Header: Distro Logo + Name + Category Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 flex items-center justify-center font-mono font-black text-lg shadow-md border-2 border-white/20 shrink-0 cyber-chamfer-tl"
                        style={{
                          backgroundColor: `${distro.logoColor}25`,
                          color: distro.logoColor
                        }}
                      >
                        {distro.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white group-hover:text-[#00F0FF] transition-colors font-mono">
                          {distro.name}
                        </h3>
                        <span className="cyber-mono text-[10px] text-[#FF003C]">
                          // {distro.family.toUpperCase()} //
                        </span>
                      </div>
                    </div>

                    <span className="cyber-mono text-[9px] px-2 py-0.5 bg-[#141420] border border-[#2D2D40] text-slate-200 font-bold uppercase cyber-chamfer-tag">
                      {distro.category.replace('-', '_')}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="mt-3 text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
                    {distro.tagline}
                  </p>

                  {/* Segmented Cyber Rating Meters (Image 2 Angular Pop Style) */}
                  <div className="mt-4 p-2.5 bg-[#0C0C14] border border-[#1E1E2C] space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> EASE:
                      </span>
                      <span className="text-amber-400">{renderBlocks(distro.beginnerFriendlyScore)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Gamepad2 className="w-3 h-3 text-sky-400" /> GAME:
                      </span>
                      <span className="text-sky-400">{renderBlocks(distro.gamingScore)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#FF003C]" /> STAB:
                      </span>
                      <span className="text-[#FF003C]">{renderBlocks(distro.stabilityScore)}</span>
                    </div>
                  </div>

                  {/* Key Metadata Table */}
                  <div className="mt-4 space-y-1 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center justify-between border-b border-[#161622] pb-1">
                      <span className="text-slate-500">WINDOW_DE:</span>
                      <span className="text-slate-200 truncate max-w-[170px]">
                        {distro.desktopEnvironment.default}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#161622] pb-1">
                      <span className="text-slate-500">PKG_TOOL:</span>
                      <span className="text-[#00F0FF] font-bold">
                        {distro.packageManager.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">MIN_RAM:</span>
                      <span className="text-slate-200">
                        {distro.systemRequirements.minRam}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons with Angular Cyber Chamfers */}
                <div className="pt-3 border-t border-[#181824] flex items-center gap-2 font-mono">
                  <button
                    onClick={() => onSelectDistro(distro)}
                    className="flex-1 py-2 px-3 bg-[#FF003C] hover:bg-[#FF1A4B] text-white font-black text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-[0_0_12px_rgba(255,0,60,0.3)] flex items-center justify-center gap-1.5 cyber-chamfer-tag"
                  >
                    <span>DOSSIER_SYS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onCompareDistro(distro)}
                    className={`p-2 transition-all cursor-pointer cyber-chamfer-tag border ${
                      inCompare
                        ? 'bg-[#00F0FF] text-slate-950 border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'bg-[#0D0D14] border-[#252538] text-slate-400 hover:text-white hover:border-[#00F0FF]'
                    }`}
                    title={inCompare ? 'Remove from Comparison' : 'Add to Comparison'}
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDistros.length === 0 && (
        <div className="p-12 text-center bg-[#08080D] border-2 border-[#1E1E2C] font-mono cyber-chamfer-both">
          <Terminal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">// 404: NO_DISTRO_TARGET_LOCATED //</h4>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Adjust keyword filters or lineage selection parameters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFamily('all');
            }}
            className="mt-4 px-4 py-2 bg-[#FF003C] text-white text-xs font-bold cursor-pointer cyber-chamfer-tag"
          >
            [PURGE_ALL_FILTERS]
          </button>
        </div>
      )}
    </div>
  );
};
