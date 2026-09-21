"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/use-active-heading";

interface TableOfContentsProps {
  sections: {
    id: string;
    title: string;
  }[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const active = useActiveHeading(sections.map((section) => section.id));

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
        On This Page
      </p>

      <nav className="space-y-1">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "block border-l-2 py-1 pl-4 text-sm transition-all duration-200",
              active === section.id
                ? "text-foreground border-orange-500 font-medium"
                : "text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground border-transparent",
            )}
          >
            {section.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
