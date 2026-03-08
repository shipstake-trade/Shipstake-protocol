import { useEffect, type ReactNode } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useIsMounted } from "@/lib/solana/shipstake"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet } from "lucide-react"

interface AuthGuardProps {
  children: ReactNode
}

/**
 * Wraps a page/section that requires a connected Privy wallet.
 * - While Privy is initializing: shows a centered spinner
 * - When ready but not authenticated: auto-triggers the login modal and shows a fallback UI
 * - When authenticated: renders children
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const mounted = useIsMounted()
  const { ready, authenticated, login } = usePrivy()

  // Auto-open login modal on first load if not authenticated
  useEffect(() => {
    if (mounted && ready && !authenticated) {
      login()
    }
  // login is stable from Privy, but we only want this to fire once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, ready])

  if (!mounted || !ready) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4 text-center">
        <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center">
          <Wallet className="w-7 h-7 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">Wallet required</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Connect your Solana wallet to access this page.
          </p>
        </div>
        <Button onClick={() => login()} className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
