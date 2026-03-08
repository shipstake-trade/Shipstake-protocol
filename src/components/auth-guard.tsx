import { useEffect, type ReactNode } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useNavigate } from "@tanstack/react-router"
import { useIsMounted } from "@/lib/solana/shipstake"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: ReactNode
}

/**
 * Wraps a page/section that requires a connected Privy wallet.
 * - While Privy is initializing: shows a centered spinner
 * - When ready but not authenticated: redirects to /gate
 * - When authenticated: renders children
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const mounted = useIsMounted()
  const { ready, authenticated } = usePrivy()
  const navigate = useNavigate()

  useEffect(() => {
    if (mounted && ready && !authenticated) {
      navigate({ to: "/gate" })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, ready, authenticated])

  if (!mounted || !ready) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!authenticated) {
    // Briefly show nothing while the redirect fires
    return null
  }

  return <>{children}</>
}
