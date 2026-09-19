"use client";

import { Eye, EyeOff, Filter, Layers } from "lucide-react";

interface Props {
  layers: Record<string, boolean>;
  setLayers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const LAYER_ITEMS = [
  { key: "satellite", label: "Satellite Imagery", color: "bg-blue-500" },
  { key: "oilSlick", label: "Oil Slick", color: "bg-orange-500" },
  { key: "vessels", label: "AIS Vessels", color: "bg-cyan-400" },
  { key: "hindcast", label: "Hindcast Path", color: "bg-red-500" },
  { key: "forecast", label: "Forecast Path", color: "bg-teal-400" },
];

export default function LeftSidebar({ layers, setLayers }: Props) {
  const toggle = (key: string) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="w-[280px] border-r border-white/10 bg-[#0d1225]/90 backdrop-blur flex flex-col overflow-y-auto">
      
      {/* ── Layer Toggles ── */}
      <div className="p-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 flex items-center gap-2">
          <Layers size={12} /> Map Layers
        </h3>
        <div className="space-y-1">
          {LAYER_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                ${layers[item.key]
                  ? "bg-white/5 text-white"
                  : "text-gray-600 hover:text-gray-400"
                }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${item.color} ${!layers[item.key] && "opacity-30"}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {layers[item.key] ? <Eye size={13} /> : <EyeOff size={13} />}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 mx-4" />

      {/* ── Quick Filters ── */}
      <div className="p-4">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 flex items-center gap-2">
          <Filter size={12} /> Filters
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">Vessel Type</label>
            <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-gray-300 outline-none">
              <option>All Vessels</option>
              <option>Tankers</option>
              <option>Cargo</option>
              <option>Fishing</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">Score Threshold</label>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={30}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-gray-600">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">Radius from Spill</label>
            <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs text-gray-300 outline-none">
              <option>50 km</option>
              <option>100 km</option>
              <option>200 km</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 mx-4" />

      {/* ── Active Alert ── */}
      <div className="p-4 mt-auto">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
              Active Spill
            </span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Spill detected 2h ago via Sentinel-1 SAR. 3 candidate vessels identified.
          </p>
        </div>
      </div>
    </aside>
  );
}
