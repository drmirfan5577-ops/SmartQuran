import { useMemo } from "react";
import type { BackgroundSettings } from "@/types/quran";

interface SparkleProps {
  bgId: string;
  bgSettings?: BackgroundSettings;
}

const COLOR_MAP: Record<string, string[]> = {
  paradise: ["#ffd700", "#4caf50", "#00bcd4", "#a5d6a7", "#ffffff"],
  "golden-dawn": ["#ffd700", "#ff8c00", "#fff176", "#ffcc02", "#ffffff"],
  "emerald-garden": ["#4caf50", "#00e676", "#69f0ae", "#b9f6ca", "#ffffff"],
  "rose-bliss": ["#e91e63", "#f48fb1", "#ff80ab", "#fce4ec", "#ffffff"],
  "sapphire-ocean": ["#2196f3", "#64b5f6", "#b3e5fc", "#00bcd4", "#ffffff"],
  galaxy: ["#7986cb", "#9c27b0", "#e040fb", "#ce93d8", "#ffffff"],
  "neon-aurora": ["#00bcd4", "#4caf50", "#e91e63", "#ffd700", "#ffffff"],
  "crimson-royal": ["#ff7043", "#ffd700", "#ff8f00", "#ffccbc", "#ffffff"],
  "crystal-white": ["#e0e7ff", "#a5b4fc", "#818cf8", "#fdf4ff", "#ffffff"],
  "rainbow-holographic": ["#ff6b6b", "#ffd700", "#6c5ce7", "#00b894", "#fd79a8"],
  "floral-pink": ["#e91e63", "#f48fb1", "#ffd700", "#fce4ec", "#ffffff"],
  "ocean-wave": ["#29b6f6", "#81d4fa", "#b3e5fc", "#00bcd4", "#ffffff"],
  "golden-mosque": ["#ffd700", "#ff8f00", "#ffe082", "#ffc107", "#ffffff"],
  "mint-fresh": ["#4db6ac", "#80cbc4", "#b2dfdb", "#00bcd4", "#ffffff"],
  "sunset-glory": ["#ff7043", "#ff8f00", "#ffb74d", "#ffd54f", "#ffffff"],
  "lavender-dream": ["#ba68c8", "#ce93d8", "#e1bee7", "#f3e5f5", "#ffffff"],
  "aqua-crystal": ["#4dd0e1", "#80deea", "#b2ebf2", "#00bcd4", "#ffffff"],
  "ruby-red": ["#ef9a9a", "#e57373", "#ef5350", "#ffd700", "#ffffff"],
  "sapphire-night": ["#64b5f6", "#90caf9", "#bbdefb", "#2196f3", "#ffffff"],
  "diamond-white": ["#e0e0e0", "#bdbdbd", "#eeeeee", "#ffd700", "#ffffff"],
};

export default function SparkleBackground({ bgId, bgSettings }: SparkleProps) {
  const colors = COLOR_MAP[bgId] || COLOR_MAP.paradise;
  const count = bgSettings?.sparkleCount ?? 60;
  const sparkleEnabled = bgSettings?.sparkleEnabled ?? true;
  const bubblesEnabled = bgSettings?.bubblesEnabled ?? true;
  const glowOrbs = bgSettings?.glowOrbs ?? true;
  const opacity = bgSettings?.opacity ?? 0.85;
  const speed = bgSettings?.speed ?? 5;
  const dir = bgSettings?.direction ?? "normal";

  // speed: 1=very slow(8s), 10=fast(1.5s) — inverse mapping
  const baseAnimDuration = (s: number) => {
    const ms = 1.5 + (10 - s) * 0.7;
    return ms;
  };

  const sparkles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 7 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: `${baseAnimDuration(speed) + Math.random() * 2}s`,
    delay: `${Math.random() * 6}s`,
    opacity: Math.random() * 0.7 + 0.3,
  })), [bgId, count, speed]);

  const bubbles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 50 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: `${(10 - speed) * 1.2 + 5 + Math.random() * 5}s`,
    delay: `${Math.random() * 12}s`,
  })), [bgId, speed]);

  return (
    <div className="sparkle-container" aria-hidden="true" style={{ opacity }}>
      {sparkleEnabled && sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle-dot"
          style={{
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2.5}px ${s.color}, 0 0 ${s.size * 5}px ${s.color}44`,
            "--duration": s.duration,
            "--delay": s.delay,
            opacity: s.opacity,
            animationDirection: dir,
          } as React.CSSProperties}
        />
      ))}
      {bubblesEnabled && bubbles.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            left: b.left,
            bottom: "-70px",
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color}99, transparent)`,
            borderRadius: "50%",
            animation: `bubbleFloat ${b.duration} ease-in-out infinite`,
            animationDelay: b.delay,
            animationDirection: dir,
            pointerEvents: "none",
          }}
        />
      ))}
      {/* Large glow orbs */}
      {glowOrbs && (
        <>
          <div className="absolute rounded-full opacity-25 animate-[float_8s_ease-in-out_infinite]"
            style={{ width: 350, height: 350, top: "5%", left: "3%", background: `radial-gradient(circle, ${colors[0]}55, transparent)`, filter: "blur(50px)" }}
          />
          <div className="absolute rounded-full opacity-20 animate-[float_10s_ease-in-out_infinite]"
            style={{ width: 300, height: 300, bottom: "10%", right: "5%", background: `radial-gradient(circle, ${colors[1]}55, transparent)`, filter: "blur(45px)", animationDelay: "2s" }}
          />
          <div className="absolute rounded-full opacity-15 animate-[float_12s_ease-in-out_infinite]"
            style={{ width: 250, height: 250, top: "45%", right: "25%", background: `radial-gradient(circle, ${colors[2]}44, transparent)`, filter: "blur(40px)", animationDelay: "4s" }}
          />
        </>
      )}
    </div>
  );
}
