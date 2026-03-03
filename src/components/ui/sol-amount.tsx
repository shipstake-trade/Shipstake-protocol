import { cn } from "@/lib/utils";
import { lamportsToSol } from "@/lib/solana/shipstake";

interface SolAmountProps {
  lamports: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
};

export function SolAmount({ lamports, size = "md", className }: SolAmountProps) {
  const sol = lamportsToSol(lamports);
  return (
    <span
      className={cn(
        "font-mono font-bold text-primary",
        sizeConfig[size],
        className
      )}
    >
      {sol.toFixed(3)} <span className="text-muted-foreground font-normal">SOL</span>
    </span>
  );
}
