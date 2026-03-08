"use client";

import { useQuery } from "@tanstack/react-query";
import { Section } from "@/components/section";
import Marquee from "@/components/ui/marquee";
import { API_URL } from "@/lib/api";
import type { ApiQuest } from "@/lib/types";
import { parseStatus } from "@/lib/types";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { statusDisplayLabels } from "@/components/quest/status-badge";
import { GitBranch } from "lucide-react";

const statusColors: Record<string, string> = {
  Open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  InProgress: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Shipped: "bg-emerald-brand/20 text-emerald-brand border-emerald-brand/30",
  Slashed: "bg-danger/20 text-danger border-danger/30",
};

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

function TickerCard({ quest }: { quest: ApiQuest }) {
  const stake = lamportsToSol(quest.stake_amount);
  const status = parseStatus(quest.status);
  return (
    <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-4 min-w-[280px]">
      <div className="font-mono text-xs text-muted-foreground shrink-0">
        {truncate(quest.builder)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-display font-medium text-foreground truncate">
          {quest.title}
        </div>
      </div>
      <div className="font-mono text-sm font-bold text-primary shrink-0">
        {stake.toFixed(1)} SOL
      </div>
      <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0 ${statusColors[status]}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {statusDisplayLabels[status]}
      </div>
      {quest.repo_owner && (
        <div className="text-muted-foreground shrink-0">
          <GitBranch className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}

export function QuestTicker() {
  const { data: quests = [] } = useQuery<ApiQuest[]>({
    queryKey: ["quests-ticker"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/quests`)
      if (!res.ok) throw new Error(`${res.status}`)
      const data = await res.json()
      return Array.isArray(data) ? data : (data.quests ?? [])
    },
    staleTime: 5 * 60_000,
    retry: false,
  });

  // Need at least 2 quests to split into rows
  if (quests.length < 2) return null;

  const mid = Math.ceil(quests.length / 2);
  const firstHalf = quests.slice(0, mid);
  const secondHalf = quests.slice(mid);

  return (
    <Section id="quest-ticker">
      <div className="border-x border-b py-8 overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
            Live commitment feed
          </h3>
        </div>
        <div className="space-y-3">
          <Marquee pauseOnHover className="[--duration:35s]">
            {firstHalf.map((quest) => (
              <TickerCard key={quest.pubkey} quest={quest} />
            ))}
          </Marquee>
          {secondHalf.length > 0 && (
            <Marquee pauseOnHover reverse className="[--duration:40s]">
              {secondHalf.map((quest) => (
                <TickerCard key={quest.pubkey} quest={quest} />
              ))}
            </Marquee>
          )}
        </div>
      </div>
    </Section>
  );
}
