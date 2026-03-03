"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface WalletAddressProps {
  address: string;
  length?: number;
  className?: string;
}

export function WalletAddress({
  address,
  length = 4,
  className,
}: WalletAddressProps) {
  const [copied, setCopied] = useState(false);

  const truncated =
    address.length > length * 2 + 3
      ? `${address.slice(0, length)}...${address.slice(-length)}`
      : address;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
        className
      )}
      title={copied ? "Copied!" : `Click to copy: ${address}`}
    >
      {copied ? "Copied!" : truncated}
    </button>
  );
}
