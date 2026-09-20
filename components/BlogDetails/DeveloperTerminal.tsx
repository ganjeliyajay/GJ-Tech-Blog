
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Copy,
  Check,
  Play,
  Sparkles,
} from "lucide-react";

import { useToast } from "@/context/ToastContext";

export default function DeveloperTerminal() {
  const [copied, setCopied] = useState(false);
  const [displayedLines, setDisplayedLines] = useState(0);

  const { showToast } = useToast();

  const developerCodeLines = [
    `// ~/gj-tech/src/core/developer.ts`,
    `const developer = {`,
    `  name: "Ganjeliya Jay",`,
    `  passion: "building",`,
    `  stack: ["React", "Next.js", "TypeScript", "Node.js"],`,
    `  learning: true,`,
    `  status: "shipping_to_production"`,
    `};`,
    ``,
    `developer.ship(); // 🚀 Deployed with 0 downtime`,
  ];

  useEffect(() => {
    setDisplayedLines(0);

    let count = 0;

    const interval = setInterval(() => {
      count++;

      setDisplayedLines(count);

      if (count >= developerCodeLines.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      const textToCopy = developerCodeLines.join("\n");

      await navigator.clipboard.writeText(textToCopy);

      setCopied(true);

      showToast(
        "Developer snippet copied to clipboard!",
        "success",
      );

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      showToast(
        "Failed to copy terminal snippet.",
        "error",
      );
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Floating Ambient Glow */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-70 animate-pulse pointer-events-none" />

      {/* Floating Tech Badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute -top-5 -left-4 sm:-left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md shadow-lg shadow-cyan-500/10 text-xs font-mono text-cyan-300"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        React 19 & Next.js
      </motion.div>

      {/* Floating Architecture Badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-4 -right-4 sm:-right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-500/30 bg-slate-900/90 backdrop-blur-md shadow-lg shadow-purple-500/10 text-xs font-mono text-purple-300"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        Type-Safe Architecture
      </motion.div>

      {/* Main Terminal Shell */}
      <div className="relative rounded-2xl border border-slate-700/60 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/50" />

              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50" />

              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50" />
            </div>

            {/* Path indicator */}
            <span className="ml-3 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" />
              ~/gj-tech
            </span>
          </div>

          {/* Developer File Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-300">
              developer.ts
            </span>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition"
              aria-label="Copy developer code"
              title="Copy developer code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px] bg-gradient-to-b from-slate-950 to-slate-950/90 selection:bg-cyan-500/30">
          {developerCodeLines
            .slice(0, displayedLines)
            .map((line, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4"
                >
                  <span className="text-slate-600 select-none text-right w-5 text-xs">
                    {idx + 1}
                  </span>

                  <span className="flex-1">
                    {line.startsWith("//") ? (
                      <span className="text-slate-500 italic">
                        {line}
                      </span>
                    ) : line.includes("const ") ? (
                      <span>
                        <span className="text-purple-400 font-semibold">
                          const{" "}
                        </span>

                        <span className="text-cyan-300">
                          developer{" "}
                        </span>

                        <span className="text-white">
                          ={" "}
                        </span>

                        <span className="text-amber-300">
                          {"{"}
                        </span>
                      </span>
                    ) : line.includes("passion:") ||
                      line.includes("stack:") ||
                      line.includes("learning:") ||
                      line.includes("status:") ||
                      line.includes("name:") ? (
                      <span>
                        <span className="text-blue-400">
                          {line.split(":")[0]}
                        </span>

                        <span className="text-white">
                          :
                        </span>

                        <span className="text-emerald-300">
                          {line.split(":").slice(1).join(":")}
                        </span>
                      </span>
                    ) : line.includes("developer.ship()") ? (
                      <span>
                        <span className="text-cyan-400 font-semibold">
                          developer
                        </span>

                        <span className="text-white">
                          .
                        </span>

                        <span className="text-amber-400 font-bold">
                          ship
                        </span>

                        <span className="text-white">
                          ();
                        </span>

                        <span className="text-emerald-400 text-xs">
                          {" // 🚀 Deployed"}
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-300">
                        {line}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}

          {/* Blinking Cursor */}
          <div className="flex items-center gap-4 mt-1">
            <span className="text-slate-700 select-none text-right w-5 text-xs">
              {displayedLines + 1}
            </span>

            <div className="flex items-center gap-1 text-cyan-400 font-bold">
              <span>$</span>

              <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-cursor" />
            </div>
          </div>
        </div>

        {/* Terminal Status Footer */}
        <div className="px-4 py-2 bg-slate-900/70 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />

            <span>
              Terminal: Node v24.4 (V8 Engine)
            </span>
          </div>

          <div className="flex items-center gap-1 text-cyan-400">
            <Play className="w-2.5 h-2.5 fill-cyan-400" />

            <span>Active Process</span>
          </div>
        </div>
      </div>
    </div>
  );
}