import { memo, useRef } from "react";
import { Volume2, Bookmark, BookmarkCheck, Share2, Download, Star } from "lucide-react";
import { toArabicNumerals } from "@/lib/utils";
import { TRANSLATIONS, TAFASEER } from "@/constants/translations";
import { SAJDA_VERSES } from "@/constants/sajda";
import type { AyahColorMode, FontFamily } from "@/types/quran";
import { toast } from "sonner";

interface VerseCardProps {
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation1Text?: string;
  translation2Text?: string;
  tafseerText?: string;
  translation1Id: string;
  translation2Id: string;
  tafseerTranslationId?: string;
  showTranslation1: boolean;
  showTranslation2: boolean;
  showTafseer?: boolean;
  showVerseNumber: boolean;
  isActive: boolean;
  isPlaying: boolean;
  isFavorite: boolean;
  fontSizeClass: string;
  arabicFont: FontFamily;
  ayahColorMode: AyahColorMode;
  showTajweedHighlight?: boolean;
  onFavoriteToggle: (ayah: number) => void;
  onPlayAyah: (ayah: number) => void;
  onVerseClick: (ayah: number) => void;
}

const AYAH_COLORS = [
  "text-green-800", "text-red-800", "text-blue-800",
  "text-pink-800", "text-amber-800", "text-teal-800",
  "text-purple-800", "text-orange-800", "text-cyan-800", "text-indigo-900",
];

const FONT_CLASSES: Record<FontFamily, string> = {
  "amiri-quran": "font-amiri-quran",
  "scheherazade": "font-scheherazade",
  "noto-naskh": "font-noto-naskh",
  "uthmani": "font-uthmani",
  "hafs": "font-hafs",
};

// Tajweed rules: color specific letter combinations
function applyTajweedHighlight(text: string): React.ReactNode {
  if (!text) return text;
  // Simplified visual tajweed coloring by detecting common patterns
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  // Shaddah letters (bold amber)
  remaining = remaining.replace(/([^\s\u0020-\u007E]{1,4}ّ)/g, (m) =>
    `<shd>${m}</shd>`
  );
  // Split and color
  const tokens = remaining.split(/(<shd>.*?<\/shd>)/g);
  tokens.forEach((tok) => {
    if (tok.startsWith("<shd>")) {
      parts.push(
        <span key={key++} className="tajweed-shaddah">{tok.replace(/<\/?shd>/g, "")}</span>
      );
    } else if (tok) {
      parts.push(<span key={key++}>{tok}</span>);
    }
  });
  return parts.length ? parts : text;
}

function getTranslationMeta(id: string) {
  return TRANSLATIONS.find((t) => t.id === id) || TAFASEER.find((t) => t.id === id);
}

