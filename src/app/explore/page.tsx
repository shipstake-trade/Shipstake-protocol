"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { QuestCard } from "@/components/quest/quest-card";
import { QuestCardSkeleton } from "@/components/quest/quest-card-skeleton";
import { Button } from "@/components/ui/button";
import { mockQuests } from "@/lib/mock-data";
import type { QuestStatus, Category, ProofType } from "@/lib/solana/idl";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useMemo } from "react";

const STATUS_OPTIONS: QuestStatus[] = [
  "Open",
  "InProgress",
  "Validating",
  "Shipped",
  "Slashed",
];
const CATEGORY_OPTIONS: Category[] = [
  "DeFi",
  "NFT",
  "Gaming",
  "Infrastructure",
  "Tools",
  "DAO",
  "Other",
];

type SortOption = "newest" | "deadline" | "stake";

export default function ExplorePage() {
  const [statusFilter, setStatusFilter] = useState<QuestStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let quests = [...mockQuests];

    if (statusFilter !== "all") {
      quests = quests.filter((q) => q.status === statusFilter);
    }
    if (categoryFilter !== "all") {
      quests = quests.filter((q) => q.category === categoryFilter);
    }

    switch (sort) {
      case "deadline":
        quests.sort((a, b) => a.deadline - b.deadline);
        break;
      case "stake":
        quests.sort(
          (a, b) =>
            (b.vault?.builderStake ?? 0) - (a.vault?.builderStake ?? 0)
        );
        break;
      default:
        quests.sort((a, b) => b.deadline - a.deadline);
    }

    return quests;
  }, [statusFilter, categoryFilter, sort]);

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Explore Quests
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Discover builders staking their reputation on-chain
            </p>
          </div>
          <Link href="/quest/create">
            <Button className="text-primary-foreground">
              Create Quest →
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Status filter */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                statusFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              All Status
            </button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setCategoryFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                categoryFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              All Categories
            </button>
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex gap-1 ml-auto">
            {(["newest", "deadline", "stake"] as SortOption[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize",
                  sort === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quest Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <QuestCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No quests found matching your filters.
            </p>
            <Link href="/quest/create">
              <Button variant="default" className="text-primary-foreground">
                Create the first quest →
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((quest) => (
              <QuestCard key={quest.publicKey} quest={quest} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
