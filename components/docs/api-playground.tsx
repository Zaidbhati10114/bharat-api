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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const { resolvedTheme } = useTheme();

  const [value, setValue] = useState(placeholder);
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const startTimeRef = useRef(0);

  const requestPath = endpoint.replace(`{${paramName}}`, value);

  async function sendRequest() {
    if (!validator.test(value)) return;

    setLoading(true);
    startTimeRef.current = window.performance.now();

    try {
      const res = await fetch(requestPath);
      const json = await res.json();

      const formatted = JSON.stringify(json, null, 2);

      setStatus(res.status);
      setTime(Math.round(window.performance.now() - startTimeRef.current));
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
      setTime(null);
      setSize(new Blob([formatted]).size);
      setResponse(formatted);
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
    setLoading(false);
    setCopied(false);
  }

  return (
    <div className="bg-card rounded-2xl border shadow-sm">
      <div className="space-y-5 p-6">
        {/* Header */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">API Explorer</h3>
          <p className="text-muted-foreground text-sm">
            Test the live endpoint directly from the documentation.
          </p>
        </div>

        {/* Unified Input */}
        <div className="bg-background flex overflow-hidden rounded-xl border">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendRequest()}
            placeholder={placeholder}
            maxLength={12}
            className="h-11 border-0 shadow-none focus-visible:ring-0"
          />

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={sendRequest}
              disabled={loading || !validator.test(value)}
              className="h-11 rounded-none rounded-r-xl border-l px-5"
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
          </motion.div>
        </div>

        {/* Request Preview */}
        <div className="bg-muted/30 flex items-center gap-3 rounded-xl border px-4 py-2.5">
          <span className="rounded bg-green-500/10 px-2 py-1 text-[11px] font-semibold text-green-600">
            {method}
          </span>

          <code className="text-xs">{requestPath}</code>
        </div>

        {/* Response Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${status}-${time}-${size}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap items-center gap-2"
            >
              {status !== null && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
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
                  {status} {status < 400 ? "OK" : "Error"}
                </span>
              )}

              {time !== null && (
                <span className="bg-muted inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs">
                  <Clock className="size-3.5" />
                  {time} ms
                </span>
              )}

              {size !== null && (
                <span className="bg-muted inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs">
                  <Database className="size-3.5" />
                  {size} B
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={copyResponse}
                disabled={!response}
              >
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
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Button variant="ghost" size="sm" onClick={resetExplorer}>
                <RotateCcw className="mr-1 size-3.5" />
                Reset
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Response */}
        <div className="overflow-hidden rounded-xl border">
          <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-medium">JSON Response</span>

            {status !== null && (
              <span className="text-muted-foreground text-xs">
                {status < 400 ? "Success" : "Error"}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-950 p-6 dark:bg-black"
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
                  <div className="h-3 w-4/5 rounded bg-zinc-700" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={response || "empty"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="bg-zinc-950 dark:bg-black"
              >
                {response ? (
                  <SyntaxHighlighter
                    language="json"
                    style={resolvedTheme === "dark" ? oneDark : oneLight}
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                      margin: 0,
                      padding: "24px",
                      background: "transparent",
                      fontSize: "13.5px",
                      lineHeight: "1.8",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      },
                    }}
                  >
                    {response}
                  </SyntaxHighlighter>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                    <div className="rounded-full bg-green-500/10 p-3">
                      <Terminal className="size-5 text-green-500" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-white">
                        Response will appear here
                      </h4>

                      <p className="text-sm text-zinc-400">
                        Enter a valid PIN code and send a request.
                      </p>
                    </div>

                    <code className="text-xs text-zinc-500">
                      GET /api/v1/pincode/421201
                    </code>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
