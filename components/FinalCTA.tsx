"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import WaitlistForm from "./WaitlistForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative z-10 py-32 px-6 md:px-10 lg:px-14 xl:px-20">
      <div ref={ref} className="max-w-2xl mx-auto text-center relative">
        {/* Decorative corner ticks */}
        <div aria-hidden="true" className="absolute -top-6 -left-6 w-5 h-5 border-t border-l border-red/40" />
        <div aria-hidden="true" className="absolute -top-6 -right-6 w-5 h-5 border-t border-r border-red/40" />
        <div aria-hidden="true" className="absolute -bottom-6 -left-6 w-5 h-5 border-b border-l border-red/40" />
        <div aria-hidden="true" className="absolute -bottom-6 -right-6 w-5 h-5 border-b border-r border-red/40" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red" />
            <span className="font-mono text-[10px] text-bone-300 uppercase tracking-[0.35em]">
              / 04 · access
            </span>
            <span className="h-px w-8 bg-red" />
          </div>

          <h2
            className="text-bone-50 leading-[0.98] tracking-[-0.025em]"
            style={{
              fontFamily: "var(--font-syne), 'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
            }}
          >
            Stop guessing.
            <br />
            <span className="text-red">Start training.</span>
          </h2>

          <p className="text-[14px] text-bone-300 leading-relaxed max-w-md mx-auto">
            Join the waitlist for early access. Limited spots for the beta.
          </p>
          <div className="max-w-md mx-auto pt-2">
            <WaitlistForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
