"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { ExampleLanguage } from "@/lib/docs/types";

interface CodeTabsProps {
  examples: Partial<Record<ExampleLanguage, string>>;
}

const languageLabels: Record<ExampleLanguage, string> = {
  curl: "cURL",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  go: "Go",
  java: "Java",
  csharp: "C#",
  php: "PHP",
  ruby: "Ruby",
  swift: "Swift",
};

const syntaxMap: Record<ExampleLanguage, string> = {
  curl: "bash",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  go: "go",
  java: "java",
  csharp: "csharp",
  php: "php",
  ruby: "ruby",
  swift: "swift",
};

export function CodeTabs({ examples }: CodeTabsProps) {
  const { resolvedTheme } = useTheme();

  const languages = useMemo(
    () =>
      (Object.entries(examples) as [ExampleLanguage, string][]).filter(
        ([, code]) => !!code,
      ),
    [examples],
  );

  const [active, setActive] = useState<ExampleLanguage>(
    languages[0]?.[0] ?? "curl",
  );
  const [copied, setCopied] = useState(false);

  const code = examples[active] ?? "";

  async function handleCopy() {
    if (!code) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-2xl border">
      {/* Tabs */}
      <div className="bg-muted/30 flex items-center justify-between border-b px-2 py-2">
        <div className="flex gap-1 overflow-x-auto">
          {languages.map(([lang]) => (
            <button
              key={lang}
              onClick={() => setActive(lang)}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                active === lang
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="hover:bg-background rounded-lg p-2 transition"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>

      {/* Code */}
      <div className="bg-zinc-950 dark:bg-black">
        <SyntaxHighlighter
          language={syntaxMap[active]}
          style={resolvedTheme === "dark" ? oneDark : oneLight}
          showLineNumbers
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: "20px",
            background: "transparent",
            fontSize: "13px",
            lineHeight: "1.7",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
