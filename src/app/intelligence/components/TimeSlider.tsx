"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Props {
  currentTime: string;
  setCurrentTime: (t: string) => void;
}

export default function TimeSlider({ currentTime, setCurrentTime }: Props) {
  const [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(50); // 0-100

  // Map slider 0-100 to -24h → +24h
  const hours = ((sliderValue / 100) * 48 - 24).toFixed(0);
  const label = Number(hours) === 0 ? "NOW" : `${hours}h`;

  return (
    <div className="h-[72px] border-t border-white/10 bg-[#0d1225]/95 backdrop-blur px-6 flex items-center gap-4">
      
      {/* Playback controls */}
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded hover:bg-white/10 text-gray-400">
          <SkipBack size={14} />
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button className="p-1.5 rounded hover:bg-white/10 text-gray-400">
          <SkipForward size={14} />
        </button>
      </div>

      {/* Time labels */}
      <div className="flex items-center gap-2 text-[10px] text-gray-500 min-w-[120px]">
        <span>-24h</span>
      </div>

      {/* Slider */}
      <div className="flex-1 relative">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full accent-cyan-500 h-1 cursor-pointer"
        />
        {/* NOW marker */}
        <div
          className="absolute top-[-18px] text-[9px] text-cyan-400 font-bold"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          NOW
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-gray-500 min-w-[120px] justify-end">
        <span>+24h</span>
      </div>

      {/* Current time display */}
      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 min-w-[160px] text-center">
        <div className="text-[10px] text-gray-500 mb-0.5">Current View</div>
        <div className="text-sm font-mono font-bold text-cyan-400">
          {label}
        </div>
      </div>
    </div>
  );
}
