import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Button } from '@/components/ui/button'
import { useSubmitProof, usePrivyWallet } from '@/lib/solana/shipstake'
import { useLinkAccount } from '@privy-io/react-auth'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/quest/$id/submit-proof')({
  component: SubmitProofPage,
})

function SubmitProofPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { ready, authenticated, connected } = usePrivyWallet()
  const { linkWallet } = useLinkAccount()
  const { submitProof, isPending } = useSubmitProof()

  useEffect(() => {
    if (ready && !authenticated) navigate({ to: '/gate' })
  }, [ready, authenticated, navigate])

  if (!ready) return null

  const handleSubmit = async () => {
    if (!connected) {
      linkWallet()
      return
    }

    // Proof is the GitHub repo linked at quest creation — no URL needed
    const result = await submitProof({ questPda: id, proofUrl: '' })

    if (result) {
      toast.success('Quest marked in-progress.', { description: 'The oracle will validate your delivery automatically.' })
      navigate({ to: '/quest/$id', params: { id } })
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Submit for review</h1>
        <p className="text-muted-foreground text-sm mb-8">Signal that you've shipped. The oracle validates your GitHub repo automatically.</p>

        <div className="glass-card rounded-lg p-6 space-y-6">
          <div className="p-3 rounded-md bg-primary/10 border border-primary/20 text-xs text-primary space-y-1">
            <p className="font-medium">How the oracle validates your quest</p>
            <p className="text-primary/80">It checks the GitHub repo you linked at quest creation for commits pushed before the deadline, authored by your connected GitHub account.</p>
          </div>

          <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
            Only submit once your work is committed and pushed. The oracle's decision is final.
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full text-primary-foreground"
          >
            {isPending ? 'Submitting...' : connected ? 'Submit for oracle review' : 'Connect Wallet'}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
