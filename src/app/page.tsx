import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { InvestigationPipeline } from "@/components/InvestigationPipeline";
import { TechnicalPipeline } from "@/components/TechnicalPipeline";
import { TechnologySection } from "@/components/TechnologySection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Navbar />
      <Hero />
      <CapabilityStrip />
      <InvestigationPipeline />
      <TechnicalPipeline />
      <TechnologySection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
