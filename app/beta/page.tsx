"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Step = "verify" | "pick" | "bug" | "weekly" | "submitted";

const inputClass =
  "w-full h-12 bg-[#0a0a0a] border border-white/[0.1] font-mono text-sm text-white placeholder:text-slate-700 px-4 outline-none focus:border-[#dc2626] transition-colors duration-200 disabled:opacity-50";
const textareaClass =
  "w-full bg-[#0a0a0a] border border-white/[0.1] font-mono text-sm text-white placeholder:text-slate-700 px-4 py-3 outline-none focus:border-[#dc2626] transition-colors duration-200 resize-none";
const labelClass =
  "block font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-2";
const submitBtnClass =
  "w-full h-12 bg-[#dc2626] font-mono text-[11px] text-white uppercase tracking-[0.15em] border border-[#dc2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-60 cursor-pointer transition-all duration-200";

function SelectButtons({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className="flex-1 min-w-0 h-10 border font-mono text-[10px] uppercase tracking-widest transition-all duration-200 cursor-pointer px-2"
          style={{
            borderColor:
              value === option ? "#dc2626" : "rgba(255,255,255,0.1)",
            background:
              value === option ? "rgba(220,38,38,0.15)" : "rgba(10,10,10,1)",
            color:
              value === option ? "#dc2626" : "rgba(255,255,255,0.3)",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="flex items-center justify-center gap-1.5">
      <span className="inline-block w-1 h-1 bg-white/80 blink" />
      <span
        className="inline-block w-1 h-1 bg-white/80 blink"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="inline-block w-1 h-1 bg-white/80 blink"
        style={{ animationDelay: "0.4s" }}
      />
    </span>
  );
}

function BetaContent() {
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [step, setStep] = useState<Step>("verify");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Bug form fields
  const [bugName, setBugName] = useState("");
  const [bugCategory, setBugCategory] = useState("");
  const [bugWhat, setBugWhat] = useState("");
  const [bugTrying, setBugTrying] = useState("");
  const [bugSeverity, setBugSeverity] = useState("");

  // Weekly form fields
  const [weeklyName, setWeeklyName] = useState("");
  const [weeklyDays, setWeeklyDays] = useState(0);
  const [weeklyFollowed, setWeeklyFollowed] = useState("");
  const [weeklyOverride, setWeeklyOverride] = useState("");
  const [weeklyGood, setWeeklyGood] = useState("");
  const [weeklyFrustrated, setWeeklyFrustrated] = useState("");
  const [weeklyAnything, setWeeklyAnything] = useState("");

  // Auto-verify if email is prefilled
  useEffect(() => {
    if (prefilledEmail) {
      verifyEmail(prefilledEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function verifyEmail(emailToVerify: string) {
    setVerifying(true);
    setError("");
    try {
      const res = await fetch("/api/beta/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToVerify }),
      });
      const data = await res.json();
      if (data.isBeta) {
        setStep("pick");
      } else {
        setError(
          "This email doesn't have beta access. Join the waitlist to get notified."
        );
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    await verifyEmail(email);
  }

  async function handleSubmitBug(e: React.FormEvent) {
    e.preventDefault();
    if (!bugCategory || !bugWhat.trim() || !bugSeverity) {
      setError("Category, what happened, and severity are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/beta/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bug",
          email,
          name: bugName,
          category: bugCategory,
          whatHappened: bugWhat,
          whatTrying: bugTrying,
          severity: bugSeverity,
        }),
      });
      if (res.ok) {
        setStep("submitted");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitWeekly(e: React.FormEvent) {
    e.preventDefault();
    if (!weeklyDays || !weeklyFollowed || !weeklyGood.trim() || !weeklyFrustrated.trim()) {
      setError("Days opened, AI follow, felt good, and frustrated are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/beta/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "weekly",
          email,
          name: weeklyName,
          daysOpened: weeklyDays,
          followedAI: weeklyFollowed,
          overrideReason: weeklyOverride,
          feltGood: weeklyGood,
          frustrated: weeklyFrustrated,
          anythingElse: weeklyAnything,
        }),
      });
      if (res.ok) {
        setStep("submitted");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetAndPick() {
    // Reset all form state
    setBugName("");
    setBugCategory("");
    setBugWhat("");
    setBugTrying("");
    setBugSeverity("");
    setWeeklyName("");
    setWeeklyDays(0);
    setWeeklyFollowed("");
    setWeeklyOverride("");
    setWeeklyGood("");
    setWeeklyFrustrated("");
    setWeeklyAnything("");
    setError("");
    setStep("pick");
  }

  const subtitle: Record<Step, string> = {
    verify: "Enter your accepted beta email to continue",
    pick: "Choose a form to submit",
    bug: "Report a bug or issue",
    weekly: "Weekly check-in",
    submitted: "Submission received",
  };

  return (
    <main className="relative min-h-screen bg-[#050505] flex items-start justify-center px-4 py-16">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="scanline" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-400 font-mono text-xs uppercase tracking-widest mb-8 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 3L4 7L8 11" />
            </svg>
            Back to Redline
          </a>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 bg-[#dc2626] pulse-red" />
            <h1 className="font-mono text-xl text-white uppercase tracking-wider">
              Beta Access
            </h1>
          </div>
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">
            {subtitle[step]}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── VERIFY ── */}
          {step === "verify" && (
            <motion.form
              key="verify"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleVerify}
              className="space-y-4"
            >
              <div>
                <label className={labelClass}>Beta Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="enter your beta email"
                  disabled={verifying}
                  autoComplete="email"
                  autoFocus
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={verifying || !email.trim()}
                className={submitBtnClass}
                style={{ boxShadow: "0 0 20px rgba(220,38,38,0.2)" }}
              >
                {verifying ? <LoadingDots /> : "Verify Access"}
              </button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="font-mono text-[10px] text-[#dc2626] uppercase tracking-widest">
                    {error}
                  </p>
                  {error.includes("waitlist") && (
                    <a
                      href="/"
                      className="inline-block font-mono text-[10px] text-slate-500 hover:text-white uppercase tracking-widest underline underline-offset-4 transition-colors"
                    >
                      Go to waitlist
                    </a>
                  )}
                </motion.div>
              )}
            </motion.form>
          )}

          {/* ── FORM PICKER ── */}
          {step === "pick" && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              {/* Verified badge */}
              <div className="flex items-center gap-2 border border-[#dc2626]/30 bg-[#dc2626]/[0.06] px-3 py-2 mb-2">
                <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  Verified: {email}
                </span>
              </div>

              {/* Bug Report Card */}
              <button
                onClick={() => { setError(""); setStep("bug"); }}
                className="w-full text-left border border-white/[0.08] hover:border-[#dc2626]/50 bg-[#0a0a0a] hover:bg-[#dc2626]/[0.04] p-5 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#dc2626" strokeWidth="1.2" className="opacity-60 group-hover:opacity-100 transition-opacity">
                    <circle cx="9" cy="9" r="7" />
                    <path d="M9 6v4M9 12.5v.5" strokeLinecap="round" />
                  </svg>
                  <span className="font-mono text-sm text-white uppercase tracking-wider">
                    Bug / Issue Report
                  </span>
                </div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest leading-relaxed">
                  Something broke, confusing UX, bad AI rec, or app lag. Submit anytime as things happen.
                </p>
              </button>

              {/* Weekly Check-in Card */}
              <button
                onClick={() => { setError(""); setStep("weekly"); }}
                className="w-full text-left border border-white/[0.08] hover:border-[#dc2626]/50 bg-[#0a0a0a] hover:bg-[#dc2626]/[0.04] p-5 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#dc2626" strokeWidth="1.2" className="opacity-60 group-hover:opacity-100 transition-opacity">
                    <rect x="3" y="4" width="12" height="11" rx="1" />
                    <path d="M3 8h12M7 2v4M11 2v4" strokeLinecap="round" />
                  </svg>
                  <span className="font-mono text-sm text-white uppercase tracking-wider">
                    Weekly Check-in
                  </span>
                </div>
                <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest leading-relaxed">
                  End-of-week reflection. How many days you used the app, what felt good, what didn&apos;t.
                </p>
              </button>
            </motion.div>
          )}

          {/* ── BUG REPORT FORM ── */}
          {step === "bug" && (
            <motion.form
              key="bug"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmitBug}
              className="space-y-5"
            >
              <button
                type="button"
                onClick={() => setStep("pick")}
                className="font-mono text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors cursor-pointer"
              >
                &larr; Back to forms
              </button>

              {/* Name */}
              <div>
                <label className={labelClass}>Name or Initials</label>
                <input
                  type="text"
                  value={bugName}
                  onChange={(e) => setBugName(e.target.value)}
                  placeholder="e.g. LM"
                  className={inputClass}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category *</label>
                <SelectButtons
                  options={[
                    "Something broke",
                    "Confusing UX",
                    "Bad AI rec",
                    "Slow / laggy",
                  ]}
                  value={bugCategory}
                  onChange={setBugCategory}
                />
              </div>

              {/* What happened */}
              <div>
                <label className={labelClass}>What happened? *</label>
                <textarea
                  value={bugWhat}
                  onChange={(e) => setBugWhat(e.target.value)}
                  placeholder="Describe what went wrong..."
                  rows={4}
                  className={textareaClass}
                />
              </div>

              {/* What were you trying to do */}
              <div>
                <label className={labelClass}>What were you trying to do?</label>
                <textarea
                  value={bugTrying}
                  onChange={(e) => setBugTrying(e.target.value)}
                  placeholder="Optional — what you were doing when this happened"
                  rows={3}
                  className={textareaClass}
                />
              </div>

              {/* Severity */}
              <div>
                <label className={labelClass}>Severity *</label>
                <SelectButtons
                  options={[
                    "Can't use the app",
                    "Worked around it",
                    "Minor annoyance",
                  ]}
                  value={bugSeverity}
                  onChange={setBugSeverity}
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[10px] text-[#dc2626] uppercase tracking-widest"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={submitBtnClass}
                style={{ boxShadow: "0 0 20px rgba(220,38,38,0.2)" }}
              >
                {submitting ? <LoadingDots /> : "Submit Bug Report"}
              </button>
            </motion.form>
          )}

          {/* ── WEEKLY CHECK-IN FORM ── */}
          {step === "weekly" && (
            <motion.form
              key="weekly"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmitWeekly}
              className="space-y-5"
            >
              <button
                type="button"
                onClick={() => setStep("pick")}
                className="font-mono text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors cursor-pointer"
              >
                &larr; Back to forms
              </button>

              {/* Name */}
              <div>
                <label className={labelClass}>Name or Initials</label>
                <input
                  type="text"
                  value={weeklyName}
                  onChange={(e) => setWeeklyName(e.target.value)}
                  placeholder="e.g. LM"
                  className={inputClass}
                />
              </div>

              {/* Days opened */}
              <div>
                <label className={labelClass}>
                  How many days did you open the app this week? *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setWeeklyDays(n)}
                      className="flex-1 h-10 border font-mono text-sm transition-all duration-200 cursor-pointer"
                      style={{
                        borderColor:
                          weeklyDays >= n
                            ? "#dc2626"
                            : "rgba(255,255,255,0.1)",
                        background:
                          weeklyDays >= n
                            ? "rgba(220,38,38,0.15)"
                            : "rgba(10,10,10,1)",
                        color:
                          weeklyDays >= n
                            ? "#dc2626"
                            : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Followed AI */}
              <div>
                <label className={labelClass}>
                  Did you follow the AI&apos;s recommendation most days? *
                </label>
                <SelectButtons
                  options={["Yes", "Mostly", "No"]}
                  value={weeklyFollowed}
                  onChange={setWeeklyFollowed}
                />
              </div>

              {/* Override reason */}
              <div>
                <label className={labelClass}>
                  If you overrode or ignored a recommendation, why?
                </label>
                <textarea
                  value={weeklyOverride}
                  onChange={(e) => setWeeklyOverride(e.target.value)}
                  placeholder="Optional"
                  rows={3}
                  className={textareaClass}
                />
              </div>

              {/* Felt good */}
              <div>
                <label className={labelClass}>
                  What&apos;s one thing that felt good this week? *
                </label>
                <textarea
                  value={weeklyGood}
                  onChange={(e) => setWeeklyGood(e.target.value)}
                  placeholder="Something that worked well..."
                  rows={3}
                  className={textareaClass}
                />
              </div>

              {/* Frustrated */}
              <div>
                <label className={labelClass}>
                  What&apos;s one thing that frustrated you? *
                </label>
                <textarea
                  value={weeklyFrustrated}
                  onChange={(e) => setWeeklyFrustrated(e.target.value)}
                  placeholder="Something that didn't work or felt off..."
                  rows={3}
                  className={textareaClass}
                />
              </div>

              {/* Anything else */}
              <div>
                <label className={labelClass}>Anything else?</label>
                <textarea
                  value={weeklyAnything}
                  onChange={(e) => setWeeklyAnything(e.target.value)}
                  placeholder="Optional"
                  rows={3}
                  className={textareaClass}
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[10px] text-[#dc2626] uppercase tracking-widest"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={submitBtnClass}
                style={{ boxShadow: "0 0 20px rgba(220,38,38,0.2)" }}
              >
                {submitting ? <LoadingDots /> : "Submit Check-in"}
              </button>
            </motion.form>
          )}

          {/* ── SUBMITTED ── */}
          {step === "submitted" && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 border border-[#dc2626]/30 bg-[#dc2626]/[0.06] px-4 py-4">
                <div className="shrink-0 w-5 h-5 border border-[#dc2626] flex items-center justify-center">
                  <svg
                    viewBox="0 0 10 8"
                    className="w-3 h-2.5"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  >
                    <path d="M1 4L3.5 6.5L9 1" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-sm text-white">
                    Submitted. Thank you.
                  </p>
                  <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mt-1">
                    Your feedback helps shape Redline.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetAndPick}
                  className="font-mono text-[10px] text-slate-500 hover:text-white uppercase tracking-widest underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Submit another
                </button>
                <a
                  href="/"
                  className="font-mono text-[10px] text-slate-500 hover:text-white uppercase tracking-widest underline underline-offset-4 transition-colors"
                >
                  Back to home
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function BetaPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="font-mono text-sm text-slate-600">Loading...</div>
        </main>
      }
    >
      <BetaContent />
    </Suspense>
  );
}
