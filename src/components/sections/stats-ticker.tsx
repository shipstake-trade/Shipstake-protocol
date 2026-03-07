"use client";

import Marquee from "@/components/ui/marquee";

const ITEMS = [
  "\uD83D\uDFE2 247 commitments shipped",
  "\uD83D\uDC80 12 builders wrecked",
  "\uD83D\uDD25 $14,230 locked right now",
  "\uD83D\uDFE2 247 commitments shipped",
  "\uD83D\uDC80 12 builders wrecked",
  "\uD83D\uDD25 $14,230 locked right now",
];

export function StatsTicker() {
  return (
    <div className="relative mx-auto container max-w-[var(--container-max-width)]">
      <div className="border-x border-b overflow-hidden" style={{ background: "#0a0a0c" }}>
        <Marquee className="[--duration:22s] py-3" repeat={2}>
          {ITEMS.map((item, i) => (
            <span
              key={i}
              className="font-mono text-xs text-muted-foreground mx-6 shrink-0"
            >
              {item}
              <span className="mx-6 text-border">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
