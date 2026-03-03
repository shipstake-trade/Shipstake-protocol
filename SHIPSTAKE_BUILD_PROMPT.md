# SHIPSTAKE — Frontend MVP Build Prompt
# Claude Code Opus 4.6 | Phase 2–7 | Based on Whitepaper v0.3

---

## 0. WHAT YOU ARE BUILDING

SHIPSTAKE is a **deterministic accountability protocol on Solana**. Builders lock SOL as a performance bond against a public delivery commitment. A deterministic oracle validates delivery evidence (GitHub commit, CI pass, or Vercel deployment) and the smart contract settles automatically. No intermediary. No social consensus. No prediction market.

**The single primitive: verifiable skin in the game, on-chain.**

Two product modes:
- **Grant Guard (B2B)** — Foundations protect grant capital. Builder posts matching stake. Oracle resolves. Auto-settlement.
- **Self-Stake (B2C)** — Builder sets a public deadline + locks SOL. No external participants. PROOF Score accumulates.

**No positions. No spectators. No upside for external participants in v0.**

---

## 1. MANDATORY TERMINOLOGY

The following is a legal constraint, not a style preference.

| ❌ NEVER USE | ✅ ALWAYS USE |
|---|---|
| bet / betting | commitment / bond |
| gamble / winner | settlement / builder |
| odds | delivery confidence |
| prediction market | accountability protocol |
| pot / jackpot | pool / vault |
| positions | stake |
| spectators | community |

Violation of this table = reject the output and rewrite.

---

## 2. CRITICAL FILES — NEVER MODIFY

These 4 files contain all blockchain logic. They must be read, never touched.

```
lib/solana/idl.ts           ← Anchor IDL, PROGRAM_ID, type defs, conversion helpers
lib/solana/shipstake.ts     ← All on-chain hooks, PDA helpers, Privy wallet integration
lib/solana/provider.tsx     ← Privy config (appId MUST remain: cmm8h3txq00yp0cjsg61arbz5)
middleware.ts               ← Geo-blocking: US, UK, AU, CA, CN, KP, IR → blocked
```

**Non-negotiable config values:**
- Privy appId: `cmm8h3txq00yp0cjsg61arbz5`
- Accent color: `#00C896` (emerald — never change)
- Wallet providers: Phantom, Solflare, Backpack (via Privy)
- Network: Solana Devnet (mainnet post-audit)
- Min stake: from `ProtocolConfig.min_stake_lamports` on-chain

Before touching any file, confirm it is not in the list above.

---

## 3. TECH STACK

```
Framework:    Next.js 15 App Router + TypeScript strict mode
Styling:      Tailwind CSS v4 + shadcn/ui components
Animations:   MagicUI (already installed — use existing components)
Wallet:       Privy (@privy-io/react-auth) — NOT @solana/wallet-adapter
On-chain:     Anchor (@coral-xyz/anchor) via hooks in lib/solana/shipstake.ts
Fonts:        Inter (body), Space Grotesk (headings), JetBrains Mono (numbers/addresses), Playfair Display (italic accents)
Data:         Mock data when wallet disconnected, real on-chain data when connected
```

---

## 4. DESIGN SYSTEM

```css
/* Core palette */
--background:  #0A0C0F          /* near-black base */
--surface:     #0D1117          /* card / panel bg */
--surface-2:   #161B22          /* elevated surface */
--foreground:  #F8FAFC          /* primary text */
--muted:       #6B7280          /* secondary text */
--primary:     #00C896          /* emerald accent — ALL CTAs */
--primary-dim: rgba(0,200,150,0.12)  /* emerald backgrounds */
--border:      rgba(255,255,255,0.08)

/* Semantic */
--shipped:  #00C896   /* green — SHIPPED status */
--slashed:  #EF4444   /* red — SLASHED status */
--open:     #3B82F6   /* blue — OPEN status */
--progress: #F59E0B   /* amber — IN_PROGRESS status */
```

**MagicUI components to use (already in template):**
- `FlickeringGrid` — hero backgrounds, section BGs
- `AuroraText` — main hero headline only
- `Marquee` — quest ticker, social proof
- `BorderBeam` — card hover states, active elements
- `AnimatedGradientText` — badges, labels
- `NumberTicker` — all stat counters
- `BlurFade` — section reveal animations
- `OrbitingCircles` — decorative PROOF Score visualization

