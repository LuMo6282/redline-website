"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Readiness scoring",
    desc: "Composite score from HRV, sleep, wellness, soreness, stress, and training load — updated every morning.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Adaptive programming",
    desc: "Your training plan flexes in real-time. Intensity, volume, and exercise selection bend to your readiness.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "AI coach",
    desc: "Ask anything. Get context-aware answers grounded in your data, your history, and sport science.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "Load management",
    desc: "Track acute-to-chronic workload ratios across modalities. Stay in the sweet spot, avoid the red zone.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Hybrid-native",
    desc: "Built for athletes who run, lift, and compete across disciplines. Not a running app. Not a lifting app.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Your data, private",
    desc: "No social feeds. No data selling. Your biometrics stay yours. Period.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative z-10 py-32 px-8 md:px-14 lg:px-20 xl:px-24">
      {/* Top divider */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16"
        >
          <span className="text-[10px] text-[#dc2626] uppercase tracking-[0.4em] block mb-3">
            Features
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] text-white leading-tight tracking-tight">
            Everything you need.{" "}
            <span className="text-slate-500">Nothing you don&apos;t.</span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.5,
                ease: EASE,
              }}
              className="group relative border border-white/[0.05] bg-white/[0.01] p-6 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
            >
              {/* Corner accent on hover */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-transparent group-hover:border-[#dc2626]/30 transition-colors duration-300" />

              <div className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {f.icon}
              </div>
              <h3 className="text-white text-[13px] uppercase tracking-[0.12em] mb-2">
                {f.title}
              </h3>
              <p className="text-slate-500 text-[12px] leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
