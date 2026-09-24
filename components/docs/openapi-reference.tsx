"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const responses = [
  {
    status: "200",
    text: "Successful lookup",
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    status: "400",
    text: "Invalid PIN code",
    className: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    status: "404",
    text: "PIN code not found",
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
];

export function OpenApiReference() {
  const [copied, setCopied] = useState(false);

  const endpoint = "/api/v1/pincode/{code}";
  const curl = `curl https://bharat-api.zaidbhati007.workers.dev/api/v1/pincode/421201`;

  async function copy() {
    await navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section id="openapi" className="space-y-6">
      {/* Section Header */}

      <div className="space-y-3">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          OpenAPI
        </h2>

        <p className="text-muted-foreground max-w-2xl text-base leading-7">
          Access the complete OpenAPI 3.1 specification for SDK generation,
          client libraries, API testing, and third-party integrations.
        </p>
      </div>

      {/* Reference Card */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="bg-card overflow-hidden rounded-3xl border shadow-sm"
      >
        {/* Card Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold">OpenAPI Reference</h3>

            <p className="text-muted-foreground text-sm">
              Generated from <code>openapi.yaml</code>
            </p>
          </div>

          <a
            href="/openapi.json"
            className="hover:bg-accent rounded-full border px-4 py-2 text-sm transition-colors"
          >
            Download JSON
          </a>
        </div>

        {/* Body */}

        <div className="space-y-8 p-8">
          {/* Endpoint */}

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">
                GET
              </span>

              <code className="bg-muted rounded-lg px-3 py-1.5 text-sm">
                {endpoint}
              </code>
            </div>

            <p className="text-muted-foreground leading-7">
              Retrieve location details for any valid 6-digit Indian PIN code.
            </p>
          </div>

          {/* Parameters */}

          <div className="rounded-2xl border p-5">
            <div className="mb-4 text-sm font-semibold">Path Parameters</div>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">code</span>

                  <span className="text-muted-foreground text-sm">string</span>
                </div>

                <p className="text-muted-foreground mt-2 text-sm">
                  Six-digit Indian PIN code.
                </p>
              </div>

              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                required
              </span>
            </div>
          </div>

          {/* Example */}

          <div className="overflow-hidden rounded-2xl border bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <span className="text-sm font-medium text-zinc-300">cURL</span>

              <button
                onClick={copy}
                className="rounded-md p-2 transition-colors hover:bg-zinc-800"
              >
                {copied ? (
                  <Check className="size-4 text-green-400" />
                ) : (
                  <Copy className="size-4 text-zinc-400" />
                )}
              </button>
            </div>

            <pre className="overflow-x-auto p-5 text-sm leading-7 text-zinc-200">
              <code>{curl}</code>
            </pre>
          </div>

          {/* Responses */}

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Responses</h4>

            {responses.map((response) => (
              <div
                key={response.status}
                className="flex items-center gap-3 rounded-xl border p-4"
              >
                <span
                  className={`w-14 rounded-lg py-1 text-center text-sm font-semibold ${response.className}`}
                >
                  {response.status}
                </span>

                <span className="text-muted-foreground text-sm">
                  {response.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
