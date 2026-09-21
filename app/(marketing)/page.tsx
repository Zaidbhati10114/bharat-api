import { Hero } from "@/components/landing/hero";
import { FeaturedApis } from "@/components/landing/featured-apis";
import { Features } from "@/components/landing/features";
import { GridBackground } from "@/components/landing/grid-background";

export default function Home() {
  return (
    <>
      <GridBackground />
      <Hero />
      <FeaturedApis />
      <Features />
    </>
  );
}
