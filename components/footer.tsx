import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Map } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t dark:border-gray-800">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-burnt-orange dark:text-mustard" />
            <h3 className="text-lg font-bold">Border</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Unlock your property's potential with blockchain-powered rentals.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/properties"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                Browse Properties
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                List Your Property
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/connect-wallet"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                Connect Wallet
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/help"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:underline text-gray-500 dark:text-gray-400 hover:text-burnt-orange dark:hover:text-mustard"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Subscribe</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Stay updated with the latest properties and features.
          </p>
          <div className="flex space-x-2">
            <Input type="email" placeholder="Your email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t dark:border-gray-800">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Border. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
