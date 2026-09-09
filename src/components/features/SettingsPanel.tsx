import {
  X, Type, Languages, Image, Eye, Palette, BookOpen,
  Settings2, Sliders, Wind, Sparkles
} from "lucide-react";
import type {
  ReadingSettings, DisplayMode, AyahColorMode, FontFamily,
  BackgroundSettings, TextSettings
} from "@/types/quran";
import { TRANSLATIONS, TAFASEER } from "@/constants/translations";
import { BACKGROUNDS } from "@/constants/backgrounds";

interface SettingsPanelProps {
  settings: ReadingSettings;
  onUpdate: (u: Partial<ReadingSettings>) => void;
  onUpdateBg: (u: Partial<BackgroundSettings>) => void;
  onUpdateText: (u: Partial<TextSettings>) => void;
  onClose: () => void;
}

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <div onClick={onChange}
    className={`w-12 h-6 rounded-full cursor-pointer relative transition-all flex-shrink-0 ${value ? "bg-yellow-500 shadow-md" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${value ? "right-1" : "left-1"}`} />
  </div>
);

const SectionTitle = ({ icon: Icon, title, urdu }: { icon: React.ElementType; title: string; urdu: string }) => (
  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-200/50">
    <Icon size={15} className="text-amber-600 flex-shrink-0" />
    <div>
      <h3 className="font-semibold text-amber-800 text-sm">{title}</h3>
      <p className="text-[10px] text-amber-500 urdu-text" dir="rtl">{urdu}</p>
    </div>
  </div>
);

const DISPLAY_MODES: { id: DisplayMode; label: string; urdu: string; icon: string }[] = [
  { id: "arabic-only", label: "Arabic Only", urdu: "صرف عربی", icon: "ع" },
  { id: "arabic-urdu", label: "Arabic + Urdu", urdu: "عربی + اردو", icon: "عا" },
  { id: "arabic-urdu-tafseer", label: "+Tafseer", urdu: "+ تفسیر", icon: "عات" },
  { id: "mushaf", label: "Mushaf", urdu: "مصحف", icon: "📖" },
  { id: "tajweed", label: "Tajweed", urdu: "تجوید", icon: "ت" },
  { id: "urdu-only", label: "Urdu Only", urdu: "صرف اردو", icon: "اردو" },
];

const ARABIC_FONTS: { id: FontFamily; label: string }[] = [
  { id: "amiri-quran", label: "Amiri Quran" },
  { id: "scheherazade", label: "Scheherazade New" },
  { id: "noto-naskh", label: "Noto Naskh" },
  { id: "uthmani", label: "Uthmanic Style" },
  { id: "hafs", label: "Hafs Style" },
];

const FONT_SIZES = ["small", "medium", "large", "xlarge"] as const;
const FONT_SIZES_3 = ["small", "medium", "large"] as const;

