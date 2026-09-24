"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Car,
  ShieldCheck,
  Zap,
  Database,
  Activity,
  LucideIcon,
} from "lucide-react";

const iconMap = {
  pincode: MapPin,
  holiday: Calendar,
  vehicle: Car,
};

interface ApiCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  endpoint: string;
  href: string;
  featured?: boolean; // Enable production strip
}

export function ApiCard({
  icon: Icon,
  title,
  description,
  endpoint,
  href,
  featured = false,
}: ApiCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-[28px] border border-zinc-800 bg-black/70 p-6 backdrop-blur-sm"
    >
      {/* Glow */}

      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative flex h-full flex-col">
        {/* Icon */}

        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
          <Icon className="h-5 w-5 text-orange-500" />
        </div>

        <h3 className="text-2xl font-semibold text-white">{title}</h3>

        <p className="mt-4 text-[15px] leading-7 text-zinc-400">
          {description}
        </p>

        {/* Production strip */}

        {featured && (
          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-300">
                Production Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat icon={Database} value="40K+" label="PIN codes" />

              <Stat icon={Zap} value="Edge" label="Cloudflare" />

              <Stat icon={Activity} value="k6" label="Load tested" />

              <Stat icon={ShieldCheck} value="JSON" label="Predictable" />
            </div>
          </div>
        )}

        {/* Endpoint */}

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
          <code className="font-mono text-sm">
            <span className="font-semibold text-orange-400">GET</span>{" "}
            <span className="text-zinc-200">{endpoint}</span>
          </code>
        </div>

        <div className="mt-auto pt-8">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
          >
            View Docs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
      <Icon className="mb-2 h-4 w-4 text-orange-400" />

      <div className="text-base font-semibold text-white">{value}</div>

      <div className="mt-0.5 text-xs text-zinc-500">{label}</div>
    </div>
  );
}
