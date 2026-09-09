import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Settings2, ChevronLeft, ChevronRight, ArrowUp, Heart,
  Loader2, Maximize2, Minimize2, BookOpen, Search,
  Layers, ChevronDown
} from "lucide-react";
import { useQuranData } from "@/hooks/useQuranData";
import { useSettings } from "@/hooks/useSettings";
import { SURAHS_LIST, MUQATTAAT_SURAHS } from "@/constants/surahs";
import { BACKGROUNDS } from "@/constants/backgrounds";
import SparkleBackground from "@/components/features/SparkleBackground";
import SurahHeader from "@/components/features/SurahHeader";
import VerseCard from "@/components/features/VerseCard";
import AudioPlayer from "@/components/features/AudioPlayer";
import SettingsPanel from "@/components/features/SettingsPanel";
import { toast } from "sonner";

// Juz/Para data
const JUZ_DATA: { juz: number; surah: number; ayah: number; name: string }[] = [
  { juz: 1, surah: 1, ayah: 1, name: "الم ذلك" }, { juz: 2, surah: 2, ayah: 142, name: "سيقول السفهاء" },
  { juz: 3, surah: 2, ayah: 253, name: "تلك الرسل" }, { juz: 4, surah: 3, ayah: 93, name: "لن تنالوا" },
  { juz: 5, surah: 4, ayah: 24, name: "والمحصنات" }, { juz: 6, surah: 4, ayah: 148, name: "لا يحب الله" },
  { juz: 7, surah: 5, ayah: 83, name: "وإذا سمعوا" }, { juz: 8, surah: 6, ayah: 111, name: "ولو أننا" },
  { juz: 9, surah: 7, ayah: 88, name: "قال الملأ" }, { juz: 10, surah: 8, ayah: 41, name: "واعلموا" },
  { juz: 11, surah: 9, ayah: 93, name: "إنما السبيل" }, { juz: 12, surah: 11, ayah: 6, name: "وما من دابة" },
  { juz: 13, surah: 12, ayah: 53, name: "وما أبرئ نفسي" }, { juz: 14, surah: 15, ayah: 1, name: "الر" },
  { juz: 15, surah: 17, ayah: 1, name: "سبحان الذي" }, { juz: 16, surah: 18, ayah: 75, name: "قال ألم أقل" },
  { juz: 17, surah: 21, ayah: 1, name: "اقترب" }, { juz: 18, surah: 23, ayah: 1, name: "قد أفلح" },
  { juz: 19, surah: 25, ayah: 21, name: "وقال الذين" }, { juz: 20, surah: 27, ayah: 56, name: "فما كان جواب" },
  { juz: 21, surah: 29, ayah: 46, name: "ولا تجادلوا" }, { juz: 22, surah: 33, ayah: 31, name: "ومن يقنت" },
  { juz: 23, surah: 36, ayah: 28, name: "وما أنزلنا" }, { juz: 24, surah: 39, ayah: 32, name: "فمن أظلم" },
  { juz: 25, surah: 41, ayah: 47, name: "إليه يرد" }, { juz: 26, surah: 46, ayah: 1, name: "حم" },
  { juz: 27, surah: 51, ayah: 31, name: "قال فما خطبكم" }, { juz: 28, surah: 58, ayah: 1, name: "قد سمع" },
  { juz: 29, surah: 67, ayah: 1, name: "تبارك" }, { juz: 30, surah: 78, ayah: 1, name: "عم يتساءلون" },
];

