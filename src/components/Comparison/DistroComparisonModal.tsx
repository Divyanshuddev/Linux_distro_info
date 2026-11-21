'use client';

import React, { useEffect, useRef } from 'react';
import { animate, stagger } from '@/lib/animeHelper';
import { LinuxDistro } from '@/types';
import {
  X, Scale, Trash2, Star, Gamepad2, Shield
} from 'lucide-react';

interface DistroComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  distros: LinuxDistro[];
  onRemoveDistro: (distroId: string) => void;
  onClearAll: () => void;
  onOpenDetails: (distro: LinuxDistro) => void;
}

export const DistroComparisonModal: React.FC<DistroComparisonModalProps> = ({
  isOpen,
  onClose,
  distros,
  onRemoveDistro,
  onClearAll,
  onOpenDetails
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    animate(containerRef.current, {
      scale: [0.94, 1],
      opacity: [0, 1],
      ease: 'out(3)',
      duration: 350
    });

    const meters = containerRef.current.querySelectorAll('.score-meter-fill');
    animate(meters, {
      width: (el: HTMLElement) => [0, el.getAttribute('data-width') || '100%'],
      ease: 'out(2)',
      duration: 500,
      delay: stagger(35)
    });
  }, [isOpen, distros]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#07070A]/85 backdrop-blur-md transition-opacity"
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-2xl bg-[#09090D] border border-[#22222B] shadow-2xl overflow-hidden z-10 select-none flex flex-col max-h-[90vh] mech-card"
      >
        {/* Solid Crimson Accent Top */}
        <div className="h-1.5 w-full bg-[#FF1E44]" />

        {/* Header */}
        <div className="p-4 bg-[#0C0C12] border-b border-[#1C1C26] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <Scale className="w-4 h-4 text-[#FF1E44]" />
            <h3 className="text-xs sm:text-sm font-black uppercase text-white tracking-wider">
              // COMPARISON_MATRIX //
            </h3>
            <span className="mono-tag px-2 py-0.5 rounded bg-[#181822] text-[#FF1E44] border border-[#FF1E44]/40 font-bold">
              {distros.length}_UNITS
            </span>
          </div>

          <div className="flex items-center gap-2">
            {distros.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-rose-400 hover:text-white hover:bg-rose-950/60 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> [CLEAR]
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md bg-[#14141C] hover:bg-[#1E1E28] text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto overflow-y-auto space-y-6 font-mono">
          {distros.length === 0 ? (
            <div className="text-center py-12 space-y-3 font-mono">
              <Scale className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">// NO UNITS LOADED //</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                Click &ldquo;+ Compare&rdquo; on any distro card to compare specs head-to-head.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#FF1E44] text-white text-xs font-bold cursor-pointer"
              >
                [BROWSE DISTROS]
              </button>
            </div>
          ) : (
            <div className="min-w-[650px] space-y-5">
              {/* Distro Header Columns */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[#1C1C26]">
                <div className="col-span-3 text-xs font-bold text-slate-500 self-end">
                  // ATTRIBUTE //
                </div>
                {distros.map((d) => (
                  <div key={d.id} className={`${distros.length === 2 ? 'col-span-4' : 'col-span-3'} p-3 rounded-xl bg-[#0E0E14] border border-[#22222B] relative`}>
                    <button
                      onClick={() => onRemoveDistro(d.id)}
                      className="absolute top-2 right-2 p-1 rounded hover:text-[#FF1E44] text-slate-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs text-white"
                        style={{ backgroundColor: d.logoColor }}
                      >
                        {d.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">{d.name}</div>
                        <div className="mono-tag text-slate-500">{d.family}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* METRIC: BEGINNER FRIENDLINESS */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822]">
                <div className="col-span-3 text-xs text-slate-300 flex items-center gap-1.5 font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-400" /> BEGINNER
                </div>
                {distros.map((d) => (
                  <div key={d.id} className={distros.length === 2 ? 'col-span-4' : 'col-span-3'}>
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                      <span>{d.beginnerFriendlyScore} / 5</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#161622] overflow-hidden">
                      <div
                        className="score-meter-fill h-full bg-amber-400 rounded-full"
                        data-width={`${(d.beginnerFriendlyScore / 5) * 100}%`}
                        style={{ width: `${(d.beginnerFriendlyScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* METRIC: GAMING PERFORMANCE */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822]">
                <div className="col-span-3 text-xs text-slate-300 flex items-center gap-1.5 font-bold">
                  <Gamepad2 className="w-3.5 h-3.5 text-sky-400" /> GAMING
                </div>
                {distros.map((d) => (
                  <div key={d.id} className={distros.length === 2 ? 'col-span-4' : 'col-span-3'}>
                    <div className="flex items-center justify-between text-xs font-bold text-sky-300 mb-1">
                      <span>{d.gamingScore} / 5</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#161622] overflow-hidden">
                      <div
                        className="score-meter-fill h-full bg-sky-400 rounded-full"
                        data-width={`${(d.gamingScore / 5) * 100}%`}
                        style={{ width: `${(d.gamingScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* METRIC: STABILITY */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822]">
                <div className="col-span-3 text-xs text-slate-300 flex items-center gap-1.5 font-bold">
                  <Shield className="w-3.5 h-3.5 text-[#FF1E44]" /> STABILITY
                </div>
                {distros.map((d) => (
                  <div key={d.id} className={distros.length === 2 ? 'col-span-4' : 'col-span-3'}>
                    <div className="flex items-center justify-between text-xs font-bold text-[#FF1E44] mb-1">
                      <span>{d.stabilityScore} / 5</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#161622] overflow-hidden">
                      <div
                        className="score-meter-fill h-full bg-[#FF1E44] rounded-full"
                        data-width={`${(d.stabilityScore / 5) * 100}%`}
                        style={{ width: `${(d.stabilityScore / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822] text-xs">
                <div className="col-span-3 text-slate-500">DEFAULT_DE:</div>
                {distros.map((d) => (
                  <div key={d.id} className={`${distros.length === 2 ? 'col-span-4' : 'col-span-3'} font-bold text-white`}>
                    {d.desktopEnvironment.default}
                  </div>
                ))}
              </div>

              {/* PACKAGE MANAGER */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822] text-xs">
                <div className="col-span-3 text-slate-500">PACKAGE_MGR:</div>
                {distros.map((d) => (
                  <div key={d.id} className={`${distros.length === 2 ? 'col-span-4' : 'col-span-3'} text-[#FF1E44] font-bold`}>
                    {d.packageManager.name}
                  </div>
                ))}
              </div>

              {/* MIN RAM */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822] text-xs">
                <div className="col-span-3 text-slate-500">MIN_RAM:</div>
                {distros.map((d) => (
                  <div key={d.id} className={`${distros.length === 2 ? 'col-span-4' : 'col-span-3'} text-slate-300`}>
                    {d.systemRequirements.minRam}
                  </div>
                ))}
              </div>

              {/* RELEASE MODEL */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-[#181822] text-xs">
                <div className="col-span-3 text-slate-500">UPDATE_MODEL:</div>
                {distros.map((d) => (
                  <div key={d.id} className={`${distros.length === 2 ? 'col-span-4' : 'col-span-3'} text-slate-300`}>
                    {d.releaseModel}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-12 gap-4 pt-3">
                <div className="col-span-3" />
                {distros.map((d) => (
                  <div key={d.id} className={distros.length === 2 ? 'col-span-4' : 'col-span-3'}>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDetails(d);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#14141C] hover:bg-[#FF1E44] hover:text-white text-slate-200 text-xs font-mono font-bold transition-all cursor-pointer border border-[#262633]"
                    >
                      [VIEW {d.name.toUpperCase()}]
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
