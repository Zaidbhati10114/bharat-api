"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/use-active-heading";

const headings = [
  { id: "overview", title: "Overview" },
  { id: "endpoint", title: "Lookup Endpoint" },
  { id: "response", title: "Example Response" },
  {
    id: "playground",
    title: "Live Playground",
  },
  { id: "errors", title: "Errors" },
];

export function TableOfContents() {
  const active = useActiveHeading(headings.map((h) => h.id));

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
        On This Page
      </p>

      <nav className="space-y-1">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block border-l-2 py-1 pl-4 text-sm transition-all duration-200",
              active === heading.id
                ? "text-foreground border-orange-500 font-medium"
                : "text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground border-transparent",
            )}
          >
            {heading.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
