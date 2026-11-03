import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Trophy, Zap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StageId, STAGES_CONFIG, Language } from '../types/game';

interface StageTransitionModalProps {
  completedStage: StageId;
  nextStage: StageId;
  bonusScore: number;
  totalScore: number;
  totalCorrect: number;
  language: Language;
  onResume: () => void;
}

export const StageTransitionModal: React.FC<StageTransitionModalProps> = ({
  completedStage,
  nextStage,
  bonusScore,
  totalScore,
  totalCorrect,
  language,
  onResume,
}) => {
  const isBm = language === 'ms';
  const [countdown, setCountdown] = useState(3);

  const prevStageInfo = STAGES_CONFIG[completedStage];
  const nextStageInfo = STAGES_CONFIG[nextStage];

  // Trigger confetti burst on appearance
  useEffect(() => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 },
    });

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onResume();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onResume]);

  return (
    <div className="absolute inset-0 z-45 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950/90 to-slate-950 border-2 border-cyan-400/50 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(56,189,248,0.35)] text-center text-white relative">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-extrabold text-xs uppercase tracking-wider mb-3 shadow-md animate-bounce">
          <Sparkles className="w-4 h-4 fill-cyan-400 text-cyan-400" />
          <span>{isBm ? 'KEMAJUAN PERINGKAT BARU!' : 'STAGE CLEARED!'}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black uppercase font-['Fredoka'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 drop-shadow">
          {isBm ? `PERINGKAT ${completedStage} SELESAI!` : `STAGE ${completedStage} COMPLETED!`}
        </h2>

        {/* Bonus awarded */}
        <div className="my-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-sm md:text-base font-mono shadow-md">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>+{bonusScore} {isBm ? 'MATA BONUS PERINGKAT' : 'STAGE BONUS POINTS'}</span>
        </div>

        {/* Stage Comparison Card */}
        <div className="my-4 bg-slate-900/90 border border-white/10 rounded-2xl p-4 text-left space-y-3">
          {/* Completed stage */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">
                {isBm ? 'Peringkat' : 'Stage'} {completedStage}: {prevStageInfo.name[language]}
              </span>
            </div>
            <span className="font-mono text-emerald-400 font-black">{isBm ? 'SELESAI (5/5)' : 'CLEARED (5/5)'}</span>
          </div>

          {/* Next unlocked stage */}
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-cyan-300 mb-1">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{isBm ? 'PERINGKAT SETERUSNYA DIBUKA:' : 'NEXT STAGE UNLOCKED:'}</span>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-400/30">
              <div className="flex items-center justify-between">
                <span className="font-black text-base text-white flex items-center gap-1.5">
                  <span>{nextStageInfo.badge}</span>
                  <span>{isBm ? 'Peringkat' : 'Stage'} {nextStage}: {nextStageInfo.name[language]}</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 font-mono font-bold">
                  {nextStageInfo.difficultyLabel[language]}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {nextStageInfo.topics[language]}
              </p>
            </div>
          </div>

          {/* Overall challenge progress */}
          <div className="pt-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
              <span>{isBm ? 'Kemajuan Keseluruhan Cabaran Nisbah:' : 'Overall Ratio Challenge Progress:'}</span>
              <span className="font-mono text-cyan-300">{totalCorrect} / 15 {isBm ? 'Soalan' : 'Questions'}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-amber-400 transition-all duration-500"
                style={{ width: `${Math.round((totalCorrect / 15) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Continue Button & Auto countdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
          <span className="text-xs text-slate-400 font-medium">
            {isBm ? `Terbang automatik dalam ${countdown}s...` : `Auto-launching in ${countdown}s...`}
          </span>

          <button
            onClick={onResume}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm uppercase shadow-lg shadow-amber-500/30 hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isBm ? 'TERUSKAN PENERBANGAN' : 'CONTINUE FLIGHT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
