"use client"

import { useCallback, useState, useEffect, useMemo } from "react"
import { PublicKey, Connection, Transaction } from "@solana/web3.js"
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor"
import { usePrivy } from "@privy-io/react-auth"
import { useWallets as useSolanaWallets } from "@privy-io/react-auth/solana"
import { IDL, PROGRAM_ID, type Category, type ProofType, type PositionSide, categoryToAnchor, sideToAnchor, proofTypeToAnchor } from "./idl"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

// ============================================
// SSR SAFETY HOOK
// ============================================

export function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return mounted
}

// ─── PDA helpers ────────────────────────────────────────────────────────────

const PROG = new PublicKey(PROGRAM_ID)

export function getConfigPda(): PublicKey {
  return PublicKey.findProgramAddressSync([Buffer.from("config")], PROG)[0]
}

export function getQuestPda(builder: PublicKey, title: string): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("quest"), builder.toBuffer(), Buffer.from(title)],
    PROG
  )[0]
}

export function getPoolVaultPda(quest: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("pool_vault"), quest.toBuffer()],
    PROG
  )[0]
}

export function getCommitmentPda(quest: PublicKey, supporter: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("commitment"), quest.toBuffer(), supporter.toBuffer()],
    PROG
  )[0]
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL
}

export function solToLamports(sol: number): number {
  return Math.floor(sol * LAMPORTS_PER_SOL)
}

export function parseAnchorError(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message
    if (msg.includes("BuilderCannotTakePosition")) return "Tu ne peux pas parier sur ta propre quest."
    if (msg.includes("AlreadyHasPosition")) return "Tu as déjà une position sur cette quest."
    if (msg.includes("PositionsClosed")) return "La fenêtre de positions est fermée."
    if (msg.includes("QuestDeadlinePassed")) return "La deadline de la quest est dépassée."
    if (msg.includes("QuestNotResolved")) return "La quest n'est pas encore résolue."
    if (msg.includes("AlreadyClaimed")) return "Déjà réclamé."
    if (msg.includes("WrongDirection")) return "Mauvaise direction pour ce résultat."
    if (msg.includes("StakeBelowMinimum")) return "Stake minimum : 0.1 SOL."
    if (msg.includes("PositionBelowMinimum")) return "Position minimum : 0.01 SOL."
    if (msg.includes("User rejected") || msg.includes("cancelled")) return "Transaction annulée."
    if (msg.includes("0x1") || msg.includes("insufficient")) return "SOL insuffisant. Besoin de SOL devnet."
    return msg
  }
  return "Erreur inconnue."
}

// ============================================
// TX STATUS HOOK
// ============================================

interface TxStatus {
  pending: boolean
  signature: string | null
  error: string | null
  success: boolean
}

export function useTxStatus() {
  const [status, setStatus] = useState<TxStatus>({
    pending: false,
    signature: null,
    error: null,
    success: false,
  })

  const reset = useCallback(() => {
    setStatus({ pending: false, signature: null, error: null, success: false })
  }, [])

  const setPending = useCallback(() => {
    setStatus({ pending: true, signature: null, error: null, success: false })
  }, [])

  const setSuccess = useCallback((sig: string) => {
    setStatus({ pending: false, signature: sig, error: null, success: true })
  }, [])

  const setError = useCallback((error: string) => {
    setStatus({ pending: false, signature: null, error, success: false })
  }, [])

  return { status, reset, setPending, setSuccess, setError }
}

// ============================================
// PRIVY WALLET HOOK
// ============================================

export function usePrivyWallet() {
  const mounted = useIsMounted()
  const { ready, authenticated, login, logout } = usePrivy()
  const { wallets } = useSolanaWallets()
  
  // Get the first connected Solana wallet
  const wallet = wallets[0]
  
  const publicKey = useMemo(() => {
    if (!mounted || !wallet?.address) return null
    try {
      return new PublicKey(wallet.address)
    } catch {
      return null
    }
  }, [mounted, wallet?.address])
  
  const connection = useMemo(() => {
    return new Connection("https://api.devnet.solana.com", "confirmed")
  }, [])

  return {
    mounted,
    ready: mounted && ready,
    authenticated,
    connected: mounted && authenticated && !!wallet,
    publicKey,
    wallet,
    connection,
    login,
    logout,
  }
}