**Do NOT install additional animation libraries.**

---

## 5. QUEST LIFECYCLE (display in UI)

```
OPEN (🔵) → IN_PROGRESS (🟡) → SHIPPED (🟢)
                              → SLASHED (🔴)
```

| Status | Color | Description |
|---|---|---|
| OPEN | `#3B82F6` | Stake locked, awaiting proof submission |
| IN_PROGRESS | `#F59E0B` | Proof submitted, oracle validating |
| SHIPPED | `#00C896` | Oracle score ≥ 70, stake returned |
| SLASHED | `#EF4444` | Deadline missed or score < 70 |

---

## 6. PROOF SCORE (display formula in UI)

```
base         = (quests_shipped / quests_total) × 60     // delivery rate
speed        = avg_early_delivery_days × 2              // ship early bonus
stake_weight = log10(total_staked_lifetime_SOL) × 5    // skin in the game
streak       = streak_current × 1                       // consistency

PROOF Score  = min(100, base + speed + stake_weight + streak)
```

Score events:
- SHIPPED on time → formula recompute
- SHIPPED early → speed bonus
- SLASHED → −15 pts (floor: 0)
- Inactivity >90 days → −1 pt/week (floor: 10)

---

## 7. ON-CHAIN DATA STRUCTURES (for UI mapping)

```typescript
// QuestAccount — primary entity
{
  builder: PublicKey
  mode: 'GrantGuard' | 'SelfStake'
  title: string           // max 64 chars
  description: string     // max 512 chars
  stakeAmount: BN         // lamports → display as SOL
  deadline: BN            // unix timestamp
  status: 'OPEN' | 'IN_PROGRESS' | 'SHIPPED' | 'SLASHED'
  proofUrl: string | null
  proofType: 'GitHubCommit' | 'CIPass' | 'VercelDeployment' | null
  slashDestination: PublicKey
  grantTranche: BN | null  // GrantGuard only
  createdAt: BN
  resolvedAt: BN | null
}

// BuilderProfile — reputation
{
  builder: PublicKey
  proofScore: number       // 0–100
  questsTotal: number
  questsShipped: number
  questsSlashed: number
  totalStakedLifetime: BN
  streakCurrent: number
  streakBest: number
  joinedAt: BN
}

// GrantProgram — B2B foundation program
{
  foundation: PublicKey
  name: string
  slashRule: 'Escrow' | 'Burn'
  active: boolean
  totalDisbursed: BN
  totalSlashed: BN
  questCount: number
}
```

---

## 8. PAGES TO BUILD

### Phase 2 — Landing Page (`/`)

Public. No wallet required. Conversion-focused.

**Sections (in order):**

#### Header/Navbar
- Logo: `//` mark + "SHIPSTAKE" wordmark in Space Grotesk bold
- Nav links: "How It Works" | "Leaderboard" | "Docs →" (external)
- Right side: "Explore Quests" (ghost) + "Connect Wallet" (Privy, emerald)
- Sticky with glassmorphism on scroll (`backdrop-blur-md bg-background/80`)
- Mobile: hamburger menu

#### Hero
- Background: `FlickeringGrid` with emerald tint (`color="#00C896" maxOpacity={0.15}`)
- Above headline: `AnimatedGradientText` badge → "Accountability Protocol on Solana"
- Headline: `AuroraText` → **"Stake your reputation. Ship on-chain."**
- Subheadline (Inter, muted): "Builders lock SOL as a performance bond. A deterministic oracle validates delivery. The smart contract settles automatically."
- CTAs: `"Create a Quest →"` (primary, emerald, large) + `"Explore Quests"` (ghost)
- Stats bar (4 `NumberTicker` counters): Total SOL Staked | Active Quests | Global Ship Rate % | Builders on-chain
- Use mock data: `{ solStaked: 847, activeQuests: 34, shipRate: 89, builders: 127 }`

