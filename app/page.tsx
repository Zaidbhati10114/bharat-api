import { FeaturedApis } from "@/components/landing/featured-apis";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { GridBackground } from "@/components/landing/grid-background";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { PlaygroundPreview } from "@/components/landing/playground-preview";
import { StatsStrip } from "@/components/landing/stats-strip";

export default function Home() {
  return (
    <main className="bg-background text-foreground relative min-h-screen overflow-hidden">
      <GridBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <StatsStrip />
        <FeaturedApis />
        <PlaygroundPreview />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
