/**
 * GitHub OAuth utilities — server-side only.
 * Uses Node.js crypto (AES-256-GCM) to encrypt access tokens stored in cookies.
 * Never import this file from client components.
 */

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm" as const;

function getEncryptionKey(): Buffer {
  const hex = process.env.GITHUB_TOKEN_ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error(
      "GITHUB_TOKEN_ENCRYPTION_KEY must be set to a 64-char hex string (32 bytes). " +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return Buffer.from(hex, "hex");
}

/**
 * Encrypts a GitHub access token.
 * Returns a colon-separated string: iv:authTag:ciphertext (all hex).
 */
export function encryptToken(token: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("hex"), tag.toString("hex"), encrypted.toString("hex")].join(":");
}

/**
 * Decrypts a token previously encrypted with encryptToken.
 * Throws if the ciphertext has been tampered with (GCM auth tag check).
 */
export function decryptToken(stored: string): string {
  const key = getEncryptionKey();
  const parts = stored.split(":");
  if (parts.length !== 3) throw new Error("Invalid encrypted token format");
  const [ivHex, tagHex, ciphertextHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const ciphertext = Buffer.from(ciphertextHex, "hex");
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

// ─── Session shape stored in the httpOnly cookie ──────────────────────────────

export interface GitHubSession {
  /** AES-256-GCM encrypted access token (iv:tag:ciphertext hex) */
  access_token_enc: string;
  github_id: number;
  login: string;
  avatar_url: string;
  name: string | null;
}

/** Safe subset returned to the client via /api/github/status */
export interface GitHubStatusPayload {
  connected: true;
  github_id: number;
  login: string;
  avatar_url: string;
  name: string | null;
}

/** Shape of each repository returned by /api/github/repos */
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

// ─── Cookie helpers ────────────────────────────────────────────────────────────

export const GITHUB_SESSION_COOKIE = "github_session";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const IS_PROD = process.env.NODE_ENV === "production";

export function buildSessionCookieValue(session: GitHubSession): string {
  return JSON.stringify(session);
}

export function parseSessionCookie(value: string): GitHubSession | null {
  try {
    return JSON.parse(value) as GitHubSession;
  } catch {
    return null;
  }
}

/** Options to pass to NextResponse.cookies.set() for the session cookie */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax" as const,
  maxAge: COOKIE_MAX_AGE,
  path: "/",
};

/** Options for the short-lived CSRF state cookie */
export const STATE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax" as const,
  maxAge: 60 * 10, // 10 minutes
  path: "/",
};

// ─── Misc helpers ─────────────────────────────────────────────────────────────

/** Build the absolute callback URL from env, handling trailing slashes */
export function getCallbackUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  return `${base}/api/auth/github/callback`;
}