#### How It Works (3 steps)
- Step 1: **Post your commitment** — "Lock SOL, set your deadline, choose your proof type: GitHub commit, CI pass, or Vercel deployment."
- Step 2: **Build and submit proof** — "Submit your proof URL before the deadline. No extensions. No exceptions. The oracle fetches it automatically."
- Step 3: **Oracle settles automatically** — "Score ≥ 70 = SHIPPED. Your stake is returned. Score < 70 = SLASHED. Stake goes to the fixed destination set at creation."
- Visual: animated vertical timeline with `BorderBeam` on active step
- Show oracle score formula inline (collapsed/expandable)

#### Two Modes
Two cards side by side:

**Grant Guard (B2B)**
- Icon: shield/vault
- Headline: "Protect your grant capital"
- For: Foundations, DAOs, accelerators
- Flow: Foundation creates program → Builder posts matching stake → Oracle resolves → Auto-settlement
- CTA: "Set up a Grant Program →"
- `BorderBeam` on hover

**Self-Stake (B2C)**
- Icon: target/anchor
- Headline: "Build in public with skin in the game"
- For: Individual builders, indie devs, protocol teams
- Flow: Set deadline → Lock SOL → Ship proof → PROOF Score accumulates
- CTA: "Create a Quest →"
- `BorderBeam` on hover

#### PROOF Score Explainer
- Visual formula breakdown (not just text — render each component as a visual bar/card)
- Show mock profile: `{ proofScore: 87, questsShipped: 14, questsTotal: 16, streakCurrent: 5 }`
- Composability callouts: "Queryable by any Solana program" → use cases: Lending | DAO Grants | Job Boards | Token Launches
- Tag badges with `AnimatedGradientText`: "On-chain" | "Non-gameable" | "Composable"

#### Quest Ticker
- `Marquee` scrolling left, two rows
- Mock items: `"0x3f2a...91bc staked 2.5 SOL on 'Launch v2 UI' — ✅ SHIPPED"` + `"0x8d1c...44ef staked 5 SOL on 'Deploy smart contract' — 🔵 OPEN"`
- Show proof type badge (GitHub / CI / Vercel) on each item
- Emerald for SHIPPED, blue for OPEN, red for SLASHED

#### Footer
- Logo + tagline: "Verifiable skin in the game, on-chain."
- Links: Twitter/X | GitHub | Discord
- Legal note: "Not available in US, UK, AU, CA, CN, KP, IR"
- Protocol: "SHIPSTAKE v0.3 | Solana Devnet | Pre-Audit"

---

### Phase 3 — Solana Infrastructure

**Files to CREATE (copy verbatim logic from v0 source at `~/Documents/DEV/active/shipstake-frontend-v0/`):**

```
lib/solana/idl.ts          ← READ ONLY — copy as-is, no modifications
lib/solana/shipstake.ts    ← READ ONLY — copy as-is, no modifications
lib/solana/provider.tsx    ← READ ONLY — copy as-is, no modifications
middleware.ts              ← READ ONLY — copy as-is, no modifications
lib/mock-data.ts           ← Copy from v0, update to match whitepaper v0.3 data shape
```

**Wrap app with SolanaProvider in `src/app/layout.tsx`:**
```tsx
import { SolanaProvider } from "@/lib/solana/provider"
// Add <SolanaProvider> wrapping children
```

**Access Gate (`/app/gate/page.tsx`):**
- Shown when wallet not connected
- Dark screen, FlickeringGrid background
- "Connect your wallet to access SHIPSTAKE" headline
- Privy connect button
- Note: "Access restricted in certain jurisdictions"

---

### Phase 4 — Shared App Components

Build these reusable components before pages:

**`components/quest/quest-card.tsx`**
```
Props: quest (QuestAccount), showBuilder?: boolean
Display:
  - Mode badge: "GRANT GUARD" | "SELF-STAKE" (pill, muted)
  - Status badge: OPEN/IN_PROGRESS/SHIPPED/SLASHED with color
  - Title (Space Grotesk, bold)
  - Builder address (truncated: 0x3f2a...91bc, JetBrains Mono)
  - Stake amount in SOL (large, emerald, JetBrains Mono)
  - Deadline: relative time + absolute date on hover
  - Proof type icon: GitHub / CI / Vercel
  - If SHIPPED/SLASHED: resolution timestamp
  - BorderBeam on hover
  - Click → navigate to /quest/[id]
```

