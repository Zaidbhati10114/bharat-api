"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  GitCommitHorizontal,
  Play,
  Search,
  ShieldCheck,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const items = [
  {
    title: "Documentation",
    icon: BookOpen,
    href: "/docs",
  },
  {
    title: "API Playground",
    icon: Play,
    href: "/playground",
  },
  {
    title: "Status",
    icon: ShieldCheck,
    href: "/status",
  },
  {
    title: "GitHub",
    icon: GitCommitHorizontal,
    href: "https://github.com",
    external: true,
  },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", down);

    return () => window.removeEventListener("keydown", down);
  }, []);

  const groupedItems = useMemo(() => items, []);

  function navigate(item: (typeof items)[number]) {
    setOpen(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(item.href);
  }

  return (
    <>
      {/* Desktop Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="border-border/60 bg-background/70 text-muted-foreground hover:bg-muted/50 hover:text-foreground hidden items-center gap-2 rounded-full border px-3 py-2 text-sm backdrop-blur transition-all duration-200 md:flex"
      >
        <Search className="size-4" />

        <span>Search</span>

        <div className="ml-2 flex gap-1">
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">⌘</kbd>
          <kbd className="rounded border px-1.5 py-0.5 text-[10px]">K</kbd>
        </div>
      </button>

      {/* Mobile Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="border-border/60 bg-background/70 hover:bg-muted/50 rounded-full border p-2 backdrop-blur transition-all duration-200 md:hidden"
        aria-label="Search BharatAPI"
      >
        <Search className="size-5" />
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search BharatAPI..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {groupedItems.map((item) => {
              const Icon = item.icon;

              return (
                <CommandItem
                  key={item.title}
                  value={item.title}
                  onSelect={() => navigate(item)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-3 size-4" />
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
