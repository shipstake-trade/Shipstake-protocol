"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  className?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useTransform(motionValue, (latest) =>
    Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(latest.toFixed(decimalPlaces)))
  );
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, direction === "down" ? 0 : value, {
      duration: 2,
      delay,
      ease: "easeOut",
    });

    return controls.stop;
  }, [motionValue, isInView, delay, value, direction]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-block tabular-nums text-foreground tracking-wider font-mono",
        className
      )}
    >
      {springValue}
    </motion.span>
  );
}
