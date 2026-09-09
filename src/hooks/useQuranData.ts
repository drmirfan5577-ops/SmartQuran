import { useState, useEffect, useCallback } from "react";
import type { SurahFull } from "@/types/quran";

const BASE_URL = "https://api.alquran.cloud/v1";
const CACHE_PREFIX = "esmart_quran_v3_";

function getCache(key: string) {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (item) return JSON.parse(item);
  } catch { /* ignore */ }
  return null;
}

function setCache(key: string, data: unknown) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch { /* ignore */ }
}

const IDENTIFIER_MAP: Record<string, string> = {
  "urdu-jalandhry": "ur.jalandhry",
  "urdu-junagarhi": "ur.junagarhi",
  "urdu-maududi": "ur.maududi",
  "urdu-ahmed": "ur.ahmedali",
  "urdu-kanzuliman": "ur.kanzuliman",
  "en-sahih": "en.sahih",
  "en-asad": "en.asad",
  "en-yusufali": "en.yusufali",
  "en-pickthall": "en.pickthall",
  "en-hilali": "en.hilali",
  "fa-ansarian": "fa.ansarian",
  "fa-makarem": "fa.makarem",
  "hi-hindi": "hi.hindi",
  "bn-bengali": "bn.bengali",
  "tr-turkish": "tr.ates",
  "tr-diyanet": "tr.diyanet",
  "ru-russian": "ru.kuliev",
  "zh-chinese": "zh.majian",
  "ps-pashto": "ps.abdulwali",
  "id-indonesian": "id.indonesian",
  "ms-malay": "ms.basmeih",
  "tafseer-en-jalalayn": "en.jalalayn",
  "tafseer-en-ibnkathir": "en.ibnkathir",
  "tafseer-en-maariful": "en.maarifulquran",
};

export function useQuranData(
  surahNumber: number,
  translation1: string,
  translation2: string,
  tafseerTranslationId?: string
) {
  const [arabic, setArabic] = useState<SurahFull | null>(null);
  const [trans1, setTrans1] = useState<{ ayahs: { numberInSurah: number; text: string }[] } | null>(null);
  const [trans2, setTrans2] = useState<{ ayahs: { numberInSurah: number; text: string }[] } | null>(null);
  const [tafseer, setTafseer] = useState<{ ayahs: { numberInSurah: number; text: string }[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSurah = useCallback(async () => {
    setLoading(true);
    setError(null);

    const arabicKey = `ar_${surahNumber}`;
    const t1Key = `t1_${surahNumber}_${translation1}`;
    const t2Key = `t2_${surahNumber}_${translation2}`;
    const tafseerKey = tafseerTranslationId ? `tf_${surahNumber}_${tafseerTranslationId}` : null;

    try {
      // Arabic
      let arabicData = getCache(arabicKey);
      if (!arabicData) {
        const res = await fetch(`${BASE_URL}/surah/${surahNumber}`);
        if (!res.ok) throw new Error("Failed to load Arabic text. Please check your internet connection.");
        const json = await res.json();
        arabicData = json.data;
        setCache(arabicKey, arabicData);
      }
      setArabic(arabicData);

      // Translation 1
      let t1Data = getCache(t1Key);
      if (!t1Data) {
        const id1 = IDENTIFIER_MAP[translation1] || "ur.junagarhi";
        const res1 = await fetch(`${BASE_URL}/surah/${surahNumber}/${id1}`);
        if (res1.ok) {
          const j1 = await res1.json();
          t1Data = j1.data;
          setCache(t1Key, t1Data);
        }
      }
      setTrans1(t1Data);

      // Translation 2
      let t2Data = getCache(t2Key);
      if (!t2Data) {
        const id2 = IDENTIFIER_MAP[translation2] || "en.sahih";
        const res2 = await fetch(`${BASE_URL}/surah/${surahNumber}/${id2}`);
        if (res2.ok) {
          const j2 = await res2.json();
          t2Data = j2.data;
          setCache(t2Key, t2Data);
        }
      }
      setTrans2(t2Data);

      // Tafseer
      if (tafseerTranslationId && tafseerKey) {
        let tfData = getCache(tafseerKey);
        if (!tfData) {
          const idTf = IDENTIFIER_MAP[tafseerTranslationId] || "en.ibnkathir";
          const resTf = await fetch(`${BASE_URL}/surah/${surahNumber}/${idTf}`);
          if (resTf.ok) {
            const jTf = await resTf.json();
            tfData = jTf.data;
            setCache(tafseerKey, tfData);
          }
        }
        setTafseer(tfData);
      } else {
        setTafseer(null);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Quran data");
    } finally {
      setLoading(false);
    }
  }, [surahNumber, translation1, translation2, tafseerTranslationId]);

  useEffect(() => {
    fetchSurah();
  }, [fetchSurah]);

  return { arabic, trans1, trans2, tafseer, loading, error, refetch: fetchSurah };
}
