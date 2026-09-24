"use client";

import { useRef, useState } from "react";
import {
  Copy,
  Check,
  Loader2,
  Send,
  Clock,
  CircleCheck,
  CircleX,
  RotateCcw,
  Database,
  Terminal,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { IBM_Plex_Mono } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/shared/code-block";
import { API_BASE } from "@/lib/api/client";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface ApiPlaygroundProps {
  method: "GET";
  endpoint: string;
  placeholder: string;
  paramName: string;
  validatePattern: string;
}

export function ApiPlayground({
  method,
  endpoint,
  placeholder,
  paramName,
  validatePattern,
}: ApiPlaygroundProps) {
  const validator = new RegExp(validatePattern);

  const [value, setValue] = useState(placeholder);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const startTimeRef = useRef(0);

  const requestPath = endpoint.replace(`{${paramName}}`, value);
  const requestUrl = `${API_BASE}${requestPath}`;

  async function sendRequest() {
    if (!validator.test(value)) return;

    setLoading(true);
    startTimeRef.current = performance.now();

    try {
      const res = await fetch(requestUrl, {
        headers: {
          Accept: "application/json",
        },
      });

      const json = await res.json();
      const formatted = JSON.stringify(json, null, 2);

      setStatus(res.status);
      setTime(Math.round(performance.now() - startTimeRef.current));
      setSize(new Blob([formatted]).size);
      setResponse(formatted);
    } catch {
      const formatted = JSON.stringify(
        {
          success: false,
          code: "NETWORK_ERROR",
          message: "Unable to reach BharatAPI.",
        },
        null,
        2,
      );

      setStatus(500);
      setResponse(formatted);
      setTime(null);
      setSize(new Blob([formatted]).size);
    } finally {
      setLoading(false);
    }
  }

  async function copyResponse() {
    if (!response) return;

    await navigator.clipboard.writeText(response);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  function resetExplorer() {
    setValue(placeholder);
    setResponse("");
    setStatus(null);
    setTime(null);
    setSize(null);
  }

  return (
    <div className="bg-card rounded-3xl border shadow-sm">
      <div className="space-y-6 p-8">
        {/* Header */}

        <div className="space-y-2">
          <h3 className="text-3xl font-semibold tracking-tight">
            API Explorer
          </h3>

          <p className="text-muted-foreground text-base leading-7">
            Send real requests to the production Cloudflare endpoint.
          </p>
        </div>

        {/* Input */}

        <div className="bg-background flex overflow-hidden rounded-2xl border">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendRequest()}
            placeholder={placeholder}
            className="h-14 border-0 text-base shadow-none focus-visible:ring-0"
          />

          <Button
            onClick={sendRequest}
            disabled={loading || !validator.test(value)}
            className="h-14 rounded-none rounded-r-2xl px-8"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Sending
              </>
            ) : (
              <>
                <Send className="mr-2 size-4" />
                Send
              </>
            )}
          </Button>
        </div>

        {/* Request URL */}

        <div className="flex items-center gap-3 rounded-2xl border bg-zinc-50 px-4 py-3 dark:bg-zinc-900">
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
            {method}
          </span>

          <div
            className="text-[15px] break-all text-zinc-800 dark:text-zinc-200"
            style={{ fontFamily: plexMono.style.fontFamily }}
          >
            {requestUrl}
          </div>
        </div>

        {/* Status */}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${status}-${time}-${size}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-2"
            >
              {status !== null && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    status < 400
                      ? "bg-green-500/10 text-green-600"
                      : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {status < 400 ? (
                    <CircleCheck className="size-3.5" />
                  ) : (
                    <CircleX className="size-3.5" />
                  )}
                  {status}
                </span>
              )}

              {time !== null && (
                <span className="bg-muted inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                  <Clock className="size-3.5" />
                  {time} ms
                </span>
              )}

              {size !== null && (
                <span className="bg-muted inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs">
                  <Database className="size-3.5" />
                  {size} B
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyResponse}>
              {copied ? (
                <>
                  <Check className="mr-1 size-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 size-3.5" />
                  Copy
                </>
              )}
            </Button>

            <Button variant="ghost" size="sm" onClick={resetExplorer}>
              <RotateCcw className="mr-1 size-3.5" />
              Reset
            </Button>
          </div>
        </div>

        {/* Response */}

        <div className="overflow-hidden rounded-2xl border">
          <div className="bg-muted/30 border-b px-5 py-4">
            <span className="text-base font-semibold">JSON Response</span>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-950 p-8"
              >
                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                  }}
                  className="space-y-3"
                >
                  <div className="h-3 w-1/3 rounded bg-zinc-700" />
                  <div className="h-3 w-full rounded bg-zinc-700" />
                  <div className="h-3 w-5/6 rounded bg-zinc-700" />
                  <div className="h-3 w-2/3 rounded bg-zinc-700" />
                </motion.div>
              </motion.div>
            ) : response ? (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-950"
              >
                <CodeBlock code={response} language="json" lineNumbers />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-950 px-8 py-14 text-center"
              >
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-orange-500/10">
                  <Terminal className="size-6 text-orange-400" />
                </div>

                <h4 className="mb-2 text-lg font-semibold text-white">
                  Response will appear here
                </h4>

                <p className="mb-6 text-zinc-400">
                  Enter a valid PIN code and send a request.
                </p>

                <div className="mx-auto w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                  <div
                    className="overflow-x-auto text-left text-sm text-zinc-200"
                    style={{ fontFamily: plexMono.style.fontFamily }}
                  >
                    GET {API_BASE}/api/v1/pincode/421201
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
