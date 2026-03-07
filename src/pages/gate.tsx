import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gate')({
  validateSearch: (search: Record<string, string>) => ({
    blocked: search.blocked as string | undefined,
  }),
})
