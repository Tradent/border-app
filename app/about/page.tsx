import { ArrowRight, Building, Coins, Lock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About CardBoard</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Revolutionizing property rentals with blockchain technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            CardBoard was founded with a simple mission: to help property owners maximize their returns during interim
            periods while providing affordable short-term housing solutions for those in need.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            We believe that by leveraging blockchain technology, we can create a more transparent, secure, and efficient
            rental marketplace that benefits both property owners and renters.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img src="/blockchain-real-estate-network.png" alt="CardBoard mission" className="w-full h-auto" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">List Your Property</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create a listing for your property during periods when it would otherwise be vacant. Set your own
              availability and pricing.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Connect with Renters</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our platform matches your property with individuals looking for short-term accommodations. All
              transactions are secured through Solana blockchain.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Coins className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Earn Passive Income</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate revenue during periods that would otherwise be vacant. Payments are processed instantly with
              minimal fees.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Why Choose CardBoard?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Privacy Protected</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep your identity anonymous and your information private. Our platform uses advanced encryption and
                blockchain technology to protect your data.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All payments are processed through Solana blockchain, ensuring fast, secure, and transparent
                transactions with minimal fees.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Property Appreciation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our unique yield model allows property owners to benefit from appreciation during interim occupancy
                periods.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Coins className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Tax Benefits</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Offset the cost of your property taxes through additional rental income. Our platform provides detailed
                reports for tax purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of property owners who are already maximizing their returns with CardBoard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">List Your Property</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
