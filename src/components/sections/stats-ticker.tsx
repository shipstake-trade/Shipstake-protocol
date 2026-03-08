"use client";

import { useQuery } from "@tanstack/react-query";
import Marquee from "@/components/ui/marquee";
import { API_URL } from "@/lib/api";
import type { ApiStats } from "@/lib/types";
import { lamportsToSol } from "@/lib/solana/shipstake";

function TickerItem({ emoji, text, color }: { emoji: string; text: string; color: string }) {
  return (
    <span
      className="font-mono shrink-0 inline-flex items-center gap-2"
      style={{ fontSize: "13px", color }}
    >
      <span>{emoji}</span>
      <span>{text}</span>
    </span>
  );
}

function Divider() {
  return (
    <span
      className="shrink-0 mx-6"
      style={{ color: "var(--text-muted)", fontSize: "13px" }}
      aria-hidden="true"
    >
      |
    </span>
  );
}

export function StatsTicker() {
  const { data } = useQuery<ApiStats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/stats`)
      if (!res.ok) throw new Error(`${res.status}`)
      return res.json()
    },
    staleTime: 5 * 60_000,
    retry: false,
  });

  // Hide the ticker if no real data is available
  if (!data) return null;

  const items = [
    { emoji: "⚡", text: `${data.quests_total} quest${data.quests_total !== 1 ? "s" : ""} on-chain`, color: "var(--accent-primary)" },
    { emoji: "🔥", text: `${lamportsToSol(data.sol_settled_lamports).toFixed(2)} SOL settled`, color: "var(--muted-foreground)" },
    { emoji: "✅", text: `${data.builders_count} builder${data.builders_count !== 1 ? "s" : ""}`, color: "var(--accent-primary)" },
    { emoji: "📊", text: `${data.ship_rate_pct}% ship rate`, color: "var(--warning)" },
  ];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="block md:hidden">
        <Marquee className="[--duration:22s] py-2.5" repeat={3}>
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <TickerItem {...item} />
              <Divider />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="hidden md:flex items-center justify-center gap-0 py-2.5 container mx-auto max-w-[var(--container-max-width)] px-4">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <TickerItem {...item} />
            {i < items.length - 1 && <Divider />}
          </span>
        ))}
      </div>
    </div>
  );
}
