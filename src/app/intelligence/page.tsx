"use client";

import { useState } from "react";
import Link from "next/link";
import MapView from "./components/MapView";
import LeftSidebar from "./components/LeftSidebar";
import RightPanel from "./components/RightPanel";
import TimeSlider from "./components/TimeSlider";

export default function IntelligenceDashboard() {
  // ── Global state that all panels share ──
  const [currentTime, setCurrentTime] = useState("2024-03-15T14:30:00");
  const [layers, setLayers] = useState({
    satellite: true,
    oilSlick: true,
    vessels: true,
    hindcast: true,
    forecast: false,
  });
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col bg-[#0a0e1a] text-white overflow-hidden">
      
      {/* ── TOP BAR ── */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-[#0d1225]/80 backdrop-blur z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
              OilWatch Intelligence
            </span>
          </div>
          
          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/intelligence" className="text-cyan-400 border-b-2 border-cyan-400 pb-1">Intelligence</Link>
            <Link href="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>Region: Bay of Bengal</span>
          <span>|</span>
          <span>Live Feed</span>
          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">
            ACTIVE
          </span>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <LeftSidebar layers={layers} setLayers={setLayers} />

        {/* CENTER MAP */}
        <div className="flex-1 relative">
          <MapView
            layers={layers}
            currentTime={currentTime}
            selectedVessel={selectedVessel}
            setSelectedVessel={setSelectedVessel}
          />
        </div>

        {/* RIGHT PANEL */}
        <RightPanel selectedVessel={selectedVessel} />
      </div>

      {/* ── BOTTOM TIME SLIDER ── */}
      <TimeSlider currentTime={currentTime} setCurrentTime={setCurrentTime} />
    </div>
  );
}
