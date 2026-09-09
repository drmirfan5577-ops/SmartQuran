import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, HeartOff } from "lucide-react";
import { SURAHS_LIST } from "@/constants/surahs";
import SparkleBackground from "@/components/features/SparkleBackground";
import { useSettings } from "@/hooks/useSettings";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { settings, toggleFavorite } = useSettings();
  const favSurahs = SURAHS_LIST.filter((s) => settings.favorites.includes(s.number));

  return (
    <div className="min-h-screen bg-rose-bliss relative pt-16">
      <SparkleBackground bgId="rose-bliss" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="glass-panel rounded-2xl p-6 mb-6 text-center">
          <p className="font-arabic text-4xl font-bold text-amber-900 text-glow-gold mb-1">المفضلة</p>
          <p className="font-cinzel text-xl font-bold text-amber-700">Favorites</p>
          <p className="urdu-text text-amber-600 text-base mt-1" dir="rtl">پسندیدہ سورتیں</p>
        </div>

        {favSurahs.length === 0 ? (
          <div className="glass-panel rounded-2xl p-16 text-center">
            <HeartOff className="w-16 h-16 text-pink-400 mx-auto mb-4 opacity-60" />
            <p className="font-arabic text-xl text-amber-600 mb-2">لا توجد مفضلات</p>
            <p className="text-amber-500 text-sm mb-6">No favorites yet. Tap the heart icon on any Surah to save it here.</p>
            <p className="urdu-text text-amber-600 text-sm" dir="rtl">کسی سورت کو پسندیدہ بنانے کے لیے دل کے نشان پر کلک کریں۔</p>
            <button
              onClick={() => navigate("/surahs")}
              className="btn-gold mt-6 px-6 py-3 rounded-2xl font-semibold inline-flex items-center gap-2"
            >
              <BookOpen size={18} />
              Browse Surahs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {favSurahs.map((surah) => (
              <div key={surah.number} className="glass-panel rounded-2xl p-4 hover:shadow-lg transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 btn-gold rounded-xl flex items-center justify-center font-cinzel font-bold text-sm shadow flex-shrink-0">
                  {surah.number}
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/read/${surah.number}`)}>
                  <p className="font-arabic text-xl font-bold text-amber-900">{surah.name}</p>
                  <p className="font-cinzel text-sm text-amber-700">{surah.englishName}</p>
                  <p className="urdu-text text-xs text-amber-600" dir="rtl">{surah.urduName} — {surah.ayahs} آيات</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/read/${surah.number}`)}
                    className="p-2 btn-gold rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Read ${surah.englishName}`}
                  >
                    <BookOpen size={16} />
                  </button>
                  <button
                    onClick={() => toggleFavorite(surah.number)}
                    className="p-2 rounded-xl text-red-500 bg-red-50/60 hover:bg-red-100/70 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
                    aria-label="Remove from favorites"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
