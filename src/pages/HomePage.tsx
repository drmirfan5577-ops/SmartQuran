import { useNavigate } from "react-router-dom";
import {
  BookOpen, Headphones, Languages, Sparkles, Shield, Heart,
  ChevronRight, Star, Zap, Globe, BookMarked, Layers
} from "lucide-react";
import heroImg from "@/assets/hero-quran.jpg";
import { SURAHS_LIST } from "@/constants/surahs";
import SparkleBackground from "@/components/features/SparkleBackground";

const featuredSurahs = [1, 2, 36, 55, 67, 112];

const features = [
  { icon: BookOpen, title: "Complete Quran", titleUrdu: "مکمل قرآن پاک", desc: "All 114 Surahs — each Ayah on its own separate line, Basmala & Muqatta'at correctly formatted." },
  { icon: Headphones, title: "20 Reciters", titleUrdu: "20 قراء کرام", desc: "Al-Sudais, Al-Shuraim, Alafasy, Husary, Minshawi and 15 more world-class reciters." },
  { icon: Languages, title: "20+ Translations", titleUrdu: "20+ زبانوں میں ترجمہ", desc: "Urdu, English, Farsi, Hindi, Bengali, Turkish, Russian, Chinese, Pashto & more." },
  { icon: Sparkles, title: "20 Live Backgrounds", titleUrdu: "20 لائیو بیک گراؤنڈ", desc: "Fully customizable animated luminous backgrounds — speed, opacity, direction, sparkle density." },
  { icon: BookMarked, title: "Tafseer Panel", titleUrdu: "تفسیر پینل", desc: "Ibn Kathir, Jalalayn, Maariful Quran and Dr. Israr Ahmad Bayan-ul-Quran tafaseer." },
  { icon: Shield, title: "Admin Panel", titleUrdu: "ایڈمن پینل", desc: "Password-protected admin section for complete app customization and management." },
  { icon: Zap, title: "Full Surah Audio", titleUrdu: "مکمل سورہ آڈیو", desc: "Auto-advance through all ayahs, surah progress bar, playlist view, download surah." },
  { icon: Globe, title: "Verse Share Cards", titleUrdu: "آیت شیئر کارڈ", desc: "Export any verse as a beautiful gold-bordered image card with Arabic + Urdu translation." },
  { icon: Layers, title: "Para/Juz Navigation", titleUrdu: "پارہ نیویگیشن", desc: "Jump directly to any of the 30 Juz/Para with one tap. Mushaf page view mode." },
  { icon: Heart, title: "Favorites & Position", titleUrdu: "پسندیدہ آیات", desc: "Save favorite Surahs and reading position. Resume exactly where you left off." },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paradise relative">
      <SparkleBackground bgId="paradise" />

      {/* Hero section */}
      <section className="relative pt-20 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
            <img src={heroImg} alt="E-Smart Digital Quran"
              className="w-full object-cover" style={{ maxHeight: 420 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 via-amber-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-center">
              <p className="text-yellow-300/90 text-xs font-cinzel mb-2 tracking-[0.3em] uppercase">
                ✦ لَا إِلٰهَ إِلَّا اللّٰه ✦
              </p>
              <h1 className="font-arabic text-3xl sm:text-5xl font-bold text-white text-glow-white leading-tight mb-2">
                القرآن الكريم
              </h1>
              <p className="text-white/90 font-cinzel text-sm sm:text-base tracking-wider mb-1">
                E-SMART DIGITAL QURAN PLATFORM
              </p>
              <p className="text-yellow-200/80 text-xs sm:text-sm urdu-text" dir="rtl">
                SMART WORLD ORDER — ڈاکٹر محمد عرفان قادر تھاہیم
              </p>
            </div>
          </div>

          {/* Vision statement */}
          <div className="glass-panel rounded-2xl p-5 sm:p-7 mb-6 text-center holographic-border">
            <p className="font-arabic text-2xl sm:text-3xl text-amber-800 text-glow-gold mb-3 leading-loose" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-amber-700 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-3">
              We're committed to <strong>Enhance, Lead, Guide and Command</strong> the whole World in every field of life with <strong>Unity, Integrity and Universality</strong>.
            </p>
            <p className="urdu-text text-amber-800 text-base sm:text-lg leading-loose" dir="rtl">
              روح رواں اور کوشاں — <strong>SMART WORLD ORDER</strong>
              <br /><em>ہمارا منشور: لا الہ الا اللہ</em>
            </p>
            <p className="text-amber-500 text-xs mt-3 font-cinzel italic">In-sha-Allah Azza-wa-Jall</p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <button onClick={() => navigate("/surahs")}
              className="btn-gold px-7 py-3.5 rounded-2xl font-semibold text-base flex items-center gap-2 shadow-xl">
              <BookOpen size={20} />
              Start Reading
              <span className="font-arabic text-sm opacity-80">تلاوت شروع کریں</span>
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("/read/1")}
              className="btn-emerald px-7 py-3.5 rounded-2xl font-semibold text-base flex items-center gap-2 shadow-xl">
              <Star size={20} />
              Al-Fatihah
              <span className="font-arabic text-sm opacity-90">الفاتحة</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cinzel text-2xl font-bold text-amber-800 mb-1">EvEr SmArT Features</h2>
          <p className="text-center urdu-text text-amber-700 text-lg mb-6" dir="rtl">شاندار ایور سمارٹ فیچرز</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {features.map(({ icon: Icon, title, titleUrdu, desc }) => (
              <div key={title} className="glass-panel rounded-2xl p-4 hover:shadow-xl transition-all group hover:scale-[1.02]">
                <div className="w-10 h-10 btn-gold rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md">
                  <Icon size={18} />
                </div>
                <h3 className="font-cinzel font-bold text-amber-800 text-xs mb-0.5">{title}</h3>
                <p className="urdu-text text-amber-700 text-xs mb-1.5" dir="rtl">{titleUrdu}</p>
                <p className="text-gray-600 text-[10px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Surahs */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cinzel text-2xl font-bold text-amber-800 mb-1">Featured Surahs</h2>
          <p className="text-center urdu-text text-amber-700 text-lg mb-6" dir="rtl">منتخب سورتیں</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredSurahs.map((num) => {
              const surah = SURAHS_LIST.find((s) => s.number === num);
              if (!surah) return null;
              return (
                <button key={num} onClick={() => navigate(`/read/${num}`)}
                  className="glass-panel hover:glass-gold rounded-2xl p-4 text-center transition-all hover:scale-105 group shadow-md">
                  <div className="w-10 h-10 btn-gold rounded-full flex items-center justify-center mx-auto mb-2 font-cinzel font-bold text-sm group-hover:scale-110 transition-transform shadow-md">
                    {num}
                  </div>
                  <p className="font-arabic text-lg font-bold text-amber-900 leading-tight">{surah.name}</p>
                  <p className="text-[10px] font-cinzel text-amber-600 mt-0.5">{surah.englishName}</p>
                  <p className="text-[9px] text-amber-400 mt-0.5">{surah.ayahs} Ayahs</p>
                </button>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate("/surahs")}
              className="btn-gold px-8 py-3 rounded-2xl font-semibold text-base inline-flex items-center gap-2 shadow-xl">
              View All 114 Surahs
              <span className="font-arabic text-sm">تمام سورتیں</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer footer */}
      <footer className="px-4 pb-10">
        <div className="max-w-3xl mx-auto glass-panel rounded-2xl p-5 text-center text-xs text-amber-700 space-y-2">
          <p className="font-cinzel font-bold text-sm text-amber-800">⚠️ Disclaimer & Copyright Notice</p>
          <p>All Quranic content sourced from <strong>AlQuran.cloud API</strong>. Copyright-free public domain. For educational & spiritual use only.</p>
          <p className="font-arabic text-sm" dir="rtl">تمام حقوق محفوظ ہیں — SMART WORLD ORDER</p>
          <p>© 2025 <strong>SMART WORLD ORDER</strong> — Dr M Irfan Qadir Thaheem.</p>
          <p><a href="mailto:dr.mirfan5577@gmail.com" className="underline text-amber-600">dr.mirfan5577@gmail.com</a></p>
        </div>
      </footer>
    </div>
  );
}
