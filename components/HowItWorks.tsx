"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    num: "01",
    title: "Check in",
    desc: "Log sleep, soreness, stress, and wellness in under 30 seconds. Redline builds your baseline over time.",
    accent: "#ef2b2d",
  },
  {
    num: "02",
    title: "Get scored",
    desc: "Your readiness score updates in real-time — combining HRV, subjective data, and training load history.",
    accent: "#16d975",
  },
  {
    num: "03",
    title: "Train smart",
    desc: "Receive AI-adapted options calibrated to your state. Push when you're primed. Pull back when you're not.",
    accent: "#ef2b2d",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 px-6 md:px-10 lg:px-14 xl:px-20">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-red" />
              <span className="font-mono text-[10px] text-bone-300 uppercase tracking-[0.32em]">
                / 02 · how it works
              </span>
            </div>
            <h2
              className="text-bone-50 leading-[0.98] tracking-[-0.025em]"
              style={{
                fontFamily: "var(--font-syne), 'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              }}
            >
              Three steps to training{" "}
              <span className="text-bone-400">that adapts.</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] text-bone-500 uppercase tracking-[0.25em] md:text-right md:max-w-[200px] leading-relaxed">
            No journaling. No manual
            <br />
            log-building. Just answers.
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 relative">
          {/* Connector line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[42px] left-[3%] right-[3%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(245,241,232,0.12), transparent)",
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.15,
                duration: 0.6,
                ease: EASE,
              }}
              className="group relative"
            >
              {/* Step marker */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="relative flex items-center justify-center w-[52px] h-[52px] bg-[#070707] border"
                  style={{ borderColor: `${step.accent}55` }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-syne), 'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: step.accent,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.num}
                  </span>
                  {/* Corner ticks */}
                  <span
                    className="absolute -top-px -left-px w-2 h-2 border-t border-l"
                    style={{ borderColor: step.accent }}
                  />
                  <span
                    className="absolute -top-px -right-px w-2 h-2 border-t border-r"
                    style={{ borderColor: step.accent }}
                  />
                  <span
                    className="absolute -bottom-px -left-px w-2 h-2 border-b border-l"
                    style={{ borderColor: step.accent }}
                  />
                  <span
                    className="absolute -bottom-px -right-px w-2 h-2 border-b border-r"
                    style={{ borderColor: step.accent }}
                  />
                </div>
                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    delay: 0.35 + i * 0.15,
                    duration: 0.6,
                    ease: EASE,
                  }}
                  className="h-px flex-1 origin-left"
                  style={{
                    background: `linear-gradient(to right, ${step.accent}aa, transparent)`,
                  }}
                />
              </div>

              <h3
                className="text-bone-50 mb-4 leading-tight"
                style={{
                  fontFamily: "var(--font-syne), 'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p className="text-bone-300 text-[14px] leading-[1.65] max-w-[320px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
