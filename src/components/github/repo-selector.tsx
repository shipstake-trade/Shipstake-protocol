"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GitBranchIcon, LockIcon, GlobeIcon } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";

// Re-export so callers can import the type from here
export type { GitHubRepo };

interface RepoSelectorProps {
  value: GitHubRepo | null;
  onChange: (repo: GitHubRepo | null) => void;
}

function formatPushedDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function RepoSkeleton() {
  return (
    <div className="space-y-1.5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-[62px] rounded-lg bg-secondary/40 animate-pulse" />
      ))}
    </div>
  );
}

export function RepoSelector({ value, onChange }: RepoSelectorProps) {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "not_connected" | "error" | "ready">(
    "loading"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/github/repos")
      .then(async (res) => {
        if (res.status === 401) {
          setLoadState("not_connected");
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRepos(data.repos);
        setLoadState("ready");
      })
      .catch((err) => {
        console.error("[RepoSelector] fetch error:", err);
        setLoadState("error");
      });
  }, []);

  if (loadState === "loading") return <RepoSkeleton />;

  if (loadState === "not_connected") {
    return (
      <div className="glass-card rounded-lg p-6 text-center space-y-3">
        <p className="text-sm font-medium text-foreground">GitHub not connected</p>
        <p className="text-xs text-muted-foreground">
          Connect your GitHub account to link a repository to this quest.
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            (window.location.href = "/api/auth/github?return_to=/quest/create")
          }
          className="gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Connect GitHub
        </Button>
      </div>
    );
  }

  if (loadState === "error") {
    return (
      <p className="text-sm text-destructive p-4 glass-card rounded-lg">
        Failed to load repositories. Please refresh and try again.
      </p>
    );
  }

  const filtered = repos?.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search repositories..."
        className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {value && (
        <div className="flex items-center justify-between text-xs bg-primary/10 border border-primary/20 rounded-md px-3 py-2">
          <span className="font-mono text-primary">{value.full_name}</span>
          <button
            onClick={() => onChange(null)}
            className="text-muted-foreground hover:text-foreground ml-2 shrink-0"
          >
            Clear
          </button>
        </div>
      )}

      <div className="max-h-72 overflow-y-auto space-y-1.5 pr-0.5">
        {filtered?.map((repo) => {
          const isSelected = value?.id === repo.id;
          return (
            <button
              key={repo.id}
              onClick={() => onChange(isSelected ? null : repo)}
              className={cn(
                "w-full text-left glass-card rounded-lg px-3 py-2.5 transition-all",
                isSelected
                  ? "border-[var(--border-active)] glow-emerald"
                  : "hover:border-[var(--border-active)]"
              )}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                {repo.private ? (
                  <LockIcon className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                ) : (
                  <GlobeIcon className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                )}
                <span className="text-sm font-medium text-foreground truncate">{repo.name}</span>
                {repo.language && (
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground/60 shrink-0">
                    {repo.language}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-xs text-muted-foreground truncate pl-4 mb-0.5">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-2 pl-4">
                <span className="text-[10px] text-muted-foreground/50">
                  pushed {formatPushedDate(repo.pushed_at)}
                </span>
                <GitBranchIcon className="w-2.5 h-2.5 text-muted-foreground/30" />
                <span className="text-[10px] font-mono text-muted-foreground/50">
                  {repo.default_branch}
                </span>
              </div>
            </button>
          );
        })}

        {filtered?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-6">
            No repositories match &ldquo;{search}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}
