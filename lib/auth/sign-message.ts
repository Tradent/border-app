import type { SignerWalletAdapterProps } from "@solana/wallet-adapter-base"
import bs58 from "bs58"

export async function sign(message: string, signMessage: SignerWalletAdapterProps["signMessage"]): Promise<string> {
  // Convert the message to Uint8Array
  const messageBytes = new TextEncoder().encode(message)

  // Sign the message
  const signature = await signMessage(messageBytes)

  // Convert the signature to a base58 string
  return bs58.encode(signature)
}
