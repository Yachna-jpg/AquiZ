"use client";

import { useState } from "react";
import { 
  Satellite, Cpu, Map, Target, ShieldAlert, 
  Layers, Scan, Activity, Download 
} from "lucide-react";
import Link from "next/link";

export default function SpillAnalysisPage() {
  const [activeTab, setActiveTab] = useState<"raw" | "mask" | "polygon">("mask");

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col font-sans">
      
      {/* ── HEADER ── */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-[#0d1225]/80 backdrop-blur z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Scan className="text-cyan-400" size={18} />
            <span className="text-sm font-semibold tracking-widest uppercase text-cyan-400">
              Detection Analysis
            </span>
            <span className="text-gray-500 text-xs hidden sm:inline">/ Event ID: S-2026-06-28</span>
          </div>
          
          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/intelligence" className="text-gray-400 hover:text-white transition-colors">Intelligence</Link>
            <Link href="/analysis" className="text-cyan-400 border-b-2 border-cyan-400 pb-1">Analysis</Link>
          </nav>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ── LEFT: IMAGE VIEWER (Spans 2 columns) ── */}
          <div className="lg:col-span-2 bg-[#0d1225] border border-white/10 rounded-xl flex flex-col overflow-hidden">
            
            {/* View Toggles */}
            <div className="flex items-center p-4 border-b border-white/10 gap-2">
              <button 
                onClick={() => setActiveTab("raw")}
                className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition-all ${
                  activeTab === "raw" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-gray-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Satellite size={16} /> Raw Sentinel-1 SAR
              </button>
              <button 
                onClick={() => setActiveTab("mask")}
                className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition-all ${
                  activeTab === "mask" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-gray-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Cpu size={16} /> AI Segmentation Mask
              </button>
              <button 
                onClick={() => setActiveTab("polygon")}
                className={`px-4 py-2 text-sm rounded flex items-center gap-2 transition-all ${
                  activeTab === "polygon" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "text-gray-400 hover:bg-white/5 border border-transparent"
                }`}
              >
                <Map size={16} /> Extracted Polygon
              </button>
            </div>

            {/* Image Display Area */}
            <div className="relative w-full h-[500px] bg-black flex items-center justify-center p-8">
              
              {/* 
                NOTE FOR HACKATHON: 
                Replace these div backgrounds with actual <img src="..." /> tags 
                pointing to your real or mock SAR and Mask images!
              */}
              
              {activeTab === "raw" && (
                <div className="w-full h-full border border-gray-700 bg-black rounded flex items-center justify-center overflow-hidden">
                   <img src="/xyz.png" alt="Raw SAR Imagery" className="w-full h-full object-contain" />
                </div>
              )}

              {activeTab === "mask" && (
                <div className="w-full h-full relative border border-gray-700 bg-black rounded flex items-center justify-center overflow-hidden">
                  <img src="/xyz.png" alt="SAR Imagery" className="w-full h-full object-contain" />
                  {/* Simulated AI Mask Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                      <polygon points="30,20 70,30 80,70 40,80 20,50" fill="rgba(168,85,247,0.5)" stroke="#a855f7" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              )}

              {activeTab === "polygon" && (
                <div className="w-full h-full border border-gray-700 bg-[#0a0e1a] rounded flex items-center justify-center">
                   {/* Simulated Clean Polygon extraction on dark bg */}
                   <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
                      <polygon points="30,20 70,30 80,70 40,80 20,50" fill="rgba(255,102,0,0.2)" stroke="#ff6600" strokeWidth="2" strokeDasharray="2,2" />
                      <circle cx="50" cy="50" r="1.5" fill="#ff6600" />
                      <text x="50" y="55" fill="#ff6600" fontSize="4" textAnchor="middle">Centroid</text>
                    </svg>
                </div>
              )}

            </div>
          </div>

          {/* ── RIGHT: METRICS & DETAILS (Spans 1 column) ── */}
          <div className="flex flex-col gap-6">
            
            {/* Spill Characteristics */}
            <div className="bg-[#0d1225] border border-white/10 rounded-xl p-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <Target size={14} /> Physical Characteristics
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded border border-white/5">
                  <div className="text-[10px] text-gray-400 mb-1">Total Area</div>
                  <div className="text-lg font-mono text-white">12.4 <span className="text-xs text-gray-500">km²</span></div>
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/5">
                  <div className="text-[10px] text-gray-400 mb-1">Perimeter</div>
                  <div className="text-lg font-mono text-white">14.2 <span className="text-xs text-gray-500">km</span></div>
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/5">
                  <div className="text-[10px] text-gray-400 mb-1">Max Length</div>
                  <div className="text-lg font-mono text-white">5.1 <span className="text-xs text-gray-500">km</span></div>
                </div>
                <div className="bg-white/5 p-3 rounded border border-white/5">
                  <div className="text-[10px] text-gray-400 mb-1">Est. Volume</div>
                  <div className="text-lg font-mono text-orange-400">~5,200 <span className="text-xs text-orange-500/70">bbl</span></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-gray-400">Centroid Lat</span>
                  <span className="font-mono">19.8245° N</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-gray-400">Centroid Lng</span>
                  <span className="font-mono">88.3120° E</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-white/5">
                  <span className="text-gray-400">Est. Spill Age</span>
                  <span className="text-white">8 - 12 hours</span>
                </div>
              </div>
            </div>

            {/* AI Model Performance */}
            <div className="bg-[#0d1225] border border-white/10 rounded-xl p-6 flex-1">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                <ShieldAlert size={14} /> Model Inference
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Detection Confidence</span>
                  <span className="text-green-400 font-bold">94.2%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-400 h-full w-[94.2%]" />
                </div>
              </div>

              <div className="space-y-3 text-sm mt-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Architecture</span>
                  <span className="text-gray-300">U-Net++ (ResNet50)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Data Source</span>
                  <span className="text-gray-300">Sentinel-1 (SAR)</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-500">Granule</span>
                  <span className="text-[10px] font-mono text-cyan-400/70 truncate text-right" title="S1D_IW_GRDH_1SDV_20260628T234818_20260628T234832_003443_00613B_86B5">
                    S1D_IW_GRDH_1SDV_20260628...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Processing Time</span>
                  <span className="text-gray-300">1.24s</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-2.5 rounded text-sm transition-all flex items-center justify-center gap-2">
                <Download size={16} /> Export Shapefile (.shp)
              </button>
            </div>

          </div>
        </div>

        {/* ── BOTTOM: AI PIPELINE STATUS ── */}
        <div className="bg-[#0d1225] border border-white/10 rounded-xl p-6 mt-2">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
            <Activity size={14} /> Automated Processing Pipeline
          </h3>
          
          <div className="flex items-center justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-white/10 -z-10 -translate-y-1/2" />
            
            {[
              { label: "SAR Ingestion", desc: "Sentinel-1 GRD", active: true },
              { label: "Preprocessing", desc: "Speckle Denoising", active: true },
              { label: "Segmentation", desc: "U-Net Inferencing", active: true },
              { label: "Vectorization", desc: "Polygon Extraction", active: true },
              { label: "Hindcast Ready", desc: "Send to Ocean Model", active: false, pulse: true },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center bg-[#0d1225] px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-3
                  ${step.active ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-white/5 border-white/10 text-gray-600"}
                  ${step.pulse ? "animate-pulse border-cyan-500/50" : ""}
                `}>
                  <Layers size={18} />
                </div>
                <span className={`text-xs font-bold ${step.active ? "text-white" : "text-gray-500"}`}>{step.label}</span>
                <span className="text-[10px] text-gray-500 mt-0.5">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
