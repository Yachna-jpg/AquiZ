"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, Download, Share2, Send, Clock, MapPin, AlertTriangle, 
  CheckSquare, Activity, Target, Layers, Navigation, Cpu
} from "lucide-react";

export default function ReportPage() {
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1500);
  };

  const polyPoints = "8,30 48,0 88,12 100,59 68,100 20,88 0,59 8,30";

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#0B2235] flex flex-col font-sans">
      
      {/* ── HEADER ── */}
      <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-[#DCE3E6] bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <FileText className="text-[#2E6F9E]" size={18} />
            <span className="text-sm font-semibold tracking-widest uppercase text-[#0B2235] hidden sm:inline">
              Incident Report
            </span>
          </div>
          
          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
            <Link href="/" className="text-[#647482] hover:text-[#0B2235] transition-colors">Home</Link>
            <Link href="/intelligence" className="text-[#647482] hover:text-[#0B2235] transition-colors">Intelligence</Link>
            <Link href="/analysis" className="text-[#647482] hover:text-[#0B2235] transition-colors">Analysis</Link>
            <Link href="/reports" className="text-[#0B2235] border-b-2 border-[#0B2235] pb-1">Reports</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-[#EAF2F8] text-[#2E6F9E] px-2 py-1 rounded">REP-9284-A</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* ── LEFT: PAST REPORTS SIDEBAR ── */}
        <aside className="w-64 bg-white border-r border-[#DCE3E6] hidden lg:flex flex-col overflow-y-auto shrink-0 p-4">
          <h3 className="text-xs uppercase tracking-widest text-[#647482] mb-4 font-semibold">Past Reports</h3>
          <div className="space-y-3">
            <div className="p-3 bg-[#F4F6F5] border border-[#DCE3E6] rounded-lg cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-[#0B2235]">MV Ocean Star 🇮🇳	Tanker	1.3 km	87%	Most Likely
MT Pacific Dawn 🇸🇬</span>
                <span className="text-[10px] text-[#C74732] font-semibold bg-[#FFF4ED] px-1.5 rounded">High</span>
              </div>
              <div className="text-[10px] text-[#647482]">16 Sep 2026</div>
              <div className="text-[11px] font-medium text-[#0B2235] mt-1">S-2026-09-16</div>
            </div>
            
            <div className="p-3 bg-white border border-[#DCE3E6] rounded-lg cursor-pointer hover:bg-[#F9FBFC] transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-[#647482]">MT Pacific Dawn 🇸🇬</span>
                <span className="text-[10px] text-[#C9822B] font-semibold bg-[#FEF3C7] px-1.5 rounded">Med</span>
              </div>
              <div className="text-[10px] text-[#647482]">02 Feb 2026</div>
              <div className="text-[11px] font-medium text-[#647482] mt-1">S-2026-02-02</div>
            </div>
            
            <div className="p-3 bg-white border border-[#DCE3E6] rounded-lg cursor-pointer hover:bg-[#F9FBFC] transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-[#647482]">MV Blue Horizon 🇬🇧</span>
                <span className="text-[10px] text-[#1E8E3E] font-semibold bg-[#E6F4EA] px-1.5 rounded">Low</span>
              </div>
              <div className="text-[10px] text-[#647482]">12 Nov 2023</div>
              <div className="text-[11px] font-medium text-[#647482] mt-1">S-2023-11-12</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT: REPORT ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto bg-white border border-[#DCE3E6] rounded-xl shadow-sm overflow-hidden">
            
            {/* Report Header */}
            <div className="bg-[#0B2235] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Automated Investigation Report</h1>
                <div className="flex items-center gap-4 text-sm text-[#A0B3C6]">
                  <span className="flex items-center gap-1"><FileText size={14} /> ID: REP-9284-A</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> Event: S-2026-09-16</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 16 Sep 2026, 08:42 UTC</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={handleDownload}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-xs font-medium transition-colors border border-white/20 flex items-center gap-2"
                >
                  <Download size={14} /> {downloading ? "Downloading..." : "PDF"}
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-xs font-medium transition-colors border border-white/20 flex items-center gap-2">
                  <Share2 size={14} /> Share
                </button>
                <button className="bg-[#2E6F9E] hover:bg-[#3D85BA] text-white px-4 py-2 rounded text-xs font-bold transition-colors shadow-sm flex items-center gap-2">
                  <Send size={14} /> Authorities
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Summary */}
              <section>
                <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">Executive Summary</h2>
                <p className="text-sm text-[#102A43] leading-relaxed">
                  On 16 September 2026 at 08:42 UTC, an automated satellite detection identified a confirmed 12.4 km² oil spill located at 19.8245°N, 88.3120°E. The spill is estimated to be 8-12 hours old with a volume of approximately 5,200 bbl. Spatio-temporal and AIS analysis strongly correlates the event with the tanker <strong>MV Ocean Star</strong>, which exhibited anomalous speed changes precisely within the spill's backward trajectory.
                </p>
              </section>

              {/* Grid 1: Details & Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Spill Details */}
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">Spill Characteristics</h2>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-[#F9FBFC] p-2.5 rounded border border-[#E8EDF0]">
                      <div className="text-[10px] text-[#647482] font-medium">Area</div>
                      <div className="font-semibold text-[#0B2235]">12.4 km²</div>
                    </div>
                    <div className="bg-[#F9FBFC] p-2.5 rounded border border-[#E8EDF0]">
                      <div className="text-[10px] text-[#647482] font-medium">Perimeter</div>
                      <div className="font-semibold text-[#0B2235]">14.2 km</div>
                    </div>
                    <div className="bg-[#F9FBFC] p-2.5 rounded border border-[#E8EDF0]">
                      <div className="text-[10px] text-[#647482] font-medium">Max Length</div>
                      <div className="font-semibold text-[#0B2235]">5.1 km</div>
                    </div>
                    <div className="bg-[#FFF4ED] p-2.5 rounded border border-[#FADCD9]">
                      <div className="text-[10px] text-[#C74732] font-medium">Est. Volume</div>
                      <div className="font-bold text-[#C74732]">~5,200 bbl</div>
                    </div>
                    <div className="bg-[#F9FBFC] p-2.5 rounded border border-[#E8EDF0]">
                      <div className="text-[10px] text-[#647482] font-medium">Location</div>
                      <div className="font-semibold text-[#0B2235]">19.82°N, 88.31°E</div>
                    </div>
                    <div className="bg-[#F9FBFC] p-2.5 rounded border border-[#E8EDF0]">
                      <div className="text-[10px] text-[#647482] font-medium">Est. Age</div>
                      <div className="font-semibold text-[#0B2235]">8 - 12 hours</div>
                    </div>
                  </div>
                </section>

                {/* Pipeline & Confidence */}
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">AI Detection Pipeline</h2>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className="text-[#647482]">Overall Detection Confidence</span>
                      <span className="text-[#1E8E3E] font-bold">94.2%</span>
                    </div>
                    <div className="w-full bg-[#E8EDF0] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#1E8E3E] h-full w-[94.2%]" />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { step: "SAR Ingestion", desc: "Sentinel-1 GRD acquired" },
                      { step: "Preprocessing", desc: "Speckle noise reduced" },
                      { step: "Segmentation", desc: "U-Net mask generated" },
                      { step: "Vectorization", desc: "Polygon coordinates extracted" }
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckSquare size={14} className="text-[#2E6F9E]" />
                        <span className="font-semibold text-[#0B2235] w-24">{s.step}</span>
                        <span className="text-[#647482]">{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Imagery Side by Side */}
              <section>
                <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">Imagery Analysis</h2>
                <div className="grid grid-cols-2 gap-4 h-48 sm:h-64">
                  {/* Raw SAR */}
                  <div className="relative bg-[#E8EDF0] rounded border border-[#DCE3E6] overflow-hidden group">
                    <img src="/satellite image.png" alt="Raw SAR" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur">Raw SAR</div>
                  </div>
                  
                  {/* AI Mask */}
                  <div className="relative bg-[#E8EDF0] rounded border border-[#DCE3E6] overflow-hidden flex items-center justify-center">
                    <img src="/satellite image.png" alt="SAR Background" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="-50 -50 200 200" className="w-2/3 h-2/3 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                        <polygon points={polyPoints} fill="rgba(168,85,247,0.7)" stroke="#A855F7" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur">AI Segmentation</div>
                  </div>
                </div>
              </section>

              {/* Suspect Ships */}
              <section>
                <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">Suspect Vessels</h2>
                
                <div className="mb-6 bg-[#FEF2F2] border border-[#FCA5A5] p-4 rounded-lg flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#EF4444] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#991B1B] mb-1">Primary Suspect: MV Ocean Star 🇮🇳</h4>
                    <p className="text-xs text-[#991B1B]/80">Was inside the spill path 9 hours ago. AIS data shows a sudden drop in speed (to 0.4 kts) while in the affected zone, strongly indicating an anomalous event.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#DCE3E6] text-xs text-[#647482]">
                        <th className="py-2 px-2 font-medium">Vessel</th>
                        <th className="py-2 px-2 font-medium">Type</th>
                        <th className="py-2 px-2 font-medium">Dist.</th>
                        <th className="py-2 px-2 font-medium">Match Score</th>
                        <th className="py-2 px-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#F4F6F5]">
                        <td className="py-3 px-2 font-bold text-[#0B2235]">MV Ocean Star 🇮🇳</td>
                        <td className="py-3 px-2 text-[#647482]">Tanker</td>
                        <td className="py-3 px-2 text-[#647482]">1.3 km</td>
                        <td className="py-3 px-2 font-bold text-[#EF4444]">87%</td>
                        <td className="py-3 px-2"><span className="bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-bold px-1.5 py-0.5 rounded">Most Likely</span></td>
                      </tr>
                      <tr className="border-b border-[#F4F6F5]">
                        <td className="py-3 px-2 font-bold text-[#0B2235]">MT Pacific Dawn 🇸🇬</td>
                        <td className="py-3 px-2 text-[#647482]">Tanker</td>
                        <td className="py-3 px-2 text-[#647482]">4.8 km</td>
                        <td className="py-3 px-2 font-bold text-[#F59E0B]">69%</td>
                        <td className="py-3 px-2"><span className="bg-[#FEF3C7] text-[#B45309] text-[10px] font-bold px-1.5 py-0.5 rounded">Possible</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-bold text-[#0B2235]">MV Blue Horizon 🇬🇧</td>
                        <td className="py-3 px-2 text-[#647482]">Cargo</td>
                        <td className="py-3 px-2 text-[#647482]">6.2 km</td>
                        <td className="py-3 px-2 font-bold text-[#6B7280]">43%</td>
                        <td className="py-3 px-2"><span className="bg-[#F3F4F6] text-[#374151] text-[10px] font-bold px-1.5 py-0.5 rounded">Ruled Out</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Map & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Map */}
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">Trajectory Map</h2>
                  <div className="h-48 bg-[#E8EDF0] rounded border border-[#DCE3E6] flex items-center justify-center p-4 relative overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px]">
                      {/* Spill Patch */}
                      <polygon points="40,40 60,35 70,55 50,60" fill="rgba(199,71,50,0.4)" stroke="#C74732" strokeWidth="1" strokeDasharray="1,1" />
                      {/* Backward path */}
                      <polyline points="50,45 35,55 20,45" fill="none" stroke="rgba(199,71,50,0.5)" strokeWidth="4" strokeLinecap="round" strokeDasharray="4,2" />
                      
                      {/* Ship A */}
                      <polyline points="30,40 45,45 60,35 80,20" fill="none" stroke="#EF4444" strokeWidth="1.5" />
                      <circle cx="30" cy="40" r="3" fill="#EF4444" stroke="white" strokeWidth="1" />
                      
                      {/* Ship B */}
                      <polyline points="70,60 85,75 95,70" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                      <circle cx="70" cy="60" r="2" fill="#F59E0B" />
                    </svg>
                  </div>
                </section>

                {/* Recommendations */}
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-[#647482] mb-3 font-semibold border-b border-[#DCE3E6] pb-2">Recommended Actions</h2>
                  <ul className="space-y-3 text-sm text-[#0B2235]">
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border border-[#DCE3E6] bg-[#F4F6F5] shrink-0 mt-0.5" />
                      <span>Contact port authorities at next destination of MV Ocean Star.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border border-[#DCE3E6] bg-[#F4F6F5] shrink-0 mt-0.5" />
                      <span>Request ship logs and oil discharge records for 16 Sep 2026.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border border-[#DCE3E6] bg-[#F4F6F5] shrink-0 mt-0.5" />
                      <span>Dispatch clean-up vessels to 19.82°N, 88.31°E.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border border-[#DCE3E6] bg-[#F4F6F5] shrink-0 mt-0.5" />
                      <span>Schedule secondary satellite pass for drift tracking.</span>
                    </li>
                  </ul>
                </section>
              </div>

              {/* Disclaimer */}
              <div className="text-center pt-6 border-t border-[#DCE3E6]">
                <p className="text-[10px] text-[#647482] max-w-2xl mx-auto">
                  <strong>Disclaimer:</strong> This report is generated by AI-assisted analysis of satellite imagery and AIS data. While it presents strong correlations and clues, it does not constitute final legal proof of culpability. Further physical investigation is required.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
