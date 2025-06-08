import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./wallet-adapter.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/wallet/wallet-provider"
import { DemoProvider } from "@/lib/demo/demo-context"
import { NotificationsProvider } from "@/lib/notifications/notifications-context"
import { MessagesProvider } from "@/lib/messages/messages-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CardBoard - Blockchain-Powered Real Estate Platform",
  description: "Discover and invest in real estate properties using blockchain technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DemoProvider>
            <WalletProvider>
              <NotificationsProvider>
                <MessagesProvider>{children}</MessagesProvider>
              </NotificationsProvider>
            </WalletProvider>
          </DemoProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
