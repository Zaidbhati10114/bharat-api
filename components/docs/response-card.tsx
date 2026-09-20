"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResponseCardProps {
  response: string;
}

export function ResponseCard({ response }: ResponseCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(response);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-card overflow-hidden rounded-3xl border shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-sm font-medium">Example Response</span>

        <button
          onClick={handleCopy}
          className="hover:bg-muted rounded-lg p-2 transition"
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>

      <pre className="overflow-x-auto bg-zinc-950 p-8 text-sm leading-7 text-green-400 dark:bg-black">
        <code>{response}</code>
      </pre>
    </div>
  );
}
