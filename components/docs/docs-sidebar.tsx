"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Code, Play, Book, CircleAlert, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/use-active-heading";

const icons = {
  "map-pin": MapPin,
  code: Code,
  play: Play,
  book: Book,
  "circle-alert": CircleAlert,
  package: Package,
};

interface DocsSidebarProps {
  title: string;
  sections: {
    id: string;
    title: string;
    icon?: string;
  }[];
}

export function DocsSidebar({ title, sections }: DocsSidebarProps) {
  const pathname = usePathname();

  const active = useActiveHeading(sections.map((section) => section.id));

  return (
    <aside className="sticky top-28 hidden w-56 shrink-0 lg:block">
      <div className="text-muted-foreground mb-6 text-xs font-semibold tracking-[0.28em] uppercase">
        {title}
      </div>

      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = icons[section.icon as keyof typeof icons] ?? Code;

          const isActive = active === section.id;

          return (
            <Link
              key={section.id}
              href={`${pathname}#${section.id}`}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200",
                isActive
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "size-4 transition-colors duration-200",
                  isActive ? "text-white" : "group-hover:text-orange-500",
                )}
              />

              <span className="font-medium">{section.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
