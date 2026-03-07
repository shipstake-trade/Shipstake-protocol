import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import { SolanaProvider } from '@/lib/solana/provider'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <SolanaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Outlet />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--foreground)',
              },
            }}
          />
          <Analytics />
          {import.meta.env.DEV && <TanStackRouterDevtools />}
        </ThemeProvider>
      </QueryClientProvider>
    </SolanaProvider>
  ),
})
