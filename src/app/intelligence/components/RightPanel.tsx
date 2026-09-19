"use client";

import { Droplets, Wind, Waves, Thermometer, Ship, Clock, MapPin } from "lucide-react";

const VESSELS = [
  { id: "V001", name: "MV Ocean Star", score: 87, flag: "🇮🇳", anomaly: true },
  { id: "V002", name: "MT Pacific Dawn", score: 69, flag: "🇸🇬", anomaly: false },
  { id: "V003", name: "MV Blue Horizon", score: 43, flag: "🇬🇧", anomaly: false },
];

export default function RightPanel({ selectedVessel }: { selectedVessel: string | null }) {
  return (
    <aside className="w-[320px] border-l border-white/10 bg-[#0d1225]/90 backdrop-blur overflow-y-auto">
      
      {/* ── Spill Quick Stats ── */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          Spill Overview
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Area", value: "12.4 km²", icon: Droplets },
            { label: "Age", value: "~8–12h", icon: Clock },
            { label: "Location", value: "19.82°N", icon: MapPin },
            { label: "Confidence", value: "94%", icon: Droplets },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <stat.icon size={11} className="text-gray-500" />
                <span className="text-[10px] text-gray-500">{stat.label}</span>
              </div>
              <div className="text-sm font-semibold text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Weather & Ocean ── */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          Conditions
        </h3>
        <div className="space-y-2">
          {[
            { icon: Wind, label: "Wind", value: "12 kn NE", color: "text-blue-400" },
            { icon: Waves, label: "Current", value: "0.8 kn E", color: "text-teal-400" },
            { icon: Waves, label: "Waves", value: "1.2 m", color: "text-cyan-400" },
            { icon: Thermometer, label: "SST", value: "28.4°C", color: "text-orange-400" },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between bg-white/5 rounded px-3 py-2">
              <div className="flex items-center gap-2">
                <c.icon size={13} className={c.color} />
                <span className="text-xs text-gray-400">{c.label}</span>
              </div>
              <span className="text-xs font-medium text-white">{c.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Candidate Vessels ── */}
      <div className="p-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          Candidate Vessels
        </h3>
        <div className="space-y-2">
          {VESSELS.map((v) => (
            <div
              key={v.id}
              className={`rounded-lg p-3 cursor-pointer transition-all border
                ${selectedVessel === v.id
                  ? "bg-cyan-500/10 border-cyan-500/40"
                  : "bg-white/5 border-transparent hover:bg-white/10"
                }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Ship size={13} className="text-cyan-400" />
                  <span className="text-sm font-medium">{v.name}</span>
                  <span className="text-xs">{v.flag}</span>
                </div>
                {v.anomaly && (
                  <span className="text-[9px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-bold">
                    ⚠ ANOMALY
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${v.score}%`,
                      background: v.score > 75 ? "#00ff88" : v.score > 50 ? "#ffaa00" : "#ff4444",
                    }}
                  />
                </div>
                <span className="text-xs font-bold" style={{
                  color: v.score > 75 ? "#00ff88" : v.score > 50 ? "#ffaa00" : "#ff4444",
                }}>
                  {v.score}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-3 leading-relaxed">
          * Correlation scores based on spatio-temporal analysis. Not a determination of liability.
        </p>
      </div>
    </aside>
  );
}
