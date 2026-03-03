export default function QuestDetailLoading() {
  return (
    <div className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8 animate-pulse">
      <div className="h-3 w-24 bg-muted rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex gap-2 mb-3">
              <div className="h-5 w-12 bg-muted rounded" />
              <div className="h-5 w-16 bg-muted rounded-full" />
            </div>
            <div className="h-8 w-3/4 bg-muted rounded mb-3" />
            <div className="h-4 w-full bg-muted rounded mb-2" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
          <div className="glass-card rounded-lg p-5 h-48" />
        </div>
        <div className="space-y-4">
          <div className="glass-card rounded-lg p-5 h-32" />
          <div className="glass-card rounded-lg p-5 h-40" />
          <div className="glass-card rounded-lg p-5 h-24" />
        </div>
      </div>
    </div>
  );
}
