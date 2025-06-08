import Link from "next/link"
import { ArrowRight, Building, Home, Shield, Coins, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import HeroSection from "@/components/hero-section"
import PropertyShowcase from "@/components/property-showcase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex flex-col items-center space-y-4 text-center md:max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Maximize Your Property's Potential
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Turn vacant periods into profit opportunities while helping those in need of short-term housing.
            </p>
          </div>

          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-primary" />}
              title="Passive Income"
              description="Generate revenue from your property during periods that would otherwise be vacant."
            />
            <FeatureCard
              icon={<Home className="h-10 w-10 text-primary" />}
              title="Emergency Housing"
              description="Provide access to housing for those in need of short-term or emergency accommodation."
            />
            <FeatureCard
              icon={<Building className="h-10 w-10 text-primary" />}
              title="Tax Offset"
              description="Help offset the cost of your property taxes through additional rental income."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Privacy Protected"
              description="Keep your identity anonymous and your information private with our secure platform."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Flexible Scheduling"
              description="List your property only when it's convenient for you between long-term renters."
            />
            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 text-primary" />}
              title="Property Appreciation"
              description="Earn based on property appreciation with our innovative yield model."
            />
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24">
          <div className="container">
            <div className="mx-auto flex flex-col items-center space-y-4 text-center md:max-w-3xl mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Properties</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover some of the properties currently available on our platform.
              </p>
            </div>

            <PropertyShowcase />

            <div className="flex justify-center mt-12">
              <Button asChild size="lg">
                <Link href="/properties">
                  View All Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="mx-auto grid gap-6 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powered by Solana Blockchain
              </h2>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                CardBoard leverages Solana's blockchain technology to provide secure, transparent, and efficient
                property rental transactions with minimal fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild size="lg">
                  <Link href="/dashboard">List Your Property</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/blockchain-real-estate-network.png"
                alt="Blockchain-powered real estate platform"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
