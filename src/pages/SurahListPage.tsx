import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, Heart, Filter, ChevronRight, Grid, List } from "lucide-react";
import { SURAHS_LIST } from "@/constants/surahs";
import SparkleBackground from "@/components/features/SparkleBackground";
import { useSettings } from "@/hooks/useSettings";

type FilterType = "all" | "meccan" | "medinan" | "favorites";
type ViewMode = "grid" | "list";

const PARAH_RANGES: { parah: number; surahs: number[] }[] = [
  { parah: 1, surahs: [1, 2] }, { parah: 2, surahs: [2] }, { parah: 3, surahs: [2, 3] },
  { parah: 4, surahs: [3, 4] }, { parah: 5, surahs: [4] },
];

export default function SurahListPage() {
  const navigate = useNavigate();
  const { settings, toggleFavorite } = useSettings();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    return SURAHS_LIST.filter((s) => {
      const q = query.toLowerCase();
      const matchesQuery = !q ||
        s.englishName.toLowerCase().includes(q) ||
        s.name.includes(q) ||
        s.urduName.includes(q) ||
        s.englishMeaning.toLowerCase().includes(q) ||
        String(s.number).includes(q);
      const matchesFilter =
        filter === "all" ||
        (filter === "meccan" && s.type === "Meccan") ||
        (filter === "medinan" && s.type === "Medinan") ||
        (filter === "favorites" && settings.favorites.includes(s.number));
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, settings.favorites]);

  const juzColors = [
    "#ffd700","#ff6b6b","#4caf50","#2196f3","#e91e63",
    "#ff9800","#9c27b0","#00bcd4","#8bc34a","#f44336",
  ];

  return (
    <div className="min-h-screen bg-neon-aurora relative pt-16">
      <SparkleBackground bgId="neon-aurora" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="glass-panel rounded-2xl p-5 mb-5 text-center">
          <h1 className="font-arabic text-4xl font-bold text-amber-900 text-glow-gold mb-1">الفهرس</h1>
          <p className="font-cinzel text-xl font-bold text-amber-700">Index of Surahs</p>
          <p className="urdu-text text-amber-600 text-base mt-1" dir="rtl">مکمل قرآن پاک — 114 سورتوں کی فہرست</p>
        </div>

        {/* Search & filter */}
        <div className="glass-panel rounded-2xl p-4 mb-5 space-y-3">
          <div className="relative">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search surah name, number or meaning / سورت تلاش کریں..."
              className="w-full pl-10 pr-4 py-3 bg-white/70 border border-yellow-200 rounded-xl text-sm text-amber-800 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-amber-600 flex-shrink-0" />
            {(["all", "meccan", "medinan", "favorites"] as FilterType[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize min-h-[36px] ${
                  filter === f ? "btn-gold shadow" : "glass-gold text-amber-700 hover:bg-yellow-200/50"
                }`}>
                {f === "favorites" ? "❤️ Favorites" : f === "all" ? "All 114" : f === "meccan" ? "🕌 Meccan" : "🌙 Medinan"}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-amber-600 font-medium">{filtered.length}/114</span>
              <button onClick={() => setView(view === "list" ? "grid" : "list")}
                className="p-1.5 glass-gold rounded-lg text-amber-700 hover:bg-yellow-200/50 transition-all">
                {view === "list" ? <Grid size={14} /> : <List size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Last read */}
        {settings.lastSurah > 0 && (
          <div className="glass-panel rounded-2xl p-3 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 btn-gold rounded-xl flex items-center justify-center font-cinzel font-bold text-xs flex-shrink-0">
              {settings.lastSurah}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-600 font-cinzel">Continue reading — آخری پوزیشن</p>
              <p className="font-arabic text-base font-bold text-amber-800">
                {SURAHS_LIST.find((s) => s.number === settings.lastSurah)?.name} — Ayah {settings.lastVerse}
              </p>
            </div>
            <button onClick={() => navigate(`/read/${settings.lastSurah}`)}
              className="btn-gold px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 min-h-[40px]">
              Resume <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Surah list/grid */}
        {filtered.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <p className="font-arabic text-xl text-amber-600">لا نتائج</p>
            <p className="text-amber-500 text-sm mt-2">No surahs found for your search</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {filtered.map((surah) => {
              const isFav = settings.favorites.includes(surah.number);
              const colorIdx = (surah.number - 1) % juzColors.length;
              return (
                <button key={surah.number} onClick={() => navigate(`/read/${surah.number}`)}
                  className="glass-panel rounded-xl p-2.5 hover:shadow-lg transition-all text-center hover:scale-105">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 text-white text-xs font-cinzel font-bold"
                    style={{ background: `linear-gradient(135deg, ${juzColors[colorIdx]}, ${juzColors[(colorIdx + 2) % juzColors.length]})` }}>
                    {surah.number}
                  </div>
                  <p className="font-arabic text-sm font-bold text-amber-900 leading-tight">{surah.name}</p>
                  <p className="text-[9px] font-cinzel text-amber-500 mt-0.5 truncate">{surah.englishName}</p>
                  {isFav && <span className="text-red-400 text-xs">❤</span>}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filtered.map((surah) => {
              const isFav = settings.favorites.includes(surah.number);
              const colorIdx = (surah.number - 1) % juzColors.length;
              return (
                <div key={surah.number}
                  className="glass-panel rounded-2xl p-4 hover:shadow-lg transition-all group hover:scale-[1.01] flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-cinzel font-bold text-white text-sm shadow-md flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${juzColors[colorIdx]}, ${juzColors[(colorIdx + 2) % juzColors.length]})` }}>
                    {surah.number}
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/read/${surah.number}`)}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-arabic text-xl font-bold text-amber-900 truncate">{surah.name}</p>
                      <p className="text-xs text-amber-500 font-cinzel flex-shrink-0">{surah.ayahs} آيات</p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="font-cinzel text-xs font-semibold text-amber-700">{surah.englishName}</span>
                      <span className="text-amber-300 text-xs">·</span>
                      <span className="text-amber-600 text-xs italic">{surah.englishMeaning}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-cinzel font-semibold ${
                        surah.type === "Meccan" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                      }`}>{surah.type}</span>
                      <span className="urdu-text text-xs text-amber-600">{surah.urduName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button onClick={() => navigate(`/read/${surah.number}`)}
                      className="p-2 btn-gold rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center"
                      aria-label={`Read ${surah.englishName}`}>
                      <BookOpen size={14} />
                    </button>
                    <button onClick={() => toggleFavorite(surah.number)}
                      className={`p-2 rounded-xl min-w-[40px] min-h-[40px] flex items-center justify-center transition-all ${
                        isFav ? "text-red-500 bg-red-50/70" : "text-gray-400 hover:bg-yellow-100/60 glass-gold"
                      }`}
                      aria-label={isFav ? "Remove favorite" : "Add favorite"}>
                      <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
