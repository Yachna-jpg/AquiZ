"use client";

import { DEMO_SCENARIO } from "@/data/demoScenario";

export function SpillInfoOverlay() {
  const { spill } = DEMO_SCENARIO;

  return (
    <div className="absolute bottom-6 left-6 z-20 bg-white border border-surface-border rounded shadow-md p-5 min-w-[220px] pointer-events-none">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-border">
        <span className="text-[11px] font-bold tracking-widest text-accent-red uppercase">Spill Detected</span>
        <div className="w-2.5 h-2.5 rounded-full bg-accent-red animate-pulse" />
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-text mb-1">Location</div>
          <div className="text-[13px] font-medium text-primary-text font-mono">
            {spill.location.lat}° N<br />
            {spill.location.lng}° E
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-text mb-1">Area</div>
            <div className="text-[13px] font-medium text-primary-text">{spill.areaKm2} km²</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-text mb-1">Detection</div>
            <div className="text-[13px] font-medium text-primary-text">{spill.detectedAt}</div>
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-text mb-1">Confidence</div>
          <div className="text-[13px] font-medium text-primary-text">{spill.confidence}%</div>
        </div>
      </div>
      
      <div className="mt-5 pt-3 border-t border-surface-border">
        <span className="inline-block text-[10px] font-bold tracking-widest text-muted-text uppercase">
          Demo Scenario
        </span>
      </div>
    </div>
  );
}
