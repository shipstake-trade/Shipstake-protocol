"use client"

import { useMutation } from "@tanstack/react-query"
import { PublicKey } from "@solana/web3.js"
import { buildClaimStakeTx, parseAnchorError } from "@/lib/solana/shipstake"
import { useShipstakeProgram } from "./useShipstakeProgram"

export interface ClaimStakeInput {
  questPda: string  // base58
}

/**
 * React Query mutation for claiming stake via the real contract.
 */
export function useClaimStakeReal() {
  const { program, publicKey } = useShipstakeProgram()

  return useMutation({
    mutationFn: async (input: ClaimStakeInput) => {
      if (!program || !publicKey) throw new Error("Wallet not connected")

      const questKey = new PublicKey(input.questPda)

      const txBuilder = await buildClaimStakeTx(
        program,
        publicKey,
        questKey,
      )

      const signature = await txBuilder.rpc()
      return { signature }
    },
    onError: (error) => {
      throw new Error(parseAnchorError(error))
    },
  })
}
