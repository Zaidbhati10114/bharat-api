"use client";

import { useState } from "react";
import { Copy, Loader2, Send, Check } from "lucide-react";

import { fetchPincode } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LivePlayground() {
  const [code, setCode] = useState("421201");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleRequest() {
    if (!/^\d{6}$/.test(code)) return;

    setLoading(true);

    try {
      const result = await fetchPincode(code);

      setStatus(result.status);
      setTime(result.time);
      setResponse(JSON.stringify(result.data, null, 2));
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(response);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="bg-card space-y-6 rounded-3xl border p-8 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Try the API</h3>

        <p className="text-muted-foreground">
          Test the live BharatAPI endpoint without leaving the documentation.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="421201"
          maxLength={6}
        />

        <Button onClick={handleRequest} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              Send Request
            </>
          )}
        </Button>
      </div>

      {(status || response) && (
        <>
          <div className="flex gap-2">
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600">
              {status}
            </span>

            <span className="bg-muted rounded-full px-3 py-1 text-sm">
              {time} ms
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border">
            <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-medium">Response</span>

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

            <pre className="overflow-x-auto bg-zinc-950 p-6 text-sm leading-7 text-green-400 dark:bg-black">
              <code>{response}</code>
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
