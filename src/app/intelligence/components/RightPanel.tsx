"use client";

import { useState } from "react";
import {
  Droplets,
  Wind,
  Waves,
  Thermometer,
  Ship,
  Clock,
  MapPin,
  AlertTriangle,
  ChevronRight,
  Image as ImageIcon,
  Navigation,
  CloudRain,
  Anchor,
  Download,
  CheckCircle,
  Eye,
  Satellite,
} from "lucide-react";

// ── Vessel data (matches MapView.tsx exactly — PRESERVED) ──
const VESSELS = [
  { id: "V001", name: "MV Ocean Star",   flag: "🇮🇳", type: "Tanker",   score: 87, anomaly: true,  speed: 0.4, course: 218, distKm: 1.3 },
  { id: "V002", name: "MT Pacific Dawn", flag: "🇸🇬", type: "Tanker",   score: 69, anomaly: false, speed: 12.1, course: 45,  distKm: 4.8 },
  { id: "V003", name: "MV Blue Horizon", flag: "🇬🇧", type: "Cargo",    score: 43, anomaly: false, speed: 9.3, course: 130, distKm: 6.2 },
];

// ── Investigation timeline stages ──
const TIMELINE_STAGES = [
  { id: "detection",    label: "Satellite Detection",  done: true  },
  { id: "confirmation", label: "Oil Slick Confirmed",  done: true  },
  { id: "correlation",  label: "Vessel Correlation",   done: true  },
  { id: "drift",        label: "Drift Prediction",     done: false },
  { id: "origin",       label: "Origin Analysis",      done: false },
];

type TabKey = "imagery" | "ais" | "weather" | "ocean";

interface Props {
  selectedVessel: string | null;
  setSelectedVessel: (id: string | null) => void;
  scoreThreshold: number;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 75 ? "#C74732" :
    score >= 50 ? "#C9822B" :
    "#527A68";
  return (
    <span
      className="text-[11px] font-bold px-1.5 py-0.5 rounded"
      style={{ color, backgroundColor: `${color}15` }}
    >
      {score}
    </span>
  );
}

