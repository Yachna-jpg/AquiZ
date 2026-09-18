"use client";

import { useEffect, useState } from "react";
import { DEMO_SCENARIO } from "@/data/demoScenario";
import { SpillInfoOverlay } from "./SpillInfoOverlay";

export function IntelligenceMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-navy" />;

  const mapLngToX = (lng: number) => ((lng - 88.0) / 0.6) * 1000;
  const mapLatToY = (lat: number) => (1 - (lat - 19.6) / 0.5) * 600;

  const pointsToSvgPath = (points: { lat: number; lng: number }[]) => {
    if (points.length === 0) return "";
    const head = points[0];
    const tail = points.slice(1);
    return `M ${mapLngToX(head.lng)},${mapLatToY(head.lat)} ` + tail.map(p => `L ${mapLngToX(p.lng)},${mapLatToY(p.lat)}`).join(" ");
  };

  return (
    <div className="relative w-full h-full bg-[#040D14] overflow-hidden group">
      {/* Grid Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="xMidYMid slice">
        {/* Coastline Layer */}
        <path d="M 0,0 L 200,0 L 250,150 L 150,300 L 280,450 L 200,600 L 0,600 Z" fill="#081827" stroke="#1E2D3D" strokeWidth="1" />
        <text x="30" y="40" fill="#526476" fontSize="12" fontFamily="monospace" className="uppercase tracking-widest">LANDMASS</text>

        {/* AIS Trajectory Layer */}
        {DEMO_SCENARIO.vessels.map(vessel => (
          <path 
            key={`track-${vessel.id}`}
            d={pointsToSvgPath(vessel.trajectory)}
            fill="none"
            stroke={vessel.isCandidate ? "#B8791C" : "#526476"}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-1000"
          />
        ))}

        {/* Hindcast Layer */}
        <path 
          d={pointsToSvgPath(DEMO_SCENARIO.drift.hindcastPath)}
          fill="none"
          stroke="#176B87"
          strokeWidth="2"
        />

        {/* Forecast Layer */}
        <path 
          d={pointsToSvgPath(DEMO_SCENARIO.drift.forecastPath)}
          fill="none"
          stroke="#176B87"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Oil Spill Polygon Layer */}
        <path
          d={pointsToSvgPath(DEMO_SCENARIO.spill.polygon)}
          fill="rgba(182, 64, 64, 0.3)"
          stroke="#B64040"
          strokeWidth="1.5"
          className="transition-all duration-700 hover:fill-red-500/50 cursor-pointer"
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
          r="10" 
          fill="none"
          stroke="#B64040"
          strokeWidth="1"
          className="animate-pulse"
        />
        <text 
          x={mapLngToX(DEMO_SCENARIO.drift.origin.lng) + 12} 
          y={mapLatToY(DEMO_SCENARIO.drift.origin.lat) + 4} 
          fill="#B64040" 
          fontSize="11" 
          fontFamily="monospace"
        >
          ORIGIN EST.
        </text>

        {/* Vessel Layer */}
        {DEMO_SCENARIO.vessels.map(vessel => {
          const x = mapLngToX(vessel.currentPosition.lng);
          const y = mapLatToY(vessel.currentPosition.lat);
          return (
            <g key={`vessel-${vessel.id}`} className="cursor-pointer transition-transform hover:scale-110">
              <polygon 
                points="-5,5 0,-8 5,5" 
                fill={vessel.isCandidate ? "#B8791C" : "#D8E0E6"} 
                transform={`translate(${x},${y}) rotate(${vessel.headingDegrees})`}
              />
              <text x={x + 10} y={y + 4} fill={vessel.isCandidate ? "#B8791C" : "#D8E0E6"} fontSize="11" fontFamily="monospace">
                {vessel.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Subtle Scanning Line (No neon) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20 animate-[scan_8s_linear_infinite] pointer-events-none" />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(700px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[scan_8s_linear_infinite\\] { display: none; }
        }
      `}} />

      {/* Overlays */}
      <SpillInfoOverlay />
      
      <div className="absolute top-4 right-4 z-20 bg-navy text-white px-2 py-1 pointer-events-none rounded-sm">
        <span className="text-[10px] font-mono uppercase">Lat: {DEMO_SCENARIO.spill.location.lat}° N / Lng: {DEMO_SCENARIO.spill.location.lng}° E</span>
      </div>
    </div>
  );
}
