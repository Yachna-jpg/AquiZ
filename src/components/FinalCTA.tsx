import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-primary-bg py-24 md:py-32 relative overflow-hidden border-b border-surface-border">
      {/* Very subtle geographic linework */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(216, 224, 230, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216, 224, 230, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <h2 className="text-[36px] md:text-[52px] font-medium tracking-tight text-navy mb-8 leading-[1.1]">
          Turn Ocean Data Into<br />
          Actionable Intelligence.
        </h2>
        
        <p className="text-[17px] md:text-[19px] text-secondary-text mb-12 leading-relaxed max-w-xl">
          Detect a spill, reconstruct its movement and investigate the vessels operating around its estimated origin.
        </p>
        
        <Link
          href="/intelligence"
          className="inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded font-medium text-[15px] hover:bg-marine-primary transition-colors border border-transparent hover:border-marine-primary"
        >
          Launch Intelligence Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
