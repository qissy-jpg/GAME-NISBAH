import React from 'react';
import { X, Trophy, Medal, Award, Crown, Trash2 } from 'lucide-react';
import { LeaderboardEntry, Language, STAGES_CONFIG } from '../types/game';

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  language: Language;
  onClose: () => void;
  onClearLeaderboard: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  language,
  onClose,
  onClearLeaderboard,
}) => {
  const isBm = language === 'ms';

  // Sort entries using explicit educational competition rules:
  // 1. Finished all 3 stages (Ratio Champion) ranks strictly above non-finishers
  // 2. Highest total score
  // 3. Highest mathematics accuracy %
  // 4. Highest number of correct answers
  // 5. Greatest flight distance
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.completedAllStages !== b.completedAllStages) {
      return a.completedAllStages ? -1 : 1;
    }
    if (b.score !== a.score) return b.score - a.score;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    if (b.correctAnswers !== a.correctAnswers) return b.correctAnswers - a.correctAnswers;
    return b.distance - a.distance;
  });

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md select-none overflow-y-auto">
      <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/40 rounded-3xl p-5 md:p-7 shadow-[0_0_50px_rgba(251,191,36,0.3)] text-white relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 shadow-md shadow-amber-500/20">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-['Fredoka'] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400">
              {isBm ? 'PAPAN MARKAH KELAS' : 'CLASSROOM LEADERBOARD'}
            </h2>
            <p className="text-xs text-slate-400">
              {isBm
                ? 'Keutamaan Ranking: Tamat 3 Peringkat (Juara) ➔ Skor ➔ Ketepatan % ➔ Jawapan Betul ➔ Jarak'
                : 'Ranking Priority: 3-Stage Finisher (Champion) ➔ Score ➔ Accuracy % ➔ Correct ➔ Distance'}
            </p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden mb-4">
          <div className="grid grid-cols-12 gap-1 p-3 bg-slate-800/90 border-b border-white/10 text-[11px] font-black uppercase text-slate-400 tracking-wider">
            <div className="col-span-2 text-center">Ked / Rank</div>
            <div className="col-span-4">{isBm ? 'Nama Murid' : 'Player'}</div>
            <div className="col-span-2 text-right">Skor / Pts</div>
            <div className="col-span-2 text-center">{isBm ? 'Peringkat' : 'Stage'}</div>
            <div className="col-span-2 text-right">{isBm ? 'Ketepatan' : 'Acc.'}</div>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
            {sortedEntries.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30 text-amber-400" />
                <p>{isBm ? 'Belum ada rekod penerbangan. Jadilah penerbang pertama!' : 'No flight records yet. Be the first to soar!'}</p>
              </div>
            ) : (
              sortedEntries.map((entry, index) => {
                const isTop3 = index < 3;
                const medalColors = [
                  'text-amber-300 fill-amber-300',
                  'text-slate-300 fill-slate-300',
                  'text-amber-600 fill-amber-600',
                ];

                return (
                  <div
                    key={entry.id || index}
                    className={`grid grid-cols-12 gap-1 p-2.5 items-center text-xs transition-colors ${
                      entry.completedAllStages
                        ? 'bg-amber-500/10 hover:bg-amber-500/15'
                        : index === 0
                        ? 'bg-sky-500/10 hover:bg-sky-500/15'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Rank */}
                    <div className="col-span-2 flex items-center justify-center font-black">
                      {isTop3 ? (
                        <div className="flex items-center gap-1">
                          <Medal className={`w-4 h-4 ${medalColors[index]}`} />
                          <span className="font-mono text-white text-xs">#{index + 1}</span>
                        </div>
                      ) : (
                        <span className="font-mono text-slate-400 text-xs">#{index + 1}</span>
                      )}
                    </div>

                    {/* Name & Title */}
                    <div className="col-span-4 flex items-center gap-1.5 truncate">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-sky-400 shrink-0">
                        {entry.completedAllStages ? '👑' : entry.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-white truncate flex items-center gap-1">
                          <span>{entry.name}</span>
                          {entry.completedAllStages && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-400/40">
                              JUARA
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {entry.correctAnswers}/{entry.totalQuestions} {isBm ? 'betul' : 'correct'} • {entry.distance}m
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-2 text-right font-black font-mono text-amber-300">
                      {entry.score.toLocaleString()}
                    </div>

                    {/* Stage Completed */}
                    <div className="col-span-2 text-center font-bold text-[11px]">
                      {entry.completedAllStages ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                          3/3 {isBm ? 'Penuh' : 'All'}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {entry.stagesCompleted || 1}/3
                        </span>
                      )}
                    </div>

                    {/* Accuracy */}
                    <div className="col-span-2 text-right font-bold font-mono">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[11px] ${
                          entry.accuracy >= 80
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : entry.accuracy >= 60
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {entry.accuracy}%
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer info & Clear button */}
        <div className="flex items-center justify-between gap-3 text-xs">
          {sortedEntries.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm(isBm ? 'Kosongkan semua rekod papan markah kelas?' : 'Clear all classroom leaderboard records?')) {
                  onClearLeaderboard();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/80 text-slate-400 hover:text-rose-300 border border-white/10 transition-all text-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isBm ? 'Kosongkan Papan' : 'Clear Board'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {isBm ? 'TUTUP' : 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
  );
};
