/**
 * GET /api/github/status
 * Returns the connected GitHub user from the httpOnly session cookie.
 * Returns { connected: false } if no session exists.
 * Never exposes the access token.
 */

import { NextRequest, NextResponse } from "next/server";
import { GITHUB_SESSION_COOKIE, parseSessionCookie } from "@/lib/github";

export async function GET(req: NextRequest) {
  const cookieValue = req.cookies.get(GITHUB_SESSION_COOKIE)?.value;
  if (!cookieValue) {
    return NextResponse.json({ connected: false });
  }

  const session = parseSessionCookie(cookieValue);
  if (!session) {
    return NextResponse.json({ connected: false });
  }

  return NextResponse.json({
    connected: true,
    github_id: session.github_id,
    login: session.login,
    avatar_url: session.avatar_url,
    name: session.name,
  });
}
