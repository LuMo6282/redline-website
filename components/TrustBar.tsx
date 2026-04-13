"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const archetypes = [
  { label: "CROSSFIT ATHLETES" },
  { label: "HYBRID RUNNERS" },
  { label: "STRENGTH SPORT" },
  { label: "HYROX COMPETITORS" },
  { label: "TRIATHLETES" },
  { label: "TACTICAL OPERATORS" },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Duplicate the list for seamless marquee
  const loop = [...archetypes, ...archetypes];

  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20">
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-16" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="h-px w-8 bg-red" />
          <span className="font-mono text-[10px] text-bone-300 uppercase tracking-[0.35em]">
            engineered for
          </span>
          <span className="h-px w-8 bg-red" />
        </motion.div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="relative"
      >
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #050505, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #050505, transparent)",
          }}
        />

        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 gap-12 pr-12">
            {loop.map((a, i) => (
              <div
                key={`${a.label}-${i}`}
                className="flex items-center gap-4 shrink-0"
              >
                <span
                  className="w-1.5 h-1.5"
                  style={{
                    background: i % 2 === 0 ? "#ef2b2d" : "#16d975",
                    boxShadow: `0 0 8px ${i % 2 === 0 ? "#ef2b2d" : "#16d975"}aa`,
                  }}
                />
                <span
                  className="text-bone-200 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "0.08em",
                  }}
                >
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
