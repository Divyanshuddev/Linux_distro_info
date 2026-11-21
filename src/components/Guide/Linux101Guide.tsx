'use client';

import React, { useState } from 'react';
import { LINUX_101_FAQS } from '@/data/distros';
import { ChevronDown, BookOpen } from 'lucide-react';

export const Linux101Guide: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#08080D] border-2 border-[#1E1E2C] p-6 md:p-8 space-y-6 shadow-2xl cyber-chamfer-tl cyber-card relative">
      <div className="flex items-center gap-2 text-[#00F0FF] cyber-mono font-bold">
        <BookOpen className="w-3.5 h-3.5" />
        <span>// LINUX_101 • CYBER_FIELD_MANUAL //</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
          Beginner Core Principles Explained
        </h2>
        <p className="text-xs text-slate-400 max-w-xl font-sans">
          Stepping away from closed proprietary operating systems? Here are straightforward tactical answers to questions newcomers ask most.
        </p>
      </div>

      <div className="space-y-2.5 pt-2 font-mono">
        {LINUX_101_FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`border transition-all duration-150 overflow-hidden cyber-chamfer-both ${
                isOpen
                  ? 'bg-[#0D0D16] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-[#09090F] border-[#1C1C28] hover:border-slate-500'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="cyber-mono w-7 h-7 bg-[#141422] border border-[#252538] text-[#00F0FF] font-black flex items-center justify-center shrink-0 text-xs cyber-chamfer-tag">
                    0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#00F0FF]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-[#181824] pt-3 font-sans animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
