import { QuestCardSkeleton } from "@/components/quest/quest-card-skeleton";

export default function ExploreLoading() {
  return (
    <div className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
      <div className="h-8 w-48 bg-muted rounded mb-2 animate-pulse" />
      <div className="h-4 w-64 bg-muted rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <QuestCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
