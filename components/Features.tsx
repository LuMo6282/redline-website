"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Readiness scoring",
    desc: "Composite score from HRV, sleep, wellness, soreness, stress, and training load — updated every morning.",
    tag: "/ DATA",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Adaptive programming",
    desc: "Your training plan flexes in real-time. Intensity, volume, and exercise selection bend to your readiness.",
    tag: "/ ENGINE",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "AI coach",
    desc: "Ask anything. Get context-aware answers grounded in your data, your history, and sport science.",
    tag: "/ CHAT",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "Load management",
    desc: "Track acute-to-chronic workload ratios across modalities. Stay in the sweet spot, avoid the red zone.",
    tag: "/ LOAD",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Hybrid-native",
    desc: "Built for athletes who run, lift, and compete across disciplines. Not a running app. Not a lifting app.",
    tag: "/ BUILT",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Your data, private",
    desc: "No social feeds. No data selling. Your biometrics stay yours. Period.",
    tag: "/ VAULT",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative z-10 py-32 px-6 md:px-10 lg:px-14 xl:px-20">
      {/* Top divider */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-red" />
              <span className="font-mono text-[10px] text-bone-300 uppercase tracking-[0.32em]">
                / 03 · features
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
              Everything you need.{" "}
              <span className="text-bone-400">Nothing you don&apos;t.</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] text-bone-500 uppercase tracking-[0.25em] md:text-right md:max-w-50 leading-relaxed">
            Six core modules.
            <br />
            One coherent system.
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
          {features.map((f, i) => {
            const isGreen = i % 2 === 0;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.55,
                  ease: EASE,
                }}
                className="group relative bg-[#070707] p-7 hover:bg-[#0c0c0c] transition-colors duration-300"
              >
                {/* Corner tick — shows on hover */}
                <div
                  className="absolute top-0 right-0 flex items-center justify-end gap-1.5 px-4 py-3 font-mono text-[8.5px] uppercase tracking-[0.25em]"
                  style={{ color: isGreen ? "#16d975" : "#ef2b2d" }}
                >
                  <span className="opacity-60">{f.tag}</span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: isGreen ? "#16d975" : "#ef2b2d" }}
                  />
                </div>

                <div
                  className="mb-6"
                  style={{
                    color: isGreen ? "#16d975" : "#ef2b2d",
                    opacity: 0.75,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-bone-50 mb-3 leading-tight"
                  style={{
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {f.title}
                </h3>
                <p className="text-bone-300 text-[13px] leading-[1.65] max-w-[310px]">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
