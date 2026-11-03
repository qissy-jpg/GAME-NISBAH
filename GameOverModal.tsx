import React, { useState } from 'react';
import { RotateCcw, Home, Award, CheckCircle, XCircle, ChevronDown, ChevronUp, Trophy, ShieldAlert, Sparkles, Target, Zap, Crown } from 'lucide-react';
import { PlayerAnswerRecord, Language, AchievementBadge, StageId, STAGES_CONFIG } from '../types/game';

interface GameOverModalProps {
  isVictory: boolean;
  score: number;
  distance: number;
  coins: number;
  maxStreak: number;
  highestLevel: number;
  collisionsCount: number;
  finalStage: StageId;
  stagesCompleted: number; // 0, 1, 2, or 3
  totalCorrect: number; // 0 to 15
  answerRecords: PlayerAnswerRecord[];
  language: Language;
  playerName: string;
  onPlayAgain: () => void;
  onMainMenu: () => void;
  onOpenLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVictory,
  score,
  distance,
  coins,
  maxStreak,
  highestLevel,
  collisionsCount,
  finalStage,
  stagesCompleted,
  totalCorrect,
  answerRecords,
  language,
  playerName,
  onPlayAgain,
  onMainMenu,
  onOpenLeaderboard,
}) => {
  const [showReview, setShowReview] = useState(false);
  const isBm = language === 'ms';

  const totalQuestions = answerRecords.length;
  const correctCount = answerRecords.filter((r) => r.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Performance Rating:
  // Ratio Champion: Completed all 3 stages
  // Ratio Master: 85%+ accuracy
  // Ratio Expert: 70%–84%
  // Ratio Cadet: below 70%
  const getPerformanceBadge = () => {
    if (isVictory) {
      return {
        label: isBm ? '👑 JUARA NISBAH (RATIO CHAMPION) — TAHNIAH!' : '👑 RATIO CHAMPION — CONGRATULATIONS!',
        color: 'from-amber-400 via-yellow-300 to-orange-400 text-slate-950 font-black',
        icon: '👑',
      };
    } else if (accuracy >= 85) {
      return {
        label: isBm ? 'Pakar Nisbah (Ratio Master) — Prestasi Hebat!' : 'Ratio Master — Outstanding Flight!',
        color: 'from-emerald-400 to-teal-500 text-slate-950 font-black',
        icon: '🏆',
      };
    } else if (accuracy >= 70) {
      return {
        label: isBm ? 'Juruterbang Mahir (Ratio Expert) — Sangat Baik!' : 'Ratio Expert — Very Good!',
        color: 'from-sky-400 to-blue-500 text-white font-black',
        icon: '✈️',
      };
    } else {
      return {
        label: isBm ? 'Kadet Nisbah (Ratio Cadet) — Teruskan Belajar!' : 'Ratio Cadet — Keep Practising!',
        color: 'from-purple-400 to-pink-500 text-white font-black',
        icon: '🔰',
      };
    }
  };

  const performanceCategory = getPerformanceBadge();

  // Achievement Badges
  const badges: AchievementBadge[] = [
    {
      id: 'ratio_champion',
      title: { ms: 'Juara Nisbah', en: 'Ratio Champion' },
      desc: { ms: 'Selesaikan ketiga-tiga peringkat (15 soalan betul).', en: 'Completed all 3 progressive stages (15 correct answers).' },
      icon: '👑',
      unlocked: isVictory,
    },
    {
      id: 'high_accuracy',
      title: { ms: 'Ketepatan Tinggi', en: 'High Accuracy' },
      desc: { ms: 'Capai ketepatan matematik 80% atau lebih.', en: 'Achieved 80% or higher accuracy.' },
      icon: '🎯',
      unlocked: totalQuestions >= 5 && accuracy >= 80,
    },
    {
      id: 'streak_king',
      title: { ms: 'Raja Streak', en: 'Streak Ace' },
      desc: { ms: 'Jawab 5 soalan berturut-turut dengan betul.', en: 'Answered 5 questions in a row correctly.' },
      icon: '🔥',
      unlocked: maxStreak >= 5,
    },
    {
      id: 'coin_hunter',
      title: { ms: 'Pengumpul Syiling', en: 'Coin Hunter' },
      desc: { ms: 'Kumpul 15 syiling atau kristal.', en: 'Collected 15 or more coins or crystals.' },
      icon: '🪙',
      unlocked: coins >= 15,
    },
  ];

  // Pedagogical diagnostic feedback
  const missedQuestions = answerRecords.filter((r) => !r.isCorrect);
  const missedDskpCounts = missedQuestions.reduce((acc, cur) => {
    acc[cur.question.dskpCode] = (acc[cur.question.dskpCode] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let diagnosticTip = isBm
    ? 'Prestasi cemerlang! Anda telah menguasai konsep nisbah Tingkatan 1 Bab 4 dengan sangat mantap.'
    : 'Outstanding performance! You have thoroughly mastered Form 1 Chapter 4 ratio concepts.';

  if (missedDskpCounts['4.1.3'] && missedDskpCounts['4.1.3'] > 0) {
    diagnosticTip = isBm
      ? '💡 Tip Pembelajaran (DSKP 4.1.3): Bagi soalan gabungan nisbah 3 kuantiti (A:B dan B:C), cari Gandaan Sepunya Terkecil (GSTK) bagi sebutan sepunya B terlebih dahulu untuk menyelaraskan nilainya sebelum mencantumkan nisbah.'
      : '💡 Learning Tip (DSKP 4.1.3): When combining two ratios (A:B and B:C), find the Least Common Multiple (LCM) of the common term B to equalize its value before merging.';
  } else if (missedDskpCounts['4.1.2'] && missedDskpCounts['4.1.2'] > 0) {
    diagnosticTip = isBm
      ? '💡 Tip Pembelajaran (DSKP 4.1.2): Untuk mempermudahkan nisbah kepada bentuk termudah, bahagikan sebutan dengan Faktor Sepunya Terbesar (FSTB) sehingga tiada faktor sepunya selain 1.'
      : '💡 Learning Tip (DSKP 4.1.2): To simplify a ratio to lowest terms, divide both terms by their Highest Common Factor (HCF) until no common divisor other than 1 remains.';
  } else if (missedQuestions.length > 0) {
    diagnosticTip = isBm
      ? '💡 Tip Pembelajaran: Baca soalan dengan teliti. Pastikan urutan sebutan dalam nisbah sepadan dengan kuantiti yang dinyatakan dalam situasi.'
      : '💡 Learning Tip: Read questions carefully. Make sure the order of terms matches the order of quantities specified in the situation.';
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-white/20 rounded-3xl p-5 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white animate-in zoom-in-95 duration-300">
        {/* Header - Victory Champion vs Game Over */}
        <div className="text-center mb-5">
          {isVictory ? (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-2 shadow-lg shadow-amber-500/20 animate-bounce">
                <Crown className="w-4 h-4 fill-amber-300" />
                <span>{isBm ? 'KEMENANGAN MUTLAK 3 PERINGKAT!' : '3-STAGE ULTIMATE VICTORY!'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase font-['Fredoka'] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 drop-shadow">
                {isBm ? 'TAHNIAH! ANDA JUARA NISBAH!' : 'CONGRATULATIONS! YOU ARE THE RATIO CHAMPION!'}
              </h2>
              <p className="text-xs md:text-sm text-amber-200/90 mt-1 font-semibold">
                {isBm
                  ? `Tahniah ${playerName}! Anda telah berjaya menyelesaikan semua 3 peringkat penerbangan dan menjawab 15 soalan nisbah dengan cemerlang.`
                  : `Congratulations ${playerName}! You successfully completed all 3 flight stages and mastered all 15 ratio challenges.`}
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 font-extrabold text-xs uppercase tracking-wider mb-2 shadow-lg shadow-rose-500/20">
                <ShieldAlert className="w-4 h-4" />
                <span>{isBm ? 'SEMUA NYAWA HABIS' : 'LIVES DEPLETED'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase font-['Fredoka'] text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-300 to-amber-400">
                GAME OVER
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1">
                {isBm
                  ? `Usaha yang bagus ${playerName}! Anda berjaya mara sehingga ${STAGES_CONFIG[finalStage].name[language]}. Semak penerangan matematik di bawah dan cuba lagi!`
                  : `Good effort ${playerName}! You reached ${STAGES_CONFIG[finalStage].name[language]}. Review your math explanations below and fly again!`}
              </p>
            </>
          )}
        </div>

        {/* Performance Category Banner */}
        <div className={`mb-5 p-3 rounded-2xl bg-gradient-to-r ${performanceCategory.color} text-center text-xs md:text-sm flex items-center justify-center gap-2 shadow-md`}>
          <span className="text-lg">{performanceCategory.icon}</span>
          <span>{performanceCategory.label}</span>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 text-center">
          <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">{isBm ? 'JUMLAH SKOR' : 'FINAL SCORE'}</div>
            <div className="text-xl md:text-2xl font-black text-amber-400 font-mono mt-0.5">{score.toLocaleString()}</div>
          </div>

          <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">{isBm ? 'KETEPATAN MATEMATIK' : 'ACCURACY'}</div>
            <div className={`text-xl md:text-2xl font-black font-mono mt-0.5 ${accuracy >= 75 ? 'text-emerald-400' : accuracy >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              {accuracy}%
            </div>
            <div className="text-[10px] text-slate-400">{correctCount} / {totalQuestions} {isBm ? 'betul' : 'correct'}</div>
          </div>

          <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">{isBm ? 'PERINGKAT DISELESAIKAN' : 'STAGES CLEARED'}</div>
            <div className="text-xl md:text-2xl font-black text-cyan-400 font-mono mt-0.5">
              {stagesCompleted} / 3
            </div>
            <div className="text-[10px] text-slate-400">{totalCorrect} / 15 {isBm ? 'soalan juara' : 'champion questions'}</div>
          </div>

          <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-bold uppercase">{isBm ? 'JARAK PENERBANGAN' : 'DISTANCE'}</div>
            <div className="text-xl md:text-2xl font-black text-white font-mono mt-0.5">{distance}m</div>
            <div className="text-[10px] text-slate-400">{coins} {isBm ? 'syiling' : 'coins'} • {maxStreak}x streak</div>
          </div>
        </div>

        {/* Pedagogical Diagnostic Feedback Card */}
        <div className="mb-5 bg-gradient-to-r from-indigo-950/70 to-slate-900/90 border border-indigo-400/30 rounded-2xl p-3.5 text-xs text-indigo-100 flex items-start gap-2.5 shadow-md">
          <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-black text-cyan-300 uppercase tracking-wider mb-0.5">
              {isBm ? 'ANALISIS PEMBELAJARAN MATEMATIK' : 'MATHEMATICAL LEARNING ANALYSIS'}
            </div>
            <p className="leading-relaxed">{diagnosticTip}</p>
          </div>
        </div>

        {/* Achievement Badges Showcase */}
        <div className="mb-5">
          <div className="text-[11px] font-black uppercase text-slate-400 mb-2 tracking-wider">
            {isBm ? 'LENCANA PENCAPAIAN' : 'ACHIEVEMENT BADGES'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-2.5 rounded-2xl border text-center transition-all ${
                  b.unlocked
                    ? 'bg-amber-500/15 border-amber-400/40 text-white'
                    : 'bg-slate-800/40 border-white/5 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-black truncate">{b.title[language]}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{b.desc[language]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Step-by-Step Question Review */}
        <div className="mb-5">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 flex items-center justify-between text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{isBm ? `ULANG KAJI SOALAN (${totalQuestions} Soalan Dijawab)` : `QUESTION REVIEW (${totalQuestions} Questions Attempted)`}</span>
            </span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showReview && (
            <div className="mt-2 max-h-60 overflow-y-auto space-y-2 p-2 bg-slate-900/90 rounded-2xl border border-white/10">
              {answerRecords.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  {isBm ? 'Tiada soalan dijawab dalam penerbangan ini.' : 'No questions answered during this flight.'}
                </p>
              ) : (
                answerRecords.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-left text-xs ${
                      rec.isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/30'
                        : 'bg-rose-950/40 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-300">
                        #{idx + 1} • DSKP {rec.question.dskpCode} • {STAGES_CONFIG[rec.stage].name[language]}
                      </span>
                      <span
                        className={`font-black font-mono text-[10px] px-2 py-0.5 rounded ${
                          rec.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {rec.isCorrect ? (isBm ? 'BETUL (+100)' : 'CORRECT (+100)') : (isBm ? 'SALAH (-30)' : 'WRONG (-30)')}
                      </span>
                    </div>

                    <p className="text-white font-semibold mb-1.5">
                      {isBm ? rec.question.question.ms : rec.question.question.en}
                    </p>

                    <div className="text-[11px] space-y-0.5 text-slate-300">
                      <div>
                        <span className="text-slate-400">{isBm ? 'Pilihan anda: ' : 'Your choice: '}</span>
                        <span className={`font-bold ${rec.isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {rec.chosenIndex >= 0 ? rec.question.options[rec.chosenIndex] : (isBm ? 'Terlepas Gerbang' : 'Missed Gate')}
                        </span>
                      </div>
                      {!rec.isCorrect && (
                        <div>
                          <span className="text-slate-400">{isBm ? 'Jawapan betul: ' : 'Correct answer: '}</span>
                          <span className="font-bold text-emerald-400 font-mono">
                            {rec.question.options[rec.question.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-amber-200/90 leading-relaxed">
                      <span className="font-bold text-amber-300">📐 {isBm ? 'Penerangan:' : 'Explanation:'} </span>
                      {isBm ? rec.question.explanation.ms : rec.question.explanation.en}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-white/10">
          <button
            onClick={onOpenLeaderboard}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{isBm ? 'PAPAN MARKAH KELAS' : 'CLASSROOM LEADERBOARD'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onMainMenu}
              className="flex-1 sm:flex-none py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase flex items-center justify-center gap-2 border border-white/15 transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{isBm ? 'MENU UTAMA' : 'MAIN MENU'}</span>
            </button>

            <button
              onClick={onPlayAgain}
              className="flex-1 sm:flex-none py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all hover:scale-102 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isBm ? 'TERBANG SEMULA' : 'FLY AGAIN'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
