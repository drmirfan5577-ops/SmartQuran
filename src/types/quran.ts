export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  urduName?: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  juz: number;
  page: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahFull {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export interface ReciterInfo {
  id: string;
  name: string;
  arabicName: string;
  country: string;
  style: string;
  apiIdentifier: string;
}

export interface BackgroundTheme {
  id: string;
  name: string;
  nameUrdu: string;
  cssClass: string;
  preview: string;
  category: string;
}

export interface TranslationOption {
  id: string;
  identifier: string;
  language: string;
  languageNative: string;
  translator: string;
  translatorUrdu: string;
  type: "translation" | "tafseer";
  direction: "rtl" | "ltr";
}

export type DisplayMode =
  | "arabic-only"
  | "arabic-urdu"
  | "arabic-urdu-tafseer"
  | "mushaf"
  | "tajweed"
  | "urdu-only";

export type AyahColorMode = "none" | "multicolor" | "tajweed";
export type FontFamily = "amiri-quran" | "scheherazade" | "noto-naskh" | "uthmani" | "hafs";

export interface BackgroundSettings {
  enabled: boolean;
  speed: number; // 1-10
  direction: "normal" | "reverse" | "alternate";
  opacity: number; // 0.3-1
  sparkleCount: number; // 20-100
  sparkleEnabled: boolean;
  bubblesEnabled: boolean;
  glowOrbs: boolean;
}

export interface TextSettings {
  arabicFont: FontFamily;
  arabicFontSize: "small" | "medium" | "large" | "xlarge";
  arabicBold: boolean;
  arabicColor: string; // custom hex
  urduFontSize: "small" | "medium" | "large";
  urduBold: boolean;
  englishFontSize: "small" | "medium" | "large";
  lineHeight: "normal" | "relaxed" | "loose";
}

export interface ReadingSettings {
  arabicFontSize: "small" | "medium" | "large" | "xlarge";
  displayMode: DisplayMode;
  showTranslation1: boolean;
  showTranslation2: boolean;
  translation1Id: string;
  translation2Id: string;
  showTafseer: boolean;
  tafseerTranslationId: string;
  showTajweed: boolean;
  ayahColorMode: AyahColorMode;
  backgroundId: string;
  showBackgrounds: boolean;
  bgSettings: BackgroundSettings;
  showVerseNumbers: boolean;
  autoScroll: boolean;
  scrollSpeed: number;
  selectedReciter: string;
  lastSurah: number;
  lastVerse: number;
  favorites: number[];
  arabicFont: FontFamily;
  textSettings: TextSettings;
  showWordByWord: boolean;
  audioWithTranslation: boolean;
  urduTranslationReciter: string;
  sidebarVisible: boolean;
  nightMode: boolean;
  showTajweedHighlight: boolean;
  mushafMode: boolean;
}
