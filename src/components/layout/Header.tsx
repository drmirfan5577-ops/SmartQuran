import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, Heart, Info, Home, Shield } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home", labelUrdu: "ہوم", icon: Home },
    { to: "/surahs", label: "Surahs", labelUrdu: "سورتیں", icon: BookOpen },
    { to: "/favorites", label: "Favorites", labelUrdu: "پسندیدہ", icon: Heart },
    { to: "/about", label: "About", labelUrdu: "تعارف", icon: Info },
    { to: "/admin", label: "Admin", labelUrdu: "ایڈمن", icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src={logoImg} alt="E-Smart Digital Quran"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-400/60 shadow-lg group-hover:ring-yellow-400 transition-all" />
              <div className="absolute inset-0 rounded-full animate-[glow_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-cinzel font-bold text-sm leading-tight shimmer-text">E-SMART DIGITAL QURAN</span>
              <span className="font-arabic text-xs text-amber-700 leading-tight">القرآن الكريم الرقمي</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, labelUrdu, icon: Icon }) => (
              <Link key={to} to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive(to) ? "btn-gold shadow-md" : "text-amber-900 hover:bg-yellow-100/60 hover:text-amber-800"
                }`}>
                <Icon size={14} />
                <span>{label}</span>
                <span className="urdu-text text-[10px] opacity-60">{labelUrdu}</span>
              </Link>
            ))}
          </nav>

          {/* Mission statement */}
          <div className="hidden lg:flex items-center">
            <p className="text-[9px] text-amber-600 font-cinzel text-right leading-tight max-w-[120px]">
              SMART WORLD ORDER<br />
              <span className="urdu-text text-amber-700">لا الہ الا اللہ</span>
            </p>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-xl text-amber-800 hover:bg-yellow-100/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-panel border-t border-white/30 px-4 pb-4">
          <div className="pt-2 space-y-1">
            {links.map(({ to, label, labelUrdu, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                  isActive(to) ? "btn-gold shadow-sm" : "text-amber-900 hover:bg-yellow-100/60"
                }`}>
                <Icon size={18} />
                <span>{label}</span>
                <span className="urdu-text text-sm opacity-70 mr-auto">{labelUrdu}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
