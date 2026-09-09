import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import HomePage from "@/pages/HomePage";
import SurahListPage from "@/pages/SurahListPage";
import QuranReaderPage from "@/pages/QuranReaderPage";
import FavoritesPage from "@/pages/FavoritesPage";
import AboutPage from "@/pages/AboutPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surahs" element={<SurahListPage />} />
          <Route path="/read/:surahId" element={<QuranReaderPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,193,7,0.4)",
            color: "#78350f",
            fontFamily: "Noto Sans, sans-serif",
            fontSize: "13px",
          },
        }}
      />
    </BrowserRouter>
  );
}