const VerseCard = memo(function VerseCard({
  surahNumber, ayahNumber, arabicText,
  translation1Text, translation2Text, tafseerText,
  translation1Id, translation2Id, tafseerTranslationId,
  showTranslation1, showTranslation2, showTafseer,
  showVerseNumber, isActive, isPlaying, isFavorite,
  fontSizeClass, arabicFont, ayahColorMode, showTajweedHighlight,
  onFavoriteToggle, onPlayAyah, onVerseClick,
}: VerseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const t1Meta = getTranslationMeta(translation1Id);
  const t2Meta = getTranslationMeta(translation2Id);
  const tafseerMeta = tafseerTranslationId ? getTranslationMeta(tafseerTranslationId) : null;
  const isSajda = SAJDA_VERSES.some(s => s.surah === surahNumber && s.ayah === ayahNumber);

  const colorClass = ayahColorMode === "multicolor"
    ? AYAH_COLORS[(ayahNumber - 1) % AYAH_COLORS.length]
    : "text-gray-900";

  const fontClass = FONT_CLASSES[arabicFont] || "font-amiri-quran";

  // Share verse as text
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `${arabicText}\n\n${translation1Text || ""}\n\n— Surah ${surahNumber}, Ayah ${ayahNumber}\nSMART WORLD ORDER Digital Quran`;
    if (navigator.share) {
      await navigator.share({ text: shareText, title: `Quran ${surahNumber}:${ayahNumber}` });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      toast.success("Verse copied to clipboard! — آیت کاپی ہو گئی");
    }
  };

  // Export verse as image card using canvas
  const handleExportImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 520;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 900, 520);
    grad.addColorStop(0, "#fff8e1");
    grad.addColorStop(0.5, "#ffe082");
    grad.addColorStop(1, "#fff9c4");
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, 900, 520, 24);
    ctx.fill();

    // Gold border
    ctx.strokeStyle = "#ffc107";
    ctx.lineWidth = 4;
    ctx.roundRect(8, 8, 884, 504, 20);
    ctx.stroke();

    // Inner glow ring
    ctx.strokeStyle = "rgba(255,193,7,0.3)";
    ctx.lineWidth = 2;
    ctx.roundRect(16, 16, 868, 488, 18);
    ctx.stroke();

    // Header
    ctx.fillStyle = "#78350f";
    ctx.font = "bold 16px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("SMART WORLD ORDER — E-Smart Digital Quran", 450, 44);

    // Surah:Ayah badge
    ctx.fillStyle = "#ffc107";
    ctx.roundRect(350, 54, 200, 28, 14);
    ctx.fill();
    ctx.fillStyle = "#1a0a00";
    ctx.font = "bold 13px 'Cinzel', serif";
    ctx.fillText(`Surah ${surahNumber} — Ayah ${ayahNumber}`, 450, 73);

    // Arabic text (RTL)
    ctx.fillStyle = "#4a1c00";
    ctx.font = `bold 38px 'Amiri Quran', 'Arial Unicode MS', serif`;
    ctx.textAlign = "right";
    ctx.direction = "rtl";
    // Word wrap for arabic text
    const words = arabicText.split(" ");
    let line = "";
    let y = 130;
    const maxWidth = 820;
    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, 860, y);
        line = word;
        y += 54;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 860, y);

    // Divider
    ctx.strokeStyle = "rgba(255,193,7,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, y + 30);
    ctx.lineTo(850, y + 30);
    ctx.stroke();

    // Translation
    if (translation1Text) {
      ctx.fillStyle = "#713f12";
      ctx.font = "22px 'Noto Sans', Arial, sans-serif";
      ctx.textAlign = "right";
      ctx.direction = "rtl";
      const tWords = translation1Text.split(" ");
      let tLine = "";
      let ty = y + 68;
      for (const w of tWords) {
        const test = tLine ? tLine + " " + w : w;
        if (ctx.measureText(test).width > maxWidth && tLine) {
          ctx.fillText(tLine, 860, ty);
          tLine = w;
          ty += 34;
        } else {
          tLine = test;
        }
      }
      if (tLine) ctx.fillText(tLine, 860, ty);
    }

    // Footer
    ctx.fillStyle = "#d97706";
    ctx.font = "13px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.direction = "ltr";
    ctx.fillText("dr.mirfan5577@gmail.com | SMART WORLD ORDER Global Platform", 450, 496);

    // Download
    const link = document.createElement("a");
    link.download = `quran-${surahNumber}-${ayahNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Verse image saved! — آیت کی تصویر محفوظ ہو گئی");
  };

  return (
    <div
      id={`ayah-${ayahNumber}`}
      ref={cardRef}
      className={`group relative rounded-2xl p-4 sm:p-5 mb-3 transition-all duration-300 cursor-pointer
        ${isPlaying ? "verse-playing" : isActive ? "verse-active" : "glass-panel hover:bg-white/35 hover:shadow-lg"}
        ${isSajda ? "sajda-verse" : ""}
      `}
      onClick={() => onVerseClick(ayahNumber)}
    >
      {/* Top row: badges & actions */}
      <div className="flex items-start justify-between mb-2 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {showVerseNumber && (
            <span className="verse-number text-xs min-w-[28px] min-h-[28px]">
              {toArabicNumerals(ayahNumber)}
            </span>
          )}
          {isSajda && (
            <span className="sajda-badge">★ سجدہ</span>
          )}
          {isPlaying && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-cinzel font-semibold animate-pulse">
              ▶ Playing
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onPlayAyah(ayahNumber); }}
            className="p-1.5 rounded-xl text-emerald-700 hover:bg-emerald-100/70 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label={`Play ayah ${ayahNumber}`}
            title="Play — تلاوت"
          >
            <Volume2 size={14} />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl text-blue-600 hover:bg-blue-100/60 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Share verse"
            title="Share — شیئر"
          >
            <Share2 size={13} />
          </button>
          <button
            onClick={handleExportImage}
            className="p-1.5 rounded-xl text-purple-600 hover:bg-purple-100/60 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Save as image"
            title="Save image — تصویر محفوظ"
          >
            <Download size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onFavoriteToggle(ayahNumber); }}
            className={`p-1.5 rounded-xl transition-all min-w-[36px] min-h-[36px] flex items-center justify-center ${
              isFavorite ? "text-yellow-600 bg-yellow-50/70" : "text-gray-400 hover:bg-yellow-50/70"
            }`}
            aria-label={isFavorite ? "Remove bookmark" : "Bookmark"}
            title="Bookmark — بک مارک"
          >
            {isFavorite ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          </button>
        </div>
      </div>

      {/* Arabic text — EACH VERSE ON ITS OWN SEPARATE LINE */}
      {arabicText && (
        <div className="w-full mb-3" dir="rtl">
          <p
            className={`quran-text text-right ${fontSizeClass} ${fontClass} ${colorClass}`}
            style={{
              display: "block",
              width: "100%",
              lineHeight: 2.5,
              textShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            {showTajweedHighlight ? applyTajweedHighlight(arabicText) : arabicText}
            {showVerseNumber && (
              <span className="inline-flex items-center justify-center mx-2 w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-[10px] font-bold text-white shadow">
                {toArabicNumerals(ayahNumber)}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Divider */}
      {(showTranslation1 || showTranslation2 || showTafseer) && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent mb-3" />
      )}

      {/* Translation 1 — Urdu (or chosen language) */}
      {showTranslation1 && translation1Text && t1Meta && (
        <div className={`mb-3 ${t1Meta.direction === "rtl" ? "text-right" : "text-left"}`} dir={t1Meta.direction}>
          <p className="text-[10px] font-cinzel text-amber-500 mb-1 opacity-80" dir="ltr">
            📖 {t1Meta.languageNative} — {t1Meta.translator}
          </p>
          <p className={`leading-relaxed ${
            ["ur", "fa", "ps"].includes(t1Meta.language)
              ? "urdu-text text-amber-900 text-base"
              : "translation-text text-gray-700"
          }`}>
            {translation1Text}
          </p>
        </div>
      )}

      {/* Translation 2 */}
      {showTranslation2 && translation2Text && t2Meta && (
        <div className={`mt-2 pt-2 border-t border-blue-100/50 ${t2Meta.direction === "rtl" ? "text-right" : "text-left"}`} dir={t2Meta.direction}>
          <p className="text-[10px] font-cinzel text-blue-400 mb-1 opacity-80" dir="ltr">
            📖 {t2Meta.languageNative} — {t2Meta.translator}
          </p>
          <p className={`leading-relaxed ${
            ["ur", "fa", "ps"].includes(t2Meta.language)
              ? "urdu-text text-blue-900 text-base"
              : "translation-text text-gray-600"
          }`}>
            {translation2Text}
          </p>
        </div>
      )}

      {/* Tafseer panel */}
      {showTafseer && tafseerText && tafseerMeta && (
        <div className="mt-3 pt-3 border-t border-green-200/50">
          <div className="glass-emerald rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Star size={12} className="text-emerald-700" />
              <p className="text-[10px] font-cinzel text-emerald-600 font-semibold" dir="ltr">
                📚 Tafseer — {tafseerMeta.translator}
              </p>
            </div>
            <p className={`text-sm leading-relaxed ${
              tafseerMeta.direction === "rtl" ? "text-right urdu-text text-emerald-900" : "text-left text-gray-700"
            }`} dir={tafseerMeta.direction}>
              {tafseerText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default VerseCard;
