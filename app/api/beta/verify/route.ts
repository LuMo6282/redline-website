import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const BETA_FILE = join(process.cwd(), "data", "beta-emails.json");

interface BetaData {
  emails: string[];
}

function readBetaEmails(): BetaData {
  if (!existsSync(BETA_FILE)) return { emails: [] };
  try {
    return JSON.parse(readFileSync(BETA_FILE, "utf-8")) as BetaData;
  } catch {
    return { emails: [] };
  }
}

/* POST /api/beta/verify — check if an email has beta access */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const data = readBetaEmails();
    const isBeta = data.emails.some((e) => e.toLowerCase() === email);

    return NextResponse.json({ isBeta });
  } catch (err) {
    console.error("[beta/verify] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
