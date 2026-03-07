import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Button } from '@/components/ui/button'
import { RepoSelector } from '@/components/github/repo-selector'
import type { GitHubRepo } from '@/components/github/repo-selector'
import { useCreateQuest, usePrivyWallet } from '@/lib/solana/shipstake'
import { BN } from '@coral-xyz/anchor'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useLinkAccount } from '@privy-io/react-auth'
import type { Category, ProofType } from '@/lib/solana/idl'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/quest/create')({
  component: CreateQuestPage,
})

const CATEGORIES: Category[] = ['DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Tools', 'DAO', 'Other']
const PROOF_TYPES: { value: ProofType; label: string; description: string }[] = [
  { value: 'GithubCommit', label: 'GitHub Commit', description: 'Link to a specific commit on GitHub' },
  { value: 'VercelDeployment', label: 'Vercel Deploy', description: 'Production deployment URL' },
]

function CreateQuestPage() {
  const navigate = useNavigate()
  const { ready, authenticated, connected, login } = usePrivyWallet()
  const { linkWallet } = useLinkAccount()
  const { createQuest, isPending } = useCreateQuest()

  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('DeFi')
  const [proofType, setProofType] = useState<ProofType>('GithubCommit')
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null)
  const [stakeSol, setStakeSol] = useState(1)
  const [deadlineDays, setDeadlineDays] = useState(14)

  const steps = ['Details', 'Proof', 'Repository', 'Stake', 'Confirm']

  const canProceed = () => {
    switch (step) {
      case 0: return title.trim().length >= 3 && description.trim().length >= 10
      case 1: return true
      case 2: return true
      case 3: return stakeSol >= 0.1 && deadlineDays >= 1
      case 4: return connected
      default: return false
    }
  }

  useEffect(() => {
    if (ready && !authenticated) login()
  }, [ready, authenticated])

  if (!ready) return null

  const handleSubmit = async () => {
    if (!connected) {
      authenticated ? linkWallet() : login()
      return
    }

    const now = Math.floor(Date.now() / 1000)
    const deadline = new BN(now + deadlineDays * 86400)
    const stakeAmount = new BN(Math.floor(stakeSol * LAMPORTS_PER_SOL))
    const slashDestination = new PublicKey('11111111111111111111111111111111')
    const repoOwner = selectedRepo ? selectedRepo.full_name.split('/')[0] : ''
    const repoName = selectedRepo?.name ?? ''

    const result = await createQuest({
      title,
      description,
      deadline,
      slashDestination,
      stakeAmount,
      repoOwner,
      repoName,
    })

    if (result) {
      toast.success('Quest created on-chain.', { description: `Signature: ${result.signature.slice(0, 16)}...` })
      navigate({ to: '/quest/$id', params: { id: result.questPda } })
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-mono font-bold text-foreground mb-2">Stake a Build</h1>
        <p className="text-muted-foreground text-sm mb-8">Define it. Lock SOL. Ship it.</p>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn('flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-bold transition-colors', i === step ? 'bg-primary text-primary-foreground' : i < step ? 'bg-primary/20 text-primary cursor-pointer' : 'bg-secondary text-muted-foreground')}
              >{i + 1}</button>
              <span className={cn('text-xs hidden sm:inline', i === step ? 'text-foreground' : 'text-muted-foreground')}>{s}</span>
              {i < steps.length - 1 && <div className="w-4 h-px bg-border mx-1" />}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-lg p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Quest details</h2>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What are you building?" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary" maxLength={64} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does done look like?" rows={4} className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none" maxLength={256} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => setCategory(cat)} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', category === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}>{cat}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Proof type</h2>
              <p className="text-sm text-muted-foreground">How will you prove delivery?</p>
              <div className="space-y-3">
                {PROOF_TYPES.map((pt) => (
                  <button key={pt.value} onClick={() => setProofType(pt.value)} className={cn('w-full glass-card rounded-lg p-4 text-left transition-all', proofType === pt.value ? 'border-[var(--border-active)] glow-emerald' : 'hover:border-[var(--border-active)]')}>
                    <h3 className="text-sm font-display font-bold text-foreground">{pt.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{pt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-display font-bold">Select Repository</h2>
                <p className="text-sm text-muted-foreground mt-1">Link a GitHub repository to this quest. Optional — you can skip this step.</p>
              </div>
              <RepoSelector value={selectedRepo} onChange={setSelectedRepo} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Stake and deadline</h2>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Stake amount (SOL)</label>
                <input type="range" min={0.1} max={50} step={0.1} value={stakeSol} onChange={(e) => setStakeSol(Number(e.target.value))} className="w-full accent-emerald-brand" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.1 SOL</span>
                  <span className="text-lg font-mono font-bold text-primary">{stakeSol.toFixed(1)} SOL</span>
                  <span>50 SOL</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Deadline (days from now)</label>
                <input type="number" min={1} max={90} value={deadlineDays} onChange={(e) => setDeadlineDays(Number(e.target.value))} className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <p className="text-xs text-muted-foreground mt-1">
                  Deadline: {new Date(Date.now() + deadlineDays * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Settlement fee</span>
                <span className="font-mono font-bold text-amber-400">2% ({(stakeSol * 0.02).toFixed(4)} SOL)</span>
              </div>
              <p className="text-xs text-muted-foreground/60">Fee is only charged on SHIPPED. Lose your stake pays no fee.</p>
              <hr className="border-border/30" />
              <p className="text-xs text-amber-400">If you miss the deadline or score below 70, this SOL is gone. No exceptions.</p>
              <div className="p-3 rounded-md bg-secondary/50 border border-border/50 text-xs space-y-2">
                <p className="text-muted-foreground font-medium">If you SHIP:</p>
                <div className="flex justify-between text-muted-foreground">
                  <span>You receive</span>
                  <span className="font-mono text-emerald-brand">{(stakeSol * 0.98).toFixed(4)} SOL</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Protocol fee (2%)</span>
                  <span className="font-mono text-amber-400">{(stakeSol * 0.02).toFixed(4)} SOL</span>
                </div>
                <hr className="border-border/30" />
                <p className="text-muted-foreground font-medium">If SLASHED:</p>
                <div className="flex justify-between text-muted-foreground">
                  <span>You receive</span>
                  <span className="font-mono text-danger">0 SOL</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Protocol fee</span>
                  <span className="font-mono">0 SOL</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Confirm quest</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="font-medium">{title}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Mode</span><span className="font-medium">Self-Stake</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Deadline</span><span>{new Date(Date.now() + deadlineDays * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Proof type</span><span className="font-mono text-xs">{proofType}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Repository</span><span className="font-mono text-xs text-right truncate max-w-[180px]">{selectedRepo ? selectedRepo.full_name : '—'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Stake</span><span className="font-mono font-bold text-primary">{stakeSol.toFixed(3)} SOL</span></div>
                <hr className="border-border/30" />
                <div className="flex justify-between"><span className="text-muted-foreground">Protocol fee (if shipped)</span><span className="font-mono text-xs text-amber-400">{(stakeSol * 0.02).toFixed(4)} SOL (2%)</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">You receive (if shipped)</span><span className="font-mono font-bold text-emerald-brand">{(stakeSol * 0.98).toFixed(4)} SOL</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">If slashed</span><span className="font-mono text-xs text-danger">Stake forfeited</span></div>
              </div>
              <div className="p-3 rounded-md bg-secondary/50 border border-border/50 text-xs space-y-1.5">
                <p className="text-muted-foreground font-medium">PROOF Score impact</p>
                <div className="flex justify-between text-muted-foreground"><span>SHIPPED</span><span className="font-mono text-emerald-400">+1 quest shipped</span></div>
                <div className="flex justify-between text-muted-foreground"><span>SLASHED</span><span className="font-mono text-destructive">no change</span></div>
              </div>
              <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                This commitment is binding the moment you sign. No extensions. No appeals. The oracle is the final word.
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-border/50">
            {step > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>Back</Button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <Button size="sm" disabled={!canProceed()} onClick={() => setStep(step + 1)} className="text-primary-foreground">Next</Button>
            ) : (
              <Button size="sm" disabled={isPending || !connected} onClick={handleSubmit} className="text-primary-foreground">
                {isPending ? 'Creating...' : connected ? 'Lock it in' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