export default function SettingsPanel({ settings, onUpdate, onUpdateBg, onUpdateText, onClose }: SettingsPanelProps) {
  const bg = settings.bgSettings;
  const txt = settings.textSettings;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto glass-panel rounded-t-2xl sm:rounded-2xl shadow-2xl mx-0 sm:mx-4 border border-white/60">
        {/* Header */}
        <div className="sticky top-0 glass-panel flex items-center justify-between px-5 py-4 border-b border-white/30 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 btn-gold rounded-xl flex items-center justify-center">
              <Settings2 size={18} />
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-amber-800 text-base">Settings — اعدادات</h2>
              <p className="text-[10px] text-amber-500 urdu-text" dir="rtl">قرآن ریڈر کی ترتیبات</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-yellow-100/60 text-amber-700 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Display Mode */}
          <section>
            <SectionTitle icon={BookOpen} title="Display Mode" urdu="ڈسپلے موڈ" />
            <div className="grid grid-cols-3 gap-2">
              {DISPLAY_MODES.map((m) => (
                <button key={m.id} onClick={() => onUpdate({ displayMode: m.id })}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all min-h-[52px] flex flex-col items-center justify-center gap-1 ${
                    settings.displayMode === m.id ? "btn-gold shadow" : "glass-gold text-amber-700 hover:bg-yellow-200/50"
                  }`}>
                  <span className="font-arabic text-sm">{m.icon}</span>
                  <span className="font-semibold leading-tight text-center">{m.label}</span>
                  <span className="text-[9px] urdu-text opacity-70">{m.urdu}</span>
                </button>
              ))}
            </div>
          </section>

          {/* ======= TEXT SETTINGS ======= */}
          <section>
            <SectionTitle icon={Type} title="Text & Font Customization" urdu="متن اور فونٹ ترتیبات" />

            {/* Arabic Font */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-amber-700 mb-2">Arabic Font — عربی فونٹ</p>
              <div className="space-y-1.5">
                {ARABIC_FONTS.map((f) => (
                  <button key={f.id}
                    onClick={() => onUpdateText({ arabicFont: f.id })}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all min-h-[48px] ${
                      txt.arabicFont === f.id ? "btn-gold" : "glass-gold text-amber-700 hover:bg-yellow-200/50"
                    }`}>
                    <span className="font-cinzel text-xs font-semibold">{f.label}</span>
                    <span className="font-arabic text-2xl" style={{
                      fontFamily: f.id === "amiri-quran" ? "'Amiri Quran'" :
                        f.id === "scheherazade" ? "'Scheherazade New'" :
                        f.id === "noto-naskh" ? "'Noto Naskh Arabic'" : "'Amiri'"
                    }}>بِسْمِ اللَّهِ</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Font Size */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-amber-700 mb-2">Arabic Text Size — عربی متن کا سائز</p>
              <div className="grid grid-cols-4 gap-2">
                {FONT_SIZES.map((fs) => (
                  <button key={fs} onClick={() => onUpdateText({ arabicFontSize: fs })}
                    className={`py-2.5 rounded-xl text-xs font-medium transition-all min-h-[44px] flex flex-col items-center justify-center gap-1 ${
                      txt.arabicFontSize === fs ? "btn-gold" : "glass-gold text-amber-700 hover:bg-yellow-200/50"
                    }`}>
                    <span className="capitalize">{fs}</span>
                    <span className="font-arabic" style={{ fontSize: fs === "small" ? 14 : fs === "medium" ? 18 : fs === "large" ? 22 : 28 }}>ب</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Bold */}
            <div className="flex items-center justify-between px-4 py-3 glass-gold rounded-xl mb-3">
              <p className="text-xs font-semibold text-amber-800">Arabic Bold Text — موٹا متن</p>
              <Toggle value={!!txt.arabicBold} onChange={() => onUpdateText({ arabicBold: !txt.arabicBold })} />
            </div>

            {/* Urdu Font Size */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-amber-700 mb-2">Urdu Text Size — اردو متن کا سائز</p>
              <div className="grid grid-cols-3 gap-2">
                {FONT_SIZES_3.map((fs) => (
                  <button key={fs} onClick={() => onUpdateText({ urduFontSize: fs })}
                    className={`py-2.5 rounded-xl text-xs font-medium transition-all min-h-[40px] capitalize ${
                      txt.urduFontSize === fs ? "btn-gold" : "glass-gold text-amber-700"
                    }`}>
                    {fs}
                  </button>
                ))}
              </div>
            </div>

            {/* English Font Size */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-amber-700 mb-2">English Text Size</p>
              <div className="grid grid-cols-3 gap-2">
                {FONT_SIZES_3.map((fs) => (
                  <button key={fs} onClick={() => onUpdateText({ englishFontSize: fs })}
                    className={`py-2.5 rounded-xl text-xs font-medium transition-all min-h-[40px] capitalize ${
                      txt.englishFontSize === fs ? "btn-gold" : "glass-gold text-amber-700"
                    }`}>
                    {fs}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Height */}
            <div>
              <p className="text-xs font-semibold text-amber-700 mb-2">Line Height — لائن اسپیس</p>
              <div className="grid grid-cols-3 gap-2">
                {(["normal", "relaxed", "loose"] as const).map((lh) => (
                  <button key={lh} onClick={() => onUpdateText({ lineHeight: lh })}
                    className={`py-2.5 rounded-xl text-xs font-medium transition-all min-h-[40px] capitalize ${
                      txt.lineHeight === lh ? "btn-gold" : "glass-gold text-amber-700"
                    }`}>
                    {lh}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Ayah Color Mode */}
          <section>
            <SectionTitle icon={Palette} title="Ayah Color Style" urdu="آیات کا رنگ" />
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "none" as AyahColorMode, label: "Classic", urdu: "کلاسک" },
                { id: "multicolor" as AyahColorMode, label: "Multi-Color", urdu: "کثیر رنگ" },
                { id: "tajweed" as AyahColorMode, label: "Tajweed", urdu: "تجوید" },
              ]).map((cm) => (
                <button key={cm.id} onClick={() => onUpdate({ ayahColorMode: cm.id })}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-all min-h-[44px] ${
                    settings.ayahColorMode === cm.id ? "btn-gold" : "glass-gold text-amber-700 hover:bg-yellow-200/50"
                  }`}>
                  <span className="block font-semibold">{cm.label}</span>
                  <span className="text-[9px] urdu-text opacity-70">{cm.urdu}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between px-4 py-3 glass-gold rounded-xl">
              <p className="text-xs font-semibold text-amber-800">Tajweed Word Highlights — تجوید نشان</p>
              <Toggle value={!!settings.showTajweedHighlight}
                onChange={() => onUpdate({ showTajweedHighlight: !settings.showTajweedHighlight })} />
            </div>
          </section>

          {/* Translations */}
          <section>
            <SectionTitle icon={Languages} title="Translations & Tafseer" urdu="ترجمے اور تفسیر" />
            <div className="space-y-3">
              {/* T1 */}
              <div className="glass-gold rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-amber-700">Translation 1 — ترجمہ ۱</label>
                  <Toggle value={settings.showTranslation1} onChange={() => onUpdate({ showTranslation1: !settings.showTranslation1 })} />
                </div>
                <select value={settings.translation1Id} onChange={(e) => onUpdate({ translation1Id: e.target.value })}
                  className="w-full bg-white/70 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-amber-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  {TRANSLATIONS.map((t) => (
                    <option key={t.id} value={t.id}>{t.languageNative} — {t.translator}</option>
                  ))}
                </select>
              </div>
              {/* T2 */}
              <div className="glass-gold rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-amber-700">Translation 2 — ترجمہ ۲</label>
                  <Toggle value={settings.showTranslation2} onChange={() => onUpdate({ showTranslation2: !settings.showTranslation2 })} />
                </div>
                <select value={settings.translation2Id} onChange={(e) => onUpdate({ translation2Id: e.target.value })}
                  className="w-full bg-white/70 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-amber-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  {TRANSLATIONS.map((t) => (
                    <option key={t.id} value={t.id}>{t.languageNative} — {t.translator}</option>
                  ))}
                </select>
              </div>
              {/* Tafseer */}
              <div className="glass-emerald rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-emerald-700">Tafseer Panel — تفسیر</label>
                  <Toggle value={!!settings.showTafseer} onChange={() => onUpdate({ showTafseer: !settings.showTafseer })} />
                </div>
                <select value={settings.tafseerTranslationId} onChange={(e) => onUpdate({ tafseerTranslationId: e.target.value })}
                  className="w-full bg-white/70 border border-green-200 rounded-lg px-3 py-2 text-xs text-emerald-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                  {TAFASEER.map((t) => (
                    <option key={t.id} value={t.id}>{t.languageNative} — {t.translator}</option>
                  ))}
                </select>
                <p className="text-[10px] text-emerald-600 mt-1.5 urdu-text" dir="rtl">
                  ★ ابن کثیر، جلالین اور معارف القرآن شامل ہیں
                </p>
              </div>
            </div>
          </section>

          {/* Display Options */}
          <section>
            <SectionTitle icon={Eye} title="Display Options" urdu="ڈسپلے کی اقسام" />
            <div className="space-y-2">
              {([
                { key: "showVerseNumbers" as const, label: "Show Verse Numbers", urdu: "آیت نمبر" },
                { key: "autoScroll" as const, label: "Auto Scroll", urdu: "خودکار اسکرول" },
                { key: "showWordByWord" as const, label: "Word-by-Word Mode", urdu: "لفظی ترجمہ" },
                { key: "audioWithTranslation" as const, label: "Audio + Urdu Translation", urdu: "آڈیو ترجمہ موڈ" },
              ]).map(({ key, label, urdu }) => (
                <div key={key} className="flex items-center justify-between px-4 py-3 glass-gold rounded-xl">
                  <div>
                    <p className="text-xs font-semibold text-amber-800">{label}</p>
                    <p className="text-[10px] urdu-text text-amber-500" dir="rtl">{urdu}</p>
                  </div>
                  <Toggle value={!!settings[key]} onChange={() => onUpdate({ [key]: !settings[key] })} />
                </div>
              ))}
              {settings.autoScroll && (
                <div className="px-4 py-3 glass-gold rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-amber-800">Scroll Speed</p>
                    <span className="text-xs text-amber-500">{settings.scrollSpeed}/10</span>
                  </div>
                  <input type="range" min={1} max={10} value={settings.scrollSpeed}
                    onChange={(e) => onUpdate({ scrollSpeed: Number(e.target.value) })}
                    className="audio-progress w-full" />
                </div>
              )}
            </div>
          </section>

          {/* ======= BACKGROUND SETTINGS ======= */}
          <section>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/50">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-amber-600" />
                <div>
                  <h3 className="font-semibold text-amber-800 text-sm">Background Effects</h3>
                  <p className="text-[10px] text-amber-500 urdu-text" dir="rtl">پس منظر کی ترتیبات</p>
                </div>
              </div>
              <Toggle value={bg.enabled} onChange={() => onUpdateBg({ enabled: !bg.enabled })} />
            </div>

            {/* Background selector */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {BACKGROUNDS.map((b) => (
                <button key={b.id} onClick={() => onUpdate({ backgroundId: b.id })} title={b.name}
                  className={`h-11 rounded-xl transition-all ${b.cssClass} ${
                    settings.backgroundId === b.id ? "ring-2 ring-yellow-500 ring-offset-2 scale-105 shadow-lg" : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`} aria-label={b.name} />
              ))}
            </div>
            <p className="text-xs text-amber-600 text-center mb-3 font-cinzel">
              {BACKGROUNDS.find((b) => b.id === settings.backgroundId)?.name} — {BACKGROUNDS.find((b) => b.id === settings.backgroundId)?.nameUrdu}
            </p>

            {bg.enabled && (
              <div className="space-y-3">
                {/* Opacity */}
                <div className="glass-gold rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                      <Image size={12} /> Opacity — شفافیت
                    </p>
                    <span className="text-xs text-amber-500">{Math.round(bg.opacity * 100)}%</span>
                  </div>
                  <input type="range" min={0.3} max={1} step={0.05} value={bg.opacity}
                    onChange={(e) => onUpdateBg({ opacity: Number(e.target.value) })}
                    className="audio-progress w-full" />
                </div>

                {/* Speed */}
                <div className="glass-gold rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                      <Wind size={12} /> Animation Speed — رفتار
                    </p>
                    <span className="text-xs text-amber-500">{bg.speed}/10</span>
                  </div>
                  <input type="range" min={1} max={10} step={1} value={bg.speed}
                    onChange={(e) => onUpdateBg({ speed: Number(e.target.value) })}
                    className="audio-progress w-full" />
                </div>

                {/* Sparkle count */}
                <div className="glass-gold rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                      <Sparkles size={12} /> Sparkle Density — چمک
                    </p>
                    <span className="text-xs text-amber-500">{bg.sparkleCount}</span>
                  </div>
                  <input type="range" min={10} max={100} step={5} value={bg.sparkleCount}
                    onChange={(e) => onUpdateBg({ sparkleCount: Number(e.target.value) })}
                    className="audio-progress w-full" />
                </div>

                {/* Direction */}
                <div className="glass-gold rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-amber-800 mb-2">Animation Direction — سمت</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(["normal", "reverse", "alternate"] as const).map((d) => (
                      <button key={d} onClick={() => onUpdateBg({ direction: d })}
                        className={`py-2 rounded-lg text-xs font-medium capitalize min-h-[36px] ${
                          bg.direction === d ? "btn-gold" : "glass-gold text-amber-700"
                        }`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Effect toggles */}
                <div className="space-y-2">
                  {([
                    { key: "sparkleEnabled" as const, label: "Sparkle Stars", urdu: "ستارے" },
                    { key: "bubblesEnabled" as const, label: "Rising Bubbles", urdu: "بلبلے" },
                    { key: "glowOrbs" as const, label: "Glow Orbs", urdu: "گلو اوربس" },
                  ]).map(({ key, label, urdu }) => (
                    <div key={key} className="flex items-center justify-between px-4 py-2.5 glass-gold rounded-xl">
                      <div>
                        <p className="text-xs font-semibold text-amber-800">{label}</p>
                        <p className="text-[10px] urdu-text text-amber-500" dir="rtl">{urdu}</p>
                      </div>
                      <Toggle value={!!bg[key]} onChange={() => onUpdateBg({ [key]: !bg[key] })} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
