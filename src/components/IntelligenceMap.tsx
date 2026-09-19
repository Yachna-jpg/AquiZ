"use client";

import { useEffect, useState } from "react";
import { DEMO_SCENARIO } from "@/data/demoScenario";
import { SpillInfoOverlay } from "./SpillInfoOverlay";

export function IntelligenceMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-[#040D14]" />;

  // ── Corrected Geographic Projection Bounds for Bay of Bengal ──
  // Longitude range: 87.8°E to 88.8°E (1.0° span)
  // Latitude range:  19.4°N to 20.2°N (0.8° span)
  const mapLngToX = (lng: number) => ((lng - 87.8) / 1.0) * 1000;
  const mapLatToY = (lat: number) => (1 - (lat - 19.4) / 0.8) * 600;

  const pointsToSvgPath = (points: { lat: number; lng: number }[]) => {
    if (points.length === 0) return "";
    const head = points[0];
    const tail = points.slice(1);
    return `M ${mapLngToX(head.lng)},${mapLatToY(head.lat)} ` + tail.map(p => `L ${mapLngToX(p.lng)},${mapLatToY(p.lat)}`).join(" ");
  };

  return (
    <div className="relative w-full h-full bg-[#040D14] overflow-hidden group">
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }}
      />

      <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="xMidYMid slice">
        
        {/* Geographically Correct Northwest Coastline (Bay of Bengal / Sundarbans Delta) */}
        <path 
          d="M 0,0 L 260,0 L 220,90 L 140,160 L 60,210 L 0,240 Z" 
          fill="#081827" 
          stroke="#1E2D3D" 
          strokeWidth="1.5" 
        />
        <text x="25" y="40" fill="#4B5E71" fontSize="11" fontFamily="monospace" className="uppercase tracking-widest font-bold">
          INDIAN COASTAL REGION
        </text>

        {/* AIS Vessel Trajectories */}
        {DEMO_SCENARIO.vessels.map(vessel => (
          <path 
            key={`track-${vessel.id}`}
            d={pointsToSvgPath(vessel.trajectory)}
            fill="none"
            stroke={vessel.isCandidate ? "#B8791C" : "#3B4A5A"}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          />
        ))}

        {/* Hindcast Path (Past Drift) */}
        <path 
          d={pointsToSvgPath(DEMO_SCENARIO.drift.hindcastPath)}
          fill="none"
          stroke="#176B87"
          strokeWidth="2.5"
        />

        {/* Forecast Path (Future Drift) */}
        <path 
          d={pointsToSvgPath(DEMO_SCENARIO.drift.forecastPath)}
          fill="none"
          stroke="#176B87"
          strokeWidth="2"
          strokeDasharray="5 3"
        />

        {/* Oil Spill Polygon */}
        <path
          d={pointsToSvgPath(DEMO_SCENARIO.spill.polygon)}
          fill="rgba(182, 64, 64, 0.35)"
          stroke="#B64040"
          strokeWidth="2"
          className="transition-all duration-300 hover:fill-red-500/50 cursor-pointer"
        />

        {/* Spill Origin Marker */}
        <circle 
          cx={mapLngToX(DEMO_SCENARIO.drift.origin.lng)} 
          cy={mapLatToY(DEMO_SCENARIO.drift.origin.lat)} 
          r="4" 
          fill="#B64040"
        />
        <circle 
          cx={mapLngToX(DEMO_SCENARIO.drift.origin.lng)} 
          cy={mapLatToY(DEMO_SCENARIO.drift.origin.lat)} 
          r="12" 
          fill="none"
          stroke="#B64040"
          strokeWidth="1.5"
          className="animate-pulse"
        />
        <text 
          x={mapLngToX(DEMO_SCENARIO.drift.origin.lng) + 14} 
          y={mapLatToY(DEMO_SCENARIO.drift.origin.lat) + 4} 
          fill="#B64040" 
          fontSize="11" 
          fontFamily="monospace"
          fontWeight="bold"
        >
          ORIGIN EST. (-24h)
        </text>

        {/* Vessels Layer */}
        {DEMO_SCENARIO.vessels.map(vessel => {
          const x = mapLngToX(vessel.currentPosition.lng);
          const y = mapLatToY(vessel.currentPosition.lat);
          return (
            <g key={`vessel-${vessel.id}`} className="cursor-pointer transition-transform hover:scale-125">
              <polygon 
                points="-5,5 0,-8 5,5" 
                fill={vessel.isCandidate ? "#B8791C" : "#D8E0E6"} 
                transform={`translate(${x},${y}) rotate(${vessel.headingDegrees})`}
              />
              <text 
                x={x + 10} 
                y={y + 4} 
                fill={vessel.isCandidate ? "#FFB020" : "#A0B0C0"} 
                fontSize="11" 
                fontFamily="monospace"
                fontWeight={vessel.isCandidate ? "bold" : "normal"}
              >
                {vessel.name} {vessel.isCandidate && "⚠️"}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Subtle Scanning Radar Animation Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/20 z-20 animate-[scan_8s_linear_infinite] pointer-events-none" />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(700px); }
        }
      `}} />

      {/* Overlays */}
      <SpillInfoOverlay />
      
      {/* Coordinate Badge */}
      <div className="absolute top-4 right-4 z-20 bg-[#081827] border border-white/10 text-white px-3 py-1.5 pointer-events-none rounded shadow-md">
        <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
          Center: {DEMO_SCENARIO.spill.location.lat}° N / {DEMO_SCENARIO.spill.location.lng}° E
        </span>
      </div>
    </div>
  );
}