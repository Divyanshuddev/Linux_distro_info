'use client';

import React, { useState, useEffect, useRef } from 'react';
import { animate, stagger } from '@/lib/animeHelper';
import confetti from 'canvas-confetti';
import { MATCHMAKER_QUESTIONS, LINUX_DISTROS } from '@/data/distros';
import { LinuxDistro } from '@/types';
import {
  Sparkles, X, ArrowRight, ArrowLeft, Trophy,
  RotateCcw, ChevronRight
} from 'lucide-react';

interface DistroMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDistro: (distro: LinuxDistro) => void;
}

export const DistroMatchmakerModal: React.FC<DistroMatchmakerModalProps> = ({
  isOpen,
  onClose,
  onSelectDistro
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [recommendedDistros, setRecommendedDistros] = useState<{ distro: LinuxDistro; score: number }[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setSelectedAnswers([]);
      setIsFinished(false);
      return;
    }

    if (containerRef.current) {
      animate(containerRef.current, {
        scale: [0.94, 1],
        opacity: [0, 1],
        ease: 'out(3)',
        duration: 350
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!optionsRef.current) return;
    const items = optionsRef.current.querySelectorAll('.quiz-option');

    animate(items, {
      translateY: [15, 0],
      opacity: [0, 1],
      delay: stagger(50),
      ease: 'out(2)',
      duration: 300
    });
  }, [currentStep, isFinished]);

  if (!isOpen) return null;

  const currentQ = MATCHMAKER_QUESTIONS[currentStep];

  const handleSelectOption = (optionIdx: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentStep] = optionIdx;
    setSelectedAnswers(nextAnswers);

    if (currentStep < MATCHMAKER_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateRecommendations(nextAnswers);
    }
  };

  const calculateRecommendations = (answers: number[]) => {
    const scores: Record<string, number> = {};
    LINUX_DISTROS.forEach((d) => (scores[d.id] = 50));

    answers.forEach((ansIdx, qIdx) => {
      const q = MATCHMAKER_QUESTIONS[qIdx];
      const opt = q.options[ansIdx];

      LINUX_DISTROS.forEach((d) => {
        if (opt.weight.category && opt.weight.category.includes(d.category)) {
          scores[d.id] += 30;
        }
        if (opt.weight.specificDistros && opt.weight.specificDistros.includes(d.id)) {
          scores[d.id] += 40;
        }
        if (opt.weight.resourceUsage && opt.weight.resourceUsage.includes(d.resourceUsage as unknown as 'Very Low' | 'Low' | 'Medium')) {
          scores[d.id] += 25;
        }
      });
    });

    const sorted = Object.entries(scores)
      .map(([id, score]) => ({
        distro: LINUX_DISTROS.find((d) => d.id === id)!,
        score: Math.min(99, Math.round((score / 150) * 100))
      }))
      .filter((item) => item.distro)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendedDistros(sorted);
    setIsFinished(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#07070A]/85 backdrop-blur-md transition-opacity"
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-2xl rounded-2xl bg-[#09090D] border border-[#22222B] shadow-2xl overflow-hidden z-10 select-none mech-card"
      >
        {/* Solid Crimson Accent Top */}
        <div className="h-1.5 w-full bg-[#FF1E44]" />

        {/* Header */}
        <div className="p-5 bg-[#0C0C12] border-b border-[#1C1C26] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#FF1E44] font-mono font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>// LINUX.MATCHMAKER_SYSTEM //</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md bg-[#161622] hover:bg-[#202030] text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="w-full h-1 bg-[#14141C]">
            <div
              className="h-full bg-[#FF1E44] transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / MATCHMAKER_QUESTIONS.length) * 100}%`
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {!isFinished ? (
            <div className="space-y-6">
              <div>
                <span className="mono-tag text-slate-500">
                  // STEP [{currentStep + 1} / {MATCHMAKER_QUESTIONS.length}] //
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">
                  {currentQ.question}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options (Image 2 Angular Pop Style) */}
              <div ref={optionsRef} className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`quiz-option w-full p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex items-center gap-4 ${isSelected
                        ? 'bg-[#FF1E44]/15 border-[#FF1E44] text-white shadow-[0_0_12px_rgba(255,30,68,0.25)]'
                        : 'bg-[#0E0E14] border-[#22222B] text-slate-300 hover:border-[#FF1E44] hover:bg-[#12121A]'
                        }`}
                    >
                      <span className="text-2xl shrink-0 p-2 rounded-lg bg-[#14141C] border border-[#262633]">
                        {opt.icon}
                      </span>
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm font-black font-mono text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-sans">{opt.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                    </button>
                  );
                })}
              </div>

              {currentStep > 0 && (
                <div className="flex justify-start">
                  <button
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flex items-center gap-1.5 mono-tag text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> [PREVIOUS_QUESTION]
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in duration-300 font-mono">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#FF1E44]/20 border border-[#FF1E44] text-[#FF1E44] shadow-xl">
                <Trophy className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">// MATCH_COMPLETE //</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto font-sans">
                  The system has computed the three highest compatible distributions for your operational profile:
                </p>
              </div>

              <div className="space-y-3 text-left">
                {recommendedDistros.map((item, idx) => {
                  const d = item.distro;
                  return (
                    <div
                      key={d.id}
                      onClick={() => {
                        onClose();
                        onSelectDistro(d);
                      }}
                      className="p-3.5 rounded-xl bg-[#0E0E14] border border-[#22222B] hover:border-[#FF1E44] transition-all cursor-pointer flex items-center justify-between gap-4 group shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="mono-tag w-6 h-6 rounded bg-[#181822] text-[#FF1E44] font-black flex items-center justify-center shrink-0">
                          0{idx + 1}
                        </span>
                        <div
                          className="w-9 h-9 rounded-md flex items-center justify-center text-xs font-black text-white shrink-0"
                          style={{ backgroundColor: d.logoColor }}
                        >
                          {d.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-black text-white group-hover:text-[#FF1E44] transition-colors">
                            {d.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-sans line-clamp-1">
                            {d.tagline}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="mono-tag px-2 py-0.5 rounded bg-[#FF1E44]/15 border border-[#FF1E44]/40 text-[#FF1E44] font-bold">
                          {item.score}%_MATCH
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 rounded-lg bg-[#14141C] hover:bg-[#1E1E28] text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border border-[#2B2B38]"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> [RESTART_QUIZ]
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-[#FF1E44] hover:bg-[#FF3355] text-white text-xs font-black font-mono uppercase tracking-wider cursor-pointer shadow-[0_0_12px_rgba(255,30,68,0.25)]"
                >
                  [DISMISS]
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