export default function QuranReaderPage() {
  const { surahId } = useParams<{ surahId: string }>();
  const navigate = useNavigate();
  const surahNumber = parseInt(surahId || "1", 10);

  const { settings, updateSettings, updateBgSettings, updateTextSettings, toggleFavorite, savePosition } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [jumpTo, setJumpTo] = useState("");
  const [showJump, setShowJump] = useState(false);
  const [showParaNav, setShowParaNav] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const surahInfo = SURAHS_LIST.find((s) => s.number === surahNumber);
  const bg = BACKGROUNDS.find((b) => b.id === settings.backgroundId) || BACKGROUNDS[0];
  const bgEff = settings.bgSettings;
  const txt = settings.textSettings;

  const { arabic, trans1, trans2, tafseer, loading, error, refetch } = useQuranData(
    surahNumber,
    settings.translation1Id,
    settings.translation2Id,
    settings.showTafseer ? settings.tafseerTranslationId : undefined
  );

  // Font size class
  const fontSizeMap: Record<string, string> = {
    small: "quran-text-small",
    medium: "quran-text-medium",
    large: "quran-text-large",
    xlarge: "quran-text-xlarge",
  };

  // Urdu font size
  const urduSizeMap: Record<string, string> = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  // Line height
  const lineHeightMap: Record<string, string> = {
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Save position
  useEffect(() => {
    savePosition(surahNumber, currentAyah);
  }, [surahNumber, currentAyah, savePosition]);

  // Restore last position
  useEffect(() => {
    if (settings.lastSurah === surahNumber && settings.lastVerse > 1) {
      setTimeout(() => {
        const el = document.getElementById(`ayah-${settings.lastVerse}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        setCurrentAyah(settings.lastVerse);
      }, 800);
    }
  }, [surahNumber]);

  // Auto scroll
  useEffect(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    if (settings.autoScroll) {
      const speed = Math.max(1, 11 - settings.scrollSpeed) * 75;
      autoScrollRef.current = setInterval(() => {
        window.scrollBy({ top: 1, behavior: "auto" });
      }, speed);
    }
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [settings.autoScroll, settings.scrollSpeed]);

  const handleVerseClick = useCallback((ayah: number) => setCurrentAyah(ayah), []);

  const handlePlayAyah = useCallback((ayah: number) => {
    setCurrentAyah(ayah);
    setPlayingAyah(ayah);
    const el = document.getElementById(`ayah-${ayah}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleJumpToVerse = () => {
    const num = parseInt(jumpTo, 10);
    if (num >= 1 && num <= (surahInfo?.ayahs || 1)) {
      setCurrentAyah(num);
      const el = document.getElementById(`ayah-${num}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      setShowJump(false);
      setJumpTo("");
    } else {
      toast.error(`Valid range: 1–${surahInfo?.ayahs}`);
    }
  };

  const isSurahFav = settings.favorites.includes(surahNumber);

  const goTo = (dir: "prev" | "next") => {
    const next = dir === "prev" ? surahNumber - 1 : surahNumber + 1;
    if (next >= 1 && next <= 114) {
      navigate(`/read/${next}`);
      window.scrollTo(0, 0);
      setCurrentAyah(1);
      setPlayingAyah(null);
    }
  };

  // Show modes
  const showArabic = settings.displayMode !== "urdu-only";
  const showUrduTrans = ["arabic-urdu", "arabic-urdu-tafseer", "urdu-only"].includes(settings.displayMode);

  // Text inline styles
  const arabicStyle = {
    fontWeight: txt.arabicBold ? 700 : 400,
    color: txt.arabicColor || undefined,
  };

  // Mushaf mode: show 15 per page
  const MUSHAF_PAGE_SIZE = 15;
  const [mushafPage, setMushafPage] = useState(1);
  const isMushaf = settings.displayMode === "mushaf" || settings.mushafMode;
  const mushafAyahs = arabic?.ayahs.slice((mushafPage - 1) * MUSHAF_PAGE_SIZE, mushafPage * MUSHAF_PAGE_SIZE);
  const mushafTotalPages = arabic ? Math.ceil(arabic.ayahs.length / MUSHAF_PAGE_SIZE) : 1;

  return (
    <div className={`min-h-screen relative ${fullscreen ? "" : "pt-16"} ${bgEff.enabled ? bg.cssClass : "bg-crystal-white"}`}>
      {bgEff.enabled && <SparkleBackground bgId={bg.id} bgSettings={bgEff} />}

      {/* Floating control strip (always visible) */}
      <div className="floating-controls">
        <button className="float-btn" onClick={() => setShowSettings(true)} title="Settings | ترتیبات">
          <Settings2 size={15} />
        </button>
        <button className="float-btn" onClick={() => setFullscreen(!fullscreen)} title="Fullscreen | مکمل اسکرین">
          {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        <button className={`float-btn ${settings.showTranslation1 ? "active" : ""}`}
          onClick={() => updateSettings({ showTranslation1: !settings.showTranslation1 })}
          title="Toggle Translation | ترجمہ">
          <span className="font-arabic text-sm">ت</span>
        </button>
        <button className={`float-btn ${settings.showTafseer ? "active" : ""}`}
          onClick={() => updateSettings({ showTafseer: !settings.showTafseer })}
          title="Toggle Tafseer | تفسیر">
          <span className="font-arabic text-sm">تف</span>
        </button>
        <button className="float-btn" onClick={() => setShowJump(!showJump)} title="Jump to Verse | آیت پر جائیں">
          <Search size={13} />
        </button>
        <button className={`float-btn ${settings.autoScroll ? "active" : ""}`}
          onClick={() => updateSettings({ autoScroll: !settings.autoScroll })}
          title="Auto Scroll | خودکار اسکرول">
          <span style={{ fontSize: 10 }}>▼▼</span>
        </button>
        <button className="float-btn" onClick={() => navigate("/surahs")} title="All Surahs | تمام سورتیں">
          <BookOpen size={13} />
        </button>
        <button className="float-btn" onClick={() => setShowParaNav(!showParaNav)} title="Para/Juz | پارہ">
          <Layers size={13} />
        </button>
        <button className={`float-btn ${isSurahFav ? "active" : ""}`}
          onClick={() => toggleFavorite(surahNumber)}
          title="Favorite | پسندیدہ">
          <Heart size={13} fill={isSurahFav ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Jump to verse */}
      {showJump && (
        <div className="fixed top-20 right-16 z-50 glass-panel rounded-xl p-3 shadow-xl w-54 border border-white/60">
          <p className="text-xs font-cinzel text-amber-700 mb-2">Jump to Ayah — آیت پر جائیں</p>
          <div className="flex gap-2">
            <input type="number" min={1} max={surahInfo?.ayahs || 1}
              value={jumpTo} onChange={(e) => setJumpTo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJumpToVerse()}
              placeholder={`1–${surahInfo?.ayahs}`}
              className="flex-1 px-2 py-1.5 bg-white/80 border border-amber-200 rounded-lg text-sm text-amber-800 outline-none focus:ring-2 focus:ring-yellow-400" />
            <button onClick={handleJumpToVerse} className="btn-gold px-3 py-1.5 rounded-lg text-xs font-bold">Go</button>
          </div>
        </div>
      )}

      {/* Para / Juz Navigation panel */}
      {showParaNav && (
        <div className="fixed top-20 right-16 z-50 glass-panel rounded-xl p-3 shadow-xl w-64 border border-white/60 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-cinzel text-amber-700 font-bold">Para / Juz — پارہ</p>
            <button onClick={() => setShowParaNav(false)} className="text-amber-600 hover:text-amber-900 text-xs">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {JUZ_DATA.map((j) => (
              <button key={j.juz}
                onClick={() => {
                  navigate(`/read/${j.surah}`);
                  setShowParaNav(false);
                  setTimeout(() => {
                    if (j.ayah > 1) {
                      const el = document.getElementById(`ayah-${j.ayah}`);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 800);
                }}
                className="glass-gold px-2 py-2 rounded-lg text-left hover:btn-gold transition-all">
                <p className="text-[10px] font-cinzel text-amber-700 font-bold">Para {j.juz}</p>
                <p className="font-arabic text-xs text-amber-800 truncate">{j.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reader content */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-4 py-6 pb-40">
        {/* Top nav bar */}
        <div className="glass-panel rounded-2xl px-3 py-2.5 mb-4 flex items-center justify-between gap-2">
          <button onClick={() => goTo("prev")} disabled={surahNumber <= 1}
            className="btn-gold px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 disabled:opacity-40 min-h-[44px]">
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button onClick={() => navigate("/surahs")} className="flex-1 text-center min-w-0">
            <p className="font-arabic text-xl font-bold text-amber-900 leading-tight">{surahInfo?.name || `Surah ${surahNumber}`}</p>
            <p className="text-[10px] font-cinzel text-amber-600">{surahInfo?.englishName} · {surahNumber}/114</p>
          </button>

          <button onClick={() => goTo("next")} disabled={surahNumber >= 114}
            className="btn-gold px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 disabled:opacity-40 min-h-[44px]">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Surah header — Basmala and Muqatta'at already on separate lines inside */}
        <SurahHeader surahNumber={surahNumber} showBasmala={showArabic} />

        {/* Loading */}
        {loading && (
          <div className="glass-panel rounded-2xl p-16 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
            <p className="font-arabic text-xl text-amber-700">جاري التحميل...</p>
            <p className="text-amber-500 text-sm mt-1">Loading from alquran.cloud...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass-panel rounded-2xl p-8 text-center">
            <p className="text-red-600 font-semibold mb-2">⚠️ Failed to load Quran data</p>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button onClick={refetch} className="btn-gold px-4 py-2 rounded-xl text-sm font-semibold">Retry — دوبارہ</button>
          </div>
        )}

        {/* === MUSHAF MODE === */}
        {!loading && !error && arabic && isMushaf && (
          <div>
            <div className="glass-panel rounded-2xl p-5 mb-4">
              <p className="font-cinzel text-xs text-amber-500 text-center mb-3">
                📖 Mushaf Mode — صفحہ {mushafPage}/{mushafTotalPages}
              </p>
              <div className="text-right" dir="rtl">
                {mushafAyahs?.map((ayah) => (
                  <span key={ayah.numberInSurah} className="inline">
                    <span
                      className={`font-amiri-quran ${fontSizeMap[txt.arabicFontSize]} leading-loose`}
                      style={arabicStyle}
                    >
                      {ayah.text}
                    </span>
                    <span className="inline-flex items-center justify-center mx-1 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-[9px] font-bold text-white">
                      {ayah.numberInSurah}
                    </span>
                    {" "}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-amber-200/40">
                <button disabled={mushafPage <= 1} onClick={() => setMushafPage(p => p - 1)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-40">
                  ← Prev Page
                </button>
                <span className="text-xs font-cinzel text-amber-600">Page {mushafPage}/{mushafTotalPages}</span>
                <button disabled={mushafPage >= mushafTotalPages} onClick={() => setMushafPage(p => p + 1)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-40">
                  Next Page →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === NORMAL VERSE MODE: Each ayah on separate line === */}
        {!loading && !error && arabic && !isMushaf && (
          <div className="space-y-1">
            {arabic.ayahs.map((ayah) => {
              const t1 = trans1?.ayahs.find((a) => a.numberInSurah === ayah.numberInSurah)?.text;
              const t2 = trans2?.ayahs.find((a) => a.numberInSurah === ayah.numberInSurah)?.text;
              const tf = tafseer?.ayahs.find((a) => a.numberInSurah === ayah.numberInSurah)?.text;

              return (
                <div key={ayah.number} style={{ display: "block" }}>
                  <VerseCard
                    surahNumber={surahNumber}
                    ayahNumber={ayah.numberInSurah}
                    arabicText={showArabic ? ayah.text : ""}
                    translation1Text={t1}
                    translation2Text={t2}
                    tafseerText={tf}
                    translation1Id={settings.translation1Id}
                    translation2Id={settings.translation2Id}
                    tafseerTranslationId={settings.tafseerTranslationId}
                    showTranslation1={showUrduTrans ? settings.showTranslation1 : false}
                    showTranslation2={settings.showTranslation2}
                    showTafseer={settings.showTafseer}
                    showVerseNumber={settings.showVerseNumbers}
                    isActive={currentAyah === ayah.numberInSurah}
                    isPlaying={playingAyah === ayah.numberInSurah}
                    isFavorite={isSurahFav}
                    fontSizeClass={fontSizeMap[txt.arabicFontSize]}
                    arabicFont={txt.arabicFont}
                    ayahColorMode={settings.ayahColorMode}
                    showTajweedHighlight={settings.showTajweedHighlight}
                    onFavoriteToggle={() => toggleFavorite(surahNumber)}
                    onPlayAyah={handlePlayAyah}
                    onVerseClick={handleVerseClick}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom nav */}
        {!loading && (
          <div className="flex justify-between mt-8 mb-4 gap-4">
            <button onClick={() => goTo("prev")} disabled={surahNumber <= 1}
              className="btn-gold px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 disabled:opacity-40 shadow-md flex-1">
              <ChevronLeft size={17} />
              <div className="text-left">
                <div className="text-[10px] opacity-70">Prev Surah</div>
                <div className="text-xs truncate">{surahNumber > 1 ? SURAHS_LIST[surahNumber - 2]?.englishName : "—"}</div>
              </div>
            </button>
            <button onClick={() => navigate("/surahs")} className="btn-emerald px-4 py-3 rounded-2xl font-semibold flex items-center gap-1.5 shadow-md">
              <BookOpen size={15} />
              <span className="text-xs hidden sm:inline">All</span>
            </button>
            <button onClick={() => goTo("next")} disabled={surahNumber >= 114}
              className="btn-gold px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 disabled:opacity-40 shadow-md flex-1 justify-end">
              <div className="text-right">
                <div className="text-[10px] opacity-70">Next Surah</div>
                <div className="text-xs truncate">{surahNumber < 114 ? SURAHS_LIST[surahNumber]?.englishName : "—"}</div>
              </div>
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>

      {/* Sticky audio player */}
      {surahInfo && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3">
          <div className="max-w-3xl mx-auto">
            <AudioPlayer
              surahNumber={surahNumber}
              totalAyahs={surahInfo.ayahs}
              currentAyah={currentAyah}
              reciterId={settings.selectedReciter}
              audioWithTranslation={settings.audioWithTranslation}
              onAyahChange={(a) => {
                setCurrentAyah(a);
                setPlayingAyah(a);
                const el = document.getElementById(`ayah-${a}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              onReciterChange={(id) => updateSettings({ selectedReciter: id })}
              onToggleAudioTranslation={() => updateSettings({ audioWithTranslation: !settings.audioWithTranslation })}
            />
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-28 right-4 z-50 btn-gold w-11 h-11 rounded-full shadow-xl flex items-center justify-center animate-[float_3s_ease-in-out_infinite]"
          aria-label="Scroll to top">
          ↑
        </button>
      )}

      {/* Settings panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onUpdate={updateSettings}
          onUpdateBg={updateBgSettings}
          onUpdateText={updateTextSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
