"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import { mockLeaderboard } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";

export default function LeaderboardPage() {
  const [lastRefresh] = useState(new Date());

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Leaderboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Top builders by PROOF Score.
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Updated{" "}
            {lastRefresh.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="glass-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 w-12">
                  #
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  BUILDER
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                  PROOF
                </th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">
                  SHIP RATE
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">
                  TOTAL STAKED
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 hidden lg:table-cell">
                  SHIPPED
                </th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <span
                      className={`text-sm font-mono font-bold ${
                        entry.rank <= 3
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/builder/${entry.address}`}
                      className="text-sm font-mono text-foreground hover:text-primary transition-colors"
                    >
                      {entry.address}
                    </Link>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <ProofScoreRing score={entry.proofScore} size="sm" />
                    </div>
                  </td>
                  <td className="p-4 text-center hidden md:table-cell">
                    <span className="text-sm font-mono text-foreground">
                      {entry.shipRate}%
                    </span>
                  </td>
                  <td className="p-4 text-right hidden md:table-cell">
                    <span className="text-sm font-mono text-primary">
                      {entry.totalStaked.toFixed(1)} SOL
                    </span>
                  </td>
                  <td className="p-4 text-right hidden lg:table-cell">
                    <span className="text-sm font-mono text-foreground">
                      {entry.shipped}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