**`components/quest/proof-type-badge.tsx`**
```
Props: type ('GitHubCommit' | 'CIPass' | 'VercelDeployment')
Display: icon + label pill
```

**`components/quest/status-badge.tsx`**
```
Props: status ('OPEN' | 'IN_PROGRESS' | 'SHIPPED' | 'SLASHED')
Display: colored dot + label, uses status color system
```

**`components/builder/proof-score-ring.tsx`**
```
Props: score (0–100), size?: 'sm' | 'md' | 'lg'
Display: circular progress ring, emerald fill, score number center
Animate on mount with CSS transition
```

**`components/builder/builder-card.tsx`**
```
Props: profile (BuilderProfile)
Display: address truncated, PROOF Score ring, quests shipped/total, streak, SOL staked lifetime
```

**`components/ui/sol-amount.tsx`**
```
Props: lamports (BN), size?: 'sm' | 'md' | 'lg'
Display: converts lamports to SOL, JetBrains Mono, emerald color, "SOL" suffix
```

**`components/ui/wallet-address.tsx`**
```
Props: address (string), length?: number
Display: truncated address, JetBrains Mono, copy on click
```

---

### Phase 5 — Core App Pages

#### `/app/explore/page.tsx` — Quest Board
- Requires connected wallet (redirect to /gate if not)
- Header: "Active Quests" + filter controls
- Filters: Mode (All / Grant Guard / Self-Stake) | Status (All / OPEN / IN_PROGRESS / SHIPPED / SLASHED) | Proof Type | Sort (Newest / Stake: High to Low / Deadline: Soonest)
- Grid of `QuestCard` components (3 cols desktop, 2 tablet, 1 mobile)
- When wallet connected: fetch real on-chain quests via `useQuests()` from shipstake.ts
- When loading: skeleton cards
- Empty state: "No quests match your filters" with CTA to create

#### `/app/quest/[id]/page.tsx` — Quest Detail
- Dynamic route, quest PDA as param
- Header: Mode badge + Status badge + Title
- Builder info: `BuilderCard` for quest creator
- Quest details: Description, Stake amount (large), Deadline countdown, Proof type
- Timeline: created → proof submitted → oracle resolved (with timestamps)
- If OPEN: "Submit Proof" button (if connected wallet = builder)
- If IN_PROGRESS: "Oracle validating..." with spinner
- If SHIPPED: Green settlement card (stake returned amount)
- If SLASHED: Red settlement card (slash destination, amount)
- PROOF Score impact: show +/- delta on builder's score
- Share button: Twitter/X deep link with quest summary

#### `/app/builder/[address]/page.tsx` — Builder Profile
- Public profile, no wallet required
- Header: wallet address + PROOF Score ring (large)
- Stats grid: Quests Shipped | Quests Slashed | Current Streak | Best Streak | Total SOL Staked
- PROOF Score formula breakdown (show their actual numbers in formula)
- Quest history: filterable table of all their quests
- Grant programs participated in (Grant Guard mode)

---

### Phase 6 — Action Pages

#### `/app/quest/create/page.tsx` — Create Quest
- Requires connected wallet
- Step indicator: 1. Mode → 2. Details → 3. Proof → 4. Stake → 5. Confirm

**Step 1 — Choose Mode**
- Two large cards: Grant Guard | Self-Stake
- Grant Guard: requires program selection dropdown (fetch active GrantPrograms)
- Self-Stake: no additional config

**Step 2 — Quest Details**
- Title input (max 64 chars, live counter)
- Description textarea (max 512 chars, live counter)
- Deadline picker (date + time, no past dates)

**Step 3 — Proof Type**
- Three options with explanation:
  - GitHub Commit: "Commit must be authored by your wallet's linked address"
  - CI Pass: "GitHub Actions workflow run must succeed before deadline"
  - Vercel Deployment: "Production deployment must be READY before deadline"
- If Grant Guard: proof type set by program (display only)

