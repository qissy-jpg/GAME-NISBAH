import React from 'react';
import { Play, BookOpen, HelpCircle, Settings as SettingsIcon, Trophy, Sparkles, Award, User, ArrowRight } from 'lucide-react';
import { Language, STAGES_CONFIG } from '../types/game';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  onOpenObjectives: () => void;
  onOpenSettings: () => void;
  onOpenLeaderboard: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  playerName: string;
  onChangePlayerName: (name: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenHowToPlay,
  onOpenObjectives,
  onOpenSettings,
  onOpenLeaderboard,
  language,
  onChangeLanguage,
  playerName,
  onChangePlayerName,
}) => {
  const isBm = language === 'ms';

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-b from-sky-900/60 via-slate-950/75 to-slate-950/90 backdrop-blur-xs select-none overflow-y-auto">
      {/* Top Header: Curriculum Badge & Language Switcher */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-3">
        {/* Curriculum Badge */}
        <div className="flex items-center gap-2 bg-sky-500/20 backdrop-blur-md border border-sky-400/40 px-3.5 py-1.5 rounded-full shadow-lg">
          <Award className="w-4 h-4 text-sky-400" />
          <span className="text-xs md:text-sm font-extrabold text-sky-200 tracking-wider">
            DSKP KSSM MATEMATIK TINGKATAN 1 • BAB 4 (NISBAH)
          </span>
        </div>

        {/* Language Switch */}
        <div className="flex items-center bg-slate-900/80 backdrop-blur-md border border-white/20 p-1 rounded-2xl shadow-lg">
          <button
            onClick={() => onChangeLanguage('ms')}
            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              isBm
                ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇲🇾 BM
          </button>
          <button
            onClick={() => onChangeLanguage('en')}
            className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
              !isBm
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>

      {/* Hero Title & Tagline */}
      <div className="flex flex-col items-center text-center my-auto py-3 max-w-3xl animate-in zoom-in-95 duration-500">
        {/* Mode & Genre Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs md:text-sm mb-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>3D FLIGHT ADVENTURE RUNNER</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-sky-400 drop-shadow-[0_4px_16px_rgba(14,165,233,0.7)] tracking-tight uppercase font-['Fredoka']">
          SKY QUIZ
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 tracking-wider -mt-1 drop-shadow-md uppercase">
          ULTIMATE RATIO CHALLENGE
        </div>

        {/* Tagline */}
        <p className="mt-1 text-sm md:text-base font-bold text-slate-200 max-w-lg italic drop-shadow">
          {isBm
            ? '“Satu Penerbangan. Tiga Cabaran. Menangi Gelaran Juara Nisbah!”'
            : '“One Flight. Three Challenges. Become the Ratio Champion!”'}
        </p>

        {/* Student Name Input */}
        <div className="w-full max-w-md mt-4 bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-md flex items-center gap-2.5">
          <User className="w-4 h-4 text-sky-400 shrink-0" />
          <div className="flex-1 text-left">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              {isBm ? 'Nama Murid / Juruterbang:' : 'Student / Pilot Name:'}
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => onChangePlayerName(e.target.value)}
              placeholder={isBm ? 'Masukkan nama anda...' : 'Enter your name...'}
              maxLength={22}
              className="w-full bg-transparent text-white font-bold text-sm focus:outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* 3-Stage Automatic Progression Roadmap */}
        <div className="w-full max-w-2xl mt-4 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-3xl border border-white/15 shadow-xl">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              {isBm ? 'LALUAN PENERBANGAN 3 PERINGKAT BERTERUSAN' : 'CONTINUOUS 3-STAGE FLIGHT ROADMAP'}
            </span>
            <span className="text-[10px] font-mono text-cyan-300 font-bold">
              {isBm ? '15 Soalan Untuk Menang' : '15 Questions To Win'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-left">
            {/* Stage 1 Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-sky-950/80 to-slate-900/80 border border-sky-400/40 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-white flex items-center gap-1">
                  <span>{STAGES_CONFIG[1].badge}</span>
                  <span>{STAGES_CONFIG[1].name[language]}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">
                  {STAGES_CONFIG[1].difficultyLabel[language]}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2">
                {STAGES_CONFIG[1].topics[language]}
              </p>
              <div className="mt-2 text-[10px] font-black text-amber-300 font-mono">
                {isBm ? '✓ Sasaran: 5 Betul' : '✓ Goal: 5 Correct'}
              </div>
            </div>

            {/* Stage 2 Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-indigo-950/80 to-slate-900/80 border border-indigo-400/40 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-white flex items-center gap-1">
                  <span>{STAGES_CONFIG[2].badge}</span>
                  <span>{STAGES_CONFIG[2].name[language]}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                  {STAGES_CONFIG[2].difficultyLabel[language]}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2">
                {STAGES_CONFIG[2].topics[language]}
              </p>
              <div className="mt-2 text-[10px] font-black text-amber-300 font-mono">
                {isBm ? '✓ Sasaran: 5 Betul' : '✓ Goal: 5 Correct'}
              </div>
            </div>

            {/* Stage 3 Card */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-950/80 to-slate-900/80 border border-amber-400/40 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-white flex items-center gap-1">
                  <span>{STAGES_CONFIG[3].badge}</span>
                  <span>{STAGES_CONFIG[3].name[language]}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                  {STAGES_CONFIG[3].difficultyLabel[language]}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2">
                {STAGES_CONFIG[3].topics[language]}
              </p>
              <div className="mt-2 text-[10px] font-black text-amber-300 font-mono">
                {isBm ? '✓ Sasaran: 5 Betul' : '✓ Goal: 5 Correct'}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Start Game CTA Button */}
        <button
          onClick={onStartGame}
          className="group mt-5 w-full max-w-md py-4 px-8 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-950 font-black text-xl md:text-2xl shadow-[0_0_35px_rgba(251,191,36,0.6)] hover:shadow-[0_0_55px_rgba(251,191,36,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-white/60 cursor-pointer"
        >
          <Play className="w-7 h-7 fill-slate-950 group-hover:translate-x-1 transition-transform" />
          <span>{isBm ? 'MULA PENGEMBARAAN' : 'START ADVENTURE'}</span>
        </button>
      </div>

      {/* Bottom Nav Buttons */}
      <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <button
          onClick={onOpenLeaderboard}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/40 text-amber-300 font-black text-xs md:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>{isBm ? 'Papan Markah' : 'Leaderboard'}</span>
        </button>

        <button
          onClick={onOpenHowToPlay}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-200 font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <span>{isBm ? 'Cara Bermain' : 'How To Play'}</span>
        </button>

        <button
          onClick={onOpenObjectives}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-200 font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>{isBm ? 'Objektif DSKP' : 'Curriculum'}</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-slate-200 font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <SettingsIcon className="w-4 h-4 text-purple-400" />
          <span>{isBm ? 'Tetapan' : 'Settings'}</span>
        </button>
      </div>
    </div>
  );
};
