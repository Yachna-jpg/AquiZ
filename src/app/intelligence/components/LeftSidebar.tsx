"use client";

import { Eye, EyeOff, Filter, Layers, AlertCircle, Satellite, Droplets, Ship, Wind, Anchor } from "lucide-react";

interface Props {
  layers: Record<string, boolean>;
  setLayers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  scoreThreshold: number;
  setScoreThreshold: (v: number) => void;
  vesselType: string;
  setVesselType: (v: string) => void;
  radius: string;
  setRadius: (v: string) => void;
}

const LAYER_ITEMS = [
  { key: "satellite",  label: "Satellite Imagery", Icon: Satellite, dotColor: "#2E6F9E" },
  { key: "oilSlick",   label: "Oil Slick",         Icon: Droplets,  dotColor: "#C74732" },
  { key: "vessels",    label: "AIS Vessels",        Icon: Ship,      dotColor: "#247C83" },
  { key: "hindcast",   label: "Hindcast Path",      Icon: Anchor,    dotColor: "#C9822B" },
  { key: "forecast",   label: "Forecast Path",      Icon: Wind,      dotColor: "#527A68" },
];

const VESSEL_TYPES = [
  { value: "all",     label: "All Vessels" },
  { value: "tanker",  label: "Tankers" },
  { value: "cargo",   label: "Cargo" },
  { value: "fishing", label: "Fishing" },
];

const RADII = ["50 km", "100 km", "200 km"];

export default function LeftSidebar({
  layers, setLayers,
  scoreThreshold, setScoreThreshold,
  vesselType, setVesselType,
  radius, setRadius,
}: Props) {
  const toggle = (key: string) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="w-[260px] border-r border-[#DCE3E6] bg-white flex flex-col overflow-y-auto shrink-0">

      {/* ── MAP LAYERS ── */}
      <div className="p-4 border-b border-[#F4F6F5]">
        <h3 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647482] mb-3">
          <Layers size={11} />
          Map Layers
        </h3>
        <div className="space-y-0.5">
          {LAYER_ITEMS.map(({ key, label, Icon, dotColor }) => {
            const active = layers[key];
            return (
              <button
                key={key}
                id={`layer-toggle-${key}`}
                onClick={() => toggle(key)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-[13px] transition-colors ${
                  active
                    ? "bg-[#F4F6F5] text-[#102A43]"
                    : "text-[#647482] hover:bg-[#F4F6F5] hover:text-[#102A43]"
                }`}
              >
                {/* Toggle switch */}
                <div
                  className={`relative w-7 h-4 rounded-full transition-colors shrink-0 ${
                    active ? "bg-[#2E6F9E]" : "bg-[#DCE3E6]"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${
                      active ? "left-3.5" : "left-0.5"
                    }`}
                  />
                </div>
                {/* Color dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: active ? dotColor : "#DCE3E6" }}
                />
                <span className="flex-1 text-left truncate">{label}</span>
                {active ? (
                  <Eye size={12} className="text-[#647482] shrink-0" />
                ) : (
                  <EyeOff size={12} className="text-[#DCE3E6] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="p-4 border-b border-[#F4F6F5]">
        <h3 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647482] mb-3">
          <Filter size={11} />
          Filters
        </h3>
        <div className="space-y-4">

          {/* Vessel type */}
          <div>
            <label className="block text-[11px] font-medium text-[#647482] mb-1.5">
              Vessel Type
            </label>
            <select
              id="filter-vessel-type"
              value={vesselType}
              onChange={(e) => setVesselType(e.target.value)}
              className="w-full border border-[#DCE3E6] rounded px-2.5 py-1.5 text-[12px] text-[#102A43] bg-white outline-none focus:border-[#2E6F9E] transition-colors"
            >
              {VESSEL_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Score threshold */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-medium text-[#647482]">
                Score Threshold
              </label>
              <span className="text-[12px] font-semibold text-[#2E6F9E]">
                {scoreThreshold}
              </span>
            </div>
            <input
              id="filter-score-threshold"
              type="range"
              min={0}
              max={100}
              value={scoreThreshold}
              onChange={(e) => setScoreThreshold(Number(e.target.value))}
              className="w-full h-1.5 appearance-none bg-[#DCE3E6] rounded-full outline-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2E6F9E ${scoreThreshold}%, #DCE3E6 ${scoreThreshold}%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-[#647482] mt-1">
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          {/* Radius from spill */}
          <div>
            <label className="block text-[11px] font-medium text-[#647482] mb-1.5">
              Radius from Spill
            </label>
            <div className="flex gap-1.5">
              {RADII.map((r) => (
                <button
                  key={r}
                  id={`filter-radius-${r.replace(" ", "")}`}
                  onClick={() => setRadius(r.split(" ")[0])}
                  className={`flex-1 py-1.5 rounded text-[11px] font-medium border transition-colors ${
                    radius === r.split(" ")[0]
                      ? "bg-[#0B2235] text-white border-[#0B2235]"
                      : "bg-white text-[#647482] border-[#DCE3E6] hover:border-[#2E6F9E] hover:text-[#2E6F9E]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE SPILL CARD ── */}
      <div className="p-4 mt-auto">
        <div className="border border-[#C74732]/30 bg-[#C74732]/5 rounded p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C74732] animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C74732]">
              Active Spill
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#647482]">Detected</span>
              <span className="font-medium text-[#102A43]">08:42 UTC</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#647482]">Source</span>
              <span className="font-medium text-[#102A43]">Sentinel-1 SAR</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#647482]">Candidates</span>
              <span className="font-medium text-[#102A43]">3 vessels</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#647482]">Status</span>
              <span className="font-semibold text-[#C74732] flex items-center gap-1">
                <AlertCircle size={10} /> Investigating
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
