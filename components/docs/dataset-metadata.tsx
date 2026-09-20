import {
  Calendar,
  Database,
  Timer,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { ApiDoc } from "@/lib/docs/types";

interface Props {
  metadata: ApiDoc["metadata"];
}

export function DatasetMetadata({ metadata }: Props) {
  const cards = [
    {
      icon: Calendar,
      label: "Last Updated",
      value: metadata.lastUpdated,
    },
    {
      icon: Database,
      label: "Records",
      value: metadata.recordCount.toLocaleString(),
    },
    {
      icon: Timer,
      label: "Cache",
      value: metadata.cache,
    },
    {
      icon: RefreshCw,
      label: "Refresh",
      value: metadata.refreshCycle,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Dataset Metadata
          </h2>

          <p className="text-muted-foreground">
            Information about the underlying dataset powering this API.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border px-3 py-1 text-sm md:flex">
          <ShieldCheck className="size-4 text-green-600" />v{metadata.version}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="bg-card rounded-2xl border p-5 transition hover:shadow-sm"
            >
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Icon className="size-4" />
                {card.label}
              </div>

              <p className="mt-3 text-xl font-semibold">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-muted/30 rounded-2xl border p-5">
        <p className="text-sm leading-7">
          <span className="font-medium">Source:</span> {metadata.source}
        </p>
      </div>
    </section>
  );
}
