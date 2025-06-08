import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

// You can change this to 'mainnet-beta' for production
export const network = WalletAdapterNetwork.Devnet

// RPC endpoint for the selected network
export const endpoint = clusterApiUrl(network)

// Get all supported wallet adapters
export const getWallets = () => {
  return [new PhantomWalletAdapter({ network }), new SolflareWalletAdapter({ network })]
}
