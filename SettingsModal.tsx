import React, { useState } from 'react';
import { X, Settings as SettingsIcon, Volume2, VolumeX, Music, Globe } from 'lucide-react';
import { Language } from '../types/game';
import { soundManager } from '../audio/soundManager';

interface SettingsModalProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  language,
  onChangeLanguage,
  onClose,
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [isMusicEnabled, setIsMusicEnabled] = useState(soundManager.getIsMusicEnabled());
  const [sfxVol, setSfxVol] = useState(70);
  const [musicVol, setMusicVol] = useState(35);

  const isBm = language === 'ms';

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMute(next);
  };

  const handleToggleMusic = () => {
    const next = !isMusicEnabled;
    setIsMusicEnabled(next);
    soundManager.setMusicEnabled(next);
  };

  const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSfxVol(val);
    soundManager.setSfxVolume(val / 100);
  };

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMusicVol(val);
    soundManager.setMusicVolume(val / 100);
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-white/20 rounded-3xl p-6 shadow-2xl text-white relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-400">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight font-['Fredoka'] text-purple-300">
              {isBm ? 'TETAPAN PERMAINAN' : 'GAME SETTINGS'}
            </h2>
            <p className="text-xs text-slate-400">
              {isBm ? 'Ubah bunyi, muzik dan bahasa pilihan' : 'Configure audio and language settings'}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Language Selector */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>{isBm ? 'Bahasa Antara Muka' : 'Language'}</span>
              </span>
              <span className="text-[10px] text-slate-400">Dwi-Bahasa (BM / EN)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onChangeLanguage('ms')}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isBm
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md'
                    : 'bg-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                <span>🇲🇾</span>
                <span>Bahasa Melayu</span>
              </button>
              <button
                onClick={() => onChangeLanguage('en')}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  !isBm
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
          </div>

          {/* SFX Volume */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
                <span>{isBm ? 'Kesan Bunyi (SFX)' : 'Sound Effects (SFX)'}</span>
              </span>
              <button
                onClick={handleToggleMute}
                className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
              >
                {isMuted ? (isBm ? 'BUNYIKAN' : 'UNMUTE') : (isBm ? 'SENYAP' : 'MUTE')}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVol}
              onChange={handleSfxChange}
              disabled={isMuted}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>

          {/* Music Volume */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <span>{isBm ? 'Muzik Latar (BGM)' : 'Background Music'}</span>
              </span>
              <button
                onClick={handleToggleMusic}
                className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
              >
                {isMusicEnabled ? (isBm ? 'MATIKAN' : 'OFF') : (isBm ? 'HIDUPKAN' : 'ON')}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={musicVol}
              onChange={handleMusicChange}
              disabled={!isMusicEnabled || isMuted}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-sm uppercase shadow-lg shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {isBm ? 'SIMPAN & KEMBALI' : 'SAVE & RETURN'}
          </button>
        </div>
      </div>
    </div>
  );
};
