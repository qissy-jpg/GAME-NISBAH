import React from 'react';
import { Play, RotateCcw, Home, Volume2, VolumeX, Music } from 'lucide-react';
import { Language } from '../types/game';

interface PauseModalProps {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isMusicEnabled: boolean;
  onToggleMusic: () => void;
  language: Language;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestart,
  onMainMenu,
  isMuted,
  onToggleMute,
  isMusicEnabled,
  onToggleMusic,
  language,
}) => {
  const isBm = language === 'ms';

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-white/20 rounded-3xl p-6 shadow-2xl text-white text-center animate-in zoom-in-95 duration-200">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-2 font-['Fredoka'] text-sky-400">
          {isBm ? 'PERMAINAN DIJEDA' : 'GAME PAUSED'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          {isBm ? 'Tarik nafas dan bersedia untuk sambung terbang!' : 'Take a breath and get ready to fly!'}
        </p>

        {/* Audio Quick Toggles */}
        <div className="flex items-center justify-center gap-3 mb-6 bg-slate-800/80 p-2.5 rounded-2xl border border-white/10">
          <button
            onClick={onToggleMute}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isMuted ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40' : 'bg-slate-700/50 text-slate-400'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>SFX</span>
          </button>

          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isMusicEnabled ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'bg-slate-700/50 text-slate-400'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>{isBm ? 'Muzik' : 'BGM'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onResume}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm md:text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{isBm ? 'SAMBUNG PERMAINAN' : 'RESUME'}</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm md:text-base border border-white/15 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{isBm ? 'MULA SEMULA' : 'RESTART'}</span>
          </button>

          <button
            onClick={onMainMenu}
            className="w-full py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm md:text-base border border-white/15 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span>{isBm ? 'MENU UTAMA' : 'MAIN MENU'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
