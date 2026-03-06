/**
 * POST /api/github/disconnect
 * Clears the GitHub session cookie, effectively disconnecting the account.
 */

import { NextResponse } from "next/server";
import { GITHUB_SESSION_COOKIE } from "@/lib/github";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(GITHUB_SESSION_COOKIE);
  return res;
}
