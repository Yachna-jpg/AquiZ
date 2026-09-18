export function TechnologySection() {
  const dataSources = [
    {
      category: "SATELLITE",
      items: ["Sentinel-1 SAR", "EO imagery"],
    },
    {
      category: "AIS",
      items: ["Vessel position", "Speed", "Course", "Timestamp"],
    },
    {
      category: "ENVIRONMENTAL",
      items: ["Ocean currents", "Wind", "Weather", "Wave conditions"],
    },
    {
      category: "ANALYTICS",
      items: ["Segmentation", "Trajectory analysis", "Spatio-temporal correlation", "Behaviour analysis"],
    },
  ];

  const timelineEvents = [
    { time: "08:10", desc: "Vessel enters investigation zone", type: "AIS" },
    { time: "08:25", desc: "Course deviation detected", type: "INFERENCE" },
    { time: "08:42", desc: "Satellite detects oil slick", type: "OBSERVED" },
    { time: "08:47", desc: "Estimated spill origin calculated", type: "INFERENCE" },
    { time: "09:05", desc: "Vessel exits origin region", type: "AIS" },
  ];

  return (
    <section className="bg-navy py-24 md:py-32 text-navy-text-inverse border-t border-navy-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Built Around Real Maritime Data */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-white mb-16">
            Built Around Real Maritime Data
          </h2>
          
          <div className="flex flex-col">
            {dataSources.map((source, idx) => (
              <div key={source.category} className={`py-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 ${idx !== 0 ? 'border-t border-navy-border' : ''}`}>
                <div className="w-32 shrink-0">
                  <h3 className="text-[12px] font-bold tracking-widest text-muted-text uppercase">
                    {source.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {source.items.map((item) => (
                    <span key={item} className="text-[15px] text-[#A1B3C4]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Investigation Timeline */}
        <div className="w-full lg:w-1/2 flex flex-col lg:pl-16 lg:border-l lg:border-navy-border">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-white">
              Investigation Timeline
            </h2>
            <span className="bg-accent-amber/10 border border-accent-amber/30 text-accent-amber text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
              Demo Investigation
            </span>
          </div>

          <div className="relative pl-6 border-l border-navy-border flex flex-col gap-10">
            {timelineEvents.map((event, idx) => {
              // Determine marker styling based on type
              let markerColor = "bg-muted-text border-navy-border";
              let badgeColor = "text-muted-text border-surface-border";
              
              if (event.type === "OBSERVED") {
                markerColor = "bg-accent-red border-accent-red/30";
                badgeColor = "text-accent-red border-accent-red/20 bg-accent-red/10";
              } else if (event.type === "INFERENCE") {
                markerColor = "bg-marine-primary border-marine-primary/30";
                badgeColor = "text-marine-primary border-marine-primary/20 bg-marine-primary/10";
              }

              return (
                <div key={idx} className="relative">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 bg-navy ${markerColor}`} />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className="text-[16px] font-mono font-medium text-white shrink-0">
                      {event.time} <span className="text-[11px] text-muted-text ml-1">UTC</span>
                    </span>
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-[15px] text-[#A1B3C4]">
                        {event.desc}
                      </p>
                      <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
