import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Header } from "@/components/sections/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthGuard } from "@/components/auth-guard"
import { useSubmitProofReal } from "@/hooks/useSubmitProof"
import { useShipstakeProgram } from "@/hooks/useShipstakeProgram"
import { apiFetch } from "@/lib/api"
import { ArrowLeft, Loader2, Link2 } from "lucide-react"

export const Route = createFileRoute("/quest/$id/submit-proof")({
  component: SubmitProofPage,
})

interface ApiQuest {
  pubkey: string
  builder: string
  status: number
}

function SubmitProofPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { connected, publicKey } = useShipstakeProgram()
  const submitProof = useSubmitProofReal()

  const [proofUrl, setProofUrl] = useState("")

  // Fetch quest to verify builder ownership
  const { data: quest, isLoading: questLoading } = useQuery<ApiQuest>({
    queryKey: ["quest", id],
    queryFn: async () => {
      const res = await apiFetch(`/quests/${id}`)
      if (!res.ok) throw new Error(`Quest not found (${res.status})`)
      return res.json()
    },
    staleTime: 30_000,
  })

  // Redirect if not the quest builder or quest is not Open (status 0)
  useEffect(() => {
    if (!connected || !publicKey || !quest) return
    if (quest.builder !== publicKey.toBase58()) {
      toast.error("Only the quest builder can submit proof.")
      navigate({ to: "/quest/$id", params: { id } })
      return
    }
    if (quest.status !== 0) {
      toast.error("This quest is no longer accepting proof submissions.")
      navigate({ to: "/quest/$id", params: { id } })
    }
  }, [connected, publicKey, quest, navigate, id])

  function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isValidUrl(proofUrl)) {
      toast.error("Enter a valid URL.")
      return
    }

    toast.loading("Sending proof transaction…", { id: "submit-proof" })

    try {
      await submitProof.mutateAsync({ questPda: id, proofUrl })

      toast.loading("Updating quest status…", { id: "submit-proof" })

      // PATCH Supabase via Fastify — status 1 = InProgress (awaiting oracle)
      await apiFetch(`/quests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: 1, proof_url: proofUrl }),
      })

      queryClient.invalidateQueries({ queryKey: ["quest", id] })
      toast.success("Proof submitted!", { id: "submit-proof" })
      navigate({ to: "/quest/$id", params: { id } })
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed"
      toast.error(msg, { id: "submit-proof" })
    }
  }

  return (
    <main>
      <Header />
      <AuthGuard>
        <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-12">
          <div className="mb-6">
            <Link
              to="/quest/$id"
              params={{ id }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to quest
            </Link>
          </div>

          {questLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-8">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading quest…
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 max-w-lg space-y-6">
              <div>
                <h1 className="text-xl font-bold mb-1">Submit Proof</h1>
                <p className="text-sm text-muted-foreground">
                  Provide a URL that proves you shipped — a PR, deployment, commit, or live URL.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Proof URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      placeholder="https://github.com/you/repo/pull/42"
                      className="pl-9"
                      type="url"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    e.g. GitHub PR, Vercel deployment, live site URL, or commit link
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-400/80 space-y-1">
                  <p className="font-medium">This transaction is irreversible</p>
                  <p>
                    Submitting proof moves your quest to validation. The oracle will verify your
                    submission on-chain. Make sure your proof URL is publicly accessible.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate({ to: "/quest/$id", params: { id } })}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitProof.isPending || !proofUrl}
                    className="gap-2"
                  >
                    {submitProof.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Submit Proof"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </AuthGuard>
    </main>
  )
}