**Step 4 — Stake Amount**
- SOL input with slider (min: from ProtocolConfig, max: wallet balance)
- If Grant Guard: show grant tranche amount, "You stake [X] SOL to unlock [Y] SOL grant"
- PROOF Score impact preview: "This quest will affect your score by..."
- Slash destination info (fixed, show where stake goes if SLASHED)

**Step 5 — Confirm & Sign**
- Summary of all inputs
- Estimated transaction fee
- Warning: "This commitment is binding. No extensions. No exceptions."
- "Create Quest" button → calls `createQuest()` from shipstake.ts
- Loading state → success state with link to quest detail

#### `/app/quest/[id]/submit-proof/page.tsx` — Submit Proof
- Only accessible to quest builder before deadline
- Proof URL input with format guidance per proof type
- Validation: URL format check client-side
- Submit → calls `submitProof()` from shipstake.ts
- Confirmation: "Oracle will validate within 5 minutes"

#### `/app/portfolio/page.tsx` — My Quests
- Requires connected wallet
- Shows connected wallet's quests only
- Tabs: Active | Completed | All
- Active: OPEN + IN_PROGRESS quests with countdown timers
- Completed: SHIPPED + SLASHED with settlement details
- "Claim Stake" button on SHIPPED quests where `builder_claimed = false`
- Calls `claimStake()` from shipstake.ts
- PROOF Score summary at top

#### `/app/leaderboard/page.tsx` — Leaderboard
- Public, no wallet required
- Rankings by PROOF Score (top 100)
- Table: Rank | Builder | PROOF Score | Ship Rate | Total Staked | Streak
- `BuilderCard` on hover/click
- Refresh button + "Last updated: X seconds ago"

---

### Phase 7 — Polish

- **Loading states**: Skeleton components for all data-fetching states
- **Error boundaries**: Graceful errors with retry buttons
- **Empty states**: Illustrations + CTAs for empty quest boards, new builders
- **Toast notifications**: `sonner` for tx success/failure, proof submitted, etc.
- **OG Image**: `/app/opengraph-image.tsx` — dark card with SHIPSTAKE branding + stats
- **Sitemap**: `/app/sitemap.ts` — public pages only
- **Responsive**: All pages mobile-first, test at 375px, 768px, 1280px, 1440px
- **Accessibility**: ARIA labels on all interactive elements, keyboard navigation
- **Performance**: Image optimization, lazy load below-fold components

---

## 9. MOCK DATA STRUCTURE

Use this when wallet is disconnected or on-chain data unavailable:

```typescript
// lib/mock-data.ts

export const mockStats = {
  solStaked: 847.3,
  activeQuests: 34,
  shipRate: 89,
  builders: 127,
  totalQuests: 312,
}

export const mockQuests = [
  {
    id: "mock-1",
    builder: "3f2aK9mPvXn...91bc",
    mode: "SelfStake",
    title: "Launch SHIPSTAKE v2 UI",
    description: "Complete migration from v0 to MagicUI template with all 5 core views functional on devnet.",
    stakeAmount: 2.5,   // SOL
    deadline: Date.now() + 5 * 24 * 60 * 60 * 1000,  // 5 days
    status: "OPEN",
    proofType: "VercelDeployment",
    proofUrl: null,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    resolvedAt: null,
  },
  {
    id: "mock-2",
    builder: "8d1cR4nQwYz...44ef",
    mode: "GrantGuard",
    title: "Deploy Anchor smart contract to mainnet",
    description: "Complete audit findings, deploy to mainnet, verify all instructions.",
    stakeAmount: 5.0,
    deadline: Date.now() + 14 * 24 * 60 * 60 * 1000,
    status: "IN_PROGRESS",
    proofType: "CIPass",
    proofUrl: "https://github.com/builder/repo/actions/runs/12345",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    resolvedAt: null,
  },
  {
    id: "mock-3",
    builder: "7c9bL2mHnKp...33ad",
    mode: "SelfStake",
    title: "Ship oracle validation service",
    description: "Node.js worker on Railway, GitHub + CI + Vercel proof validation, logging.",
    stakeAmount: 1.0,
    deadline: Date.now() - 1 * 24 * 60 * 60 * 1000,
    status: "SHIPPED",
    proofType: "GitHubCommit",
    proofUrl: "https://github.com/builder/oracle/commit/abc123",
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    resolvedAt: Date.now() - 12 * 60 * 60 * 1000,
  },
]

export const mockBuilderProfile = {
  address: "3f2aK9mPvXn...91bc",
  proofScore: 87,
  questsTotal: 16,
  questsShipped: 14,
  questsSlashed: 2,
  totalStakedLifetime: 47.5,
  streakCurrent: 5,
  streakBest: 8,
  joinedAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
}

export const mockLeaderboard = [
  { rank: 1, address: "7c9bL2m...33ad", proofScore: 94, shipRate: 96, totalStaked: 124.5, streak: 12 },
  { rank: 2, address: "3f2aK9m...91bc", proofScore: 87, shipRate: 87, totalStaked: 47.5, streak: 5 },
  { rank: 3, address: "8d1cR4n...44ef", proofScore: 81, shipRate: 85, totalStaked: 89.0, streak: 3 },
]
```

