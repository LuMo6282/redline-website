import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const WAITLIST_FILE = join(DATA_DIR, "waitlist.json");
const BETA_EMAILS_FILE = join(DATA_DIR, "beta-emails.json");
const FEEDBACK_FILE = join(DATA_DIR, "beta-feedback.json");

function readJSON(path: string) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
}

/* POST /api/admin — returns all dashboard data (password protected) */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = typeof body.password === "string" ? body.password : "";

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const waitlistData = readJSON(WAITLIST_FILE) || { emails: [] };
    const betaEmailsData = readJSON(BETA_EMAILS_FILE) || { emails: [] };
    const feedbackData = readJSON(FEEDBACK_FILE) || { submissions: [] };

    const bugReports = feedbackData.submissions.filter(
      (s: { type: string }) => s.type === "bug"
    );
    const weeklyCheckins = feedbackData.submissions.filter(
      (s: { type: string }) => s.type === "weekly"
    );

    return NextResponse.json({
      waitlist: {
        emails: waitlistData.emails,
        count: waitlistData.emails.length,
      },
      beta: {
        acceptedEmails: betaEmailsData.emails,
        count: betaEmailsData.emails.length,
      },
      feedback: {
        bugReports,
        bugCount: bugReports.length,
        weeklyCheckins,
        weeklyCount: weeklyCheckins.length,
        totalSubmissions: feedbackData.submissions.length,
      },
    });
  } catch (err) {
    console.error("[admin] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
