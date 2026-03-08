import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { Header } from "@/components/sections/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthGuard } from "@/components/auth-guard"
import { RepoSelector } from "@/components/github/repo-selector"
import type { GitHubRepo } from "@/lib/github"
import { useCreateQuestReal } from "@/hooks/useCreateQuest"
import { useGithubStatus } from "@/hooks/useGithubStatus"
import { useShipstakeProgram } from "@/hooks/useShipstakeProgram"
import { fetchProtocolConfig } from "@/lib/solana/shipstake"
import { apiFetch } from "@/lib/api"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/quest/create")({
  component: CreateQuestPage,
})

interface FormData {
  title: string
  description: string
  repo: GitHubRepo | null
  stakeSol: string
  deadlineDays: string
}

const STEPS = ["Details", "Repository", "Stake & Deadline", "Review"]

function CreateQuestPage() {
  const navigate = useNavigate()
  const { program, publicKey, connected } = useShipstakeProgram()
  const { data: github } = useGithubStatus()
  const createQuest = useCreateQuestReal()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    repo: null,
    stakeSol: "0.1",
    deadlineDays: "14",
  })

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function canAdvance(): boolean {
    if (step === 0) return form.title.trim().length >= 3
    if (step === 1) return form.repo !== null
    if (step === 2) {
      const sol = parseFloat(form.stakeSol)
      const days = parseInt(form.deadlineDays)
      return sol >= 0.1 && days >= 1 && days <= 365
    }
    return true
  }

  async function handleSubmit() {
    if (!connected || !program || !publicKey) {
      toast.error("Connect your wallet first.")
      return
    }

    const sol = parseFloat(form.stakeSol)
    const days = parseInt(form.deadlineDays)

    // Resolve slash destination from protocol config, fallback to builder wallet
    let slashDestination = publicKey.toBase58()
    try {
      const config = await fetchProtocolConfig(program)
      if (config?.oracle) {
        slashDestination =
          typeof config.oracle.toBase58 === "function"
            ? config.oracle.toBase58()
            : config.oracle.toString()
      }
    } catch {
      // fallback already set
    }

    toast.loading("Sending transaction…", { id: "create-quest" })

    try {
      const [repoOwner] = form.repo!.full_name.split("/")

      const result = await createQuest.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        deadlineDays: days,
        slashDestination,
        stakeSol: sol,
        repoOwner,
        repoName: form.repo!.name,
      })

      toast.loading("Syncing to database…", { id: "create-quest" })

      const deadline = Math.floor(Date.now() / 1000) + days * 86400
      await apiFetch("/quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubkey: result.questPda,
          builder: publicKey.toBase58(),
          title: form.title.trim(),
          description: form.description.trim(),
          stake_amount: Math.floor(sol * LAMPORTS_PER_SOL),
          deadline,
          repo_owner: repoOwner,
          repo_name: form.repo!.name,
          tx_signature: result.signature,
          builder_github_id: github?.githubId ?? null,
        }),
      })

      toast.success("Quest created!", { id: "create-quest", description: result.questPda })
      navigate({ to: "/quest/$id", params: { id: result.questPda } })
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Transaction failed"
      toast.error(msg, { id: "create-quest" })
    }
  }

  return (
    <main>
      <Header />
      <AuthGuard>
      <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-12">
        {/* Step indicator */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-6">Create Quest</h1>
          <div className="flex items-center gap-0">
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors",
                      i < step
                        ? "bg-primary border-primary text-primary-foreground"
                        : i === step
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-muted-foreground"
                    )}
                  >
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium whitespace-nowrap",
                      i === step ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-px w-12 sm:w-20 mt-[-14px] transition-colors",
                      i < step ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="glass-card rounded-xl p-6 max-w-xl">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold mb-1">Quest Details</h2>
                <p className="text-sm text-muted-foreground">
                  Give your quest a title and describe what you&apos;re committing to ship.
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="e.g. Ship token swap UI by end of sprint"
                  maxLength={80}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {form.title.trim().length < 3 && form.title.length > 0 && (
                    <span className="text-amber-400 mr-2">3 characters minimum</span>
                  )}
                  {form.title.length}/80
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Description{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Describe what done looks like, acceptance criteria, etc."
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {form.description.length}/500
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold mb-1">Link Repository</h2>
                <p className="text-sm text-muted-foreground">
                  Choose the GitHub repo this quest is tied to.
                </p>
              </div>
              <RepoSelector value={form.repo} onChange={(r) => setField("repo", r)} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Stake &amp; Deadline</h2>
                <p className="text-sm text-muted-foreground">
                  Set how much SOL you&apos;re putting on the line and how long you have.
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Stake Amount (SOL)</label>
                <Input
                  type="number"
                  value={form.stakeSol}
                  onChange={(e) => setField("stakeSol", e.target.value)}
                  min="0.1"
                  step="0.1"
                  placeholder="0.1"
                />
                <p className="text-xs text-muted-foreground">Minimum 0.1 SOL</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Deadline (days from now)</label>
                <Input
                  type="number"
                  value={form.deadlineDays}
                  onChange={(e) => setField("deadlineDays", e.target.value)}
                  min="1"
                  max="365"
                  step="1"
                  placeholder="14"
                />
                <p className="text-xs text-muted-foreground">
                  {parseInt(form.deadlineDays) > 0
                    ? `Due ${new Date(
                        Date.now() + parseInt(form.deadlineDays) * 86_400_000
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                    : "1–365 days"}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold mb-1">Review &amp; Confirm</h2>
                <p className="text-sm text-muted-foreground">
                  Review your quest before sending the on-chain transaction.
                </p>
              </div>
              <div className="space-y-3 text-sm divide-y divide-border">
                <ReviewRow label="Title" value={form.title} />
                {form.description && <ReviewRow label="Description" value={form.description} />}
                <ReviewRow
                  label="Repository"
                  value={form.repo ? form.repo.full_name : "—"}
                  mono
                />
                <ReviewRow label="Stake" value={`${form.stakeSol} SOL`} />
                <ReviewRow
                  label="Deadline"
                  value={`${form.deadlineDays} days — ${new Date(
                    Date.now() + parseInt(form.deadlineDays) * 86_400_000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`}
                />
              </div>
              {!connected && (
                <p className="text-xs text-destructive">Connect your wallet to submit.</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                size="sm"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="gap-1.5"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={createQuest.isPending || !connected}
                className="gap-1.5"
              >
                {createQuest.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Create Quest"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      </AuthGuard>
    </main>
  )
}

function ReviewRow({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex gap-3 py-2 first:pt-0">
      <span className="text-muted-foreground w-24 shrink-0 text-sm">{label}</span>
      <span className={cn("text-foreground break-all text-sm", mono && "font-mono text-xs")}>
        {value}
      </span>
    </div>
  )
}
