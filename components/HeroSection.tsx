"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import PhoneMockup from "./PhoneMockup";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09 + 0.55,
      duration: 0.7,
      ease: EASE,
    },
  }),
};

/* Letter-by-letter reveal for the wordmark */
const letterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function HeroSection() {
  const letters = "redline".split("");

  return (
    <section className="relative z-10 min-h-screen flex flex-col">
      {/* ── Top telemetry bar ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative w-full border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 xl:px-20 py-3 gap-4">
          <div className="flex items-center gap-4 md:gap-6 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-bone-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#16d975] opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16d975]" />
              </span>
              <span className="text-bone-200">SYSTEM.ONLINE</span>
            </div>
            <span className="hidden md:inline text-bone-600">//</span>
            <span className="hidden md:inline">READINESS_PROTOCOL_v0.1</span>
            <span className="hidden lg:inline text-bone-600">//</span>
            <span className="hidden lg:inline">BETA.ACCESS_OPEN</span>
          </div>
          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-bone-500">
            <span className="hidden sm:inline">NA_WEST</span>
            <span className="hidden sm:inline text-bone-700 mx-2">·</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
        {/* Subtle sweep line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-1/3 banner-sweep"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(239,43,45,0.6), transparent)",
          }}
        />
      </motion.div>

      {/* Main split layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[46%] flex flex-col justify-center px-6 md:px-10 lg:px-14 xl:px-20 pt-14 pb-10 lg:py-0 relative">
          <div className="max-w-[560px] w-full">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 mb-7"
            >
              <span className="h-px w-8 bg-[#ef2b2d]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-bone-300">
                AI training intelligence
              </span>
            </motion.div>

            {/* Wordmark — letter-by-letter reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={letterContainer}
              className="relative inline-block"
            >
              <h1
                className="relative lowercase text-bone-50 leading-[0.85] tracking-[-0.045em] select-none flex"
                style={{
                  fontFamily: "var(--font-syne), 'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(5rem, 11vw, 9.5rem)",
                }}
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariant}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* Clean baseline underline with endpoint tick */}
              <motion.div
                aria-hidden="true"
                className="absolute -bottom-1 left-0 flex items-center"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
              >
                <div
                  className="h-[4px] flex-1"
                  style={{
                    background: "#ef2b2d",
                    boxShadow: "0 0 24px rgba(239,43,45,0.55)",
                  }}
                />
                <div
                  className="h-[14px] w-[4px]"
                  style={{
                    background: "#ef2b2d",
                    boxShadow: "0 0 20px rgba(239,43,45,0.6)",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-7 font-mono text-[10px] md:text-[11px] text-bone-400 uppercase tracking-[0.32em]"
            >
              where discipline meets direction
            </motion.p>

            {/* Value prop */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 text-[22px] md:text-[26px] lg:text-[28px] text-bone-50 font-semibold leading-[1.15] tracking-[-0.02em] font-display"
            >
              Your AI coach that adapts
              <br className="hidden md:block" /> to how you{" "}
              <span className="relative inline-block text-[#ef2b2d]">
                actually
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px]"
                  style={{ background: "rgba(239,43,45,0.4)" }}
                />
              </span>{" "}
              feel.
            </motion.p>

            {/* Description */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 text-[14px] text-bone-300 leading-relaxed border-l border-[#ef2b2d]/40 pl-4 max-w-md"
            >
              Real-time readiness scoring, adaptive programming, and an AI coach
              built for hybrid athletes who run, lift, and compete across
              disciplines.
            </motion.p>

            {/* WAITLIST FORM */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8"
            >
              <WaitlistForm />
            </motion.div>

            {/* Secondary text */}
            <motion.p
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 font-mono text-[9.5px] text-bone-500 uppercase tracking-[0.22em]"
            >
              Free for early members
              <span className="text-bone-600"> · 7-day free trial at launch</span>
            </motion.p>
          </div>

          {/* Left edge: vertical rule with index marker */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 top-[20%] bottom-[20%] w-px bg-white/[0.04]"
          >
            <div className="absolute top-6 -left-[3px] w-[7px] h-[7px] border border-[#ef2b2d]/60 bg-[#050505]" />
            <div className="absolute bottom-6 -left-[3px] w-[7px] h-[7px] border border-[#ef2b2d]/60 bg-[#050505]" />
          </div>
        </div>

        {/* RIGHT SIDE — Phone */}
        <div className="w-full lg:w-[54%] flex items-center justify-center px-6 md:px-8 py-10 lg:py-0 relative overflow-hidden">
          {/* Radial glow pool */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,43,45,0.08) 0%, transparent 65%)",
            }}
          />
          {/* Secondary green wash */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 35% at 50% 60%, rgba(22,217,117,0.04) 0%, transparent 70%)",
            }}
          />

          {/* Decorative concentric rings behind phone */}
          <svg
            aria-hidden="true"
            className="absolute pointer-events-none opacity-[0.09]"
            width="640"
            height="640"
            viewBox="0 0 640 640"
            fill="none"
          >
            <circle
              cx="320"
              cy="320"
              r="180"
              stroke="#ef2b2d"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
            <circle
              cx="320"
              cy="320"
              r="240"
              stroke="#f5f1e8"
              strokeWidth="0.5"
            />
            <circle
              cx="320"
              cy="320"
              r="300"
              stroke="#f5f1e8"
              strokeWidth="0.5"
              strokeDasharray="1 3"
            />
          </svg>

          {/* Section index label */}
          <div
            aria-hidden="true"
            className="hidden lg:flex absolute top-10 right-10 flex-col items-end gap-1 font-mono text-[9px] uppercase tracking-[0.28em] text-bone-500"
          >
            <span>/ 01</span>
            <span className="text-bone-600">PREVIEW.UI</span>
          </div>

          <div className="hidden lg:block absolute left-0 top-[15%] bottom-[15%] w-px bg-white/[0.04]" />
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone-600">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-bone-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
