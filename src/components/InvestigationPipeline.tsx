import { ArrowRight, Image as ImageIcon, Map, Hexagon, Crosshair, Navigation } from "lucide-react";

export function InvestigationPipeline() {
  const stages = [
    {
      icon: <ImageIcon className="w-4 h-4 text-muted-text mb-2" />,
      label: "Satellite observation",
      desc: "SAR & EO imagery",
    },
    {
      icon: <Hexagon className="w-4 h-4 text-marine-primary mb-2" />,
      label: "Oil slick segmentation",
      desc: "Detection mask",
    },
    {
      icon: <Navigation className="w-4 h-4 text-marine-primary mb-2" />,
      label: "Drift reconstruction",
      desc: "Trajectory line",
    },
    {
      icon: <Crosshair className="w-4 h-4 text-accent-red mb-2" />,
      label: "Origin estimation",
      desc: "Origin point",
    },
    {
      icon: <Map className="w-4 h-4 text-muted-text mb-2" />,
      label: "AIS reconstruction",
      desc: "Vessel paths",
    },
    {
      icon: <Crosshair className="w-4 h-4 text-accent-amber mb-2" />,
      label: "Candidate vessels",
      desc: "Vessel markers",
    },
  ];

  return (
    <section className="bg-secondary-bg py-24 border-y border-surface-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-primary-text mb-6">
            From Detection to Attribution
          </h2>
          <p className="text-[17px] text-secondary-text max-w-2xl mx-auto">
            Follow the evidence from satellite observation to spill origin and vessel correlation.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-px bg-surface-border" />
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
            {stages.map((stage, i) => (
              <div key={i} className="flex flex-col items-start lg:items-center flex-1 w-full lg:w-auto relative group">
                
                {/* Connecting Line Mobile */}
                {i !== stages.length - 1 && (
                  <div className="lg:hidden absolute top-[100%] left-4 w-px h-8 bg-surface-border" />
                )}
                
                <div className="bg-white border border-surface-border px-3 py-2 rounded flex flex-col items-center justify-center mb-6 z-10 w-full lg:w-auto shadow-sm">
                  {stage.icon}
                  <span className="text-[10px] font-mono text-secondary-text">{stage.desc}</span>
                </div>
                
                <h3 className="text-[14px] font-semibold text-primary-text mb-2 lg:text-center">
                  {stage.label}
                </h3>
                
                {/* Arrow overlays on desktop line */}
                {i !== stages.length - 1 && (
                  <div className="hidden lg:flex absolute top-[44px] -right-[12px] bg-secondary-bg px-1 text-muted-text -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
