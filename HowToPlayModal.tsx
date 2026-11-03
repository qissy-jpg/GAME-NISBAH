import React from 'react';
import { X, Gamepad2, Smartphone, HelpCircle, Shield, Sparkles, Zap, Flame, Trophy, Crown } from 'lucide-react';
import { Language } from '../types/game';

interface HowToPlayModalProps {
  language: Language;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ language, onClose }) => {
  const isBm = language === 'ms';

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none overflow-y-auto">
      <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-white/20 rounded-3xl p-5 md:p-7 shadow-2xl text-white relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-['Fredoka'] text-sky-300">
              {isBm ? 'PANDUAN & CARA BERMAIN' : 'HOW TO PLAY'}
            </h2>
            <p className="text-xs text-slate-400">
              {isBm
                ? 'Kuasai 3 cabaran penerbangan berturutan untuk menjuarai gelaran Juara Nisbah!'
                : 'Conquer the 3 sequential flight stages to earn the title of Ratio Champion!'}
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs md:text-sm">
          {/* 1. Cabaran 3 Peringkat Berterusan */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-800/80 to-indigo-950/60 border border-amber-400/30 rounded-2xl p-4">
            <h3 className="font-black text-amber-300 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{isBm ? 'STRUKTUR PERMAINAN: 1 PENERBANGAN, 3 PERINGKAT' : 'GAMEPLAY: 1 FLIGHT, 3 PROGRESSIVE STAGES'}</span>
            </h3>
            <p className="text-slate-200 leading-relaxed mb-2.5">
              {isBm
                ? 'Permainan ini merupakan satu pengembaraan berterusan. Anda akan mara secara automatik merentasi 3 peringkat dengan menjawab 5 soalan betul bagi setiap peringkat (Jumlah 15 soalan betul untuk menang):'
                : 'This game is one continuous adventure. You advance automatically through 3 difficulty stages by answering 5 questions correctly per stage (Total 15 correct to win):'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-sky-950/70 border border-sky-400/30">
                <span className="font-black text-sky-300 block mb-0.5">🔰 P1: Sky Cadet (Easy)</span>
                <span className="text-[11px] text-slate-300">Nisbah 2 kuantiti (a:b) & bentuk termudah (FSTB). 5 betul.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-950/70 border border-indigo-400/30">
                <span className="font-black text-indigo-300 block mb-0.5">⭐ P2: Sky Navigator (Med)</span>
                <span className="text-[11px] text-slate-300">Nisbah setara & 3 kuantiti (a:b:c). 5 betul.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-400/30">
                <span className="font-black text-amber-300 block mb-0.5">👑 P3: Ratio Ace (Hard)</span>
                <span className="text-[11px] text-slate-300">Gabungan nisbah via GSTK/LCM & KBAT. 5 betul.</span>
              </div>
            </div>
          </div>

          {/* 2. Kawalan Pemain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Komputer */}
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
              <div className="font-black text-cyan-300 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>{isBm ? 'KAWALAN KOMPUTER (KEYBOARD)' : 'KEYBOARD CONTROLS'}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><b className="text-white">A / ◀:</b> {isBm ? 'Tukar lorong ke Kiri' : 'Move Left'}</li>
                <li><b className="text-white">D / ▶:</b> {isBm ? 'Tukar lorong ke Kanan' : 'Move Right'}</li>
                <li><b className="text-white">W / ▲:</b> {isBm ? 'Terbang Naik (Climb)' : 'Climb Up'}</li>
                <li><b className="text-white">S / ▼:</b> {isBm ? 'Terbang Turun (Dive)' : 'Dive Down'}</li>
                <li><b className="text-white">SPACEBAR:</b> {isBm ? 'Aktifkan Boost Laju' : 'Activate Speed Boost'}</li>
                <li><b className="text-white">ESC:</b> {isBm ? 'Jeda Permainan' : 'Pause Game'}</li>
              </ul>
            </div>

            {/* Telefon & Tablet */}
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
              <div className="font-black text-emerald-300 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>{isBm ? 'KAWALAN SKRIN SENTUH / TELEFON' : 'TOUCH & MOBILE CONTROLS'}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><b className="text-white">{isBm ? 'Leret Kiri / Kanan:' : 'Swipe Left / Right:'}</b> {isBm ? 'Tukar lorong pantas' : 'Switch lanes'}</li>
                <li><b className="text-white">{isBm ? 'Leret Atas / Bawah:' : 'Swipe Up / Down:'}</b> {isBm ? 'Naik / turun ketinggian' : 'Adjust altitude'}</li>
                <li><b className="text-white">{isBm ? 'Pad Butang Sentuh:' : 'D-Pad Buttons:'}</b> {isBm ? 'Gunakan butang anak panah di skrin' : 'Use on-screen arrows'}</li>
                <li><b className="text-white">{isBm ? 'Butang Boost:' : 'Boost Button:'}</b> {isBm ? 'Sentuh butang BOOST apabila penuh' : 'Tap BOOST when charged'}</li>
              </ul>
            </div>
          </div>

          {/* 3. Sistem Pemarkahan & Nyawa */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <h3 className="font-black text-rose-300 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>{isBm ? 'SISTEM PEMARKAHAN & NYAWA' : 'SCORING & LIFE SYSTEM'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div>
                <p className="mb-1"><b className="text-emerald-400">✓ {isBm ? 'Jawapan Betul:' : 'Correct Answer:'}</b> +100 mata (+20 bonus pantas, +50 bonus streak 3x, +100 bonus streak 5x).</p>
                <p className="mb-1"><b className="text-amber-400">💡 {isBm ? 'Jawapan Salah:' : 'Wrong Answer:'}</b> -30 mata, streak reset, <span className="underline">tiada nyawa ditolak</span>, terus terbang!</p>
                <p><b className="text-cyan-400">🏁 {isBm ? 'Selesai Peringkat:' : 'Stage Cleared:'}</b> +100 mata bonus setiap peringkat.</p>
              </div>
              <div>
                <p className="mb-1"><b className="text-rose-400">⚡ {isBm ? 'Langgar Halangan:' : 'Obstacle Collision:'}</b> -20 mata & tolak 1 nyawa (2 saat kebal sementara).</p>
                <p className="mb-1"><b className="text-amber-300">🪙 {isBm ? 'Syiling & Kristal:' : 'Coins & Crystals:'}</b> Syiling (+10 mata), Kristal (+20 mata).</p>
                <p><b className="text-yellow-400">👑 {isBm ? 'Juara Nisbah:' : 'Ratio Champion:'}</b> Tamatkan 3 peringkat (15 betul) untuk kemenangan mutlak!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="py-3 px-8 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm uppercase shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {isBm ? 'FAHAM, MARI TERBANG!' : 'UNDERSTOOD, LET’S FLY!'}
          </button>
        </div>
      </div>
    </div>
  );
};
