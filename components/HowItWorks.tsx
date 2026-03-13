"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    num: "01",
    title: "Check in",
    desc: "Log sleep, soreness, stress, and wellness in under 30 seconds. Redline builds your baseline over time.",
    accent: "#dc2626",
  },
  {
    num: "02",
    title: "Get scored",
    desc: "Your readiness score updates in real-time — combining HRV, subjective data, and training load history.",
    accent: "#00ff88",
  },
  {
    num: "03",
    title: "Train smart",
    desc: "Receive AI-adapted options calibrated to your state. Push when you're primed. Pull back when you're not.",
    accent: "#dc2626",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 px-8 md:px-14 lg:px-20 xl:px-24">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-20"
        >
          <span className="text-[10px] text-[#dc2626] uppercase tracking-[0.4em] block mb-3">
            How it works
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] text-white leading-tight tracking-tight">
            Three steps to{" "}
            <span className="text-slate-500">training that adapts.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
              {/* Step number */}
              <span
                className="text-[64px] font-bold leading-none tracking-tighter block mb-4"
                style={{ color: step.accent, opacity: 0.12 }}
              >
                {step.num}
              </span>

              {/* Accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  duration: 0.5,
                  ease: EASE,
                }}
                className="h-px w-12 mb-5 origin-left"
                style={{ background: step.accent }}
              />

              <h3 className="text-white text-[15px] uppercase tracking-[0.15em] mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
