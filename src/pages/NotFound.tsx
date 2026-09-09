import { useNavigate } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-paradise flex items-center justify-center px-4">
      <div className="glass-panel rounded-2xl p-12 text-center max-w-md">
        <p className="font-arabic text-6xl font-bold text-amber-800 mb-2">٤٠٤</p>
        <h1 className="font-cinzel text-2xl font-bold text-amber-700 mb-2">Page Not Found</h1>
        <p className="text-amber-600 text-sm mb-6">The page you're looking for doesn't exist.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate("/")} className="btn-gold px-5 py-3 rounded-xl flex items-center gap-2 font-semibold">
            <Home size={18} /> Home
          </button>
          <button onClick={() => navigate("/surahs")} className="btn-emerald px-5 py-3 rounded-xl flex items-center gap-2 font-semibold">
            <BookOpen size={18} /> Surahs
          </button>
        </div>
      </div>
    </div>
  );
}
