import type { ProofType } from "@/lib/solana/idl";
import { cn } from "@/lib/utils";
import { GitBranch, Globe, Link as LinkIcon } from "lucide-react";

const proofConfig: Record<ProofType, { icon: React.ReactNode; label: string }> = {
  GithubCommit: {
    icon: <GitBranch className="h-3 w-3" />,
    label: "GitHub",
  },
  VercelDeployment: {
    icon: <Globe className="h-3 w-3" />,
    label: "Vercel",
  },
  LiveUrl: {
    icon: <LinkIcon className="h-3 w-3" />,
    label: "Live URL",
  },
};

interface ProofTypeBadgeProps {
  type: ProofType;
  className?: string;
}

export function ProofTypeBadge({ type, className }: ProofTypeBadgeProps) {
  const config = proofConfig[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
