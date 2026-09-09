import { useState, useRef, useCallback, useEffect } from "react";

export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  loading: boolean;
  error: string | null;
}

const CDN = "https://cdn.islamic.network/quran/audio/128";

const RECITER_MAP: Record<string, string> = {
  sudais: "ar.abdurrahmaansudais",
  shuraim: "ar.saoodshuraym",
  alafasy: "ar.alafasy",
  husary: "ar.husary",
  minshawy: "ar.minshawi",
  basfar: "ar.abdullahbasfar",
  ajmy: "ar.ahmadiajamy",
  ghamdi: "ar.saadalghamdi",
  qatre: "ar.nasserqatami",
  tablawi: "ar.muhammadayyoubaltablawi",
  munshid: "ar.haniarifai",
  makki: "ar.mahermuaiqly",
  dossary: "ar.ibrahimakhbar",
  hamdaan: "ar.abdulbasitmurattal",
  alzain: "ar.shaatree",
  rifai: "ar.alialhuthaify",
  juhany: "ar.yasserdossari",
  khaled: "ar.khaledqahtani",
  banna: "ar.muhammadalbanna",
  awad: "ar.ibrahimakhdar",
};

// Global ayah numbers table (cumulative)
const SURAH_STARTS = [
  0, 1, 8, 294, 494, 670, 790, 955, 1161, 1236, 1365, 1474, 1597, 1708, 1751,
  1803, 1902, 2030, 2141, 2251, 2386, 2521, 2599, 2717, 2781, 2858, 2935, 3162,
  3250, 3338, 3407, 3441, 3471, 3501, 3574, 3628, 3673, 3756, 3844, 3932, 4017,
  4102, 4156, 4209, 4298, 4357, 4394, 4429, 4432, 4437, 4482, 4543, 4592, 4641,
  4646, 4652, 4660, 4664, 4672, 4682, 4690, 4698, 4699, 4703, 4714, 4725, 4736,
  4745, 4757, 4769, 4781, 4797, 4826, 4879, 4929, 4978, 5026, 5075, 5106, 5149,
  5196, 5235, 5274, 5311, 5342, 5365, 5386, 5397, 5407, 5412, 5420, 5425, 5431,
  5437, 5442, 5448, 5455, 5461, 5468, 5475, 5477, 5482, 5486, 5498, 5505, 5513,
  5518, 5524, 5531, 5537, 5543, 5545, 5551, 5554, 5560, 5565,
];

function getGlobalAyahNumber(surah: number, ayah: number): number {
  if (surah < 1 || surah > 114) return ayah;
  return (SURAH_STARTS[surah - 1] || 0) + ayah;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.9,
    playbackRate: 1,
    loading: false,
    error: null,
  });

  const getAyahUrl = useCallback((reciterId: string, surahNum: number, ayahNum: number) => {
    const identifier = RECITER_MAP[reciterId] || RECITER_MAP.sudais;
    const globalAyah = getGlobalAyahNumber(surahNum, ayahNum);
    return `${CDN}/${identifier}/${globalAyah}.mp3`;
  }, []);

  const loadAyah = useCallback((reciterId: string, surahNum: number, ayahNum: number) => {
    const url = getAyahUrl(reciterId, surahNum, ayahNum);
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.pause();
    audio.src = url;
    audio.volume = state.volume;
    audio.playbackRate = state.playbackRate;
    setState((s) => ({ ...s, loading: true, error: null, isPlaying: false, currentTime: 0 }));

    audio.onloadeddata = () => setState((s) => ({ ...s, loading: false, duration: audio.duration || 0 }));
    audio.ontimeupdate = () => setState((s) => ({ ...s, currentTime: audio.currentTime }));
    audio.onended = () => setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
    audio.onerror = () => setState((s) => ({ ...s, loading: false, error: "Audio unavailable. Check connection.", isPlaying: false }));
    audio.load();
    // Auto-play after load
    audio.oncanplay = () => {
      audio.play().then(() => setState((s) => ({ ...s, isPlaying: true, loading: false })))
        .catch(() => setState((s) => ({ ...s, loading: false })));
      audio.oncanplay = null;
    };
  }, [state.volume, state.playbackRate, getAyahUrl]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play()
      .then(() => setState((s) => ({ ...s, isPlaying: true })))
      .catch(() => setState((s) => ({ ...s, error: "Playback failed" })));
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) pause(); else play();
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setState((s) => ({ ...s, currentTime: time }));
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) audioRef.current.volume = vol;
    setState((s) => ({ ...s, volume: vol }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
    setState((s) => ({ ...s, playbackRate: rate }));
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { state, loadAyah, play, pause, togglePlay, seek, setVolume, setPlaybackRate, stop };
}
