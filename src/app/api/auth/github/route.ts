/**
 * GET /api/auth/github
 * Initiates the GitHub OAuth flow.
 *
 * Query params:
 *   return_to  — path to redirect back to after connecting (default: /portfolio)
 */

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getCallbackUrl, STATE_COOKIE_OPTIONS } from "@/lib/github";

export function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GitHub OAuth is not configured. Set GITHUB_CLIENT_ID." },
      { status: 503 }
    );
  }

  const returnTo = req.nextUrl.searchParams.get("return_to") ?? "/portfolio";
  const state = randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getCallbackUrl(),
    scope: "read:user public_repo",
    state,
    allow_signup: "true",
  });

  const res = NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );

  // CSRF protection: store expected state in short-lived httpOnly cookie
  res.cookies.set("github_oauth_state", state, STATE_COOKIE_OPTIONS);

  // Remember where to send the user after OAuth completes
  res.cookies.set("github_oauth_return_to", returnTo, STATE_COOKIE_OPTIONS);

  return res;
}
