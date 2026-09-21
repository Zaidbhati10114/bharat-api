"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DocsBreadcrumbsProps {
  title: string;
}

export function DocsBreadcrumbs({ title }: DocsBreadcrumbsProps) {
  return (
    <nav className="text-muted-foreground mb-6 flex items-center gap-2 text-sm">
      <Link href="/" className="hover:text-foreground transition">
        Home
      </Link>

      <ChevronRight className="size-4" />

      <Link href="/docs/pincode" className="hover:text-foreground transition">
        Docs
      </Link>

      <ChevronRight className="size-4" />

      <span className="font-medium text-orange-500">{title}</span>
    </nav>
  );
}
