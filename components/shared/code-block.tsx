"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { IBM_Plex_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface CodeBlockProps {
  code: string;
  language: string;
  lineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  lineNumbers = false,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#09090B]">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <span className="font-mono text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase">
          {language}
        </span>

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

      <SyntaxHighlighter
        language={language}
        style={resolvedTheme === "dark" ? vscDarkPlus : oneLight}
        showLineNumbers={lineNumbers}
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "28px",
          background: "transparent",
          fontFamily: plexMono.style.fontFamily,
          fontSize: "16px",
          lineHeight: "1.85",
        }}
        lineNumberStyle={{
          minWidth: "2.8rem",
          color: "#6B7280",
          paddingRight: "18px",
          userSelect: "none",
        }}
        codeTagProps={{
          style: {
            fontFamily: plexMono.style.fontFamily,
            fontSize: "16px",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
