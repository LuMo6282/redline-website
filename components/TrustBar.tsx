"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const archetypes = [
  { icon: "⏱", label: "CrossFit athletes" },
  { icon: "🏃", label: "Hybrid runners" },
  { icon: "🏋️", label: "Strength sport" },
  { icon: "⚡", label: "Hyrox competitors" },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative z-10 py-24 px-8 md:px-14 lg:px-20 xl:px-24">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-20" />

        {/* Built for section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="text-[10px] text-slate-600 uppercase tracking-[0.4em]">
            Built for
          </span>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6">
            {archetypes.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE }}
                className="flex items-center gap-2.5 text-slate-400"
              >
                <span className="text-base">{a.icon}</span>
                <span className="text-[12px] uppercase tracking-[0.15em]">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
