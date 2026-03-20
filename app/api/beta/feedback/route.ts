import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const BETA_FILE = join(DATA_DIR, "beta-emails.json");
const FEEDBACK_FILE = join(DATA_DIR, "beta-feedback.json");

interface BetaData {
  emails: string[];
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

type FeedbackEntry = BugReport | WeeklyCheckin;

interface FeedbackData {
  submissions: FeedbackEntry[];
}

function readBetaEmails(): BetaData {
  if (!existsSync(BETA_FILE)) return { emails: [] };
  try {
    return JSON.parse(readFileSync(BETA_FILE, "utf-8")) as BetaData;
  } catch {
    return { emails: [] };
  }
}

function readFeedback(): FeedbackData {
  if (!existsSync(FEEDBACK_FILE)) return { submissions: [] };
  try {
    return JSON.parse(readFileSync(FEEDBACK_FILE, "utf-8")) as FeedbackData;
  } catch {
    return { submissions: [] };
  }
}

function saveFeedback(data: FeedbackData): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FEEDBACK_FILE, JSON.stringify(data, null, 2));
}

function str(val: unknown): string {
  return typeof val === "string" ? val.trim() : "";
}

/* POST /api/beta/feedback — submit bug report or weekly check-in */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = str(body.email).toLowerCase();
    const formType = str(body.type);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Verify beta user
    const betaData = readBetaEmails();
    const isBeta = betaData.emails.some((e) => e.toLowerCase() === email);
    if (!isBeta) {
      return NextResponse.json({ error: "Unauthorized — not a beta user" }, { status: 403 });
    }

    const feedback = readFeedback();

    if (formType === "bug") {
      const name = str(body.name);
      const category = str(body.category);
      const whatHappened = str(body.whatHappened);
      const severity = str(body.severity);

      if (!whatHappened || !category || !severity) {
        return NextResponse.json({ error: "Category, what happened, and severity are required" }, { status: 400 });
      }

      feedback.submissions.push({
        type: "bug",
        email,
        name,
        category,
        whatHappened,
        whatTrying: str(body.whatTrying),
        severity,
        submittedAt: new Date().toISOString(),
      });
    } else if (formType === "weekly") {
      const daysOpened = typeof body.daysOpened === "number" ? body.daysOpened : 0;
      const followedAI = str(body.followedAI);
      const feltGood = str(body.feltGood);
      const frustrated = str(body.frustrated);

      if (!daysOpened || !followedAI || !feltGood || !frustrated) {
        return NextResponse.json({ error: "Days opened, AI follow, felt good, and frustrated fields are required" }, { status: 400 });
      }

      feedback.submissions.push({
        type: "weekly",
        email,
        name: str(body.name),
        daysOpened,
        followedAI,
        overrideReason: str(body.overrideReason),
        feltGood,
        frustrated,
        anythingElse: str(body.anythingElse),
        submittedAt: new Date().toISOString(),
      });
    } else {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    saveFeedback(feedback);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[beta/feedback] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
