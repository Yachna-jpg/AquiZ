export function CapabilityStrip() {
  const capabilities = [
    {
      id: "01",
      title: "Satellite detection",
      description: "Identify and characterise oil slicks from SAR and EO imagery.",
    },
    {
      id: "02",
      title: "Drift reconstruction",
      description: "Use environmental data to reconstruct the slick's movement.",
    },
    {
      id: "03",
      title: "AIS correlation",
      description: "Reconstruct vessel traffic around the estimated origin window.",
    },
    {
      id: "04",
      title: "Vessel analysis",
      description: "Compare proximity, timing, trajectory and behavioural signals.",
    },
  ];

  return (
    <section className="bg-white border-t border-surface-border py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-primary-text mb-16">
          The Intelligence Workflow
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {capabilities.map((item) => (
            <div key={item.id} className="flex flex-col border-t border-surface-border pt-6">
              <span className="text-[32px] font-light text-muted-text mb-6">
                {item.id}
              </span>
              
              <h3 className="text-[20px] font-medium text-primary-text mb-4">
                {item.title}
              </h3>
              
              <p className="text-[16px] text-secondary-text leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
