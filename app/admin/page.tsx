"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface WaitlistEntry {
  email: string;
  joinedAt: string;
}

interface BugReport {
  type: "bug";
  email: string;
  name: string;
  category: string;
  whatHappened: string;
  whatTrying: string;
  severity: string;
  submittedAt: string;
}

interface WeeklyCheckin {
  type: "weekly";
  email: string;
  name: string;
  daysOpened: number;
  followedAI: string;
  overrideReason: string;
  feltGood: string;
  frustrated: string;
  anythingElse: string;
  submittedAt: string;
}

interface DashboardData {
  waitlist: { emails: WaitlistEntry[]; count: number };
  beta: { acceptedEmails: string[]; count: number };
  feedback: {
    bugReports: BugReport[];
    bugCount: number;
    weeklyCheckins: WeeklyCheckin[];
    weeklyCount: number;
    totalSubmissions: number;
  };
}

type Tab = "overview" | "waitlist" | "bugs" | "weekly" | "beta";

const labelClass = "font-mono text-[10px] text-slate-600 uppercase tracking-widest";
const cardClass = "border border-white/[0.08] bg-[#0a0a0a] p-5";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={cardClass}>
      <p className={labelClass}>{label}</p>
      <p className="font-mono text-3xl text-white mt-2">{value}</p>
      {sub && <p className="font-mono text-[10px] text-slate-700 mt-1">{sub}</p>}
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    "Can't use the app": "border-red-500/50 text-red-400 bg-red-500/10",
    "Worked around it": "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
    "Minor annoyance": "border-slate-500/50 text-slate-400 bg-slate-500/10",
  };
  return (
    <span className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border ${colors[severity] || "border-slate-600 text-slate-500"}`}>
      {severity}
    </span>
  );
}

function AdminContent() {
  const searchParams = useSearchParams();
  const autoKey = searchParams.get("key") || "";

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [storedPassword, setStoredPassword] = useState("");

  // Auto-login if redirected from waitlist with key
  useEffect(() => {
    if (autoKey) {
      loginWith(autoKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loginWith(pw: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        const d = await res.json();
        setData(d);
        setAuthed(true);
        setStoredPassword(pw);
      } else {
        setError("Wrong password.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await loginWith(password);
  }

  async function refresh() {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: storedPassword }),
      });
      if (res.ok) {
        setData(await res.json());
      }
    } catch { /* ignore */ }
  }

  if (!authed) {
    return (
      <main className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="scanline" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-[#dc2626] pulse-red" />
            <h1 className="font-mono text-xl text-white uppercase tracking-wider">
              Admin
            </h1>
          </div>
          <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-8">
            Enter master password to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="password"
              autoFocus
              className="w-full h-12 bg-[#0a0a0a] border border-white/[0.1] font-mono text-sm text-white placeholder:text-slate-700 px-4 outline-none focus:border-[#dc2626] transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full h-12 bg-[#dc2626] font-mono text-[11px] text-white uppercase tracking-[0.15em] border border-[#dc2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-60 cursor-pointer transition-all duration-200"
              style={{ boxShadow: "0 0 20px rgba(220,38,38,0.2)" }}
            >
              {loading ? "..." : "Access Dashboard"}
            </button>
            {error && (
              <p className="font-mono text-[10px] text-[#dc2626] uppercase tracking-widest">
                {error}
              </p>
            )}
          </form>
        </motion.div>
      </main>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "waitlist", label: `Waitlist (${data?.waitlist.count ?? 0})` },
    { key: "bugs", label: `Bugs (${data?.feedback.bugCount ?? 0})` },
    { key: "weekly", label: `Weekly (${data?.feedback.weeklyCount ?? 0})` },
    { key: "beta", label: `Beta Users (${data?.beta.count ?? 0})` },
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] px-4 py-8">
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="scanline" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#dc2626] pulse-red" />
            <h1 className="font-mono text-xl text-white uppercase tracking-wider">
              Redline Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={refresh}
              className="font-mono text-[10px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
            >
              Refresh
            </button>
            <a
              href="/"
              className="font-mono text-[10px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors"
            >
              Site
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto border-b border-white/[0.06] pb-px">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="font-mono text-[10px] uppercase tracking-widest px-4 py-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{
                color: tab === t.key ? "#dc2626" : "rgba(100,116,139,1)",
                borderBottom: tab === t.key ? "1px solid #dc2626" : "1px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── OVERVIEW ── */}
          {tab === "overview" && data && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <StatCard label="Waitlist Signups" value={data.waitlist.count} />
                <StatCard label="Beta Users" value={data.beta.count} />
                <StatCard label="Bug Reports" value={data.feedback.bugCount} />
                <StatCard label="Weekly Check-ins" value={data.feedback.weeklyCount} />
              </div>

              {/* Recent activity */}
              <div className={`${cardClass} mb-4`}>
                <p className={`${labelClass} mb-4`}>Recent Activity</p>
                {data.feedback.totalSubmissions === 0 &&
                  data.waitlist.count === 0 && (
                    <p className="font-mono text-xs text-slate-700">
                      No activity yet.
                    </p>
                  )}

                <div className="space-y-3">
                  {/* Merge and sort all activity by date */}
                  {[
                    ...data.waitlist.emails.map((e) => ({
                      type: "signup" as const,
                      date: e.joinedAt,
                      email: e.email,
                    })),
                    ...data.feedback.bugReports.map((b) => ({
                      type: "bug" as const,
                      date: b.submittedAt,
                      email: b.email,
                      name: b.name,
                      category: b.category,
                    })),
                    ...data.feedback.weeklyCheckins.map((w) => ({
                      type: "weekly" as const,
                      date: w.submittedAt,
                      email: w.email,
                      name: w.name,
                    })),
                  ]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 15)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-1.5 border-b border-white/[0.04] last:border-0"
                      >
                        <span
                          className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border"
                          style={{
                            borderColor:
                              item.type === "signup"
                                ? "rgba(34,197,94,0.3)"
                                : item.type === "bug"
                                ? "rgba(220,38,38,0.3)"
                                : "rgba(59,130,246,0.3)",
                            color:
                              item.type === "signup"
                                ? "rgb(34,197,94)"
                                : item.type === "bug"
                                ? "rgb(220,38,38)"
                                : "rgb(59,130,246)",
                          }}
                        >
                          {item.type === "signup"
                            ? "signup"
                            : item.type === "bug"
                            ? "bug"
                            : "weekly"}
                        </span>
                        <span className="font-mono text-xs text-white flex-1 truncate">
                          {item.email}
                          {"category" in item && item.category && (
                            <span className="text-slate-600"> — {item.category}</span>
                          )}
                        </span>
                        <span className="font-mono text-[10px] text-slate-700 whitespace-nowrap">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── WAITLIST ── */}
          {tab === "waitlist" && data && (
            <motion.div
              key="waitlist"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className={cardClass}>
                <div className="flex items-center justify-between mb-4">
                  <p className={labelClass}>
                    All signups ({data.waitlist.count})
                  </p>
                </div>

                {data.waitlist.emails.length === 0 ? (
                  <p className="font-mono text-xs text-slate-700">No signups yet.</p>
                ) : (
                  <div className="space-y-0">
                    {/* Header */}
                    <div className="grid grid-cols-[1fr_auto] gap-4 pb-2 border-b border-white/[0.08]">
                      <span className={labelClass}>Email</span>
                      <span className={labelClass}>Joined</span>
                    </div>
                    {[...data.waitlist.emails]
                      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
                      .map((entry, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-[1fr_auto] gap-4 py-2.5 border-b border-white/[0.04] last:border-0"
                        >
                          <span className="font-mono text-xs text-white truncate">
                            {entry.email}
                          </span>
                          <span className="font-mono text-[10px] text-slate-700 whitespace-nowrap">
                            {formatDate(entry.joinedAt)}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── BUG REPORTS ── */}
          {tab === "bugs" && data && (
            <motion.div
              key="bugs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {data.feedback.bugReports.length === 0 ? (
                <div className={cardClass}>
                  <p className="font-mono text-xs text-slate-700">No bug reports yet.</p>
                </div>
              ) : (
                [...data.feedback.bugReports]
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .map((bug, i) => (
                    <div key={i} className={cardClass}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <SeverityBadge severity={bug.severity} />
                          <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                            {bug.category}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-700">
                          {formatDate(bug.submittedAt)}
                        </span>
                      </div>

                      <p className="font-mono text-sm text-white mb-2 leading-relaxed">
                        {bug.whatHappened}
                      </p>

                      {bug.whatTrying && (
                        <p className="font-mono text-xs text-slate-500 mb-2">
                          <span className="text-slate-700">Trying to: </span>
                          {bug.whatTrying}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.04]">
                        <span className="font-mono text-[10px] text-slate-700">
                          {bug.name || "Anonymous"}
                        </span>
                        <span className="font-mono text-[10px] text-slate-700">
                          {bug.email}
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </motion.div>
          )}

          {/* ── WEEKLY CHECK-INS ── */}
          {tab === "weekly" && data && (
            <motion.div
              key="weekly"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {data.feedback.weeklyCheckins.length === 0 ? (
                <div className={cardClass}>
                  <p className="font-mono text-xs text-slate-700">No weekly check-ins yet.</p>
                </div>
              ) : (
                [...data.feedback.weeklyCheckins]
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .map((w, i) => (
                    <div key={i} className={cardClass}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white">
                            {w.name || "Anonymous"}
                          </span>
                          <span className="font-mono text-[10px] text-slate-700">
                            {w.email}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-700">
                          {formatDate(w.submittedAt)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className={labelClass}>Days opened</p>
                          <p className="font-mono text-lg text-white mt-1">
                            {w.daysOpened}
                            <span className="text-slate-600 text-xs">/7</span>
                          </p>
                        </div>
                        <div>
                          <p className={labelClass}>Followed AI</p>
                          <p className="font-mono text-lg text-white mt-1">
                            {w.followedAI}
                          </p>
                        </div>
                      </div>

                      {w.overrideReason && (
                        <div className="mb-3">
                          <p className={`${labelClass} mb-1`}>Override reason</p>
                          <p className="font-mono text-xs text-slate-400 leading-relaxed">
                            {w.overrideReason}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/[0.04]">
                        <div>
                          <p className={`${labelClass} mb-1`}>Felt good</p>
                          <p className="font-mono text-xs text-green-400/80 leading-relaxed">
                            {w.feltGood}
                          </p>
                        </div>
                        <div>
                          <p className={`${labelClass} mb-1`}>Frustrated</p>
                          <p className="font-mono text-xs text-red-400/80 leading-relaxed">
                            {w.frustrated}
                          </p>
                        </div>
                      </div>

                      {w.anythingElse && (
                        <div className="mt-3 pt-3 border-t border-white/[0.04]">
                          <p className={`${labelClass} mb-1`}>Anything else</p>
                          <p className="font-mono text-xs text-slate-400 leading-relaxed">
                            {w.anythingElse}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </motion.div>
          )}

          {/* ── BETA USERS ── */}
          {tab === "beta" && data && (
            <motion.div
              key="beta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className={cardClass}>
                <p className={`${labelClass} mb-4`}>
                  Accepted beta emails ({data.beta.count})
                </p>
                {data.beta.acceptedEmails.length === 0 ? (
                  <p className="font-mono text-xs text-slate-700">No beta users.</p>
                ) : (
                  <div className="space-y-2">
                    {data.beta.acceptedEmails.map((email, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0"
                      >
                        <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                        <span className="font-mono text-xs text-white">
                          {email}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="font-mono text-sm text-slate-600">Loading...</div>
        </main>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
