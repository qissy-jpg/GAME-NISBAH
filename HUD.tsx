import React from 'react';
import { Heart, Coins, Flame, Pause, Volume2, VolumeX, Zap, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Target, ShieldAlert, Sparkles } from 'lucide-react';
import { RatioQuestion, Language, StageId, STAGES_CONFIG } from '../types/game';

interface HUDProps {
  score: number;
  distance: number;
  coins: number;
  lives: number;
  maxLives: number;
  streak: number;
  currentLevel: number;
  boostMeter: number;
  isBoosting: boolean;
  currentStage: StageId;
  stageCorrectCount: number;
  stageTargetCorrect: number;
  totalCorrectCount: number;
  currentQuestion: RatioQuestion | null;
  lifeLostWarning: {
    visible: boolean;
    remainingLives: number;
  } | null;
  quizFeedback: {
    visible: boolean;
    isCorrect: boolean;
    explanation: string;
    pointsDelta: number;
    streakBonusAwarded: number;
    fastBonusAwarded: boolean;
    correctAnswerText: string;
  } | null;
  levelUpNotification: number | null;
  language: Language;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onTriggerBoost: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  score,
  distance,
  coins,
  lives,
  maxLives,
  streak,
  currentLevel,
  boostMeter,
  isBoosting,
  currentStage,
  stageCorrectCount,
  stageTargetCorrect,
  totalCorrectCount,
  currentQuestion,
  lifeLostWarning,
  quizFeedback,
  levelUpNotification,
  language,
  isMuted,
  onToggleMute,
  onPause,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
  onMoveDown,
  onTriggerBoost,
}) => {
  const isBm = language === 'ms';
  const stageInfo = STAGES_CONFIG[currentStage];

  return (
    <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between p-3 md:p-6 overflow-hidden">
      {/* ================= TOP BAR ================= */}
      <div className="flex items-start justify-between gap-3">
        {/* Left Stats: Lives, Coins, Score, Stage Progress */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Lives hearts (3 airplane-heart icons) */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15 shadow-lg shadow-black/20">
            {Array.from({ length: maxLives }).map((_, i) => (
              <div key={i} className="relative">
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    i < lives
                      ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.7)] scale-100'
                      : 'text-slate-600 fill-slate-700/40 scale-85 opacity-50'
                  }`}
                />
                {i < lives && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold pointer-events-none">
                    ✈
                  </span>
                )}
              </div>
            ))}
            <span className="ml-1 text-xs font-black text-rose-300 font-mono tracking-wider">
              {lives}/{maxLives}
            </span>
          </div>

          {/* Current Stage Badge & Stage Progress */}
          <div className="flex flex-col gap-1 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/15 shadow-md">
            <div className="flex items-center justify-between gap-2 text-xs font-black">
              <span className="flex items-center gap-1.5 text-white">
                <span>{stageInfo.badge}</span>
                <span className="text-cyan-300">
                  {isBm ? 'P' : 'S'}{currentStage}: {stageInfo.name[language]}
                </span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                {stageInfo.difficultyLabel[language]}
              </span>
            </div>

            {/* Stage Progress indicators (5 slots) */}
            <div className="flex items-center justify-between gap-2 text-[10px] text-slate-300">
              <div className="flex items-center gap-1">
                {Array.from({ length: stageTargetCorrect }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx < stageCorrectCount
                        ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-amber-300 font-bold">
                {stageCorrectCount}/{stageTargetCorrect} {isBm ? 'Betul' : 'Correct'}
              </span>
            </div>

            {/* Overall Challenge Progress */}
            <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold pt-0.5 border-t border-white/5">
              <span>{isBm ? 'JUARA NISBAH:' : 'CHAMPION GOAL:'}</span>
              <span className="text-cyan-400 font-mono">{totalCorrectCount}/15</span>
            </div>
          </div>

          {/* Coins & Score */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-amber-500/20 backdrop-blur-md px-3 py-1 rounded-xl border border-amber-400/40 text-amber-300 font-extrabold text-xs md:text-sm shadow-md">
              <Coins className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>{coins}</span>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 text-white font-black text-xs md:text-base shadow-md tracking-wider">
              <span className="text-[10px] text-sky-400 font-bold mr-1">SKOR</span>
              <span className="font-mono">{score.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Center: Current Ratio Question Banner */}
        {currentQuestion && (
          <div className="flex-1 max-w-xl mx-2 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <div className="bg-gradient-to-r from-indigo-950/95 via-slate-900/95 to-indigo-950/95 backdrop-blur-lg border-2 border-cyan-400/60 rounded-2xl p-3 md:p-4 shadow-[0_0_25px_rgba(56,189,248,0.35)] text-center">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-extrabold text-xs uppercase tracking-wider">
                  DSKP {currentQuestion.dskpCode}
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {isBm ? 'PILIH GERBANG LORONG JAWAPAN BETUL!' : 'STEER THROUGH THE CORRECT GATE!'}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono font-bold">
                  {stageInfo.name[language]}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-white text-sm md:text-base font-bold leading-snug drop-shadow-md">
                {isBm ? currentQuestion.question.ms : currentQuestion.question.en}
              </p>

              {/* Gate Options Preview bar */}
              <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/10 text-xs">
                <div className="bg-sky-500/20 border border-sky-400/40 rounded-lg py-1 px-1.5 flex flex-col items-center">
                  <span className="text-[10px] text-sky-300 font-bold uppercase">{isBm ? 'Kiri' : 'Left'}</span>
                  <span className="font-black text-white text-xs md:text-sm">{currentQuestion.options[0]}</span>
                </div>
                <div className="bg-purple-500/20 border border-purple-400/40 rounded-lg py-1 px-1.5 flex flex-col items-center">
                  <span className="text-[10px] text-purple-300 font-bold uppercase">{isBm ? 'Tengah' : 'Center'}</span>
                  <span className="font-black text-white text-xs md:text-sm">{currentQuestion.options[1]}</span>
                </div>
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-lg py-1 px-1.5 flex flex-col items-center">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase">{isBm ? 'Kanan' : 'Right'}</span>
                  <span className="font-black text-white text-xs md:text-sm">{currentQuestion.options[2]}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Stats: Distance, Streak, Mute, Pause */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-sky-400" />}
            </button>

            {/* Pause Button */}
            <button
              onClick={onPause}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
              title="Pause Game (Esc)"
            >
              <Pause className="w-5 h-5" />
            </button>
          </div>

          {/* Distance */}
          <div className="bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 text-white font-bold text-xs md:text-sm shadow-md">
            <span className="text-slate-400 text-xs mr-1">{isBm ? 'JARAK' : 'DIST'}</span>
            <span className="font-mono text-cyan-300 font-black">{distance} m</span>
          </div>

          {/* Streak Flame */}
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600/90 to-red-600/90 px-3 py-1 rounded-xl text-white font-black text-xs md:text-sm shadow-lg shadow-orange-600/30 animate-pulse">
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{streak}x {isBm ? 'STREAK' : 'COMBO'}</span>
            </div>
          )}

          {/* Nitro Boost Meter */}
          <div className="flex flex-col items-end gap-1 w-28 md:w-36 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-white/15 shadow-md">
            <div className="flex items-center justify-between w-full text-[10px] font-black">
              <span className="text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" />
                NITRO
              </span>
              <span className={`font-mono ${boostMeter >= 100 ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                {isBoosting ? 'AKTIF!' : `${boostMeter}%`}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full transition-all duration-200 ${
                  boostMeter >= 100
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500'
                }`}
                style={{ width: `${boostMeter}%` }}
              />
            </div>
            {boostMeter >= 100 && !isBoosting && (
              <button
                onClick={onTriggerBoost}
                className="w-full mt-1 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-[10px] uppercase shadow-md shadow-emerald-500/30 hover:scale-102 active:scale-95 transition-all cursor-pointer"
              >
                {isBm ? 'TEKAN SPACE / BOOST!' : 'PRESS SPACE / BOOST!'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= MIDDLE NOTIFICATIONS ================= */}
      {/* 1. Life Lost Warning */}
      {lifeLostWarning && lifeLostWarning.visible && (
        <div className="self-center bg-gradient-to-r from-rose-950/95 via-red-900/95 to-rose-950/95 border-2 border-rose-500 text-white px-6 py-3 rounded-2xl shadow-[0_0_35px_rgba(244,63,94,0.7)] flex items-center gap-3 animate-in zoom-in-90 duration-200 pointer-events-auto">
          <ShieldAlert className="w-7 h-7 text-rose-400 shrink-0 animate-bounce" />
          <div>
            <div className="text-sm font-black text-rose-300 uppercase tracking-wider">
              {isBm ? 'AMARAN: TERLANGGAR HALANGAN! (-20 MATA)' : 'WARNING: OBSTACLE HIT! (-20 POINTS)'}
            </div>
            <div className="text-xs text-rose-100 font-bold">
              {lifeLostWarning.remainingLives > 0
                ? isBm
                  ? `Tinggal ${lifeLostWarning.remainingLives} nyawa lagi! Berhati-hati semasa mengemudi.`
                  : `${lifeLostWarning.remainingLives} lives remaining! Navigate carefully.`
                : isBm
                ? 'Semua nyawa habis!'
                : 'All lives depleted!'}
            </div>
          </div>
        </div>
      )}

      {/* 2. Quiz Answer Feedback Toast */}
      {quizFeedback && quizFeedback.visible && (
        <div className="self-center max-w-lg w-full px-2 pointer-events-auto transition-all duration-300 animate-in zoom-in-95">
          <div
            className={`p-4 rounded-2xl border-2 backdrop-blur-xl shadow-2xl text-center ${
              quizFeedback.isCorrect
                ? 'bg-gradient-to-r from-emerald-950/95 via-slate-900/95 to-emerald-950/95 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                : 'bg-gradient-to-r from-amber-950/95 via-slate-900/95 to-amber-950/95 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
            }`}
          >
            <div className="flex items-center justify-center gap-2 font-black text-base md:text-lg mb-1">
              {quizFeedback.isCorrect ? (
                <>
                  <span className="text-2xl">✨</span>
                  <span className="text-emerald-300 uppercase">
                    {isBm ? 'TEPAT & BETUL!' : 'EXCELLENT & CORRECT!'}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    +{quizFeedback.pointsDelta} {isBm ? 'Mata' : 'Pts'}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl">💡</span>
                  <span className="text-amber-300 uppercase">
                    {isBm ? 'KURANG TEPAT (-30 MATA)' : 'NOT QUITE RIGHT (-30 PTS)'}
                  </span>
                </>
              )}
            </div>

            {/* Streak Bonus Alert */}
            {quizFeedback.streakBonusAwarded > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-amber-300 text-xs font-bold mb-2">
                <Flame className="w-3.5 h-3.5 fill-amber-300" />
                <span>
                  +{quizFeedback.streakBonusAwarded} {isBm ? 'Mata Bonus Streak!' : 'Streak Bonus Points!'}
                </span>
              </div>
            )}

            {/* Fast Bonus Alert */}
            {quizFeedback.fastBonusAwarded && (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold mb-2 ml-1">
                <Zap className="w-3.5 h-3.5 fill-cyan-300" />
                <span>+20 {isBm ? 'Pantas Menjawab!' : 'Speed Bonus!'}</span>
              </div>
            )}

            {!quizFeedback.isCorrect && (
              <div className="text-xs text-amber-200 font-bold mb-1">
                {isBm ? 'Jawapan Sebenar: ' : 'Correct Answer: '}
                <span className="font-mono text-white underline">{quizFeedback.correctAnswerText}</span>
              </div>
            )}

            {/* Pedagogical Step-by-Step Mathematical Explanation */}
            <p className="text-xs text-slate-200 mt-1 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/10 text-left font-medium">
              <span className="font-bold text-amber-300 mr-1">📐 {isBm ? 'Penerangan:' : 'Explanation:'}</span>
              {quizFeedback.explanation}
            </p>
          </div>
        </div>
      )}

      {/* 3. Level Up Notification */}
      {levelUpNotification && (
        <div className="self-center bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-6 py-2 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.8)] text-sm md:text-base uppercase tracking-wider animate-bounce pointer-events-auto">
          🚀 {isBm ? `KELAJUAN MENINGKAT! TAHAP ${levelUpNotification}` : `SPEED BOOST! LEVEL ${levelUpNotification}`}
        </div>
      )}

      {/* ================= BOTTOM BAR & ON-SCREEN CONTROLS ================= */}
      <div className="flex items-end justify-between gap-4 pointer-events-auto">
        {/* On-screen Directional Steering Pad for touch / mouse */}
        <div className="grid grid-cols-3 gap-1.5 p-2 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl">
          <div />
          <button
            onClick={onMoveUp}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-cyan-600 text-white flex items-center justify-center transition-all shadow active:scale-95 cursor-pointer"
            title="Fly Higher (W / Up Arrow)"
          >
            <ArrowUp className="w-5 h-5 text-cyan-400" />
          </button>
          <div />

          <button
            onClick={onMoveLeft}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-cyan-600 text-white flex items-center justify-center transition-all shadow active:scale-95 cursor-pointer"
            title="Steer Left (A / Left Arrow)"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
          </button>

          <button
            onClick={onMoveDown}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-cyan-600 text-white flex items-center justify-center transition-all shadow active:scale-95 cursor-pointer"
            title="Fly Lower (S / Down Arrow)"
          >
            <ArrowDown className="w-5 h-5 text-cyan-400" />
          </button>

          <button
            onClick={onMoveRight}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-cyan-600 text-white flex items-center justify-center transition-all shadow active:scale-95 cursor-pointer"
            title="Steer Right (D / Right Arrow)"
          >
            <ArrowRight className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* Keyboard Controls Reminder */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
          <span className="font-bold text-cyan-300">🎮 {isBm ? 'Kawalan:' : 'Controls:'}</span>
          <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-white text-[10px]">A / D / ← / →</span>
          <span>{isBm ? 'Tukar Lorong' : 'Steer Lane'}</span>
          <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-white text-[10px]">W / S / ↑ / ↓</span>
          <span>{isBm ? 'Ketinggian' : 'Altitude'}</span>
        </div>

        {/* Big On-screen Nitro Boost Button for mobile/mouse */}
        <button
          onClick={onTriggerBoost}
          disabled={boostMeter < 100 || isBoosting}
          className={`px-5 py-3 rounded-2xl font-black text-xs md:text-sm uppercase flex items-center gap-2 transition-all shadow-xl ${
            boostMeter >= 100 && !isBoosting
              ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-950 shadow-amber-500/50 hover:scale-105 active:scale-95 animate-pulse cursor-pointer'
              : 'bg-slate-800/80 text-slate-500 border border-white/10 opacity-70 cursor-not-allowed'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span>{isBoosting ? (isBm ? 'BOOST AKTIF!' : 'BOOSTING!') : (isBm ? 'NITRO BOOST' : 'NITRO BOOST')}</span>
        </button>
      </div>
    </div>
  );
};
