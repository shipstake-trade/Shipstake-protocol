/**
 * GET /api/github/repos
 * Fetches the authenticated user's GitHub repositories.
 * Requires an active github_session cookie.
 *
 * Query params:
 *   per_page  — number of repos to return (default: 50, max: 100)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  GITHUB_SESSION_COOKIE,
  parseSessionCookie,
  decryptToken,
  type GitHubRepo,
} from "@/lib/github";

export async function GET(req: NextRequest) {
  const cookieValue = req.cookies.get(GITHUB_SESSION_COOKIE)?.value;
  if (!cookieValue) {
    return NextResponse.json({ error: "Not connected to GitHub" }, { status: 401 });
  }

  const session = parseSessionCookie(cookieValue);
  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  let token: string;
  try {
    token = decryptToken(session.access_token_enc);
  } catch (err) {
    console.error("[github/repos] Token decryption failed:", err);
    return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
  }

  const perPage = Math.min(
    parseInt(req.nextUrl.searchParams.get("per_page") ?? "50", 10),
    100
  );

  const githubRes = await fetch(
    `https://api.github.com/user/repos?sort=pushed&per_page=${perPage}&type=owner&affiliation=owner`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      // Revalidate every 60 seconds so the list stays fresh during a session
      next: { revalidate: 60 },
    }
  );

  if (githubRes.status === 401) {
    // Token was revoked by the user on GitHub's side
    return NextResponse.json({ error: "GitHub token revoked. Please reconnect." }, { status: 401 });
  }

  if (!githubRes.ok) {
    const body = await githubRes.text();
    console.error("[github/repos] GitHub API error:", githubRes.status, body);
    return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
  }

  const raw: GitHubRepo[] = await githubRes.json();

  // Return only the fields the UI needs
  const repos: GitHubRepo[] = raw.map((r) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    description: r.description,
    private: r.private,
    html_url: r.html_url,
    pushed_at: r.pushed_at,
    language: r.language,
    default_branch: r.default_branch,
  }));

  return NextResponse.json({ repos });
}
