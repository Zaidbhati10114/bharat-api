import { Zap, Globe, FileCode2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";

const stats = [
  {
    icon: Zap,
    value: "3",
    label: "Launch APIs",
  },
  {
    icon: FileCode2,
    value: "OpenAPI",
    label: "3.1 Ready",
  },
  {
    icon: Globe,
    value: "Edge",
    label: "Cached",
  },
  {
    icon: ShieldCheck,
    value: "Free",
    label: "Forever",
  },
];

export function StatsStrip() {
  return (
    <section className="pb-16">
      <Container>
        <div className="bg-background/70 grid grid-cols-2 gap-3 rounded-3xl border p-4 backdrop-blur sm:grid-cols-4 sm:p-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group hover:bg-muted/40 rounded-2xl p-3 text-center transition"
              >
                <Icon className="mx-auto mb-3 size-5 text-orange-500 transition group-hover:scale-110" />

                <div className="text-xl font-bold sm:text-2xl">
                  {stat.value}
                </div>

                <div className="text-muted-foreground text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
