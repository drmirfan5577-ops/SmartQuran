import type { ReciterInfo } from "@/types/quran";

export const RECITERS: ReciterInfo[] = [
  { id: "sudais", name: "Abdul Rahman Al-Sudais", arabicName: "عبد الرحمن السديس", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.abdurrahmaansudais" },
  { id: "shuraim", name: "Saud Al-Shuraim", arabicName: "سعود الشريم", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.saoodshuraym" },
  { id: "alafasy", name: "Mishary Rashid Alafasy", arabicName: "مشاري راشد العفاسي", country: "Kuwait", style: "Murattal", apiIdentifier: "ar.alafasy" },
  { id: "husary", name: "Mahmoud Khalil Al-Husary", arabicName: "محمود خليل الحصري", country: "Egypt", style: "Murattal", apiIdentifier: "ar.husary" },
  { id: "minshawy", name: "Muhammad Siddiq Al-Minshawi", arabicName: "محمد صديق المنشاوي", country: "Egypt", style: "Murattal", apiIdentifier: "ar.minshawi" },
  { id: "basfar", name: "Abdullah Basfar", arabicName: "عبدالله بصفر", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.abdullahbasfar" },
  { id: "ajmy", name: "Ahmad Al-Ajmy", arabicName: "أحمد الأحمدي", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.ahmadiajamy" },
  { id: "ghamdi", name: "Saad Al-Ghamdi", arabicName: "سعد الغامدي", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.saadalghamdi" },
  { id: "qatre", name: "Nasser Al Qatami", arabicName: "ناصر القطامي", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.nasserqatami" },
  { id: "tablawi", name: "Muhammad Al-Tablawi", arabicName: "محمد الطبلاوي", country: "Egypt", style: "Murattal", apiIdentifier: "ar.muhammadayyoubaltablawi" },
  { id: "munshid", name: "Hani Ar-Rifai", arabicName: "هاني الرفاعي", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.haniarifai" },
  { id: "makki", name: "Maher Al-Muaiqly", arabicName: "ماهر المعيقلي", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.mahermuaiqly" },
  { id: "dossary", name: "Idrees Abkar", arabicName: "إدريس أبكر", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.ibrahimakhbar" },
  { id: "hamdaan", name: "Abdul Baset Abdul Samad", arabicName: "عبد الباسط عبد الصمد", country: "Egypt", style: "Mujawwad", apiIdentifier: "ar.abdulbasitmurattal" },
  { id: "alzain", name: "Salaah Abou Khater", arabicName: "صلاح أبو خاطر", country: "Jordan", style: "Murattal", apiIdentifier: "ar.shaatree" },
  { id: "rifai", name: "Ali Al-Hudhaifi", arabicName: "علي الحذيفي", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.alialhuthaify" },
  { id: "juhany", name: "Yasser Ad-Dossary", arabicName: "ياسر الدوسري", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.yasserdossari" },
  { id: "khaled", name: "Khaled Al-Qahtani", arabicName: "خالد القحطاني", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.khaledqahtani" },
  { id: "banna", name: "Muhammad Al-Banna", arabicName: "محمد البنا", country: "Egypt", style: "Murattal", apiIdentifier: "ar.muhammadalbanna" },
  { id: "awad", name: "Ibrahim Al-Akhdar", arabicName: "إبراهيم الأخضر", country: "Saudi Arabia", style: "Murattal", apiIdentifier: "ar.ibrahimakhdar" },
];

export const getAudioUrl = (reciterId: string, surahNumber: number, ayahNumber: number): string => {
  const surahStr = String(surahNumber).padStart(3, "0");
  const ayahStr = String(ayahNumber).padStart(3, "0");
  const reciter = RECITERS.find((r) => r.id === reciterId);
  if (!reciter) return "";
  return `https://cdn.islamic.network/quran/audio/64/${reciter.apiIdentifier}/${surahNumber * 1000 + ayahNumber}.mp3`;
};

export const getSurahAudioUrl = (reciterId: string, surahNumber: number): string => {
  const reciter = RECITERS.find((r) => r.id === reciterId);
  if (!reciter) return "";
  const surahStr = String(surahNumber).padStart(3, "0");
  return `https://download.quranicaudio.com/quraan/${reciter.apiIdentifier}/${surahStr}.mp3`;
};
