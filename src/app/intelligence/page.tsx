"use client";

import { useState } from "react";
import MapView from "./components/MapView";
import LeftSidebar from "./components/LeftSidebar";
import RightPanel from "./components/RightPanel";
import TimeSlider from "./components/TimeSlider";
import IntelligenceHeader from "./components/IntelligenceHeader";

export default function IntelligenceDashboard() {
  // ── Global state shared across all panels (PRESERVED) ──
  const [currentTime, setCurrentTime] = useState("2024-03-15T14:30:00");
  const [layers, setLayers] = useState({
    satellite: true,
    oilSlick: true,
    vessels: true,
    hindcast: true,
    forecast: false,
  });
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);

  // ── Filter state (connected to sidebar + map) ──
  const [scoreThreshold, setScoreThreshold] = useState(30);
  const [vesselType, setVesselType] = useState("all");
  const [radius, setRadius] = useState("100");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-[#F4F6F5] text-[#102A43] overflow-hidden font-sans">

      {/* TOP NAVIGATION */}
      <IntelligenceHeader
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        rightPanelOpen={rightPanelOpen}
        setRightPanelOpen={setRightPanelOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        {!sidebarCollapsed && (
          <LeftSidebar
            layers={layers}
            setLayers={setLayers}
            scoreThreshold={scoreThreshold}
            setScoreThreshold={setScoreThreshold}
            vesselType={vesselType}
            setVesselType={setVesselType}
            radius={radius}
            setRadius={setRadius}
          />
        )}

        {/* CENTER MAP + TIME SLIDER */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <MapView
            layers={layers}
            currentTime={currentTime}
            selectedVessel={selectedVessel}
            setSelectedVessel={setSelectedVessel}
            scoreThreshold={scoreThreshold}
            vesselType={vesselType}
          />
          <TimeSlider currentTime={currentTime} setCurrentTime={setCurrentTime} />
        </div>

        {/* RIGHT PANEL */}
        {rightPanelOpen && (
          <RightPanel
            selectedVessel={selectedVessel}
            setSelectedVessel={setSelectedVessel}
            scoreThreshold={scoreThreshold}
          />
        )}
      </div>
    </div>
  );
}
