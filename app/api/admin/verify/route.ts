import { NextRequest, NextResponse } from "next/server";

/* POST /api/admin/verify — check if email matches admin password */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    const adminPassword = process.env.ADMIN_PASSWORD || "";
    const isAdmin = adminPassword !== "" && email === adminPassword.toLowerCase();

    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
