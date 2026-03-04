"use client";

import { Section } from "@/components/section";
import { BorderText } from "@/components/ui/border-number";
import { siteConfig } from "@/lib/config";
import { AnchorIcon, CheckCircleIcon, FlameIcon, ZapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const STAT_ICONS = [
  <ZapIcon key="zap" className="h-5 w-5" />,
  <FlameIcon key="flame" className="h-5 w-5" />,
  <AnchorIcon key="anchor" className="h-5 w-5" />,
  <CheckCircleIcon key="check" className="h-5 w-5" />,
];

export function Statistics() {
  return (
    <Section id="statistics" title="Statistics">
      <div
        className="border-x border-t"
        style={{
          backgroundImage:
            "radial-gradient(circle at bottom center, color-mix(in srgb, var(--secondary) 40%, transparent), var(--background))",
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {siteConfig.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center justify-center py-8 px-4 relative",
                // Right border: left column on mobile, all but last on desktop
                idx % 2 === 0 ? "border-r" : "",
                "sm:border-r sm:last:border-r-0",
                // Bottom border: first row on mobile only
                idx < 2 ? "border-b sm:border-b-0" : ""
              )}
            >
              <div className="text-center relative">
                <BorderText text={`${stat.value}${stat.suffix}`} />
                <div className="flex items-center justify-center gap-2 mt-2">
                  {STAT_ICONS[idx]}
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border/30 py-4 px-6">
          <p className="text-xs text-muted-foreground/50 italic text-center">
            The score you build here can&apos;t be bought, copied, or faked.
          </p>
        </div>
      </div>
    </Section>
  );
}
