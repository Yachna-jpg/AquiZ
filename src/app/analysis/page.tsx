"use client";

import { useState } from "react";
import { 
  Satellite, Cpu, Map, Target, ShieldAlert, 
  Layers, Scan, Activity, Download, Copy,
  CheckCircle, Navigation, FileText
} from "lucide-react";
import Link from "next/link";

export default function SpillAnalysisPage() {
  const [activeTab, setActiveTab] = useState<"raw" | "mask" | "polygon">("mask");
  const [sliderValue, setSliderValue] = useState(50);
  const [copied, setCopied] = useState(false);

  const granuleName = "S1D_IW_GRDH_1SDV_20240315T084200_20240315T084225_003443_00613B_86B5";

  const handleCopy = () => {
    navigator.clipboard.writeText(granuleName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Polygon shape based on MapCore.tsx SPILL_POLYGON
  const polyPoints = "8,30 48,0 88,12 100,59 68,100 20,88 0,59 8,30";

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#0B2235] flex flex-col font-sans">
      
      {/* ── HEADER ── */}
      <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-[#DCE3E6] bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <Scan className="text-[#0B2235]" size={18} />
            <span className="text-sm font-semibold tracking-widest uppercase text-[#0B2235] hidden sm:inline">
              Detection Analysis
            </span>
            <span className="text-[#647482] text-xs">/ Event: S-2024-03-15</span>
          </div>
          
          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
            <Link href="/" className="text-[#647482] hover:text-[#0B2235] transition-colors">Home</Link>
            <Link href="/intelligence" className="text-[#647482] hover:text-[#0B2235] transition-colors">Intelligence</Link>
            <Link href="/analysis" className="text-[#0B2235] border-b-2 border-[#0B2235] pb-1">Analysis</Link>
          </nav>
        </div>
        <div className="text-xs text-[#647482] font-mono hidden sm:block">
          15 Mar 2024 • 08:42 UTC
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col gap-6 overflow-y-auto">
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* ── LEFT: IMAGE VIEWER (Spans 2 columns) ── */}
          <div className="xl:col-span-2 bg-white border border-[#DCE3E6] rounded-xl flex flex-col overflow-hidden shadow-sm">
            
            {/* View Toggles */}
            <div className="flex flex-wrap items-center p-3 sm:p-4 border-b border-[#DCE3E6] gap-2 bg-[#F9FBFC]">
              <button 
                onClick={() => setActiveTab("raw")}
                className={`px-3 py-2 text-xs sm:text-sm rounded flex items-center gap-2 transition-all font-medium ${
                  activeTab === "raw" ? "bg-[#EAF2F8] text-[#2E6F9E] border border-[#2E6F9E]/30 shadow-sm" : "text-[#647482] hover:bg-[#F4F6F5] border border-transparent"
                }`}
              >
                <Satellite size={16} /> Raw Sentinel-1 SAR
              </button>
              <button 
                onClick={() => setActiveTab("mask")}
                className={`px-3 py-2 text-xs sm:text-sm rounded flex items-center gap-2 transition-all font-medium ${
                  activeTab === "mask" ? "bg-[#F3E8FF] text-[#7E22CE] border border-[#7E22CE]/30 shadow-sm" : "text-[#647482] hover:bg-[#F4F6F5] border border-transparent"
                }`}
              >
                <Cpu size={16} /> AI Segmentation Mask
              </button>
              <button 
                onClick={() => setActiveTab("polygon")}
                className={`px-3 py-2 text-xs sm:text-sm rounded flex items-center gap-2 transition-all font-medium ${
                  activeTab === "polygon" ? "bg-[#FFF4ED] text-[#C74732] border border-[#C74732]/30 shadow-sm" : "text-[#647482] hover:bg-[#F4F6F5] border border-transparent"
                }`}
              >
                <Map size={16} /> Extracted Polygon
              </button>
            </div>

            {/* Image Display Area */}
            <div className="relative w-full h-[400px] sm:h-[500px] bg-[#E8EDF0] flex flex-col">
              
              <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
                
                {/* Raw Background */}
                <img 
                  src="/satellite image.png" 
                  alt="Raw SAR Imagery" 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeTab === 'polygon' ? 'opacity-30' : 'opacity-100'}`} 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />

                {/* Mask Overlay */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${activeTab === 'mask' ? 'opacity-100' : 'opacity-0'}`}
                  style={{ opacity: activeTab === 'mask' ? sliderValue / 100 : 0 }}
                >
                  <svg viewBox="-50 -50 200 200" className="w-1/2 h-1/2 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <polygon points={polyPoints} fill="rgba(168,85,247,0.6)" stroke="transparent" />
                  </svg>
                </div>

                {/* Polygon Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${activeTab === 'polygon' ? 'opacity-100' : 'opacity-0'}`}>
                  <svg viewBox="-50 -50 200 200" className="w-1/2 h-1/2">
                    <polygon points={polyPoints} fill="rgba(199,71,50,0.15)" stroke="#C74732" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="50" cy="50" r="2" fill="#C74732" />
                    <text x="50" y="60" fill="#C74732" fontSize="6" textAnchor="middle" fontWeight="bold">Centroid</text>
                  </svg>
                </div>

              </div>

              {/* Slider & Legend for Mask Tab */}
              {activeTab === "mask" && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-[#DCE3E6] shadow-sm rounded-lg p-3 flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-xs text-[#647482] w-12 text-right font-medium">Raw</span>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={sliderValue} 
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="flex-1 h-1.5 bg-[#DCE3E6] rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <span className="text-xs text-[#7E22CE] font-medium w-12">Mask</span>
                  </div>
                  <div className="h-6 w-px bg-[#DCE3E6] mx-2 hidden sm:block"></div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-[#647482] font-medium">
                    <div className="w-3 h-3 bg-[rgba(168,85,247,0.6)] rounded-sm border border-purple-500"></div>
                    <span>Detected Oil Spill (AI Mask)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: METRICS & DETAILS (Spans 1 column) ── */}
          <div className="flex flex-col gap-6">
            
            {/* Spill Characteristics */}
            <div className="bg-white border border-[#DCE3E6] rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest text-[#647482] mb-4 flex items-center justify-between font-semibold">
                <span className="flex items-center gap-2"><Target size={14} /> Physical Characteristics</span>
                <span className="text-[10px] text-[#2E6F9E] font-mono font-medium">15 Mar 2024</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="bg-[#F9FBFC] p-3 rounded border border-[#DCE3E6]">
                  <div className="text-[10px] text-[#647482] mb-1 font-medium">Total Area</div>
                  <div className="text-lg font-mono text-[#0B2235] font-semibold">12.4 <span className="text-xs text-[#647482] font-normal">km²</span></div>
                </div>
                <div className="bg-[#F9FBFC] p-3 rounded border border-[#DCE3E6]">
                  <div className="text-[10px] text-[#647482] mb-1 font-medium">Perimeter</div>
                  <div className="text-lg font-mono text-[#0B2235] font-semibold">14.2 <span className="text-xs text-[#647482] font-normal">km</span></div>
                </div>
                <div className="bg-[#F9FBFC] p-3 rounded border border-[#DCE3E6]">
                  <div className="text-[10px] text-[#647482] mb-1 font-medium">Max Length</div>
                  <div className="text-lg font-mono text-[#0B2235] font-semibold">5.1 <span className="text-xs text-[#647482] font-normal">km</span></div>
                </div>
                <div className="bg-[#FFF4ED] p-3 rounded border border-[#FADCD9] relative">
                  <div className="text-[10px] text-[#C74732] mb-1 font-semibold">Vol. Estimate</div>
                  <div className="text-lg font-mono text-[#C74732] font-bold">~5,200 <span className="text-xs text-[#C74732]/80 font-normal">bbl</span></div>
                  <div className="text-[9px] text-[#C74732]/70 mt-1 font-mono font-medium">(4.8k - 5.6k)</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm pb-2 border-b border-[#DCE3E6]">
                  <span className="text-[#647482] font-medium">Centroid Position</span>
                  <span className="font-mono text-[#0B2235] font-medium text-xs sm:text-sm">19.8245°N, 88.3120°E</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-[#DCE3E6]">
                  <span className="text-[#647482] font-medium">Detection Time</span>
                  <span className="font-mono text-[#0B2235] font-medium text-xs sm:text-sm">08:42 UTC</span>
                </div>
                <div className="flex justify-between text-sm pb-2 border-b border-[#DCE3E6]">
                  <span className="text-[#647482] font-medium">Est. Spill Age</span>
                  <span className="text-[#0B2235] font-medium text-xs sm:text-sm">8 - 12 hours</span>
                </div>
              </div>
            </div>

            {/* AI Model Performance */}
            <div className="bg-white border border-[#DCE3E6] rounded-xl p-5 sm:p-6 flex-1 flex flex-col shadow-sm">
              <h3 className="text-xs uppercase tracking-widest text-[#647482] mb-4 flex items-center gap-2 font-semibold">
                <ShieldAlert size={14} /> Model Inference
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-[#647482]">Detection Confidence</span>
                  <span className="text-[#1E8E3E] font-bold">94.2%</span>
                </div>
                <div className="w-full bg-[#E8EDF0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E8E3E] h-full w-[94.2%]" />
                </div>
              </div>

              <div className="space-y-3 text-sm mt-4 sm:mt-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#647482] font-medium">Architecture</span>
                  <span className="text-[#0B2235] font-semibold">U-Net++ (ResNet50)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#647482] font-medium">Data Source</span>
                  <span className="text-[#0B2235] font-semibold">Sentinel-1 (SAR)</span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-[#647482] text-xs font-medium">Granule</span>
                  <div className="flex items-center justify-between bg-[#F9FBFC] rounded px-2 py-1.5 border border-[#DCE3E6]">
                    <span className="text-[10px] font-mono text-[#2E6F9E] truncate pr-2 flex-1 font-medium" title={granuleName}>
                      {granuleName}
                    </span>
                    <button 
                      onClick={handleCopy} 
                      className="text-[#647482] hover:text-[#0B2235] shrink-0 p-1 bg-white border border-[#DCE3E6] rounded transition-colors shadow-sm"
                      title="Copy file name"
                    >
                      {copied ? <CheckCircle size={12} className="text-[#1E8E3E]" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col gap-2">
                <Link href="/intelligence" className="w-full bg-[#0B2235] hover:bg-[#173A52] text-white py-2.5 rounded text-sm transition-all flex items-center justify-center gap-2 font-semibold shadow-sm">
                  <Navigation size={16} /> Go to suspect ships
                </Link>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-white hover:bg-[#F4F6F5] border border-[#DCE3E6] text-[#0B2235] font-medium py-2 rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    <Download size={14} className="text-[#647482]" /> Shapefile
                  </button>
                  <button className="flex-1 bg-white hover:bg-[#F4F6F5] border border-[#DCE3E6] text-[#0B2235] font-medium py-2 rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    <Download size={14} className="text-[#647482]" /> GeoJSON
                  </button>
                  <button className="flex-1 bg-white hover:bg-[#F4F6F5] border border-[#DCE3E6] text-[#0B2235] font-medium py-2 rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    <FileText size={14} className="text-[#647482]" /> PDF
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM: AI PIPELINE STATUS ── */}
        <div className="bg-white border border-[#DCE3E6] rounded-xl p-5 sm:p-6 mt-2 overflow-x-auto shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-[#647482] mb-6 flex items-center gap-2 font-semibold">
            <Activity size={14} /> Automated Processing Pipeline
          </h3>
          
          <div className="flex items-center justify-between relative min-w-[600px] pb-2">
            {/* Connecting Line */}
            <div className="absolute top-5 left-10 right-10 h-[2px] bg-[#DCE3E6] -z-10" />
            
            {[
              { label: "SAR Ingestion", desc: "Sentinel-1 GRD", active: true },
              { label: "Preprocessing", desc: "Speckle Denoising", active: true },
              { label: "Segmentation", desc: "U-Net Inferencing", active: true },
              { label: "Vectorization", desc: "Polygon Extraction", active: true },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white px-2 w-32 text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-3 bg-[#EAF2F8] border-[#2E6F9E] text-[#2E6F9E]`}>
                  <Layers size={18} />
                </div>
                <span className="text-xs font-bold text-[#0B2235] leading-tight">{step.label}</span>
                <span className="text-[10px] text-[#647482] mt-0.5 font-medium">{step.desc}</span>
              </div>
            ))}
            
            {/* Clickable Hindcast Ready */}
            <div className="flex flex-col items-center bg-white px-2 w-32 text-center">
              <Link href="/intelligence" className="group flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 mb-3 bg-[#E6F4EA] border-[#1E8E3E] text-[#1E8E3E] group-hover:bg-[#CEEAD6] transition-colors shadow-sm">
                  <CheckCircle size={18} />
                </div>
                <span className="text-xs font-bold text-[#1E8E3E] group-hover:text-[#137333]">Hindcast Ready</span>
                <span className="text-[10px] text-[#647482] mt-0.5 bg-[#F4F6F5] px-2 py-0.5 rounded-full border border-[#DCE3E6] font-medium">Done (View)</span>
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
