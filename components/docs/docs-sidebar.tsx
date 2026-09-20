"use client";

import Link from "next/link";
import { MapPin, Code2, CircleAlert, Play } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/use-active-heading";

const items = [
  {
    title: "Pincode API",
    links: [
      {
        id: "overview",
        name: "Overview",
        href: "/docs/pincode#overview",
        icon: MapPin,
      },
      {
        id: "endpoint",
        name: "Endpoint",
        href: "/docs/pincode#endpoint",
        icon: Code2,
      },
      {
        id: "playground",
        name: "Playground",
        href: "/docs/pincode#playground",
        icon: Play,
      },
      {
        id: "errors",
        name: "Errors",
        href: "/docs/pincode#errors",
        icon: CircleAlert,
      },
    ],
  },
];

interface DocsSidebarProps {
  title?: string;
}

export function DocsSidebar({ title }: DocsSidebarProps) {
  const pathname = usePathname();
  const active = useActiveHeading([
    "overview",
    "endpoint",
    "playground",
    "response",
    "errors",
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.25em] uppercase">
          {title ?? "Documentation"}
        </p>
      </div>

      {items.map((group) => (
        <div key={group.title} className="space-y-1">
          {group.links.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === "/docs/pincode" && active === item.id;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
