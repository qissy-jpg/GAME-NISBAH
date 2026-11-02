import React from 'react';
import { X, BookOpen, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { Language } from '../types/game';

interface ObjectivesModalProps {
  language: Language;
  onClose: () => void;
}

export const ObjectivesModal: React.FC<ObjectivesModalProps> = ({ language, onClose }) => {
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
          <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-['Fredoka'] text-amber-300">
              {isBm ? 'OBJEKTIF PEMBELAJARAN & DSKP' : 'LEARNING OBJECTIVES & DSKP'}
            </h2>
            <p className="text-xs text-slate-400">
              {isBm
                ? 'Kurikulum Standard Sekolah Menengah (KSSM) Matematik Tingkatan 1'
                : 'Malaysian Secondary School Curriculum (KSSM) Form 1 Mathematics'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs md:text-sm">
          {/* Topik Overview */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>{isBm ? 'SKOP PEMBELAJARAN UTAMA' : 'PRIMARY LEARNING SCOPE'}</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              <b className="text-white">{isBm ? 'Bab 4: Nisbah, Kadar dan Kadaran' : 'Chapter 4: Ratios, Rates and Proportions'}</b>
              <br />
              <span className="text-cyan-300 font-semibold">{isBm ? 'Fokus Standard Kandungan 4.1: Nisbah' : 'Content Standard 4.1 Focus: Ratios'}</span>.
              {isBm
                ? ' Permainan ini direka khusus untuk mengukuhkan konsep asas nisbah tanpa memasukkan topik kadar, peratusan, atau algebra lanjutan, memastikan fokus murid kekal jitu pada pemahaman konsep nisbah.'
                : ' This game is purposefully designed to solidify fundamental ratio understanding without introducing external rates, percentages, or advanced algebra.'}
            </p>
          </div>

          {/* DSKP 4.1.1 */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-extrabold text-xs border border-sky-400/40">
                DSKP 4.1.1
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                {isBm ? 'Tiga Kuantiti' : 'Three Quantities'}
              </span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              {isBm
                ? 'Mewakilkan hubungan antara tiga kuantiti dalam bentuk a : b : c'
                : 'Represent the relationship between three quantities in the form a : b : c'}
            </h4>
            <div className="bg-black/40 p-2.5 rounded-xl text-slate-300 space-y-1">
              <p>
                <b>{isBm ? 'Konsep Utama:' : 'Key Concept:'}</b>{' '}
                {isBm
                  ? 'Nisbah menghubungkan tiga kuantiti yang mempunyai unit ukuran yang sama. Susunan sebutan mestilah mengikut susunan kuantiti yang dinyatakan dalam soalan.'
                  : 'Ratios connect three quantities sharing identical units. Order of terms must strictly follow the order of items stated in the scenario.'}
              </p>
              <p className="text-cyan-300">
                <b>{isBm ? 'Contoh:' : 'Example:'}</b> 4 kapal terbang merah, 6 biru, 8 kuning ➔ 4 : 6 : 8 = <b>2 : 3 : 4</b>.
              </p>
            </div>
          </div>

          {/* DSKP 4.1.2 */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-400/40">
                DSKP 4.1.2
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                {isBm ? 'Nisbah Setara & Termudah' : 'Equivalent & Simplest Ratios'}
              </span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              {isBm
                ? 'Mewakilkan nisbah dua kuantiti (a : b) dan membuat generalisasi tentang nisbah setara serta bentuk termudah'
                : 'Represent ratio of two quantities (a : b), generalize equivalent ratios and simplify to lowest terms'}
            </h4>
            <div className="bg-black/40 p-2.5 rounded-xl text-slate-300 space-y-1">
              <p>
                <b>{isBm ? 'Konsep Utama:' : 'Key Concept:'}</b>{' '}
                {isBm
                  ? 'Nisbah setara diperoleh dengan mendarab atau membahagi kedua-dua sebutan dengan nombor bulat yang sama bukan sifar. Bentuk termudah diperoleh dengan membahagi menggunakan Faktor Sepunya Terbesar (FSTB).'
                  : 'Equivalent ratios are generated by multiplying or dividing both terms by the same non-zero integer. Simplest form is reached by dividing both terms by their Highest Common Factor (HCF).'}
              </p>
              <p className="text-emerald-300">
                <b>{isBm ? 'Contoh:' : 'Example:'}</b> 12 : 18 ➔ FSTB ialah 6 ➔ 12÷6 : 18÷6 = <b>2 : 3</b>.
              </p>
            </div>
          </div>

          {/* DSKP 4.1.3 */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs border border-purple-400/40">
                DSKP 4.1.3
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                {isBm ? 'Menentukan Nisbah Tiga Kuantiti' : 'Combine Two Ratios'}
              </span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              {isBm
                ? 'Menentukan nisbah tiga kuantiti apabila dua atau lebih nisbah dua kuantiti diberi'
                : 'Determine the ratio of three quantities when two or more ratios of two quantities are given'}
            </h4>
            <div className="bg-black/40 p-2.5 rounded-xl text-slate-300 space-y-1">
              <p>
                <b>{isBm ? 'Kaedah:' : 'Method:'}</b>{' '}
                {isBm
                  ? 'Kenal pasti sebutan sepunya yang wujud dalam kedua-dua nisbah. Cari Gandaan Sepunya Terkecil (GSTK) bagi sebutan tersebut dan darabkan nisbah untuk menyelaraskan nilainya sebelum menggabungkan ketiga-tiga sebutan.'
                  : 'Identify the common linking term present in both ratios. Find the Least Common Multiple (LCM) of that shared term, scale both ratios so the shared term matches, then combine.'}
              </p>
              <p className="text-purple-300">
                <b>{isBm ? 'Contoh:' : 'Example:'}</b> Diberi p : q = 2 : 3 dan q : r = 6 : 7. GSTK bagi q (3 & 6) ialah 6. Skalakan nisbah 1: p : q = 4 : 6. Hasil gabungan: <b>4 : 6 : 7</b>.
              </p>
            </div>
          </div>

          {/* Learning Checklist */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
            <h4 className="font-black text-amber-400 uppercase text-xs tracking-wider mb-2">
              {isBm ? 'SENARAI SEMAK PENGUASAAN MURID' : 'STUDENT MASTERY CHECKLIST'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBm ? 'Boleh menulis nisbah dalam bentuk a : b dan a : b : c' : 'Can represent ratios in a : b and a : b : c format'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBm ? 'Boleh menukar nisbah pecahan dan perpuluhan kepada nombor bulat' : 'Can convert fractional & decimal ratios to simplest integers'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBm ? 'Boleh menggabungkan dua nisbah menjadi nisbah 3 kuantiti menggunakan GSTK' : 'Can unite two separate ratios into a 3-quantity ratio via LCM'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm uppercase shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {isBm ? 'TUTUP & KEMBALI' : 'CLOSE & RETURN'}
          </button>
        </div>
      </div>
    </div>
  );
};
