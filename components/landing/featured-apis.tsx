import { CalendarDays, Car, MapPin } from "lucide-react";

import { Container } from "@/components/shared/container";
import { ApiCard } from "./api-card";

export function FeaturedApis() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-orange-500">Launch APIs</p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Built for Indian developers
          </h2>

          <p className="text-muted-foreground mt-6 text-base sm:text-lg">
            Start with the APIs developers use every day. No signup. No API key
            for public endpoints.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <ApiCard
            icon={<MapPin className="size-6" />}
            title="Pincode API"
            description="Convert Indian PIN codes into city, district and state instantly."
            endpoint="/v1/pincode/421201"
          />

          <ApiCard
            icon={<CalendarDays className="size-6" />}
            title="Holiday API"
            description="National, state and bank holidays for every Indian state."
            endpoint="/v1/holidays/2026"
          />

          <ApiCard
            icon={<Car className="size-6" />}
            title="Vehicle Code API"
            description="Find Indian vehicle registration codes and their RTO details."
            endpoint="/v1/vehicle/MH"
          />
        </div>
      </Container>
    </section>
  );
}
