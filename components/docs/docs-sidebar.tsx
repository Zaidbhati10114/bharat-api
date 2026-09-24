"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Code2,
  Play,
  BookOpen,
  Package,
  CircleAlert,
} from "lucide-react";
import { cn } from "cn";

const icons = {
  "map-pin": MapPin,
  code: Code2,
  play: Play,
  book: BookOpen,
  package: Package,
  "circle-alert": CircleAlert,
};

interface Section {
  id: string;
  title: string;
  icon?: string;
}

export function DocsSidebar({
  title,
  sections,
}: {
  title: string;
  sections: Section[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-6">
      <div className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
        {title}
      </div>

      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = icons[section.icon as keyof typeof icons] ?? MapPin;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActive(section.id)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
                active === section.id
                  ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{section.title}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