---

## 10. COMPONENT PATTERNS

**Data fetching pattern (real vs mock):**
```tsx
const { connected, publicKey } = usePrivyWallet()  // from lib/solana/shipstake.ts

const quests = connected
  ? useQuests()        // real on-chain via shipstake.ts hooks
  : mockQuests         // fallback

if (loading) return <QuestSkeleton />
if (error) return <ErrorState onRetry={refetch} />
```

**SOL display pattern:**
```tsx
// Always convert lamports to SOL for display
const solAmount = lamports.toNumber() / 1e9
// Format: "2.500 SOL" — always 3 decimal places
const formatted = `${solAmount.toFixed(3)} SOL`
```

**Address display pattern:**
```tsx
// Truncate: first 4 + last 4 chars
const truncate = (addr: string) => `${addr.slice(0,4)}...${addr.slice(-4)}`
// Always use JetBrains Mono font class
```

**Status color pattern:**
```tsx
const statusColors = {
  OPEN: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  IN_PROGRESS: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  SHIPPED: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  SLASHED: "text-red-400 bg-red-400/10 border-red-400/20",
}
```

---

## 11. VERIFICATION CHECKLIST

After each phase, verify:

- [ ] `pnpm build` passes with zero TypeScript errors
- [ ] `pnpm dev` runs without SSR errors
- [ ] No references to: bet, betting, gamble, odds, prediction market, positions
- [ ] `lib/solana/idl.ts` unchanged (git diff)
- [ ] `lib/solana/shipstake.ts` unchanged (git diff)
- [ ] `lib/solana/provider.tsx` unchanged (git diff — Privy appId intact)
- [ ] `middleware.ts` unchanged (git diff — geo-blocking intact)
- [ ] Emerald `#00C896` used consistently for all primary CTAs
- [ ] Status colors correct (blue/amber/emerald/red)
- [ ] Mock data shown when wallet disconnected
- [ ] Mobile layout works at 375px

---

## 12. GEOBLOCKING (middleware.ts)

The middleware blocks: **US, UK, AU, CA, CN, KP, IR**

Exception: FR B2B whitelist for institutional DAO use.

This logic is implemented in `middleware.ts` — do not modify. The gate page at `/gate` handles blocked users with appropriate messaging.

---

## 13. IMPORTANT NOTES

1. **Privy, not wallet-adapter.** All wallet connections go through `@privy-io/react-auth`. Never use `@solana/wallet-adapter-react`.

2. **No LST in MVP.** Only native SOL. Never suggest mSOL, jitoSOL, or any liquid staking token.

3. **No external participant positions.** There is no "take position" flow. No "claim settlement" for non-builders. Remove any such UI if present in template.

4. **Oracle is deterministic.** Never describe the oracle as AI-powered or using judgment. It is a deterministic proof checker.

5. **Settlement is automatic.** Never imply manual review, admin approval, or human judgment in the settlement flow.

6. **Slash destination frozen at creation.** Never show UI that implies the slash destination can be changed after quest creation.

7. **PROOF Score is on-chain.** Never describe it as self-reported, purchased, or transferable.
