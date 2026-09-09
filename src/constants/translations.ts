import type { TranslationOption } from "@/types/quran";

export const TRANSLATIONS: TranslationOption[] = [
  // Urdu translations
  { id: "urdu-jalandhry", identifier: "ur.jalandhry", language: "ur", languageNative: "اردو", translator: "Fateh Muhammad Jalandhry", translatorUrdu: "فتح محمد جالندھری", type: "translation", direction: "rtl" },
  { id: "urdu-junagarhi", identifier: "ur.junagarhi", language: "ur", languageNative: "اردو", translator: "Muhammad Junagarhi", translatorUrdu: "محمد جونا گڑھی", type: "translation", direction: "rtl" },
  { id: "urdu-maududi", identifier: "ur.maududi", language: "ur", languageNative: "اردو", translator: "Abul Ala Maududi", translatorUrdu: "ابوالاعلیٰ مودودی", type: "translation", direction: "rtl" },
  { id: "urdu-ahmed", identifier: "ur.ahmedali", language: "ur", languageNative: "اردو", translator: "Ahmed Ali", translatorUrdu: "احمد علی", type: "translation", direction: "rtl" },
  { id: "urdu-kanzuliman", identifier: "ur.kanzuliman", language: "ur", languageNative: "اردو", translator: "Ahmad Raza Khan Barelvi (Kanz-ul-Iman)", translatorUrdu: "احمد رضا بریلوی (کنزالایمان)", type: "translation", direction: "rtl" },
  // English translations
  { id: "en-sahih", identifier: "en.sahih", language: "en", languageNative: "English", translator: "Saheeh International", translatorUrdu: "صحیح انٹرنیشنل", type: "translation", direction: "ltr" },
  { id: "en-asad", identifier: "en.asad", language: "en", languageNative: "English", translator: "Muhammad Asad", translatorUrdu: "محمد اسد", type: "translation", direction: "ltr" },
  { id: "en-yusufali", identifier: "en.yusufali", language: "en", languageNative: "English", translator: "Abdullah Yusuf Ali", translatorUrdu: "عبداللہ یوسف علی", type: "translation", direction: "ltr" },
  { id: "en-pickthall", identifier: "en.pickthall", language: "en", languageNative: "English", translator: "Mohammed Marmaduke Pickthall", translatorUrdu: "پکتھال", type: "translation", direction: "ltr" },
  { id: "en-hilali", identifier: "en.hilali", language: "en", languageNative: "English", translator: "Hilali & Khan", translatorUrdu: "ہلالی و خان", type: "translation", direction: "ltr" },
  // Persian/Farsi
  { id: "fa-ansarian", identifier: "fa.ansarian", language: "fa", languageNative: "فارسی", translator: "Hussain Ansarian", translatorUrdu: "حسین انصاریان", type: "translation", direction: "rtl" },
  { id: "fa-makarem", identifier: "fa.makarem", language: "fa", languageNative: "فارسی", translator: "Makarem Shirazi", translatorUrdu: "مکارم شیرازی", type: "translation", direction: "rtl" },
  // Hindi
  { id: "hi-hindi", identifier: "hi.hindi", language: "hi", languageNative: "हिंदी", translator: "Azizul Haque Al-Umari", translatorUrdu: "عزیزالحق العمری", type: "translation", direction: "ltr" },
  // Bengali
  { id: "bn-bengali", identifier: "bn.bengali", language: "bn", languageNative: "বাংলা", translator: "Muhiuddin Khan", translatorUrdu: "محیی الدین خان", type: "translation", direction: "ltr" },
  // Turkish
  { id: "tr-turkish", identifier: "tr.ates", language: "tr", languageNative: "Türkçe", translator: "Süleyman Ateş", translatorUrdu: "سلیمان آتش", type: "translation", direction: "ltr" },
  { id: "tr-diyanet", identifier: "tr.diyanet", language: "tr", languageNative: "Türkçe", translator: "Diyanet Isleri", translatorUrdu: "دیانت اشلری", type: "translation", direction: "ltr" },
  // Russian
  { id: "ru-russian", identifier: "ru.kuliev", language: "ru", languageNative: "Русский", translator: "Elmir Kuliev", translatorUrdu: "ایلمر کولیف", type: "translation", direction: "ltr" },
  // Chinese
  { id: "zh-chinese", identifier: "zh.majian", language: "zh", languageNative: "中文", translator: "Ma Jian", translatorUrdu: "ما جیان", type: "translation", direction: "ltr" },
  // Pashto
  { id: "ps-pashto", identifier: "ps.abdulwali", language: "ps", languageNative: "پښتو", translator: "Abdulwali", translatorUrdu: "عبدالولی", type: "translation", direction: "rtl" },
  // Indonesian
  { id: "id-indonesian", identifier: "id.indonesian", language: "id", languageNative: "Indonesia", translator: "Kemenag RI", translatorUrdu: "کیمناگ", type: "translation", direction: "ltr" },
  // Malay
  { id: "ms-malay", identifier: "ms.basmeih", language: "ms", languageNative: "Melayu", translator: "Abdullah Muhammad Basmeih", translatorUrdu: "عبداللہ بسمیح", type: "translation", direction: "ltr" },
];

export const TAFASEER: TranslationOption[] = [
  {
    id: "tafseer-en-ibnkathir",
    identifier: "en.ibnkathir",
    language: "en",
    languageNative: "English",
    translator: "Ibn Kathir (English)",
    translatorUrdu: "ابن کثیر",
    type: "tafseer",
    direction: "ltr",
  },
  {
    id: "tafseer-en-jalalayn",
    identifier: "en.jalalayn",
    language: "en",
    languageNative: "English",
    translator: "Tafsir al-Jalalayn (English)",
    translatorUrdu: "تفسیر جلالین",
    type: "tafseer",
    direction: "ltr",
  },
  {
    id: "tafseer-en-maariful",
    identifier: "en.maarifulquran",
    language: "en",
    languageNative: "English",
    translator: "Maariful Quran — Mufti Shafi Usmani",
    translatorUrdu: "معارف القرآن — مفتی شفیع عثمانی",
    type: "tafseer",
    direction: "ltr",
  },
  {
    id: "tafseer-dr-israr",
    identifier: "ur.maududi",
    language: "ur",
    languageNative: "اردو",
    translator: "Dr. Israr Ahmad — Bayan-ul-Quran (تفسیر بیان القرآن)",
    translatorUrdu: "ڈاکٹر اسرار احمد — بیان القرآن",
    type: "tafseer",
    direction: "rtl",
  },
];

export const DEFAULT_TRANSLATION_1 = "urdu-junagarhi";
export const DEFAULT_TRANSLATION_2 = "en-sahih";
