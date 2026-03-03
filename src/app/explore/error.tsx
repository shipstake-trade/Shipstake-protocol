"use client";

import { Button } from "@/components/ui/button";

export default function ExploreError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto max-w-[var(--container-max-width)] px-4 py-16 text-center">
      <h2 className="text-2xl font-display font-bold text-foreground mb-3">
        Something went wrong
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {error.message || "Failed to load quests."}
      </p>
      <Button onClick={reset} className="text-primary-foreground">
        Try Again
      </Button>
    </div>
  );
}
