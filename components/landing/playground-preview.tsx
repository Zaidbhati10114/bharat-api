"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { mockPincodeData } from "./mock-pinocode";

export function PlaygroundPreview() {
  const [pin, setPin] = useState("421201");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => mockPincodeData[pin] ?? null, [pin]);

  async function copyJson() {
    await navigator.clipboard.writeText(
      JSON.stringify(
        result
          ? { success: true, data: result }
          : { success: false, error: "PIN code not found" },
        null,
        2,
      ),
    );

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-orange-500">Interactive Playground</p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Test an API before signing up.
          </h2>

          <p className="text-muted-foreground mt-6 text-lg">
            Experience BharatAPI exactly how developers will use it.
          </p>
        </div>

        <div className="bg-background/80 mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border backdrop-blur">
          <div className="grid lg:grid-cols-[340px_1fr]">
            {/* Request Panel */}

            <div className="border-b p-6 lg:border-r lg:border-b-0">
              <div className="mb-5 text-sm font-semibold">Request</div>

              <div className="rounded-xl bg-orange-500/10 px-3 py-2 text-sm font-medium text-orange-500">
                GET /v1/pincode/:code
              </div>

              <div className="relative mt-5">
                <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />

                <input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength={6}
                  placeholder="421201"
                  className="bg-background h-12 w-full rounded-xl border pr-4 pl-11 text-sm transition outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15"
                />
              </div>

              <Button className="mt-5 w-full rounded-xl bg-orange-500 hover:bg-orange-600">
                Send Request
              </Button>
            </div>

            {/* Response Panel */}

            <motion.div
              key={pin}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold">Response</div>

                <Button variant="outline" size="sm" onClick={copyJson}>
                  <Copy className="mr-2 size-4" />

                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>

              <div className="overflow-hidden rounded-2xl bg-zinc-950 text-zinc-100">
                <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                  <span className="text-xs text-zinc-400">
                    application/json
                  </span>

                  <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                    200 OK
                  </span>
                </div>

                <pre className="overflow-x-auto p-5 text-sm">
                  {JSON.stringify(
                    result
                      ? { success: true, data: result }
                      : { success: false, error: "PIN code not found" },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
