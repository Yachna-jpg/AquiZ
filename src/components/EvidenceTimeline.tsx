export function EvidenceTimeline() {
  const events = [
    { time: "08:10", label: "Vessel enters investigation zone", type: "observation" },
    { time: "08:25", label: "Course deviation detected", type: "inference" },
    { time: "08:42", label: "Satellite detects oil slick", type: "observation" },
    { time: "08:47", label: "Estimated spill origin calculated", type: "inference" },
    { time: "09:05", label: "Vessel exits origin region", type: "observation" },
  ];

  return (
    <div className="bg-secondary-surface border border-surface-border rounded-md p-6">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-surface-border">
        <h4 className="text-sm font-semibold text-primary-text">Investigation Timeline</h4>
        <span className="text-[10px] font-bold tracking-widest text-accent-amber uppercase bg-accent-amber/10 px-2 py-0.5 rounded">
          Demo
        </span>
      </div>
      
      <div className="relative border-l border-surface-border ml-2 md:ml-4 space-y-6">
        {events.map((event, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-primary-bg ${
              event.type === 'observation' ? 'border-primary-text' : 'border-accent-amber'
            }`} />
            
            <div className="flex flex-col">
              <span className="text-[11px] font-mono font-medium text-muted-text mb-1">
                {event.time} UTC
              </span>
              <span className="text-sm text-secondary-text">
                {event.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-surface-border flex items-center gap-4 text-[10px] uppercase tracking-wider text-muted-text">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border-2 border-primary-text" />
          <span>Observation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border-2 border-accent-amber" />
          <span>Model Inference</span>
        </div>
      </div>
    </div>
  );
}
