"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Props {
  currentTime: string;
  setCurrentTime: (t: string) => void;
}

// Map slider 0–100 → -24h to +24h offset from detection time
function sliderToLabel(val: number): string {
  const hours = Math.round((val / 100) * 48 - 24);
  if (hours === 0) return "NOW";
  return hours > 0 ? `+${hours}h` : `${hours}h`;
}

const INVESTIGATION_STAGES = [
  { pct: 0,   label: "T-24h" },
  { pct: 33,  label: "Detection" },
  { pct: 50,  label: "NOW" },
  { pct: 67,  label: "Prediction" },
  { pct: 100, label: "T+24h" },
];

export default function TimeSlider({ currentTime, setCurrentTime }: Props) {
  const [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Playback: advance slider over time
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setSliderValue((prev) => {
          if (prev >= 100) {
            setPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  // Sync slider value back to currentTime (PRESERVED)
  useEffect(() => {
    const base = new Date("2026-03-15T14:30:00");
    const offsetHours = (sliderValue / 100) * 48 - 24;
    const t = new Date(base.getTime() + offsetHours * 3600 * 1000);
    setCurrentTime(t.toISOString().slice(0, 19));
  }, [sliderValue, setCurrentTime]);

  function handleSkipBack() {
    setSliderValue((v) => Math.max(0, v - 10));
    setPlaying(false);
  }
  function handleSkipForward() {
    setSliderValue((v) => Math.min(100, v + 10));
    setPlaying(false);
  }

  const label = sliderToLabel(sliderValue);
  const timeDisplay = new Date(currentTime).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });

  return (
    <div className="h-[68px] border-t border-[#DCE3E6] bg-white px-4 flex items-center gap-3 shrink-0">

      {/* Playback controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          id="btn-timeline-prev"
          onClick={handleSkipBack}
          className="p-1.5 rounded hover:bg-[#F4F6F5] text-[#647482] hover:text-[#0B2235] transition-colors"
          title="Previous (-10h)"
        >
          <SkipBack size={14} />
        </button>
        <button
          id="btn-timeline-play"
          onClick={() => setPlaying(!playing)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            playing
              ? "bg-[#C74732] text-white hover:bg-[#a8392a]"
              : "bg-[#0B2235] text-white hover:bg-[#173A52]"
          }`}
          title={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>
        <button
          id="btn-timeline-next"
          onClick={handleSkipForward}
          className="p-1.5 rounded hover:bg-[#F4F6F5] text-[#647482] hover:text-[#0B2235] transition-colors"
          title="Next (+10h)"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Timeline slider + stage markers */}
      <div className="flex-1 relative">
        {/* Stage tick marks */}
        <div className="relative mb-0.5">
          {INVESTIGATION_STAGES.map(({ pct, label: stageLabel }) => (
            <span
              key={pct}
              className={`absolute text-[9px] font-medium -translate-x-1/2 ${
                stageLabel === "NOW" ? "text-[#C74732]" : "text-[#647482]"
              }`}
              style={{ left: `${pct}%` }}
            >
              {stageLabel}
            </span>
          ))}
        </div>
        {/* Slider */}
        <div className="relative mt-3">
          <input
            id="timeline-slider"
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => {
              setSliderValue(Number(e.target.value));
              setPlaying(false);
            }}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer outline-none"
            style={{
              background: `linear-gradient(to right, #2E6F9E ${sliderValue}%, #DCE3E6 ${sliderValue}%)`,
            }}
          />
          {/* NOW line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-[#C74732] pointer-events-none"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          />
        </div>
      </div>

      {/* Current time display */}
      <div className="shrink-0 border border-[#DCE3E6] rounded px-3 py-1.5 min-w-[140px] text-right">
        <div className="text-[9px] uppercase tracking-wider text-[#647482]">Current View</div>
        <div
          className="text-[12px] font-semibold tabular-nums"
          style={{ color: sliderValue === 50 ? "#C74732" : "#0B2235" }}
        >
          {label}
        </div>
        <div className="text-[9px] text-[#647482] font-mono">{timeDisplay}</div>
      </div>
    </div>
  );
}
