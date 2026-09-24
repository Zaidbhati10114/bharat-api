"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IBM_Plex_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface Tab {
  label: string;
  language: string;
  code: string;
}

interface CodeTabsProps {
  tabs: Tab[];
}

export function CodeTabs({ tabs }: CodeTabsProps) {
  const safeTabs = tabs.filter((t) => t.code);

  const [active, setActive] = useState(safeTabs[0]?.label ?? "");
  const [copied, setCopied] = useState(false);

  const current = safeTabs.find((t) => t.label === active) ?? safeTabs[0];

  async function copy() {
    if (!current) return;

    await navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (!current) {
    return (
      <div className="text-muted-foreground rounded-2xl border border-dashed p-6 text-center text-sm">
        No code examples available.
      </div>
    );
  }

  return (
    <Tabs.Root value={active} onValueChange={setActive}>
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#09090B]">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <Tabs.List className="inline-flex rounded-xl bg-zinc-900 p-1">
            {safeTabs.map((tab) => (
              <Tabs.Trigger
                key={tab.label}
                value={tab.label}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  "text-zinc-300 hover:text-white",
                  "data-[state=active]:bg-zinc-800 data-[state=active]:text-white",
                )}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Button
            variant="ghost"
            size="icon"
            onClick={copy}
            className="h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            {copied ? (
              <Check className="size-4 text-green-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>

        {safeTabs.map((tab) => (
          <Tabs.Content key={tab.label} value={tab.label}>
            <SyntaxHighlighter
              language={tab.language}
              style={vscDarkPlus}
              showLineNumbers={false}
              wrapLongLines
              customStyle={{
                margin: 0,
                padding: "32px",
                background: "transparent",
                fontFamily: plexMono.style.fontFamily,
                fontSize: "17px",
                lineHeight: "1.9",
                fontWeight: 500,
              }}
              codeTagProps={{
                style: {
                  fontFamily: plexMono.style.fontFamily,
                  fontSize: "17px",
                  fontWeight: 500,
                },
              }}
            >
              {tab.code}
            </SyntaxHighlighter>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
