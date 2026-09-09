import { useState } from "react";
import { Shield, Lock, Unlock, Settings, BookOpen, Palette, Type, Languages, Info, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SparkleBackground from "@/components/features/SparkleBackground";
import { toast } from "sonner";

const ADMIN_PASSWORD = "SmartQuran2025!";

const adminSections = [
  { id: "display", icon: Palette, title: "Display & Backgrounds", titleUrdu: "ڈسپلے اور پس منظر", desc: "Manage background themes, colors, animations" },
  { id: "fonts", icon: Type, title: "Fonts & Typography", titleUrdu: "فونٹس اور ٹائپوگرافی", desc: "Configure Arabic, Urdu, English fonts" },
  { id: "translations", icon: Languages, title: "Translations & Tafaseer", titleUrdu: "ترجمے اور تفاسیر", desc: "Add or manage translation sources" },
  { id: "reciters", icon: BookOpen, title: "Reciters & Audio", titleUrdu: "قراء اور آڈیو", desc: "Manage 20+ reciters and audio settings" },
  { id: "content", icon: Settings, title: "Content Settings", titleUrdu: "مواد کی ترتیبات", desc: "Verse highlighting, Tajweed, word-by-word" },
  { id: "about", icon: Info, title: "App Info & Credits", titleUrdu: "ایپ معلومات", desc: "Update app info, disclaimer, copyright" },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      toast.success("Admin access granted — ایڈمن رسائی مل گئی");
    } else {
      setError("Incorrect password. Try again. — غلط پاس ورڈ");
      setPassword("");
    }
  };

  const handleClearCache = () => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("esmart_quran"));
    keys.forEach((k) => localStorage.removeItem(k));
    toast.success(`Cleared ${keys.length} cached items`);
  };

  return (
    <div className="min-h-screen bg-galaxy relative pt-16">
      <SparkleBackground bgId="galaxy" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="glass-panel rounded-2xl p-6 mb-6 text-center">
          <div className="w-16 h-16 btn-admin rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl">
            <Shield size={30} className="text-white" />
          </div>
          <h1 className="font-cinzel font-bold text-2xl text-amber-800">Admin Panel</h1>
          <p className="urdu-text text-amber-600 text-base mt-1" dir="rtl">ایڈمن سیکشن — پاس ورڈ سے محفوظ</p>
          <p className="text-xs text-amber-500 font-cinzel mt-2">SMART WORLD ORDER — Dr M Irfan Qadir Thaheem</p>
        </div>

        {/* Login gate */}
        {!authenticated ? (
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={18} className="text-amber-600" />
              <h2 className="font-cinzel font-bold text-amber-800">Password Protected — پاس ورڈ محفوظ</h2>
            </div>
            <p className="text-sm text-amber-600 mb-4" dir="rtl">اس سیکشن تک رسائی کے لیے ایڈمن پاس ورڈ درج کریں۔</p>
            <div className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 bg-white/80 border border-amber-200 rounded-xl text-amber-800 outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />
              {error && <p className="text-red-600 text-xs bg-red-50/70 rounded-lg px-3 py-2">{error}</p>}
              <button onClick={handleLogin} className="btn-admin w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                <Unlock size={16} />
                Enter Admin Panel — ایڈمن میں داخل ہوں
              </button>
            </div>
            <div className="mt-4 p-3 bg-amber-50/70 rounded-xl">
              <p className="text-xs text-amber-600">
                ⚠️ <strong>Hint:</strong> Contact Dr M Irfan Qadir Thaheem at <a href="mailto:dr.mirfan5577@gmail.com" className="underline">dr.mirfan5577@gmail.com</a> for admin credentials.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Welcome */}
            <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
              <Unlock size={20} className="text-green-600" />
              <div>
                <p className="font-semibold text-green-800 text-sm">Admin Access Granted</p>
                <p className="text-xs text-green-600 urdu-text" dir="rtl">ایڈمن رسائی مل گئی — خوش آمدید</p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass-panel rounded-2xl p-4">
              <h3 className="font-cinzel font-bold text-amber-800 text-sm mb-3">⚡ Quick Actions — فوری اقدامات</h3>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleClearCache}
                  className="glass-gold text-amber-800 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-yellow-200/60 transition-all min-h-[44px]">
                  🗑️ Clear Cache<br /><span className="opacity-70">کیش صاف کریں</span>
                </button>
                <button onClick={() => navigate("/surahs")}
                  className="glass-gold text-amber-800 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-yellow-200/60 transition-all min-h-[44px]">
                  📖 View Surahs<br /><span className="opacity-70">سورتیں دیکھیں</span>
                </button>
                <button onClick={() => { localStorage.removeItem("esmart_quran_settings_v2"); window.location.reload(); }}
                  className="glass-gold text-amber-800 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-yellow-200/60 transition-all min-h-[44px]">
                  🔄 Reset Settings<br /><span className="opacity-70">ترتیبات ری سیٹ</span>
                </button>
                <button onClick={() => setAuthenticated(false)}
                  className="glass-gold text-red-700 px-3 py-2.5 rounded-xl text-xs font-semibold hover:bg-red-100/60 transition-all min-h-[44px]">
                  🔒 Logout<br /><span className="opacity-70">لاگ آؤٹ</span>
                </button>
              </div>
            </div>

            {/* Admin sections */}
            <div className="glass-panel rounded-2xl p-4">
              <h3 className="font-cinzel font-bold text-amber-800 text-sm mb-3">🛠️ Management Sections — انتظامی حصے</h3>
              <div className="space-y-2">
                {adminSections.map((section) => (
                  <button key={section.id}
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 glass-gold rounded-xl hover:bg-yellow-200/50 transition-all text-left min-h-[56px]">
                    <section.icon size={18} className="text-amber-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-amber-800 text-sm">{section.title}</p>
                      <p className="text-[10px] urdu-text text-amber-500" dir="rtl">{section.titleUrdu}</p>
                      <p className="text-[10px] text-amber-500 font-cinzel">{section.desc}</p>
                    </div>
                    <ChevronRight size={16} className={`text-amber-500 transition-transform flex-shrink-0 ${activeSection === section.id ? "rotate-90" : ""}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Active section content */}
            {activeSection && (
              <div className="glass-panel rounded-2xl p-5">
                {activeSection === "display" && (
                  <div>
                    <h4 className="font-cinzel font-bold text-amber-800 mb-3">Background & Display Management</h4>
                    <p className="text-sm text-amber-700 mb-3">Currently 20 animated backgrounds available. All backgrounds are luminous, well-illuminated with no dark themes as per specifications.</p>
                    <div className="glass-gold rounded-xl p-3 text-xs text-amber-700">
                      <p className="font-semibold mb-1">Available Backgrounds:</p>
                      <p>Paradise Garden • Golden Dawn • Emerald Garden • Rose Bliss • Sapphire Ocean • Galaxy • Neon Aurora • Crimson Royal • Crystal White • Rainbow Holographic • Floral Pink • Ocean Wave • Golden Mosque • Mint Fresh • Sunset Glory • Lavender Dream • Aqua Crystal • Ruby Red • Sapphire Night • Diamond White</p>
                    </div>
                  </div>
                )}
                {activeSection === "translations" && (
                  <div>
                    <h4 className="font-cinzel font-bold text-amber-800 mb-3">Translation Sources (21 Available)</h4>
                    <div className="space-y-1 text-xs text-amber-700">
                      {["اردو — جالندھری، جونا گڑھی، مودودی، احمد علی، کنزالایمان", "English — Saheeh Int'l, Muhammad Asad, Yusuf Ali, Pickthall, Hilali & Khan", "فارسی — انصاریان، مکارم شیرازی", "हिंदी — عزیزالحق العمری", "বাংলা — محیی الدین خان", "Türkçe — سلیمان آتش، دیانت", "Русский — ایلمر کولیف", "中文 — ما جیان", "پښتو — عبدالولی", "Indonesia — Kemenag RI", "Melayu — بسمیح"].map((t) => (
                        <div key={t} className="glass-gold rounded-lg px-3 py-1.5">{t}</div>
                      ))}
                    </div>
                  </div>
                )}
                {activeSection === "reciters" && (
                  <div>
                    <h4 className="font-cinzel font-bold text-amber-800 mb-3">20 Reciters Available</h4>
                    <p className="text-xs text-amber-600 mb-2">All recitations sourced from Islamic.network CDN (copyright-free)</p>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-amber-700">
                      {["Al-Sudais", "Al-Shuraim", "Mishary Alafasy", "Al-Husary", "Al-Minshawi", "Abdullah Basfar", "Ahmad Al-Ajmy", "Saad Al-Ghamdi", "Nasser Al-Qatami", "Muhammad Al-Tablawi", "Hani Ar-Rifai", "Maher Al-Muaiqly", "Idrees Abkar", "Abdul Baset", "Salaah Abou Khater", "Ali Al-Hudhaifi", "Yasser Ad-Dossary", "Khaled Al-Qahtani", "Muhammad Al-Banna", "Ibrahim Al-Akhdar"].map((r) => (
                        <div key={r} className="glass-gold rounded-lg px-2 py-1">{r}</div>
                      ))}
                    </div>
                  </div>
                )}
                {activeSection === "content" && (
                  <div>
                    <h4 className="font-cinzel font-bold text-amber-800 mb-3">Content Features Status</h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { name: "Muqatta'at (separate line)", status: "✅ Active" },
                        { name: "Sajda Verse Highlighting", status: "✅ Active (15 sajda verses)" },
                        { name: "Multi-color Ayah Lines", status: "✅ Active (10 colors)" },
                        { name: "Tajweed Color Coding", status: "✅ Available in settings" },
                        { name: "Basmala display", status: "✅ Auto (no basmala for Surah 9)" },
                        { name: "Jump to Verse", status: "✅ Active" },
                        { name: "Auto Scroll with speed control", status: "✅ Active" },
                        { name: "Reading position save", status: "✅ localStorage" },
                        { name: "Favorites system", status: "✅ Active" },
                        { name: "Audio + Translation mode", status: "✅ Setting available" },
                      ].map((item) => (
                        <div key={item.name} className="flex justify-between glass-gold rounded-lg px-3 py-1.5">
                          <span className="text-amber-700">{item.name}</span>
                          <span className="text-green-700 font-semibold">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeSection === "about" && (
                  <div>
                    <h4 className="font-cinzel font-bold text-amber-800 mb-3">App Information</h4>
                    <div className="space-y-2 text-xs text-amber-700">
                      <div className="glass-gold rounded-xl p-3">
                        <p><strong>App Name:</strong> E-Smart Digital Quran</p>
                        <p><strong>Version:</strong> 2.0 — Ever Smart Version</p>
                        <p><strong>Owner:</strong> Dr M Irfan Qadir Thaheem</p>
                        <p><strong>Organization:</strong> SMART WORLD ORDER</p>
                        <p><strong>Email:</strong> dr.mirfan5577@gmail.com</p>
                        <p><strong>Mission:</strong> لا الہ الا اللہ</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Version info */}
            <div className="glass-panel rounded-2xl p-4 text-center text-xs text-amber-600">
              <p className="font-cinzel font-bold text-amber-800 mb-1">E-Smart Digital Quran v2.0</p>
              <p className="urdu-text" dir="rtl">انشاءاللہ عزوجل — ایور سمارٹ ورژن</p>
              <p className="mt-1">© 2025 SMART WORLD ORDER — All rights reserved</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