// ============================================
// PROGRAM HOOK
// ============================================

export function useProgram() {
  const { mounted, ready, connected, publicKey, wallet, connection } = usePrivyWallet()

  const getProgram = useCallback(async () => {
    if (!mounted || !connected || !publicKey || !wallet) {
      return null
    }

    // Create a wallet adapter compatible with Anchor
    const walletAdapter = {
      publicKey,
      signTransaction: async (tx: Transaction) => {
        const signedTx = await wallet.signTransaction(tx as any)
        return signedTx as any as Transaction
      },
      signAllTransactions: async (txs: Transaction[]) => {
        const signed = await Promise.all(txs.map(tx => wallet.signTransaction(tx as any)))
        return signed as any as Transaction[]
      },
    }

    const provider = new AnchorProvider(
      connection,
      walletAdapter as any,
      { commitment: "confirmed" }
    )

    // Anchor 0.32+ signature: new Program(IDL, provider)
    return new Program(IDL as any, provider)
  }, [connection, wallet, publicKey, mounted, connected])

  return { 
    getProgram, 
    connected, 
    publicKey,
    mounted,
    ready,
  }
}

// ============================================
// CREATE QUEST HOOK
// ============================================

interface CreateQuestParams {
  title: string
  description: string
  category: Category
  stakeSol: number
  deadlineDays: number        // days from now
  positionCloseDays: number   // days from now
}

export function useCreateQuest() {
  const { getProgram, connected, publicKey, mounted } = useProgram()
  const { status, reset, setPending, setSuccess, setError } = useTxStatus()

  const createQuest = useCallback(
    async (params: CreateQuestParams) => {
      const program = await getProgram()
      if (!program || !publicKey) { setError("Wallet not connected"); return null }

      setPending()
      try {
        const now = Math.floor(Date.now() / 1000)
        const deadline = new BN(now + params.deadlineDays * 86400)
        const positionCloseTs = new BN(now + params.positionCloseDays * 86400)
        const stakeAmount = new BN(Math.floor(params.stakeSol * LAMPORTS_PER_SOL))

        const questPda = getQuestPda(publicKey, params.title)
        const poolVaultPda = getPoolVaultPda(questPda)
        const configPda = getConfigPda()

        const tx = await program.methods
          .createQuest(
            params.title,
            params.description,
            deadline,
            positionCloseTs,
            categoryToAnchor(params.category) as any,
            stakeAmount
          )
          .accounts({
            config: configPda,
            quest: questPda,
            poolVault: poolVaultPda,
            builder: publicKey,
          })
          .rpc()

        setSuccess(tx)
        return { signature: tx, questPda: questPda.toBase58() }
      } catch (err) {
        setError(parseAnchorError(err))
        return null
      }
    },
    [getProgram, publicKey, setPending, setSuccess, setError]
  )

  return { createQuest, isPending: status.pending, error: status.error, txSignature: status.signature, isSuccess: status.success, reset, connected, mounted }
}

// ============================================
// TAKE POSITION HOOK
// ============================================

interface TakePositionParams {
  questPda: string
  builderAddress: string   // needed to derive questPda if not provided as PDA
  side: PositionSide       // "SHIP" | "FAIL"
  amount: number           // in SOL
}

export function useTakePosition() {
  const { getProgram, connected, publicKey, mounted } = useProgram()
  const { status, reset, setPending, setSuccess, setError } = useTxStatus()

  const takePosition = useCallback(
    async (params: TakePositionParams) => {
      const program = await getProgram()
      if (!program || !publicKey) { setError("Wallet not connected"); return null }

      setPending()
      try {
        const questKey = new PublicKey(params.questPda)
        const poolVaultPda = getPoolVaultPda(questKey)
        const commitmentPda = getCommitmentPda(questKey, publicKey)
        const configPda = getConfigPda()
        const amount = new BN(Math.floor(params.amount * LAMPORTS_PER_SOL))

        const tx = await program.methods
          .takePosition(sideToAnchor(params.side) as any, amount)
          .accounts({
            config: configPda,
            quest: questKey,
            poolVault: poolVaultPda,
            commitment: commitmentPda,
            supporter: publicKey,
          })
          .rpc()

        setSuccess(tx)
        return { signature: tx }
      } catch (err) {
        setError(parseAnchorError(err))
        return null
      }
    },
    [getProgram, publicKey, setPending, setSuccess, setError]
  )

  return { takePosition, isPending: status.pending, error: status.error, txSignature: status.signature, isSuccess: status.success, reset, connected, mounted }
}

