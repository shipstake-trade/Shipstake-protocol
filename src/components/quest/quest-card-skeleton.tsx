export function QuestCardSkeleton() {
  return (
    <div className="glass-card rounded-lg p-5 h-full flex flex-col animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-12 bg-muted rounded" />
        <div className="h-5 w-20 bg-muted rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-muted rounded mb-2" />
      <div className="h-3 w-1/2 bg-muted rounded mb-3" />
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
        <div className="h-4 w-16 bg-muted rounded" />
        <div className="h-3 w-14 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded-full" />
      </div>
    </div>
  );
}
