"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { LiveTerminal } from "./live-terminal";

const trustItems = ["OpenAPI 3.1", "Free Forever", "Edge Cached"];

export function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6 inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                Free Forever
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-foreground text-5xl leading-[0.92] font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl"
            >
              Build India-first
              <br />
              apps faster.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground mt-8 text-lg leading-8"
            >
              Free APIs for Indian developers. Pincode, holidays, vehicle codes,
              and more—built with official and open datasets.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="group rounded-xl bg-orange-500 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25"
                asChild
              >
                <Link href="/docs">
                  Get Started
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover:bg-muted rounded-xl"
                asChild
              >
                <Link href="/playground">API Playground</Link>
              </Button>
            </motion.div>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm"
            >
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -4, 0],
            }}
            transition={{
              opacity: { duration: 0.6 },
              x: { duration: 0.6 },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}

            className="relative"
          >
            <LiveTerminal />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
