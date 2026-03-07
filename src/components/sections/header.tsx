"use client";

import { MobileDrawer } from "@/components/mobile-drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";
import { LAMPORTS_PER_SOL, Connection, PublicKey } from "@solana/web3.js";
import { ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { mockBuilderProfile } from "@/lib/mock-data";
import { toast } from "sonner";

function truncate(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function proofScoreColor(score: number): string {
  if (score >= 91) return "text-yellow-400";
  if (score >= 76) return "text-orange-400";
  if (score >= 51) return "text-purple-400";
  if (score >= 26) return "text-blue-400";
  return "text-slate-400";
}

function NavProofScore({ address, score, streak }: { address: string; score: number; streak: number }) {
  return (
    <Link
      to="/builder/$address"
      params={{ address }}
      className={cn(
        "hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 hover:border-[var(--border-active)] transition-colors text-sm font-mono",
        proofScoreColor(score)
      )}
      title="Your PROOF Score — click to view profile"
    >
      <span className="text-muted-foreground text-xs">PROOF</span>
      <span className="font-bold">{score}</span>
      {streak > 0 && (
        <span className="text-xs">🔥{streak}</span>
      )}
    </Link>
  );
}

function WalletMenu({ address, onLogout }: { address: string; onLogout: () => void }) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!address) return;
    const conn = new Connection("https://api.devnet.solana.com", "confirmed");
    conn
      .getBalance(new PublicKey(address))
      .then((lamports) => setBalance(lamports / LAMPORTS_PER_SOL))
      .catch(() => {});
  }, [address]);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="rounded-lg font-mono text-primary-foreground gap-1.5"
        >
          {truncate(address)}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {balance !== null && (
          <>
            <div className="px-2 py-1.5 text-xs text-muted-foreground font-mono">
              {balance.toFixed(4)} SOL
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-3.5 w-3.5" />
          Copy address
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            window.open(
              `https://solscan.io/account/${address}?cluster=devnet`,
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          View on Solscan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const { ready, authenticated, logout } = usePrivy();
  const { wallets } = useWallets();
  const walletAddress = wallets[0]?.address ?? "";

  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center container mx-auto max-w-[var(--container-max-width)] p-2">
        {/* Logo */}
        <Link to="/">
          <img
            src="/brand/shipstake-mark.svg"
            alt="SHIPSTAKE"
            style={{ height: "40px", width: "40px" }}
          />
        </Link>

        {/* Center nav — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-x-6">
          {siteConfig.navLinks.map((link) => {
            if (link.external || link.href.startsWith("http")) {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label} →
                </a>
              );
            }
            if (link.href.includes("#")) {
              return (
                <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.label} to={link.href as never} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTAs */}
        <div className="hidden lg:flex items-center gap-x-3">
          {ready && authenticated && walletAddress ? (
            <>
              <NavProofScore
                address={walletAddress}
                score={mockBuilderProfile.proofScore}
                streak={mockBuilderProfile.currentStreak}
              />
              <WalletMenu address={walletAddress} onLogout={logout} />
            </>
          ) : (
            <Link
              to="/gate"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "text-primary-foreground rounded-lg font-medium"
              )}
            >
              Connect Wallet
            </Link>
          )}
        </div>

        {/* Mobile drawer */}
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
