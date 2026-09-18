"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TechnicalPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [pathData, setPathData] = useState("");
  const [svgHeight, setSvgHeight] = useState(1000);

  const steps = [
    {
      id: "01",
      title: "Satellite observation",
      input: "SAR / EO Imagery",
      output: "Raw Data Matrix",
      desc: "Acquisition of synthetic aperture radar and electro-optical imagery over the target area.",
    },
    {
      id: "02",
      title: "Spill detection",
      input: "Raw Data Matrix",
      output: "Segmentation Mask",
      desc: "Deep learning models process imagery to detect and segment potential oil slicks.",
    },
    {
      id: "03",
      title: "Spill characterisation",
      input: "Segmentation Mask",
      output: "Spill Polygon, Area, Confidence",
      desc: "Extraction of geometric and statistical properties of the detected slick.",
    },
    {
      id: "04",
      title: "Environmental reconstruction",
      input: "Spill Polygon, Timestamps",
      output: "Ocean & Wind Vectors",
      desc: "Retrieval of historical ocean current and wind data for the surrounding temporal window.",
    },
    {
      id: "05",
      title: "Hindcast + forecast",
      input: "Environmental Vectors",
      output: "Drift Trajectory, Origin Estimate",
      desc: "Simulation of slick drift backward to estimate origin, and forward to predict impact.",
    },
    {
      id: "06",
      title: "AIS reconstruction",
      input: "Origin Estimate, Time Window",
      output: "Vessel Trajectories",
      desc: "Reconstruction of all vessel movements within the spatiotemporal origin window.",
    },
    {
      id: "07",
      title: "Candidate correlation",
      input: "Vessel Trajectories, Spill Origin",
      output: "Candidate Vessels, Confidence",
      desc: "Analysis of proximity, behavioral anomalies, and drift intersections to attribute origin.",
    },
  ];

  // 1. Calculate the line path on mount and resize
  useEffect(() => {
    const drawLine = () => {
      if (!containerRef.current || !pathRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      setSvgHeight(containerRect.height);

      const points = dotRefs.current.map((dot, index) => {
        let el = dot;
        // If the dot is hidden (like on mobile), fallback to the main node box
        if (el && el.getBoundingClientRect().width === 0) {
          el = nodesRef.current[index];
        }
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      // Build smooth cubic bezier path
      let d = "";
      if (points.length > 0) {
        d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const midY = (prev.y + curr.y) / 2;
          d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
        }
      }
      setPathData(d);
    };

    // Small timeout to allow DOM layout to settle
    const timeout = setTimeout(drawLine, 100);
    window.addEventListener("resize", drawLine);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", drawLine);
    };
  }, []);

  // 2. Setup GSAP animations ONLY AFTER pathData is in the DOM
  useEffect(() => {
    if (!pathData || !pathRef.current || !containerRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // The path is now actually rendered with a real length
    const pathLength = pathRef.current.getTotalLength();
    
    // Set initial hidden state for the line
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create line drawing animation
    const lineTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      animation: gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
      }),
    });
    triggers.push(lineTrigger);

    // Setup node entry animations
    nodesRef.current.forEach((node) => {
      if (node) {
        gsap.fromTo(
          node,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
            },
          }
        );
      }
    });

    // Collect all newly created scroll triggers for cleanup
    ScrollTrigger.getAll().forEach((t) => {
      if (!triggers.includes(t)) triggers.push(t);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [pathData]); // Re-run GSAP setup when pathData updates (e.g. on resize)

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-24 relative z-20">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-primary-text mb-4">
            How OILTRACE Investigates
          </h2>
          <p className="text-[17px] text-secondary-text max-w-2xl mx-auto">
            A deterministic, seven-step engineering pipeline.
          </p>
        </div>

        {/* Outer container with ref for triggering the path scroll */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          
          {/* Absolutely positioned SVG behind nodes */}
          <svg 
            className="absolute top-0 left-0 w-full pointer-events-none z-0"
            style={{ height: svgHeight }}
          >
            <path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="#081827"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-opacity duration-300"
            />
          </svg>

          <div className="flex flex-col gap-16 md:gap-8 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={step.id} 
                  className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  
                  {/* Content Box with ref array attachment for node animations */}
                  <div 
                    ref={(el) => {
                      nodesRef.current[index] = el;
                    }}
                    className={`w-full md:w-[45%] flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} bg-white relative p-4`}
                  >
                    <span className="text-[20px] font-light text-muted-text mb-2">
                      {step.id}
                    </span>
                    <h3 className="text-[18px] font-semibold text-primary-text mb-4">
                      {step.title}
                    </h3>
                    
                    <div className={`flex flex-col gap-2 mb-4 w-full ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                      <div className="bg-secondary-bg border border-surface-border px-3 py-1.5 rounded text-[12px] font-mono text-secondary-text">
                        <span className="text-muted-text uppercase mr-2 text-[10px]">IN:</span> {step.input}
                      </div>
                      <div className="bg-secondary-bg border border-surface-border px-3 py-1.5 rounded text-[12px] font-mono text-marine-primary">
                        <span className="text-muted-text uppercase mr-2 text-[10px]">OUT:</span> {step.output}
                      </div>
                    </div>
                    
                    <p className="text-[15px] text-secondary-text max-w-[320px]">
                      {step.desc}
                    </p>

                    {/* Target dot that the line will pass through */}
                    <div 
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-navy z-20 ${isEven ? '-right-[calc(11.11%+6px)]' : '-left-[calc(11.11%+6px)]'}`} 
                    />
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
