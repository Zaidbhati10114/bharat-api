"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitCommitHorizontal, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const navItems = [
  { label: "Docs", href: "/docs/pincode" },
  { label: "Playground", href: "/playground" },
  { label: "Status", href: "/status" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);

    handler();

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openCommandPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: navigator.platform.includes("Mac"),
        ctrlKey: !navigator.platform.includes("Mac"),
        bubbles: true,
      }),
    );
  };

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
            <Link href="/" className="group flex items-center">
              <span className="text-lg font-bold tracking-tight transition group-hover:text-orange-500">
                BharatAPI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition",
                    pathname.startsWith(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}

                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-orange-500 transition-all duration-300",
                      pathname.startsWith(item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <button
                onClick={openCommandPalette}
                className="bg-background/50 text-muted-foreground hover:bg-muted hover:text-foreground hidden items-center gap-3 rounded-full border px-4 py-2 text-sm transition md:flex"
              >
                <Search className="size-4" />

                <span>Search APIs...</span>

                <kbd className="bg-muted rounded px-1.5 py-0.5 text-xs">⌘K</kbd>
              </button>

              <ThemeToggle />

              {/* GitHub */}
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

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={openCommandPalette}
              >
                <Search className="size-5" />
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-72">
                  <div className="mt-8 flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                          "hover:bg-muted rounded-lg px-3 py-3 text-base font-medium transition",
                          pathname.startsWith(item.href)
                            ? "bg-orange-500 text-white hover:bg-orange-500"
                            : "",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="my-4 border-t" />

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      asChild
                    >
                      <Link href={site.github}>
                        <GitCommitHorizontal className="size-4" />
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
