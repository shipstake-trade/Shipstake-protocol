"use client"

import { useMutation } from "@tanstack/react-query"
import { PublicKey } from "@solana/web3.js"
import { buildSubmitProofTx, parseAnchorError } from "@/lib/solana/shipstake"
import { useShipstakeProgram } from "./useShipstakeProgram"

export interface SubmitProofInput {
  questPda: string     // base58
  proofUrl: string
}

/**
 * React Query mutation for submitting proof via the real contract.
 */
export function useSubmitProofReal() {
  const { program, publicKey } = useShipstakeProgram()

  return useMutation({
    mutationFn: async (input: SubmitProofInput) => {
      if (!program || !publicKey) throw new Error("Wallet not connected")

      const questKey = new PublicKey(input.questPda)

      const txBuilder = await buildSubmitProofTx(
        program,
        publicKey,
        questKey,
        input.proofUrl,
      )

      const signature = await txBuilder.rpc()
      return { signature }
    },
    onError: (error) => {
      throw new Error(parseAnchorError(error))
    },
  })
}
