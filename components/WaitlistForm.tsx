"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Fetch initial count on mount for social proof
  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {});
  }, []);

  // Magnetic button effect
  const handleBtnMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`;
  }, []);

  const handleBtnMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (btn) btn.style.transform = "translate(0px, 0px)";
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      triggerShake();
      inputRef.current?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        if (data.count) setCount(data.count);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Show count BEFORE form — immediate social proof */}
      {count !== null && status !== "success" && status !== "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-[10px] text-slate-700 uppercase tracking-widest"
        >
          <span className="text-[#dc2626]">{count.toLocaleString()}</span>{" "}
          athletes waiting &middot;{" "}
          <span className="text-slate-600">limited early access</span>
        </motion.p>
      )}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          /* Success state */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 border border-[#dc2626]/30 bg-[#dc2626]/[0.06] px-4 py-3"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 500,
                damping: 25,
              }}
              className="flex-shrink-0 w-4 h-4 border border-[#dc2626] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 10 8"
                className="w-2.5 h-2"
                fill="none"
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeLinecap="square"
              >
                <motion.path
                  d="M1 4L3.5 6.5L9 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                />
              </svg>
            </motion.div>
            <span className="font-mono text-sm text-white">
              You&apos;re on the list.
            </span>
          </motion.div>
        ) : (
          /* Form state */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex ${shake ? "shake" : ""}`}
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="enter your email"
                disabled={status === "loading"}
                autoComplete="email"
                className="w-full h-12 bg-[#0a0a0a] border border-white/[0.1] border-r-0 font-mono text-sm text-white placeholder:text-slate-700 px-4 outline-none focus:border-[#dc2626] transition-colors duration-200 disabled:opacity-50"
                style={{
                  borderColor:
                    status === "error"
                      ? "rgba(220,38,38,0.7)"
                      : undefined,
                }}
              />
            </div>
            <button
              ref={btnRef}
              type="submit"
              disabled={status === "loading"}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="h-12 bg-[#dc2626] font-mono text-[11px] text-white uppercase tracking-[0.15em] px-5 border border-[#dc2626] hover:bg-[#b91c1c] active:scale-95 disabled:opacity-60 whitespace-nowrap cursor-pointer"
              style={{
                boxShadow:
                  status !== "loading"
                    ? "0 0 20px rgba(220,38,38,0.2)"
                    : "none",
                transition: "transform 0.2s cubic-bezier(0.22,1,0.36,1), background-color 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              {status === "loading" ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-1 h-1 bg-white/80 blink" />
                  <span className="inline-block w-1 h-1 bg-white/80 blink" style={{ animationDelay: "0.2s" }} />
                  <span className="inline-block w-1 h-1 bg-white/80 blink" style={{ animationDelay: "0.4s" }} />
                </span>
              ) : (
                "Join the Waitlist"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[10px] text-[#dc2626] uppercase tracking-widest"
          >
            Something went wrong. Try again.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Post-success count */}
      {count !== null && status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] text-slate-700 uppercase tracking-widest"
        >
          <span className="text-[#dc2626]">{count.toLocaleString()}</span>{" "}
          athletes waiting
        </motion.p>
      )}
    </div>
  );
}