export default function RightPanel({ selectedVessel, setSelectedVessel, scoreThreshold }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("imagery");
  const [imageryIndex, setImageryIndex] = useState(0);

  const filteredVessels = VESSELS.filter((v) => v.score >= scoreThreshold);

  const TABS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
    { key: "imagery",  label: "Imagery",       Icon: ImageIcon   },
    { key: "ais",      label: "AIS Tracks",    Icon: Navigation  },
    { key: "weather",  label: "Weather",       Icon: CloudRain   },
    { key: "ocean",    label: "Oceanographic", Icon: Anchor      },
  ];

  const IMAGERY_FRAMES = [
    { ts: "2026-03-15 06:00 UTC", source: "Sentinel-1A", band: "C-SAR (VV)" },
    { ts: "2026-03-15 10:22 UTC", source: "Sentinel-1B", band: "C-SAR (VH)" },
    { ts: "2026-03-15 14:30 UTC", source: "Sentinel-1A", band: "C-SAR (VV)" },
  ];

  function handleDownloadReport() {
    const csv = [
      "Name,Flag,Type,Score,Anomaly,Speed,Course,Dist_km",
      ...filteredVessels.map(v =>
        `${v.name},${v.flag},${v.type},${v.score},${v.anomaly},${v.speed},${v.course},${v.distKm}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aquiz_vessel_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="w-[300px] border-l border-[#DCE3E6] bg-white flex flex-col overflow-y-auto shrink-0">

      {/* ── SPILL OVERVIEW ── */}
      <div className="p-4 border-b border-[#F4F6F5]">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647482] mb-3">
          Spill Overview
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Area",       value: "12.4 km²",          Icon: Droplets   },
            { label: "Age",        value: "8–12 h",            Icon: Clock      },
            { label: "Location",   value: "19.82°N, 88.31°E",  Icon: MapPin     },
            { label: "Confidence", value: "94%",               Icon: CheckCircle },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="bg-[#F8FAF9] border border-[#DCE3E6] rounded p-2.5">
              <div className="flex items-center gap-1 mb-1">
                <Icon size={10} className="text-[#647482]" />
                <span className="text-[10px] text-[#647482]">{label}</span>
              </div>
              <div className="text-[12px] font-semibold text-[#0B2235] leading-tight">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ENVIRONMENTAL CONDITIONS ── */}
      <div className="p-4 border-b border-[#F4F6F5]">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647482] mb-3">
          Environmental Conditions
        </h3>
        <div className="space-y-1.5">
          {[
            { Icon: Wind,        label: "Wind",    value: "12 kn NE", color: "#2E6F9E" },
            { Icon: Waves,       label: "Current", value: "0.8 kn E", color: "#247C83" },
            { Icon: Waves,       label: "Waves",   value: "1.2 m",    color: "#247C83" },
            { Icon: Thermometer, label: "SST",     value: "28.4 °C",  color: "#C9822B" },
          ].map(({ Icon, label, value, color }) => (
            <div
              key={label}
              className="flex items-center justify-between px-2.5 py-2 rounded bg-[#F8FAF9] border border-[#DCE3E6]"
            >
              <div className="flex items-center gap-2">
                <Icon size={12} style={{ color }} />
                <span className="text-[12px] text-[#647482]">{label}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#102A43]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CANDIDATE VESSELS ── */}
      <div className="p-4 border-b border-[#F4F6F5]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647482]">
            Candidate Vessels
          </h3>
          <span className="text-[10px] text-[#647482]">
            {filteredVessels.length} of {VESSELS.length}
          </span>
        </div>
        <div className="space-y-1.5">
          {filteredVessels.map((v) => {
            const isSelected = selectedVessel === v.id;
            return (
              <div
                key={v.id}
                id={`vessel-card-${v.id}`}
                onClick={() => setSelectedVessel(isSelected ? null : v.id)}
                className={`rounded border p-2.5 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#2E6F9E] bg-[#2E6F9E]/5"
                    : "border-[#DCE3E6] bg-white hover:border-[#173A52] hover:bg-[#F8FAF9]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Ship size={12} className="text-[#2E6F9E] shrink-0" />
                    <span className="text-[12px] font-medium text-[#102A43] truncate max-w-[120px]">{v.name}</span>
                    <span className="text-[11px]">{v.flag}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {v.anomaly && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold text-[#C9822B] bg-[#C9822B]/10 px-1 py-0.5 rounded">
                        <AlertTriangle size={8} /> ANOMALY
                      </span>
                    )}
                    <ScoreBadge score={v.score} />
                  </div>
                </div>
                {/* Score bar */}
                <div className="h-1 bg-[#DCE3E6] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${v.score}%`,
                      backgroundColor:
                        v.score >= 75 ? "#C74732" :
                        v.score >= 50 ? "#C9822B" :
                        "#527A68",
                    }}
                  />
                </div>
                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-[#DCE3E6] flex justify-between">
                    <button
                      id={`btn-view-details-${v.id}`}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#2E6F9E] hover:text-[#0B2235] transition-colors"
                    >
                      <Eye size={11} /> View Details
                    </button>
                    <button
                      id={`btn-investigate-${v.id}`}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#647482] hover:text-[#0B2235] transition-colors"
                    >
                      Investigate <ChevronRight size={11} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filteredVessels.length === 0 && (
          <p className="text-[12px] text-[#647482] text-center py-4">
            No vessels meet score threshold.
          </p>
        )}
        <p className="text-[10px] text-[#647482] mt-2 leading-relaxed">
          Scores based on spatio-temporal analysis. Not a legal determination.
        </p>
      </div>

      {/* ── INVESTIGATION TIMELINE ── */}
      <div className="p-4 border-b border-[#F4F6F5]">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647482] mb-3">
          Investigation Timeline
        </h3>
        <div className="relative pl-4">
          {TIMELINE_STAGES.map((stage, idx) => (
            <div key={stage.id} className="relative flex items-start gap-2.5 mb-3 last:mb-0">
              {/* Vertical connector */}
              {idx < TIMELINE_STAGES.length - 1 && (
                <div
                  className={`absolute left-[3px] top-3 w-px h-[calc(100%+4px)] ${
                    stage.done ? "bg-[#2E6F9E]" : "bg-[#DCE3E6]"
                  }`}
                />
              )}
              {/* Dot */}
              <div
                className={`w-2 h-2 rounded-full shrink-0 mt-0.5 border ${
                  stage.done
                    ? "bg-[#2E6F9E] border-[#2E6F9E]"
                    : "bg-white border-[#DCE3E6]"
                }`}
              />
              <span
                className={`text-[12px] leading-tight ${
                  stage.done ? "text-[#102A43] font-medium" : "text-[#647482]"
                }`}
              >
                {stage.label}
              </span>
              {stage.done && (
                <CheckCircle size={11} className="text-[#527A68] ml-auto shrink-0 mt-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── ADDITIONAL DATA TABS ── */}
      <div className="flex-1 flex flex-col">
        <div className="flex border-b border-[#DCE3E6] shrink-0">
          {TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              id={`tab-${key}`}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors border-b-2 ${
                activeTab === key
                  ? "border-[#2E6F9E] text-[#2E6F9E]"
                  : "border-transparent text-[#647482] hover:text-[#0B2235]"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-4 flex-1">
          {activeTab === "imagery" && (
            <div className="space-y-3">
              {/* Satellite image placeholder */}
              <div className="w-full h-28 bg-[#F4F6F5] border border-[#DCE3E6] rounded flex items-center justify-center relative overflow-hidden">
                <div className="text-[10px] text-[#647482] flex flex-col items-center gap-1">
                  <Satellite size={20} className="text-[#DCE3E6]" />
                  <span>SAR Imagery Preview</span>
                </div>
                {/* Navigator buttons */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                  <button
                    id="btn-imagery-prev"
                    onClick={() => setImageryIndex((i) => Math.max(0, i - 1))}
                    disabled={imageryIndex === 0}
                    className="px-2 py-0.5 rounded text-[10px] border border-[#DCE3E6] bg-white text-[#647482] disabled:opacity-40 hover:border-[#2E6F9E] transition-colors"
                  >
                    ← Prev
                  </button>
                  <button
                    id="btn-imagery-next"
                    onClick={() => setImageryIndex((i) => Math.min(IMAGERY_FRAMES.length - 1, i + 1))}
                    disabled={imageryIndex === IMAGERY_FRAMES.length - 1}
                    className="px-2 py-0.5 rounded text-[10px] border border-[#DCE3E6] bg-white text-[#647482] disabled:opacity-40 hover:border-[#2E6F9E] transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#647482]">Timestamp</span>
                  <span className="font-medium text-[#102A43]">{IMAGERY_FRAMES[imageryIndex].ts}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#647482]">Source</span>
                  <span className="font-medium text-[#102A43]">{IMAGERY_FRAMES[imageryIndex].source}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#647482]">Band</span>
                  <span className="font-medium text-[#102A43]">{IMAGERY_FRAMES[imageryIndex].band}</span>
                </div>
                <div className="text-[10px] text-[#647482]">
                  Frame {imageryIndex + 1} of {IMAGERY_FRAMES.length}
                </div>
              </div>
            </div>
          )}

          {activeTab === "ais" && (
            <div className="space-y-2">
              <p className="text-[11px] text-[#647482]">AIS track data for candidate vessels in the 48-hour window around detection.</p>
              {VESSELS.map((v) => (
                <div key={v.id} className="border border-[#DCE3E6] rounded p-2.5 text-[11px]">
                  <div className="font-medium text-[#102A43] mb-1">{v.name} {v.flag}</div>
                  <div className="flex justify-between text-[#647482]">
                    <span>Speed</span>
                    <span className="font-medium text-[#102A43]">{v.speed} kn</span>
                  </div>
                  <div className="flex justify-between text-[#647482]">
                    <span>Course</span>
                    <span className="font-medium text-[#102A43]">{String(v.course).padStart(3, "0")}°</span>
                  </div>
                  <div className="flex justify-between text-[#647482]">
                    <span>Dist. to spill</span>
                    <span className="font-medium text-[#102A43]">{v.distKm} km</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "weather" && (
            <div className="space-y-2">
              <p className="text-[11px] text-[#647482] mb-3">Weather data at spill location at time of detection.</p>
              {[
                { label: "Wind Speed",    value: "12 kn" },
                { label: "Wind Direction",value: "NE (045°)" },
                { label: "Wave Height",   value: "1.2 m" },
                { label: "Wave Period",   value: "7.3 s" },
                { label: "Visibility",    value: "12 km" },
                { label: "Precipitation", value: "0 mm" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-[12px] py-1.5 border-b border-[#F4F6F5] last:border-0">
                  <span className="text-[#647482]">{label}</span>
                  <span className="font-medium text-[#102A43]">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ocean" && (
            <div className="space-y-2">
              <p className="text-[11px] text-[#647482] mb-3">Oceanographic parameters at detection coordinates.</p>
              {[
                { label: "Sea Surface Temp.", value: "28.4 °C" },
                { label: "Surface Current",   value: "0.8 kn E" },
                { label: "Salinity",          value: "34.2 PSU" },
                { label: "Mixed Layer Depth", value: "42 m" },
                { label: "Stokes Drift",      value: "0.12 m/s" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-[12px] py-1.5 border-b border-[#F4F6F5] last:border-0">
                  <span className="text-[#647482]">{label}</span>
                  <span className="font-medium text-[#102A43]">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Download report */}
        <div className="p-4 border-t border-[#DCE3E6]">
          <button
            id="btn-download-report"
            onClick={handleDownloadReport}
            className="w-full flex items-center justify-center gap-2 py-2 border border-[#0B2235] bg-[#0B2235] text-white rounded text-[12px] font-medium hover:bg-[#173A52] transition-colors"
          >
            <Download size={13} />
            Export CSV Report
          </button>
        </div>
      </div>
    </aside>
  );
}
