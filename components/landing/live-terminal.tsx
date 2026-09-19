"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";

const command = "curl api.bharatapi.dev/v1/pincode/421201";

const responseLines = [
  "{",
  '  "success": true,',
  '  "data": {',
  '    "city": "Dombivli",',
  '    "district": "Thane",',
  '    "state": "Maharashtra"',
  "  }",
  "}",
];

export function LiveTerminal() {
  const prefersReducedMotion = useReducedMotion();

  const [typed, setTyped] = useState(prefersReducedMotion ? command : "");
  const [typingFinished, setTypingFinished] = useState(prefersReducedMotion);
  const [visibleLines, setVisibleLines] = useState(
    prefersReducedMotion ? responseLines.length : 0,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let index = 0;

    const typing = setInterval(() => {
      index++;
      setTyped(command.slice(0, index));

      if (index >= command.length) {
        clearInterval(typing);

        responseLines.forEach((_, lineIndex) => {
          setTimeout(() => {
            setVisibleLines(lineIndex + 1);

            if (lineIndex === responseLines.length - 1) {
              setTypingFinished(true);
            }
          }, lineIndex * 120);
        });
      }
    }, 35);

    return () => clearInterval(typing);
  }, [prefersReducedMotion]);

  const copyText = useMemo(
    () =>
      `${command}

${responseLines.join("\n")}`,
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -5, 0],
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
      <div className="border-border bg-background/80 overflow-hidden rounded-[32px] border shadow-[0_30px_80px_rgba(0,0,0,.12)] backdrop-blur-xl dark:shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>

          <button
            onClick={handleCopy}
            aria-label="Copy terminal output"
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-2 transition"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                >
                  <Check className="size-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                >
                  <Copy className="size-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Terminal */}
        <div className="space-y-6 p-7 font-mono text-sm">
          <div className="break-all text-green-500">
            $ {typed}
            {!prefersReducedMotion && !typingFinished && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </div>

          <div className="text-foreground space-y-1">
            <AnimatePresence>
              {responseLines.slice(0, visibleLines).map((line, i) => (
                <motion.pre
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-pre-wrap"
                >
                  {line}
                </motion.pre>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
