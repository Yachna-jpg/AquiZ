import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SpillInfoOverlay } from "./SpillInfoOverlay";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-primary-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Column: Content (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="text-[12px] font-semibold tracking-widest text-secondary-text uppercase">
              Maritime Oil-Spill Intelligence
            </span>
          </div>
          
          <h1 className="text-[44px] md:text-[56px] lg:text-[68px] font-medium tracking-tight text-primary-text leading-[1.05] mb-8">
            Detect the Spill.<br />
            Trace Its Origin.<br />
            Identify the Vessel.
          </h1>
          
          <p className="text-[17px] md:text-[19px] text-secondary-text max-w-[540px] leading-relaxed mb-10">
            An intelligent maritime monitoring platform combining satellite imagery, ocean dynamics and AIS data to detect oil spills, reconstruct their movement and investigate vessels operating around the estimated source.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-navy text-white px-8 py-3.5 rounded font-medium hover:bg-marine-primary transition-colors text-[15px]"
            >
              Launch Intelligence <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#explore"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-navy border border-surface-border px-8 py-3.5 rounded font-medium hover:bg-secondary-bg hover:border-navy transition-colors text-[15px]"
            >
              Explore the System <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-widest text-muted-text uppercase">
            <span>Satellite Imagery</span>
            <span className="text-surface-border">+</span>
            <span>Ocean Data</span>
            <span className="text-surface-border">+</span>
            <span>AIS</span>
            <span className="text-surface-border">+</span>
            <span>Machine Learning</span>
          </div>
        </div>
        
        {/* Right Column: Visualization (55%) */}
        <div className="w-full lg:w-[55%] h-[500px] lg:h-[700px] bg-secondary-bg border border-surface-border rounded relative overflow-hidden flex items-center justify-center group">
          <Image
            src="/satellite image.png"
            alt="Satellite detection of oil spill"
            fill
            className="object-cover"
            priority
          />
          {/* Overlays to make it feel like a geospatial platform */}
          <div className="absolute inset-0 z-10 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
          </div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20 animate-[scan_8s_linear_infinite] pointer-events-none" />
          
          <SpillInfoOverlay />
          
          <div className="absolute top-4 right-4 z-20 bg-navy text-white px-2 py-1 pointer-events-none rounded-sm shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider">Lat: 19.82° N / Lng: 88.34° E</span>
          </div>
        </div>

      </div>
    </section>
  );
}
