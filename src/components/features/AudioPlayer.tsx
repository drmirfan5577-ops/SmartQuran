import { useEffect, useState, useCallback, useRef } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  ChevronDown, ChevronUp, Gauge, StopCircle, Repeat, Languages,
  Download, List, Music2
} from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { RECITERS } from "@/constants/reciters";
import { SURAHS_LIST } from "@/constants/surahs";
import { formatTime } from "@/lib/utils";

interface AudioPlayerProps {
  surahNumber: number;
  totalAyahs: number;
  currentAyah: number;
  reciterId: string;
  audioWithTranslation: boolean;
  onAyahChange: (ayah: number) => void;
  onReciterChange: (id: string) => void;
  onToggleAudioTranslation: () => void;
}

const WAVEFORM_BARS = 14;

export default function AudioPlayer({
  surahNumber, totalAyahs, currentAyah, reciterId,
  audioWithTranslation, onAyahChange, onReciterChange, onToggleAudioTranslation,
}: AudioPlayerProps) {
  const { state, loadAyah, togglePlay, seek, setVolume, setPlaybackRate, stop } = useAudioPlayer();
  const [expanded, setExpanded] = useState(false);
  const [showReciters, setShowReciters] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [loopMode, setLoopMode] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const rates = [0.75, 1, 1.25, 1.5, 2];
  const prevAyahRef = useRef<number | null>(null);
  const endedRef = useRef(false);

  // Surah completion progress
  const surahProgress = Math.round(((currentAyah - 1) / totalAyahs) * 100);

  // Auto advance to next ayah when current ends
  useEffect(() => {
    if (
      !state.isPlaying &&
      state.duration > 0 &&
      state.currentTime >= state.duration - 0.3 &&
      !endedRef.current
    ) {
      endedRef.current = true;
      if (loopMode) {
        setTimeout(() => {
          endedRef.current = false;
          loadAyah(reciterId, surahNumber, currentAyah);
        }, 200);
      } else if (autoAdvance && currentAyah < totalAyahs) {
        setTimeout(() => {
          endedRef.current = false;
          onAyahChange(currentAyah + 1);
        }, 400);
      }
    }
    if (state.isPlaying) endedRef.current = false;
  }, [state.isPlaying, state.currentTime, state.duration, loopMode, autoAdvance, currentAyah, totalAyahs]);

  useEffect(() => {
    if (prevAyahRef.current !== currentAyah) {
      prevAyahRef.current = currentAyah;
      endedRef.current = false;
      loadAyah(reciterId, surahNumber, currentAyah);
    }
  }, [currentAyah, surahNumber, reciterId]);

  const handlePrev = () => { if (currentAyah > 1) onAyahChange(currentAyah - 1); };
  const handleNext = () => { if (currentAyah < totalAyahs) onAyahChange(currentAyah + 1); };
  const handlePlayAll = () => { onAyahChange(1); };
  const currentReciter = RECITERS.find((r) => r.id === reciterId);

  // Download surah audio
  const handleDownload = () => {
    const surahStr = String(surahNumber).padStart(3, "0");
    const identifier = currentReciter?.apiIdentifier || "ar.alafasy";
    const url = `https://download.quranicaudio.com/quraan/${identifier}/${surahStr}.mp3`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `surah-${surahNumber}-${SURAHS_LIST.find(s => s.number === surahNumber)?.englishName || surahNumber}.mp3`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Upcoming ayahs playlist
  const playlistItems = Array.from({ length: Math.min(8, totalAyahs - currentAyah + 1) }, (_, i) => currentAyah + i);

  return (
    <div className="glass-panel rounded-2xl shadow-2xl overflow-hidden border border-white/50">
      {/* Surah progress bar */}
      <div className="w-full h-1.5 bg-white/20 relative overflow-hidden rounded-full mx-0">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-700 rounded-full"
          style={{ width: `${surahProgress}%` }}
        />
      </div>
      <div className="flex items-center justify-between px-4 pt-1 pb-0.5">
        <span className="text-[9px] text-amber-600 font-cinzel">
          Surah Progress — {surahProgress}%
        </span>
        <span className="text-[9px] text-amber-600 font-arabic">
          آية {currentAyah} / {totalAyahs}
        </span>
      </div>

      {/* Waveform animation when playing */}
      {state.isPlaying && (
        <div className="flex items-end justify-center gap-0.5 px-4 h-5 mb-1">
          {Array.from({ length: WAVEFORM_BARS }).map((_, i) => (
            <div
              key={i}
              className="waveform-bar"
              style={{ animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </div>
      )}

      {/* Compact bar */}
      <div className="flex items-center gap-2 px-3 py-2">
        <button onClick={handlePrev} disabled={currentAyah <= 1}
          className="p-1.5 rounded-xl text-amber-700 hover:bg-yellow-100/70 disabled:opacity-40 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center">
          <SkipBack size={16} />
        </button>

        <button onClick={togglePlay} disabled={state.loading}
          className="btn-gold w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 flex-shrink-0"
          aria-label={state.isPlaying ? "Pause" : "Play"}>
          {state.loading ? <div className="w-5 h-5 loading-spinner" /> :
            state.isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <button onClick={handleNext} disabled={currentAyah >= totalAyahs}
          className="p-1.5 rounded-xl text-amber-700 hover:bg-yellow-100/70 disabled:opacity-40 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center">
          <SkipForward size={16} />
        </button>

        {/* Ayah progress */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <input type="range" className="audio-progress w-full"
            min={0} max={state.duration || 1} value={state.currentTime}
            onChange={(e) => seek(Number(e.target.value))} aria-label="Audio progress" />
          <div className="flex justify-between text-[9px] text-amber-500 opacity-70 px-0.5">
            <span>{formatTime(state.currentTime)}</span>
            <span className="text-amber-600 font-medium">
              {currentReciter?.name.split(" ")[0]}
            </span>
            <span>{formatTime(state.duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <button onClick={() => setVolume(state.volume > 0 ? 0 : 0.9)}
          className="p-1.5 text-amber-700 hover:text-amber-900 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
          {state.volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Expand toggle */}
        <button onClick={() => setExpanded(!expanded)}
          className="p-1.5 text-amber-700 hover:text-amber-900 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
          {expanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
        </button>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/30 pt-3">
          {/* Play All + Download */}
          <div className="flex gap-2">
            <button onClick={handlePlayAll}
              className="btn-emerald flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[42px]">
              <Music2 size={14} />
              Play Full Surah — مکمل سورہ
            </button>
            <button onClick={handleDownload}
              className="glass-gold px-3 py-2.5 rounded-xl text-amber-700 text-xs font-semibold flex items-center justify-center gap-1.5 min-h-[42px] hover:bg-yellow-200/50 transition-all">
              <Download size={14} />
              Download
            </button>
          </div>

          {/* Reciter selector */}
          <div>
            <p className="text-xs text-amber-600 font-medium mb-1.5">🎤 القارئ — Reciter</p>
            <button onClick={() => setShowReciters(!showReciters)}
              className="w-full text-left px-3 py-2.5 glass-gold rounded-xl text-sm text-amber-800 font-medium flex items-center justify-between min-h-[44px]">
              <span className="truncate">{currentReciter?.name || "Select Reciter"}</span>
              <span className="font-arabic text-xs opacity-70 flex-shrink-0 ml-2">{currentReciter?.arabicName}</span>
            </button>
            {showReciters && (
              <div className="mt-2 max-h-52 overflow-y-auto rounded-xl glass-panel p-2 space-y-1">
                {RECITERS.map((r) => (
                  <button key={r.id}
                    onClick={() => { onReciterChange(r.id); setShowReciters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between min-h-[44px] ${
                      r.id === reciterId ? "btn-gold" : "hover:bg-yellow-100/60 text-amber-800"
                    }`}>
                    <span>{r.name} · {r.country}</span>
                    <span className="font-arabic text-xs opacity-80">{r.arabicName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audio+Translation mode */}
          <div className="flex items-center justify-between px-3 py-2.5 glass-gold rounded-xl">
            <div className="flex items-center gap-2">
              <Languages size={14} className="text-amber-600" />
              <div>
                <p className="text-xs font-semibold text-amber-800">Audio Recitation + Urdu Translation</p>
                <p className="text-[10px] text-amber-600 urdu-text" dir="rtl">آیت تلاوت + اردو ترجمہ آڈیو</p>
              </div>
            </div>
            <div onClick={onToggleAudioTranslation}
              className={`w-12 h-6 rounded-full cursor-pointer relative transition-all ${audioWithTranslation ? "bg-yellow-500" : "bg-gray-300"}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${audioWithTranslation ? "right-1" : "left-1"}`} />
            </div>
          </div>

          {/* Volume slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-amber-600 font-medium">🔊 Volume</p>
              <span className="text-xs text-amber-500">{Math.round(state.volume * 100)}%</span>
            </div>
            <input type="range" className="audio-progress w-full" min={0} max={1} step={0.05}
              value={state.volume} onChange={(e) => setVolume(Number(e.target.value))} />
          </div>

          {/* Speed */}
          <div>
            <p className="text-xs text-amber-600 font-medium mb-1.5 flex items-center gap-1">
              <Gauge size={12} /> Speed — رفتار
            </p>
            <div className="flex gap-1.5">
              {rates.map((r) => (
                <button key={r} onClick={() => setPlaybackRate(r)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                    state.playbackRate === r ? "btn-gold" : "glass-gold text-amber-700 hover:bg-yellow-200/50"
                  }`}>
                  {r}×
                </button>
              ))}
            </div>
          </div>

          {/* Controls row */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setLoopMode(!loopMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all flex-1 min-h-[40px] ${
                loopMode ? "btn-emerald" : "glass-gold text-amber-700"
              }`}>
              <Repeat size={13} />
              {loopMode ? "Loop ON" : "Loop"}
            </button>
            <button onClick={() => setAutoAdvance(!autoAdvance)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all flex-1 min-h-[40px] ${
                autoAdvance ? "btn-gold" : "glass-gold text-amber-700"
              }`}>
              <SkipForward size={13} />
              {autoAdvance ? "Auto ✓" : "Manual"}
            </button>
            <button onClick={stop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-amber-700 hover:bg-red-100/60 glass-gold transition-all min-h-[40px]">
              <StopCircle size={13} />
              Stop
            </button>
          </div>

          {/* Playlist */}
          <div>
            <button onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex items-center gap-2 text-xs text-amber-600 font-medium hover:text-amber-800 transition-colors mb-2">
              <List size={13} />
              {showPlaylist ? "Hide Playlist" : "Show Playlist — آیات کی فہرست"}
            </button>
            {showPlaylist && (
              <div className="glass-panel rounded-xl p-2 space-y-1 max-h-44 overflow-y-auto">
                {playlistItems.map((n) => (
                  <button key={n} onClick={() => onAyahChange(n)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all min-h-[36px] ${
                      n === currentAyah
                        ? "btn-gold font-semibold"
                        : "hover:bg-yellow-100/60 text-amber-700"
                    }`}>
                    <span className="verse-number text-[10px] min-w-[22px] min-h-[22px]">{n}</span>
                    <span>Ayah {n}</span>
                    {n === currentAyah && state.isPlaying && (
                      <span className="ml-auto text-[10px] text-green-600 font-semibold animate-pulse">▶ Playing</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {state.error && (
            <p className="text-red-600 text-xs bg-red-50/70 rounded-lg px-3 py-2">{state.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
