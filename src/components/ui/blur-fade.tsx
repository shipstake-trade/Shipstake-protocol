"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inView?: boolean;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 6,
  inView = true,
  blur = "6px",
}: BlurFadeProps) {
  const variants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileInView={inView ? "visible" : undefined}
      viewport={{ once: true }}
      transition={{
        delay,
        duration,
        ease: "easeOut",
      }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
