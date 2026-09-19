import { Database, Globe, Zap } from "lucide-react";

import { Container } from "@/components/shared/container";
import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-orange-500">Why BharatAPI</p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for developers, not paperwork.
          </h2>

          <p className="text-muted-foreground mt-6 text-base sm:text-lg">
            Everything is designed to reduce integration time, keep responses
            fast, and make documentation predictable.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Database className="size-6" />}
            title="Official & Open Datasets"
            description="Built using publicly available and official Indian datasets wherever possible."
          />

          <FeatureCard
            icon={<Zap className="size-6" />}
            title="Edge Cached"
            description="Fast global responses with CDN caching for public endpoints."
          />

          <FeatureCard
            icon={<Globe className="size-6" />}
            title="No API Key"
            description="Start building immediately with public endpoints—authentication comes only where it makes sense."
          />
        </div>
      </Container>
    </section>
  );
}
