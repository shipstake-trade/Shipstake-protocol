export default function LeaderboardLoading() {
  return (
    <div className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8 animate-pulse">
      <div className="h-8 w-40 bg-muted rounded mb-2" />
      <div className="h-4 w-48 bg-muted rounded mb-8" />
      <div className="glass-card rounded-lg p-4 space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-6 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-10 w-10 bg-muted rounded-full" />
            <div className="h-4 w-12 bg-muted rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
