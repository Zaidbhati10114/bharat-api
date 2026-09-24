"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const DocsTabs = Tabs.Root;

export const DocsTabsList = ({ children }: { children: React.ReactNode }) => (
  <Tabs.List className="inline-flex rounded-lg border bg-zinc-100 p-1 dark:bg-zinc-900">
    {children}
  </Tabs.List>
);

export const DocsTabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => (
  <Tabs.Trigger
    value={value}
    className={cn(
      "rounded-md px-4 py-2 text-sm font-medium transition-colors",
      "text-zinc-600 dark:text-zinc-400",
      "data-[state=active]:bg-white data-[state=active]:text-zinc-900",
      "dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-white",
    )}
  >
    {children}
  </Tabs.Trigger>
);

export const DocsTabsContent = Tabs.Content;
