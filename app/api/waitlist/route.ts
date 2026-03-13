import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// ══════════════════════════════════════════════════════════════════
// BACKEND CONNECTION POINT
//
// Currently: stores emails in data/waitlist.json (dev-only, not for prod)
//
// ── To connect Supabase: ──────────────────────────────────────────
// 1. npm install @supabase/supabase-js
// 2. Add to .env.local:
//      SUPABASE_URL=https://xxxx.supabase.co
//      SUPABASE_ANON_KEY=eyJhb...
// 3. Replace the file-storage section below with:
//
//   import { createClient } from "@supabase/supabase-js";
//   const supabase = createClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_ANON_KEY!
//   );
//   const { error } = await supabase
//     .from("waitlist")
//     .insert([{ email, joined_at: new Date().toISOString() }]);
//   if (error && error.code !== "23505") throw error; // 23505 = unique violation
//   const { count } = await supabase
//     .from("waitlist")
//     .select("*", { count: "exact", head: true });
//   return NextResponse.json({ success: true, count: (count ?? 0) + SEED_COUNT });
//
// ── To send a confirmation email via Resend: ─────────────────────
// 1. npm install resend
// 2. Add RESEND_API_KEY to .env.local
// 3. After successful insert:
//   import { Resend } from "resend";
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   await resend.emails.send({
//     from: "Redline <noreply@yourdomai.com>",
//     to: email,
//     subject: "You're on the Redline waitlist.",
//     text: "We'll be in touch when we launch. Stay sharp.",
//   });
// ══════════════════════════════════════════════════════════════════

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "waitlist.json");

/** Seeded count — shown to users for social proof before real signups accumulate */
const SEED_COUNT = 847;

interface WaitlistEntry {
  email: string;
  joinedAt: string;
}

interface WaitlistData {
  emails: WaitlistEntry[];
}

function read(): WaitlistData {
  if (!existsSync(DATA_FILE)) return { emails: [] };
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as WaitlistData;
  } catch {
    return { emails: [] };
  }
}

function save(data: WaitlistData): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* GET /api/waitlist — returns current count (for social proof display) */
export async function GET() {
  const data = read();
  return NextResponse.json({ count: data.emails.length + SEED_COUNT });
}

/* POST /api/waitlist — registers an email */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const data = read();

    // Idempotent — duplicate signups return success without re-inserting
    const exists = data.emails.some((e) => e.email === email);
    if (!exists) {
      data.emails.push({ email, joinedAt: new Date().toISOString() });
      save(data);
    }

    return NextResponse.json({
      success: true,
      count: data.emails.length + SEED_COUNT,
    });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
