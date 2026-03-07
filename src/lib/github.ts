// GitHub OAuth types — client-side only.
// Server-side logic (encryption, cookie helpers) lives in the Fastify backend.

/** Safe subset returned to the client via /auth/github/status */
export interface GitHubStatusPayload {
  connected: true;
  github_id: number;
  login: string;
  avatar_url: string;
  name: string | null;
}

/** Shape of each repository returned by /auth/github/repos */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  pushed_at: string;
  language: string | null;
  default_branch: string;
}
