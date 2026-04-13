"use client";

import { useRef, useState, useEffect, CSSProperties } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FONT_DISPLAY = "var(--font-syne), 'Syne', sans-serif";
const FONT_MONO =
  "var(--font-share-tech-mono), 'Share Tech Mono', monospace";

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1400, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, trigger]);
  return count;
}

/* ─── Typewriter hook ─── */
function useTypewriter(text: string, speed = 18, trigger = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!trigger) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, trigger]);
  return displayed;
}

/* ─── Breakdown bars data ─── */
const BARS = [
  { label: "HRV",      value: "21/25", pct: 82, color: "#16d975" },
  { label: "Sleep",    value: "18/20", pct: 90, color: "#16d975" },
  { label: "Wellness", value: "20/25", pct: 80, color: "#16d975" },
  { label: "Soreness", value: "6/10",  pct: 60, color: "#f7b955" },
  { label: "Stress",   value: "8/10",  pct: 80, color: "#16d975" },
  { label: "Load",     value: "14/15", pct: 93, color: "#16d975" },
];

const COACH_TEXT =
  "Good call. Prioritize sleep tonight to lock in the adaptation. Let me know how the session goes.";

/* ─── Readiness ring ─── */
function ReadinessRing({ score, animate }: { score: number; animate: boolean }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex justify-center my-1">
      <div className="relative" style={{ width: 92, height: 92 }}>
        <svg
          style={{ width: 92, height: 92, transform: "rotate(-90deg)" }}
          viewBox="0 0 100 100"
        >
          {/* Track */}
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="rgba(245,241,232,0.07)"
            strokeWidth="5.5"
          />
          {/* Outer faint tick guides */}
          <circle
            cx="50" cy="50" r={r + 5}
            fill="none"
            stroke="rgba(22,217,117,0.1)"
            strokeWidth="0.5"
            strokeDasharray="1 4"
          />
          <motion.circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#16d975"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: animate ? offset : circ }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
            style={{ filter: "drop-shadow(0 0 6px rgba(22,217,117,0.55))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 26,
              fontWeight: 800,
              color: "#f5f1e8",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {score}
          </span>
          <span
            className="uppercase text-center leading-none mt-1"
            style={{
              fontFamily: FONT_MONO,
              fontSize: 6,
              letterSpacing: 1.6,
              color: "#7c786c",
            }}
          >
            READINESS
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Hover pop helpers ─────────────────────────────────────────────────────
   Elements are split into two dim-groups:
     • messages:  greeting | user-reply | coach-reply
     • options:   opt-A | opt-B | opt-C
   Hovering within a group dims the other members. Parent cards never dim.
──────────────────────────────────────────────────────────────────────────── */
const MSG_GROUP = ["greeting", "user-reply", "coach-reply"] as const;
const OPT_GROUP = ["opt-A", "opt-B", "opt-C"] as const;
type HoverId = (typeof MSG_GROUP)[number] | (typeof OPT_GROUP)[number] | null;

function usePopStyles(hovered: HoverId) {
  const isDimmed = (id: string): boolean => {
    if (!hovered || hovered === id) return false;
    if ((OPT_GROUP as readonly string[]).includes(hovered))
      return (OPT_GROUP as readonly string[]).includes(id);
    if ((MSG_GROUP as readonly string[]).includes(hovered))
      return (MSG_GROUP as readonly string[]).includes(id);
    return false;
  };

  const pop = (
    id: string,
    glowColor = "rgba(22,217,117,0.18)"
  ): CSSProperties => {
    const active = hovered === id;
    const dimmed = isDimmed(id);
    return {
      transition:
        "transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease, opacity 0.2s ease, border-color 0.2s ease",
      transform: active ? "scale(1.035)" : "scale(1)",
      opacity: dimmed ? 0.45 : 1,
      boxShadow: active
        ? `0 10px 36px rgba(0,0,0,0.75), 0 0 16px ${glowColor}`
        : "none",
      cursor: "default",
    };
  };

  return { pop, isDimmed };
}

/* ─── Main component ─── */
export default function PhoneMockup() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { once: true });

  const [hovered, setHovered] = useState<HoverId>(null);
  const [isMobile, setIsMobile] = useState(false);

  const readiness = useCountUp(78, 1200, isInView);
  const coachTyped = useTypewriter(COACH_TEXT, 20, isInView);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { pop } = usePopStyles(hovered);

  const hover = (id: HoverId) => () => setHovered(id);
  const unhover = () => setHovered(null);

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ minHeight: 680 }}
    >
      {/* inView sentinel */}
      <div ref={sentinelRef} className="absolute inset-0 pointer-events-none" />

      {/* Subtle red glow beneath */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: 8,
          left: "50%",
          translateX: "-50%",
          width: "55%",
          height: 22,
          background:
            "radial-gradient(ellipse, rgba(239,43,45,0.35) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
        animate={{ opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Phone shell — fixed tilt baked into CSS animation ── */}
      <div
        className={isMobile ? "phone-float" : "phone-tilt-float"}
        style={{ position: "relative" }}
      >
        {/* Corner brackets */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-red/30 pointer-events-none" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-red/30 pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-red/30 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-red/30 pointer-events-none" />

        {/* Phone bezel */}
        <div
          style={{
            width: 310,
            height: 640,
            background: "#070707",
            border: "7px solid #141414",
            borderRadius: 44,
            boxShadow: `
              0 0 0 1px rgba(245,241,232,0.05),
              0 30px 80px rgba(0,0,0,0.75),
              0 0 40px rgba(239,43,45,0.06),
              inset 0 1px 0 rgba(245,241,232,0.05)
            `,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Dynamic island */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
            style={{
              width: 96,
              height: 24,
              background: "#070707",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          />

          {/* ── PHONE SCREEN ── */}
          <div
            className="h-full w-full flex flex-col overflow-hidden"
            style={{ background: "#0a0a0a", fontFamily: FONT_MONO }}
          >
            {/* ── Top Nav ── */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
              style={{
                paddingTop: 26,
                paddingLeft: 14,
                paddingRight: 14,
                paddingBottom: 8,
                borderBottom: "1px solid rgba(31,31,31,0.6)",
                background: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  className="pulse-red"
                  style={{
                    width: 5, height: 5,
                    borderRadius: "50%",
                    background: "#ef2b2d",
                    boxShadow: "0 0 8px #ef2b2d",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    color: "#f5f1e8",
                  }}
                >
                  REDLINE
                </span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "HRV",   value: "58" },
                  { label: "SLEEP", value: "7.2h" },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ fontSize: 7, color: "#7c786c", textTransform: "uppercase", letterSpacing: 1.2 }}>
                      {s.label}
                    </span>
                    <span style={{ fontSize: 8, fontWeight: 700, color: "#16d975" }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Chat area ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "10px 10px 0",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                scrollbarWidth: "none",
              }}
            >
              {/* AI greeting — pops on hover */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
                onMouseEnter={hover("greeting")}
                onMouseLeave={unhover}
                style={{
                  background: "rgba(245,241,232,0.025)",
                  border: "1px solid rgba(22,217,117,0.22)",
                  borderLeft: "2px solid rgba(22,217,117,0.6)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  maxWidth: "88%",
                  ...pop("greeting"),
                }}
              >
                <p style={{ fontSize: 9.5, lineHeight: 1.6, color: "rgba(245,241,232,0.85)" }}>
                  Good morning. Your HRV is up 8% from baseline — you&apos;re
                  primed. Here&apos;s today&apos;s readiness breakdown.
                </p>
              </motion.div>

              {/* Main recommendation card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
                style={{
                  background: "rgba(245,241,232,0.02)",
                  border: "1px solid rgba(245,241,232,0.06)",
                  borderRadius: 10,
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  transition: "opacity 0.2s ease",
                }}
              >
                {/* Readiness ring */}
                <ReadinessRing score={readiness} animate={isInView} />

                {/* Breakdown bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {BARS.map((b, i) => (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <span style={{ fontSize: 7, color: "#7c786c", width: 42, flexShrink: 0, textTransform: "uppercase", letterSpacing: 0.8 }}>
                        {b.label}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 3,
                          background: "rgba(245,241,232,0.06)",
                          borderRadius: 99,
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          style={{
                            height: "100%",
                            background: b.color,
                            borderRadius: 99,
                            boxShadow: `0 0 6px ${b.color}55`,
                          }}
                          initial={{ width: "0%" }}
                          animate={isInView ? { width: `${b.pct}%` } : { width: "0%" }}
                          transition={{ delay: 0.65 + i * 0.07, duration: 0.6, ease: EASE }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 7, color: "#7c786c",
                          width: 24, textAlign: "right", flexShrink: 0,
                        }}
                      >
                        {b.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* ── Option cards A / B / C ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 2 }}>
                  {[
                    {
                      id: "opt-A" as const,
                      text: "Follow Plan — Strength 75min: 5×5 back squat @80%, accessory work. RPE 7–8.",
                      recommended: true,
                    },
                    {
                      id: "opt-B" as const,
                      text: "Go Light — Technique work 45min: drills, @60%, mobility. RPE 4–5.",
                      recommended: false,
                    },
                    {
                      id: "opt-C" as const,
                      text: "Rest & Recover — Yoga, foam roll, 20min walk.",
                      recommended: false,
                    },
                  ].map((opt, i) => (
                    <motion.div
                      key={opt.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.1 + i * 0.1, duration: 0.35, ease: EASE }}
                      onMouseEnter={hover(opt.id)}
                      onMouseLeave={unhover}
                      style={{
                        background: opt.recommended
                          ? "rgba(239,43,45,0.06)"
                          : "rgba(245,241,232,0.02)",
                        border: `1px solid ${
                          hovered === opt.id
                            ? opt.recommended
                              ? "rgba(239,43,45,0.55)"
                              : "rgba(245,241,232,0.18)"
                            : opt.recommended
                            ? "rgba(239,43,45,0.35)"
                            : "rgba(245,241,232,0.07)"
                        }`,
                        borderRadius: 7,
                        padding: "6px 8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        ...pop(opt.id, opt.recommended
                          ? "rgba(239,43,45,0.2)"
                          : "rgba(245,241,232,0.08)"),
                      }}
                    >
                      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: 16, height: 16,
                            borderRadius: "50%",
                            background: opt.recommended
                              ? "#ef2b2d"
                              : "rgba(245,241,232,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            boxShadow: opt.recommended
                              ? "0 0 10px rgba(239,43,45,0.5)"
                              : "none",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 7,
                              fontWeight: 700,
                              color: opt.recommended ? "#f5f1e8" : "#a8a396",
                            }}
                          >
                            {opt.id.replace("opt-", "")}
                          </span>
                        </div>
                        <span style={{ fontSize: 8.5, lineHeight: 1.55, color: "rgba(245,241,232,0.82)" }}>
                          {opt.text}
                        </span>
                      </div>
                      {opt.recommended && (
                        <span
                          style={{
                            marginLeft: 22,
                            display: "inline-block",
                            background: "rgba(239,43,45,0.15)",
                            color: "#ff4548",
                            fontSize: 6,
                            letterSpacing: 1.4,
                            textTransform: "uppercase",
                            padding: "2px 5px",
                            borderRadius: 3,
                            border: "1px solid rgba(239,43,45,0.3)",
                          }}
                        >
                          RECOMMENDED
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* User reply */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.35, ease: EASE }}
                onMouseEnter={hover("user-reply")}
                onMouseLeave={unhover}
                style={{ alignSelf: "flex-end", maxWidth: "72%" }}
              >
                <div
                  style={{
                    background: "rgba(245,241,232,0.07)",
                    border: "1px solid rgba(245,241,232,0.12)",
                    borderRadius: 10,
                    padding: "7px 9px",
                    ...pop("user-reply", "rgba(245,241,232,0.1)"),
                  }}
                >
                  <p style={{ fontSize: 9.5, color: "#f5f1e8" }}>
                    I&apos;ll go with option A.
                  </p>
                </div>
              </motion.div>

              {/* AI follow-up (typewriter) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.75, duration: 0.4, ease: EASE }}
                onMouseEnter={hover("coach-reply")}
                onMouseLeave={unhover}
                style={{
                  background: "rgba(245,241,232,0.025)",
                  border: "1px solid rgba(22,217,117,0.22)",
                  borderLeft: "2px solid rgba(22,217,117,0.6)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  maxWidth: "88%",
                  marginBottom: 6,
                  ...pop("coach-reply"),
                }}
              >
                <p style={{ fontSize: 9.5, lineHeight: 1.6, color: "rgba(245,241,232,0.85)" }}>
                  {coachTyped}
                  {coachTyped.length < COACH_TEXT.length && (
                    <span
                      className="blink"
                      style={{
                        display: "inline-block",
                        width: 1.5, height: 9,
                        background: "#16d975",
                        marginLeft: 1,
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </p>
              </motion.div>
            </div>

            {/* ── Bottom input area ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.35, ease: EASE }}
              style={{
                background: "linear-gradient(to top, #0a0a0a 60%, transparent)",
                paddingTop: 6,
              }}
            >
              {/* Quick chips */}
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  padding: "0 10px 5px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {["How should I train today?", "Analyze my sleep", "Start check-in"].map((c) => (
                  <span
                    key={c}
                    style={{
                      flexShrink: 0,
                      padding: "3px 7px",
                      border: "1px solid rgba(245,241,232,0.09)",
                      background: "rgba(245,241,232,0.03)",
                      color: "#a8a396",
                      fontSize: 7.5,
                      borderRadius: 99,
                      whiteSpace: "nowrap",
                      transition: "border-color 0.15s ease, color 0.15s ease",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Input bar */}
              <div
                style={{
                  margin: "0 10px 5px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "#0a0a0a",
                  border: "1px solid #1f1f1f",
                  borderRadius: 10,
                  padding: "4px 8px",
                }}
              >
                <span style={{ flex: 1, fontSize: 8.5, color: "#7c786c" }}>
                  Ask Redline...
                </span>
                <div
                  style={{
                    width: 20, height: 20,
                    borderRadius: "50%",
                    background: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="8" height="8"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#7c786c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 12V4M4 8l4-4 4 4" />
                  </svg>
                </div>
              </div>

              {/* Tab bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "5px 10px 8px",
                  borderTop: "1px solid rgba(31,31,31,0.6)",
                  background: "rgba(20,20,20,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {[
                  { icon: "◈", label: "Dashboard", active: false },
                  { icon: "◉", label: "Coach",     active: true  },
                  { icon: "▤", label: "Program",   active: false },
                  { icon: "○", label: "Profile",   active: false },
                ].map((tab) => (
                  <div
                    key={tab.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      position: "relative",
                      transition: "opacity 0.15s ease",
                    }}
                  >
                    {tab.active && (
                      <span
                        style={{
                          position: "absolute",
                          top: -6,
                          width: 14, height: 2,
                          background: "#ef2b2d",
                          borderRadius: 99,
                          boxShadow: "0 0 8px rgba(239,43,45,0.7)",
                        }}
                      />
                    )}
                    <span style={{ fontSize: 13, color: tab.active ? "#ef2b2d" : "#7c786c" }}>
                      {tab.icon}
                    </span>
                    <span
                      style={{
                        fontSize: 5.5,
                        letterSpacing: 1.2,
                        textTransform: "uppercase",
                        color: tab.active ? "#ef2b2d" : "#7c786c",
                      }}
                    >
                      {tab.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
