export function BuilderCardSkeleton() {
  return (
    <div className="glass-card rounded-lg p-5 flex items-center gap-4 animate-pulse">
      <div className="h-[72px] w-[72px] rounded-full bg-muted shrink-0" />
      <div className="flex-1">
        <div className="h-3 w-1/2 bg-muted rounded mb-2" />
        <div className="flex gap-4">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-3 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
