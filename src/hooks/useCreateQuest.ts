"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PublicKey } from "@solana/web3.js"
import { BN } from "@coral-xyz/anchor"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import {
  buildCreateQuestTx,
  fetchBuilderProfile,
  getQuestPdaByNonce,
  parseAnchorError,
} from "@/lib/solana/shipstake"
import { useShipstakeProgram } from "./useShipstakeProgram"

export interface CreateQuestInput {
  title: string
  description: string
  deadlineDays: number
  slashDestination: string        // base58 pubkey
  stakeSol: number
  repoOwner: string
  repoName: string
}

/**
 * React Query mutation for creating a quest via the real contract.
 * Automatically fetches the builder profile to get the next nonce.
 */
export function useCreateQuestReal() {
  const { program, publicKey } = useShipstakeProgram()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateQuestInput) => {
      if (!program || !publicKey) throw new Error("Wallet not connected")

      // Fetch builder profile to get next nonce
      const profile = await fetchBuilderProfile(program, publicKey)
      const nonce = new BN(profile?.questNonce ?? 0)

      const now = Math.floor(Date.now() / 1000)
      const deadline = new BN(now + input.deadlineDays * 86400)
      const stakeAmount = new BN(Math.floor(input.stakeSol * LAMPORTS_PER_SOL))

      const txBuilder = await buildCreateQuestTx(program, publicKey, {
        nonce,
        title: input.title,
        description: input.description,
        deadline,
        slashDestination: new PublicKey(input.slashDestination),
        stakeAmount,
        repoOwner: input.repoOwner,
        repoName: input.repoName,
      })

      const signature = await txBuilder.rpc()
      const questPda = getQuestPdaByNonce(publicKey, nonce)

      return { signature, questPda: questPda.toBase58() }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builderProfile"] })
    },
    onError: (error) => {
      throw new Error(parseAnchorError(error))
    },
  })
}
