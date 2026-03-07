"use client";

import Marquee from "@/components/ui/marquee";

const ITEMS = [
  { text: "12 slashed on-chain", emoji: "\uD83D\uDC80", color: "var(--danger)" },
  { text: "$14,230 SOL in play", emoji: "\uD83D\uDD25", color: "var(--muted-foreground)" },
  { text: "247 builds delivered", emoji: "\u2705", color: "var(--accent-primary)" },
  { text: "Next slash in 4h 12m", emoji: "\u26A1", color: "var(--warning)" },
];

function TickerItem({ item }: { item: typeof ITEMS[number] }) {
  return (
    <span
      className="font-mono shrink-0 inline-flex items-center gap-2"
      style={{ fontSize: "13px", color: item.color }}
    >
      <span>{item.emoji}</span>
      <span>{item.text}</span>
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
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Mobile: marquee scroll */}
      <div className="block md:hidden">
        <Marquee className="[--duration:22s] py-2.5" repeat={3}>
          {ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <TickerItem item={item} />
              <Divider />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Desktop: static flex */}
      <div className="hidden md:flex items-center justify-center gap-0 py-2.5 container mx-auto max-w-[var(--container-max-width)] px-4">
        {ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <TickerItem item={item} />
            {i < ITEMS.length - 1 && <Divider />}
          </span>
        ))}
      </div>
    </div>
  );
}
