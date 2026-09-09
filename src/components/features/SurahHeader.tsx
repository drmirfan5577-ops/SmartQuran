import { SURAHS_LIST, MUQATTAAT_SURAHS } from "@/constants/surahs";

interface SurahHeaderProps {
  surahNumber: number;
  showBasmala?: boolean;
}

export default function SurahHeader({ surahNumber, showBasmala = true }: SurahHeaderProps) {
  const surah = SURAHS_LIST.find((s) => s.number === surahNumber);
  if (!surah) return null;

  // Surah 1 (Al-Fatihah): Basmala is its first verse, not a header
  // Surah 9 (At-Tawbah): No Basmala
  const hasBasmala = surahNumber !== 9 && surahNumber !== 1;
  const muqattaatText = MUQATTAAT_SURAHS[surahNumber];

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-5 text-center">
      {/* Surah name */}
      <h1 className="font-arabic text-4xl sm:text-5xl font-bold text-amber-900 text-glow-gold mb-2 leading-tight">
        {surah.name}
      </h1>

      {/* English + Urdu name row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2">
        <span className="font-cinzel text-base font-bold text-amber-700">{surah.englishName}</span>
        <span className="hidden sm:inline text-amber-300">·</span>
        <span className="urdu-text text-base text-amber-800">{surah.urduName}</span>
      </div>

      {/* Meaning */}
      <p className="text-xs text-amber-500 italic mb-4">"{surah.englishMeaning}"</p>

      {/* Stats */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <div className="glass-gold px-3 py-1.5 rounded-xl text-center">
          <p className="text-[10px] text-amber-500">Surah</p>
          <p className="font-cinzel font-bold text-amber-800 text-sm">{surahNumber}</p>
        </div>
        <div className="glass-gold px-3 py-1.5 rounded-xl text-center">
          <p className="text-[10px] text-amber-500">Ayahs — آیات</p>
          <p className="font-cinzel font-bold text-amber-800 text-sm">{surah.ayahs}</p>
        </div>
        <div className="glass-gold px-3 py-1.5 rounded-xl text-center">
          <p className="text-[10px] text-amber-500">Revelation</p>
          <p className="font-cinzel font-bold text-amber-800 text-sm">{surah.type}</p>
        </div>
        {(surah as { juz?: number }).juz && (
          <div className="glass-gold px-3 py-1.5 rounded-xl text-center">
            <p className="text-[10px] text-amber-500">Juz — پارہ</p>
            <p className="font-cinzel font-bold text-amber-800 text-sm">{(surah as { juz?: number }).juz}</p>
          </div>
        )}
      </div>

      {/* Basmala — on its OWN separate line */}
      {showBasmala && hasBasmala && (
        <div className="mt-5 pt-4 border-t border-amber-200/40">
          <p className="basmala-text text-glow-gold text-amber-900 animate-[pulseGlow_3s_ease-in-out_infinite]">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-[10px] text-amber-400 mt-1 font-cinzel">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      )}

      {/* Muqatta'at — on a SEPARATE line AFTER Basmala */}
      {muqattaatText && (
        <div className="mt-4 pt-3 border-t border-amber-200/40">
          <p
            className="font-amiri-quran text-glow-gold text-amber-900 font-bold"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 2, direction: "rtl", textAlign: "center" }}
            dir="rtl"
          >
            {muqattaatText}
          </p>
          <p className="text-[10px] text-amber-400 italic font-cinzel mt-1">
            Muqatta'at (حروف مقطعات) — Separated line as per correct Quran format
          </p>
        </div>
      )}
    </div>
  );
}
