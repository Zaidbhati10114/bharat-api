"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-background/60 flex items-center rounded-full border p-1 backdrop-blur">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon-sm"
        className="rounded-full"
        onClick={() => setTheme("light")}
      >
        <Sun className="size-4" />
      </Button>

      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon-sm"
        className="rounded-full"
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-4" />
      </Button>
    </div>
  );
}
