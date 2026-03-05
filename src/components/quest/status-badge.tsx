import type { QuestStatus } from "@/lib/solana/idl";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { color: string; dotColor: string }> = {
  Open: {
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    dotColor: "bg-blue-400",
  },
  InProgress: {
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    dotColor: "bg-amber-400",
  },
  Shipped: {
    color: "bg-emerald-brand/20 text-emerald-brand border-emerald-brand/30",
    dotColor: "bg-emerald-brand",
  },
  Slashed: {
    color: "bg-danger/20 text-danger border-danger/30",
    dotColor: "bg-danger",
  },
};

export const statusDisplayLabels: Record<string, string> = {
  Open: "OPEN",
  InProgress: "VALIDATING...",
  Shipped: "SHIPPED",
  Slashed: "SLASHED",
};

interface StatusBadgeProps {
  status: QuestStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.Open;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        config.color,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)} />
      {statusDisplayLabels[status]}
    </span>
  );
}
