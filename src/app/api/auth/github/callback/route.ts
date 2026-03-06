/**
 * GET /api/auth/github/callback
 * GitHub calls this after the user authorises (or denies) the OAuth app.
 *
 * On success: sets an encrypted httpOnly session cookie, redirects to return_to.
 * On failure: redirects to return_to with ?error=github_<reason>.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  encryptToken,
  buildSessionCookieValue,
  getCallbackUrl,
  GITHUB_SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  type GitHubSession,
} from "@/lib/github";

function errorRedirect(base: string, returnTo: string, reason: string): NextResponse {
  return NextResponse.redirect(`${base}${returnTo}?error=github_${reason}`);
}

export async function GET(req: NextRequest) {
  const appBase =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const oauthError = searchParams.get("error");

  const returnTo = req.cookies.get("github_oauth_return_to")?.value ?? "/portfolio";

  // User denied the OAuth prompt
  if (oauthError === "access_denied") {
    const res = errorRedirect(appBase, returnTo, "denied");
    res.cookies.delete("github_oauth_state");
    res.cookies.delete("github_oauth_return_to");
    return res;
  }

  if (!code || !state) {
    return errorRedirect(appBase, returnTo, "invalid");
  }

  // CSRF: compare state from GitHub with what we stored
  const savedState = req.cookies.get("github_oauth_state")?.value;
  if (!savedState || savedState !== state) {
    console.error("[github/callback] CSRF state mismatch");
    const res = errorRedirect(appBase, returnTo, "csrf");
    res.cookies.delete("github_oauth_state");
    res.cookies.delete("github_oauth_return_to");
    return res;
  }

  // Exchange code for access token
  let accessToken: string;
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: getCallbackUrl(),
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      console.error("[github/callback] Token exchange failed:", tokenData.error_description ?? tokenData);
      const res = errorRedirect(appBase, returnTo, "token");
      res.cookies.delete("github_oauth_state");
      res.cookies.delete("github_oauth_return_to");
      return res;
    }

    accessToken = tokenData.access_token as string;
  } catch (err) {
    console.error("[github/callback] Token fetch threw:", err);
    const res = errorRedirect(appBase, returnTo, "token");
    res.cookies.delete("github_oauth_state");
    res.cookies.delete("github_oauth_return_to");
    return res;
  }

  // Fetch GitHub user profile
  let ghUser: { id: number; login: string; avatar_url: string; name: string | null };
  try {
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!userRes.ok) {
      console.error("[github/callback] GitHub /user returned", userRes.status);
      const res = errorRedirect(appBase, returnTo, "user");
      res.cookies.delete("github_oauth_state");
      res.cookies.delete("github_oauth_return_to");
      return res;
    }

    ghUser = await userRes.json();
  } catch (err) {
    console.error("[github/callback] User fetch threw:", err);
    const res = errorRedirect(appBase, returnTo, "user");
    res.cookies.delete("github_oauth_state");
    res.cookies.delete("github_oauth_return_to");
    return res;
  }

  // Build and encrypt the session
  const session: GitHubSession = {
    access_token_enc: encryptToken(accessToken),
    github_id: ghUser.id,
    login: ghUser.login,
    avatar_url: ghUser.avatar_url,
    name: ghUser.name ?? null,
  };

  // Redirect to the return path, signalling success via query param
  const destination = `${appBase}${returnTo}${returnTo.includes("?") ? "&" : "?"}github=connected`;
  const res = NextResponse.redirect(destination);

  res.cookies.set(GITHUB_SESSION_COOKIE, buildSessionCookieValue(session), SESSION_COOKIE_OPTIONS);

  // Clean up temp OAuth cookies
  res.cookies.delete("github_oauth_state");
  res.cookies.delete("github_oauth_return_to");

  return res;
}
