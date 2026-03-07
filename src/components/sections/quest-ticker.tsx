"use client";

import { Section } from "@/components/section";
import Marquee from "@/components/ui/marquee";
import { mockTickerItems } from "@/lib/mock-data";
import type { QuestStatus } from "@/lib/solana/idl";
import { statusDisplayLabels } from "@/components/quest/status-badge";
import { GitBranch, Globe } from "lucide-react";

const statusColors: Record<string, string> = {
  Open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  InProgress: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Shipped: "bg-emerald-brand/20 text-emerald-brand border-emerald-brand/30",
  Slashed: "bg-danger/20 text-danger border-danger/30",
};

const proofIcons: Record<string, React.ReactNode> = {
  GithubCommit: <GitBranch className="h-3 w-3" />,
  VercelDeployment: <Globe className="h-3 w-3" />,
};

function TickerCard({
  item,
}: {
  item: (typeof mockTickerItems)[number];
}) {
  return (
    <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-4 min-w-[280px]">
      <div className="font-mono text-xs text-muted-foreground shrink-0">
        {item.builder}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-display font-medium text-foreground truncate">
          {item.title}
        </div>
      </div>
      <div className="font-mono text-sm font-bold text-primary shrink-0">
        {item.stakeAmount} SOL
      </div>
      <div
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0 ${statusColors[item.status]}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {statusDisplayLabels[item.status]}
      </div>
      <div className="text-muted-foreground shrink-0">
        {proofIcons[item.proofType]}
      </div>
    </div>
  );
}

export function QuestTicker() {
  const firstHalf = mockTickerItems.slice(0, 3);
  const secondHalf = mockTickerItems.slice(3);

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
            {firstHalf.map((item, i) => (
              <TickerCard key={i} item={item} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="[--duration:40s]">
            {secondHalf.map((item, i) => (
              <TickerCard key={i} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
