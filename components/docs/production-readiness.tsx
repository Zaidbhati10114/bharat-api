"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Database,
  ShieldCheck,
  Activity,
  ShoppingCart,
  MapPin,
  Truck,
  Building2,
  Smartphone,
  CreditCard,
} from "lucide-react";

interface ProductionReadinessProps {
  architecture: string;
  dataset: string;
  testing: string;
  useCases: string[];
}

const iconMap = {
  "Checkout forms": ShoppingCart,
  "Address validation": MapPin,
  Logistics: Truck,
  CRM: Building2,
  KYC: CreditCard,
  "Mobile apps": Smartphone,
};

export function ProductionReadiness({
  architecture,
  dataset,
  testing,
  useCases,
}: ProductionReadinessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-card rounded-3xl border p-8 shadow-sm"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">
          Built for Production
        </h2>

        <p className="text-muted-foreground text-base leading-7">
          Designed for low-latency Indian PIN code lookups with edge caching,
          predictable responses, and a developer-first architecture.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard icon={Zap} title="Architecture" value={architecture} />

        <StatCard icon={Database} title="Dataset" value={dataset} />

        <StatCard
          icon={ShieldCheck}
          title="Protection"
          value="Built-in validation"
        />

        <StatCard icon={Activity} title="Testing" value="Stress-tested" />
      </div>

      <div className="mt-10 space-y-8">
        <Feature
          icon={Zap}
          title="Edge-first architecture"
          text="Requests are served through Cloudflare Workers, allowing responses to be delivered from locations closer to users across India while reducing unnecessary origin requests through caching."
        />

        <Feature
          icon={Database}
          title="Comprehensive dataset"
          text={`Covers ${dataset} with state, district, and block information in a single predictable response format.`}
        />

        <Feature
          icon={ShieldCheck}
          title="Developer-friendly reliability"
          text="Consistent status codes, predictable JSON responses, and built-in validation make error handling straightforward in production applications."
        />

        <Feature
          icon={Activity}
          title="Load-tested during development"
          text={`Validated using ${testing} to identify bottlenecks and verify concurrent request handling before deployment.`}
        />
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="size-5 text-orange-500" />
          <h3 className="text-xl font-semibold">
            Ideal for developers building
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => {
            const Icon = iconMap[item as keyof typeof iconMap] ?? Building2;

            return (
              <div
                key={item}
                className="bg-background flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-orange-300 dark:hover:border-orange-700"
              >
                <Icon className="size-5 text-orange-500" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900 dark:bg-orange-950/30">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 size-5 text-orange-500" />

          <div>
            <h4 className="font-semibold">Performance note</h4>

            <p className="text-muted-foreground mt-1 text-sm leading-6">
              BharatAPI's Pincode API has been stress-tested during development
              using k6 to validate concurrent request handling. Live production
              metrics like P95 latency, cache hit rate, uptime, and total
              requests served will be published as the platform grows.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-background rounded-2xl border p-5">
      <Icon className="mb-3 size-5 text-orange-500" />

      <div className="text-muted-foreground text-sm">{title}</div>

      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
        <Icon className="size-5 text-orange-500" />
      </div>

      <div>
        <h4 className="font-semibold">{title}</h4>

        <p className="text-muted-foreground mt-1 leading-7">{text}</p>
      </div>
    </div>
  );
}
