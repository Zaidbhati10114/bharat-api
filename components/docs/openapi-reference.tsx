"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export function OpenApiReference() {
  const [copied, setCopied] = useState(false);

  const endpoint = "/api/v1/pincode/{code}";
  const curl = `curl https://api.bharatapi.dev/api/v1/pincode/421201`;

  async function copy() {
    await navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-card overflow-hidden rounded-3xl border"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h3 className="text-xl font-semibold">OpenAPI Reference</h3>
          <p className="text-muted-foreground text-sm">
            Generated from <code>openapi.yaml</code>
          </p>
        </div>

        <a
          href="/openapi.json"
          className="hover:bg-accent rounded-full border px-4 py-2 text-sm transition"
        >
          Download JSON
        </a>
      </div>

      {/* Endpoint */}

      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
            GET
          </span>

          <code className="text-sm">{endpoint}</code>
        </div>

        <p className="text-muted-foreground">
          Retrieve location details for any valid 6-digit Indian PIN code.
        </p>

        {/* Parameters */}

        <div className="rounded-2xl border p-4">
          <div className="mb-3 text-sm font-semibold">Path Parameters</div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="font-medium">code</span>
              <span className="text-muted-foreground ml-2">string</span>
            </div>

            <span className="text-orange-500">required</span>
          </div>

          <p className="text-muted-foreground mt-2 text-sm">
            Six-digit Indian PIN code.
          </p>
        </div>

        {/* Example */}

        <div className="overflow-hidden rounded-2xl border bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <span className="text-sm text-zinc-300">cURL</span>

            <button onClick={copy}>
              {copied ? (
                <Check className="size-4 text-green-400" />
              ) : (
                <Copy className="size-4 text-zinc-400" />
              )}
            </button>
          </div>

          <pre className="overflow-x-auto p-4 text-sm text-zinc-200">
            {curl}
          </pre>
        </div>

        {/* Responses */}

        <div className="space-y-3">
          <h4 className="font-semibold">Responses</h4>

          {[
            ["200", "Successful lookup", "green"],
            ["400", "Invalid PIN code", "orange"],
            ["404", "PIN code not found", "red"],
          ].map(([status, text, color]) => (
            <div
              key={status}
              className="flex items-center gap-3 rounded-xl border p-3"
            >
              <span
                className={`w-14 rounded-lg py-1 text-center text-sm font-semibold bg-${color}-500/10 text-${color}-500`}
              >
                {status}
              </span>

              <span className="text-muted-foreground text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
