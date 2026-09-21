"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { BookOpen, Play, Shield, GitCommitHorizontal } from "lucide-react";
import { site } from "@/lib/site";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search BharatAPI..." />

      <CommandList>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => {
              router.push("/docs");
              setOpen(false);
            }}
          >
            <BookOpen className="mr-2 size-4" />
            Documentation
          </CommandItem>

          <CommandItem
            onSelect={() => {
              router.push("/playground");
              setOpen(false);
            }}
          >
            <Play className="mr-2 size-4" />
            API Playground
          </CommandItem>

          <CommandItem
            onSelect={() => {
              router.push("/status");
              setOpen(false);
            }}
          >
            <Shield className="mr-2 size-4" />
            Status
          </CommandItem>

          <CommandItem
            onSelect={() => {
              window.open(site.github, "_blank");
              setOpen(false);
            }}
          >
            <GitCommitHorizontal className="mr-2 size-4" />
            GitHub
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
