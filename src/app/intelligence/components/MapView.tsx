"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Search, ZoomIn, ZoomOut, Crosshair } from "lucide-react";

// ── Dynamic import to avoid SSR window errors ──
const MapCore = dynamic(
  () => import("./MapCore").then((m) => ({ default: m.default })),
  { ssr: false }
);

interface Props {
  layers: Record<string, boolean>;
  currentTime: string;
  selectedVessel: string | null;
  setSelectedVessel: (id: string | null) => void;
  scoreThreshold: number;
  vesselType: string;
}

export default function MapView(props: Props) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTarget, setSearchTarget] = useState<{ query: string; ts: number } | null>(null);

  useEffect(() => { setMounted(true); }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchTarget({ query: searchQuery.trim(), ts: Date.now() });
  }

  if (!mounted) {
    return (
      <div className="flex-1 bg-[#E8EDF0] flex items-center justify-center">
        <span className="text-[13px] text-[#647482]">Loading map…</span>
      </div>
    );
  }

  return (
    <div className="flex-1 relative flex flex-col overflow-hidden">



      {/* ── COORDINATE DISPLAY ── */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white border border-[#DCE3E6] rounded px-2.5 py-1 shadow-sm">
        <span className="text-[11px] font-mono text-[#647482]">
          19.820°N, 88.315°E · Bay of Bengal
        </span>
      </div>

      {/* ── MAP CORE (client-only) ── */}
      <MapCore
        {...props}
        searchTarget={searchTarget}
      />
    </div>
  );
}
