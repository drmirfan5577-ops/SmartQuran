import { Mail, Globe, BookOpen, Shield, AlertTriangle, Star } from "lucide-react";
import SparkleBackground from "@/components/features/SparkleBackground";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-golden-dawn relative pt-16">
      <SparkleBackground bgId="golden-dawn" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-5">

        {/* Vision */}
        <div className="glass-panel rounded-2xl p-6 text-center">
          <div className="w-20 h-20 btn-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-[float_6s_ease-in-out_infinite]">
            <Globe size={36} />
          </div>
          <p className="font-arabic text-3xl font-bold text-amber-900 text-glow-gold mb-2 leading-loose" dir="rtl">
            لَا إِلٰهَ إِلَّا اللّٰه
          </p>
          <h1 className="font-cinzel text-2xl font-bold text-amber-800 mb-1">SMART WORLD ORDER</h1>
          <p className="text-amber-600 font-cinzel text-sm tracking-widest mb-3">A Global Family Platform Vision</p>
          <div className="glass-gold rounded-xl p-4">
            <p className="text-amber-800 font-medium leading-relaxed text-sm mb-3">
              We're committed to <strong>Enhance, Lead, Guide and Command</strong> the whole World in every field of life with <strong>Unity, Integrity and Universality</strong>.
            </p>
            <p className="urdu-text text-amber-800 text-base leading-loose" dir="rtl">
              روح رواں اور کوشاں — ہم دنیا کی ہر شعبۂ حیات میں اتحاد، یکجہتی اور آفاقیت کے ساتھ رہنمائی کرنے کے لیے پُرعزم ہیں۔
            </p>
            <p className="urdu-text text-amber-700 text-sm mt-2 leading-loose" dir="rtl">
              <strong>ہمارا منشور:</strong> لا الہ الا اللہ — میرا جینا میرا مرنا فقط اللہ رب العالمین کے لیے
            </p>
            <p className="text-amber-500 text-xs mt-2 italic font-cinzel">In-sha-Allah Azza-wa-Jall</p>
          </div>
        </div>

        {/* About developer */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 btn-gold rounded-xl flex items-center justify-center shadow-md">
              <Star size={22} />
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-amber-800 text-lg">EvEr SmArT-nEwS</h2>
              <p className="urdu-text text-amber-600 text-sm" dir="rtl">ڈاکٹر محمد عرفان قادر تھاہیم — دی ون مین آرمی</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-amber-700 leading-relaxed">
            <p><strong className="text-amber-800">Dr M Irfan Qadir Thaheem</strong> — <em>The One Man Army</em></p>
            <p>A project of <strong>"SMART WORLD ORDER"</strong> — A worldwide Global Family Platform Vision.</p>
            <p className="urdu-text leading-loose" dir="rtl">
              ایک شخص کا عزم، ایک آرزو — قرآن پاک کو جدید ترین ڈیجیٹل پلیٹ فارم پر دنیا کے ہر کونے میں پہنچانا۔
              انشاءاللہ عزوجل۔
            </p>
          </div>
        </div>

        {/* App highlights */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="font-cinzel font-bold text-amber-800 text-lg mb-4 flex items-center gap-2">
            <span className="shimmer-text">✨</span> E-Smart Digital Quran — Platform Highlights
          </h2>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {[
              { en: "114 Complete Surahs", ur: "مکمل 114 سورتیں" },
              { en: "20 World-Class Reciters", ur: "20 قراء کرام" },
              { en: "20+ Language Translations", ur: "20+ زبانوں میں ترجمہ" },
              { en: "20 Animated Backgrounds", ur: "20 متحرک پس منظر" },
              { en: "Multi-Color Ayah Lines", ur: "رنگ برنگ آیات" },
              { en: "Tajweed Color Coding", ur: "تجوید رنگ کوڈنگ" },
              { en: "6 Display Modes", ur: "6 ڈسپلے موڈ" },
              { en: "5 Arabic Font Styles", ur: "5 عربی فونٹس" },
              { en: "Sajda Verse Highlighting", ur: "آیات سجدہ ہائی لائٹ" },
              { en: "Muqatta'at Formatting", ur: "حروف مقطعات علیحدہ لائن" },
              { en: "Jump to Any Verse", ur: "کسی بھی آیت پر جائیں" },
              { en: "Auto Scroll + Speed", ur: "خودکار اسکرول + رفتار" },
              { en: "Save Reading Position", ur: "پوزیشن محفوظ کریں" },
              { en: "Admin Panel", ur: "ایڈمن پینل" },
              { en: "Floating Controls Strip", ur: "فلوٹنگ کنٹرول پٹی" },
              { en: "Fullscreen Mode", ur: "مکمل اسکرین موڈ" },
            ].map(({ en, ur }) => (
              <div key={en} className="glass-gold rounded-xl p-2.5">
                <p className="font-semibold text-amber-800">{en}</p>
                <p className="urdu-text text-amber-600 mt-0.5" dir="rtl">{ur}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-cinzel font-bold text-amber-800 text-base mb-3 flex items-center gap-2">
            <Mail size={16} /> Contact — رابطہ
          </h2>
          <div className="glass-gold rounded-xl p-4 text-sm space-y-2">
            <p className="text-amber-700">For queries, suggestions, and business:</p>
            <a href="mailto:dr.mirfan5577@gmail.com"
              className="font-semibold text-amber-800 hover:text-amber-900 underline flex items-center gap-2">
              <Mail size={16} /> dr.mirfan5577@gmail.com
            </a>
            <p className="urdu-text text-amber-700 text-sm" dir="rtl">
              مزید معلومات، تجاویز اور رابطے کے لیے ای میل کریں۔
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glass-panel rounded-2xl p-5">
          <h2 className="font-cinzel font-bold text-amber-800 text-base mb-3 flex items-center gap-2">
            <Shield size={16} /> Disclaimer, Copyright & Privacy
          </h2>
          <div className="space-y-3 text-xs text-amber-700 leading-relaxed">
            <div className="flex gap-2 p-3 bg-yellow-50/70 rounded-xl">
              <AlertTriangle size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
              <p>Quranic text sourced from <strong>AlQuran.cloud</strong> (open API). Audio from <strong>Islamic.network CDN</strong> — copyright-free public domain recitations. This platform is strictly for <strong>educational and spiritual purposes</strong>.</p>
            </div>
            <p>All translations are for reference. Readers are advised to consult original Arabic text and qualified Islamic scholars for religious guidance. <strong>Any Quranic text error must be reported immediately.</strong></p>
            <p>This app does not claim ownership of any Quranic text, translations, or audio. All such rights belong to their respective owners.</p>
            <div className="glass-gold rounded-xl p-3">
              <p className="font-cinzel font-bold text-amber-800 text-sm mb-1">© 2025 SMART WORLD ORDER</p>
              <p>App design, UI/UX, and platform architecture copyright © Dr M Irfan Qadir Thaheem. All rights reserved.</p>
              <p className="urdu-text mt-2" dir="rtl">تمام حقوق محفوظ ہیں۔ ایپ کا ڈیزائن اور فریم ورک ڈاکٹر محمد عرفان قادر تھاہیم کی ملکیت ہے۔</p>
            </div>
            <div className="p-3 bg-blue-50/70 rounded-xl">
              <p className="font-semibold text-blue-700 mb-1">Privacy & Broadcasting Compliance</p>
              <p>This platform complies with international digital broadcasting guidelines and social media regulations. No personal data is stored on servers. All reading positions and settings are stored locally on your device only. This app does not collect, sell, or share any user data.</p>
            </div>
            <div className="p-3 bg-green-50/70 rounded-xl">
              <p className="font-semibold text-green-700 mb-1">Social Media Notice</p>
              <p>Content shared from this platform must comply with platform-specific rules of Facebook, YouTube, Twitter/X, Instagram, TikTok etc. The Quran content is in the public domain. App UI/design is proprietary.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
