"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-gradient-to-r from-emerald-brand/20 via-electric/20 to-emerald-brand/20 bg-[length:200%_auto] px-3 py-1 text-sm font-medium text-emerald-brand ring-1 ring-emerald-brand/25 animate-aurora",
        className
      )}
      style={{ animationDuration: "6s" }}
    >
      {children}
    </span>
  );
}
