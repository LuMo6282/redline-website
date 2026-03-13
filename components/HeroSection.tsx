"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import PhoneMockup from "./PhoneMockup";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.6,
      duration: 0.65,
      ease: EASE,
    },
  }),
};

/* Letter-by-letter reveal for the wordmark */
const letterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function HeroSection() {
  const letters = "redline".split("");

  return (
    <section className="relative z-10 min-h-screen flex flex-col">
      {/* Main split layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-14 lg:px-20 xl:px-24 pt-20 pb-12 lg:py-0">
          <div className="max-w-[520px] w-full space-y-5">
            {/* Wordmark — letter-by-letter reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={letterContainer}
              className="relative inline-block"
            >
              {/* Red bar */}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 right-0 pointer-events-none z-0"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                style={{
                  background: "#dc2626",
                  height: "16%",
                  top: "58%",
                  transform: "translateY(-50%)",
                  transformOrigin: "left",
                }}
              />
              <h1
                className="relative z-10 lowercase text-white leading-none tracking-tighter select-none flex"
                style={{
                  fontFamily:
                    "var(--font-share-tech-mono), 'Share Tech Mono', monospace",
                  fontSize: "clamp(4.5rem, 10vw, 8rem)",
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
            </motion.div>

            {/* Tagline — bumped up */}
            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[13px] text-slate-500 uppercase tracking-[0.32em]"
            >
              where discipline meets direction
            </motion.p>

            {/* Value prop — new scannable one-liner */}
            <motion.p
              custom={1.5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[15px] text-white/90 font-bold tracking-tight"
            >
              Your AI coach that adapts to how you{" "}
              <span className="text-[#dc2626]">actually</span> feel.
            </motion.p>

            {/* Description */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[13px] text-slate-400 leading-relaxed border-l-2 border-[#dc2626]/25 pl-4 max-w-md"
            >
              Real-time readiness scoring, adaptive programming, and AI coaching
              built for hybrid athletes. Coming soon.
            </motion.p>

            {/* WAITLIST FORM */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="pt-2"
            >
              <WaitlistForm />
            </motion.div>

            {/* Secondary text */}
            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[10px] text-slate-700 uppercase tracking-widest"
            >
              Free for early members.{" "}
              <span className="text-slate-600">7-day free trial at launch.</span>
            </motion.p>
          </div>
        </div>

        {/* RIGHT SIDE — Phone */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 lg:py-0 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(220,38,38,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="hidden lg:block absolute left-0 top-[15%] bottom-[15%] w-px bg-white/[0.04]" />
          <PhoneMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-700">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-slate-700 to-transparent"
        />
      </motion.div>
    </section>
  );
}
