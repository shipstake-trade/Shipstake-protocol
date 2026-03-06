"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GitHubStatus {
  connected: boolean;
  login?: string;
  avatar_url?: string;
  name?: string | null;
}

interface GitHubConnectProps {
  /** Path to redirect back to after OAuth completes (default: /portfolio) */
  returnTo?: string;
  /** Called after a successful connect or disconnect */
  onStatusChange?: (connected: boolean, login?: string) => void;
}

const GitHubIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function GitHubConnect({ returnTo = "/portfolio", onStatusChange }: GitHubConnectProps) {
  const [status, setStatus] = useState<GitHubStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);

  // Fetch current status from the server (reads httpOnly cookie)
  useEffect(() => {
    fetch("/api/github/status")
      .then((r) => r.json())
      .then((data: GitHubStatus) => {
        setStatus(data);
        onStatusChange?.(data.connected, data.login);
      })
      .catch(() => setStatus({ connected: false }))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle post-OAuth redirect feedback (avoids useSearchParams + Suspense requirement)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const github = params.get("github");
    const error = params.get("error");

    if (github === "connected") {
      toast.success("GitHub connected!", { description: "Your repositories are now accessible." });
      // Remove query param without triggering a full navigation
      const clean = window.location.pathname;
      window.history.replaceState({}, "", clean);
    } else if (error?.startsWith("github_")) {
      const messages: Record<string, string> = {
        github_denied: "GitHub connection cancelled.",
        github_csrf: "Security check failed. Please try again.",
        github_token: "Failed to exchange GitHub code. Please try again.",
        github_user: "Could not fetch your GitHub profile.",
        github_invalid: "Invalid OAuth response from GitHub.",
      };
      toast.error(messages[error] ?? "GitHub connection failed.", {
        description: "If this keeps happening, check your GitHub OAuth app settings.",
      });
      const clean = window.location.pathname;
      window.history.replaceState({}, "", clean);
    }
  }, []);

  const handleConnect = () => {
    window.location.href = `/api/auth/github?return_to=${encodeURIComponent(returnTo)}`;
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    try {
      const res = await fetch("/api/github/disconnect", { method: "POST" });
      if (res.ok) {
        setStatus({ connected: false });
        onStatusChange?.(false);
        toast.success("GitHub disconnected.");
      } else {
        toast.error("Failed to disconnect. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setDisconnecting(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center gap-2 h-9">
        <div className="w-6 h-6 rounded-full bg-secondary animate-pulse" />
        <div className="w-24 h-3 rounded bg-secondary animate-pulse" />
      </div>
    );
  }

  // Connected state
  if (status?.connected && status.login) {
    return (
      <div className="flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={status.avatar_url}
          alt={status.login}
          width={28}
          height={28}
          className="rounded-full border border-border shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground leading-none truncate">
            {status.login}
          </p>
          {status.name && (
            <p className="text-xs text-muted-foreground leading-none mt-0.5 truncate">
              {status.name}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisconnect}
          disabled={disconnecting}
          className="text-xs text-muted-foreground hover:text-destructive shrink-0 ml-1"
        >
          {disconnecting ? "..." : "Disconnect"}
        </Button>
      </div>
    );
  }

  // Disconnected state
  return (
    <Button variant="secondary" size="sm" onClick={handleConnect} className="gap-2">
      <GitHubIcon />
      Connect GitHub
    </Button>
  );
}
