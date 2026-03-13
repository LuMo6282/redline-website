"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import WaitlistForm from "./WaitlistForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative z-10 py-32 px-8 md:px-14 lg:px-20 xl:px-24">
      <div ref={ref} className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="space-y-6"
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-white leading-tight tracking-tight">
            Stop guessing.{" "}
            <span className="text-[#dc2626]">Start training.</span>
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed max-w-sm mx-auto">
            Join the waitlist for early access. Limited spots for the beta.
          </p>
          <div className="max-w-md mx-auto">
            <WaitlistForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
