import { useState, useCallback } from "react";
import type { ReadingSettings, BackgroundSettings, TextSettings } from "@/types/quran";
import { DEFAULT_TRANSLATION_1, DEFAULT_TRANSLATION_2 } from "@/constants/translations";
import { DEFAULT_BACKGROUND } from "@/constants/backgrounds";

const SETTINGS_KEY = "esmart_quran_settings_v3";

const defaultBgSettings: BackgroundSettings = {
  enabled: true,
  speed: 5,
  direction: "normal",
  opacity: 0.85,
  sparkleCount: 60,
  sparkleEnabled: true,
  bubblesEnabled: true,
  glowOrbs: true,
};

const defaultTextSettings: TextSettings = {
  arabicFont: "amiri-quran",
  arabicFontSize: "medium",
  arabicBold: false,
  arabicColor: "",
  urduFontSize: "medium",
  urduBold: false,
  englishFontSize: "medium",
  lineHeight: "loose",
};

const defaultSettings: ReadingSettings = {
  arabicFontSize: "medium",
  displayMode: "arabic-urdu",
  showTranslation1: true,
  showTranslation2: false,
  translation1Id: DEFAULT_TRANSLATION_1,
  translation2Id: DEFAULT_TRANSLATION_2,
  showTafseer: false,
  tafseerTranslationId: "tafseer-en-ibnkathir",
  showTajweed: false,
  ayahColorMode: "multicolor",
  backgroundId: DEFAULT_BACKGROUND,
  showBackgrounds: true,
  bgSettings: defaultBgSettings,
  showVerseNumbers: true,
  autoScroll: false,
  scrollSpeed: 3,
  selectedReciter: "sudais",
  lastSurah: 1,
  lastVerse: 1,
  favorites: [],
  arabicFont: "amiri-quran",
  textSettings: defaultTextSettings,
  showWordByWord: false,
  audioWithTranslation: false,
  urduTranslationReciter: "jalandhry",
  sidebarVisible: true,
  nightMode: false,
  showTajweedHighlight: false,
  mushafMode: false,
};

function loadSettings(): ReadingSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultSettings,
        ...parsed,
        bgSettings: { ...defaultBgSettings, ...(parsed.bgSettings || {}) },
        textSettings: { ...defaultTextSettings, ...(parsed.textSettings || {}) },
      };
    }
  } catch { /* ignore */ }
  return defaultSettings;
}

export function useSettings() {
  const [settings, setSettingsState] = useState<ReadingSettings>(loadSettings);

  const updateSettings = useCallback((updates: Partial<ReadingSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const updateBgSettings = useCallback((updates: Partial<BackgroundSettings>) => {
    setSettingsState((prev) => {
      const next = {
        ...prev,
        bgSettings: { ...prev.bgSettings, ...updates },
      };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const updateTextSettings = useCallback((updates: Partial<TextSettings>) => {
    setSettingsState((prev) => {
      const next = {
        ...prev,
        textSettings: { ...prev.textSettings, ...updates },
        // Also sync top-level arabicFont and arabicFontSize for backward compat
        arabicFont: updates.arabicFont ?? prev.arabicFont,
        arabicFontSize: updates.arabicFontSize ?? prev.arabicFontSize,
      };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((surahNumber: number) => {
    setSettingsState((prev) => {
      const favs = prev.favorites.includes(surahNumber)
        ? prev.favorites.filter((f) => f !== surahNumber)
        : [...prev.favorites, surahNumber];
      const next = { ...prev, favorites: favs };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const savePosition = useCallback(
    (surah: number, verse: number) => {
      updateSettings({ lastSurah: surah, lastVerse: verse });
    },
    [updateSettings]
  );

  return {
    settings,
    updateSettings,
    updateBgSettings,
    updateTextSettings,
    toggleFavorite,
    savePosition,
  };
}
