"use client";

import Link from "next/link";
import { GitCommitHorizontal, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { site } from "@/lib/site";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "../shared/command-pallete";

const navItems = [
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/playground" },
  { label: "Status", href: "/status" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <header className="sticky top-4 z-50">
      <Container>
        <div
          className={cn(
            "bg-background/80 rounded-full border backdrop-blur-xl transition-all duration-300",
            scrolled
              ? "border-border/70 shadow-lg"
              : "border-border/40 shadow-sm",
          )}
        >
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="group">
              <span className="text-lg font-bold tracking-tight transition group-hover:text-orange-500">
                BharatAPI
              </span>
            </Link>

            {/* Desktop */}
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group text-muted-foreground hover:text-foreground relative text-sm transition"
                >
                  {item.label}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden rounded-full md:inline-flex"
              >
                <Link href={site.github}>
                  <GitCommitHorizontal className="mr-2 size-4" />
                  GitHub
                </Link>
              </Button>

              {/* Mobile menu stays unchanged */}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