// ============================================
// SUBMIT PROOF HOOK
// ============================================

interface SubmitProofParams {
  questPda: string
  proofUrl: string
  proofType: ProofType
}

export function useSubmitProof() {
  const { getProgram, connected, publicKey, mounted } = useProgram()
  const { status, reset, setPending, setSuccess, setError } = useTxStatus()

  const submitProof = useCallback(
    async (params: SubmitProofParams) => {
      const program = await getProgram()
      if (!program || !publicKey) { setError("Wallet not connected"); return null }

      setPending()
      try {
        const questKey = new PublicKey(params.questPda)

        const tx = await program.methods
          .submitProof(params.proofUrl, proofTypeToAnchor(params.proofType) as any)
          .accounts({
            quest: questKey,
            builder: publicKey,
          })
          .rpc()

        setSuccess(tx)
        return { signature: tx }
      } catch (err) {
        setError(parseAnchorError(err))
        return null
      }
    },
    [getProgram, publicKey, setPending, setSuccess, setError]
  )

  return { submitProof, isPending: status.pending, error: status.error, txSignature: status.signature, isSuccess: status.success, reset, connected, mounted }
}

// ============================================
// CLAIM STAKE HOOK (for builders)
// ============================================

export function useClaimStake() {
  const { getProgram, connected, publicKey, mounted } = useProgram()
  const { status, reset, setPending, setSuccess, setError } = useTxStatus()

  const claimStake = useCallback(
    async ({ questPda }: { questPda: string }) => {
      const program = await getProgram()
      if (!program || !publicKey) { setError("Wallet not connected"); return null }

      setPending()
      try {
        const questKey = new PublicKey(questPda)
        const poolVaultPda = getPoolVaultPda(questKey)
        const configPda = getConfigPda()

        const tx = await program.methods
          .claimStake()
          .accounts({
            config: configPda,
            quest: questKey,
            poolVault: poolVaultPda,
            builder: publicKey,
          })
          .rpc()

        setSuccess(tx)
        return { signature: tx }
      } catch (err) {
        setError(parseAnchorError(err))
        return null
      }
    },
    [getProgram, publicKey, setPending, setSuccess, setError]
  )

  return { claimStake, isPending: status.pending, error: status.error, txSignature: status.signature, isSuccess: status.success, reset, connected, mounted }
}

// ============================================
// CLAIM SETTLEMENT HOOK (for scouts/bettors)
// ============================================

export function useClaimSettlement() {
  const { getProgram, connected, publicKey, mounted } = useProgram()
  const { status, reset, setPending, setSuccess, setError } = useTxStatus()

  const claim = useCallback(
    async (questPda: string) => {
      const program = await getProgram()
      if (!program || !publicKey) { setError("Wallet not connected"); return null }

      setPending()
      try {
        const questKey = new PublicKey(questPda)
        const poolVaultPda = getPoolVaultPda(questKey)
        const commitmentPda = getCommitmentPda(questKey, publicKey)
        const configPda = getConfigPda()

        const tx = await program.methods
          .claimSettlement()
          .accounts({
            config: configPda,
            quest: questKey,
            poolVault: poolVaultPda,
            commitment: commitmentPda,
            supporter: publicKey,
          })
          .rpc()

        setSuccess(tx)
        return { signature: tx }
      } catch (err) {
        setError(parseAnchorError(err))
        return null
      }
    },
    [getProgram, publicKey, setPending, setSuccess, setError]
  )

  return { claim, isPending: status.pending, error: status.error, txSignature: status.signature, isSuccess: status.success, reset, connected, mounted }
}

// ============================================
// FETCH USER POSITIONS (placeholder)
// ============================================

export function useUserPositions() {
  const { publicKey, mounted } = useProgram()
  const [positions, setPositions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!mounted || !publicKey) {
      setLoading(false)
      return
    }

    setPositions([])
    setLoading(false)
  }, [publicKey, mounted])

  return { positions, loading, mounted }
}
