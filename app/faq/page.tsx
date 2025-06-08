import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Find answers to the most common questions about Border and our services.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-border">
              <AccordionTrigger className="text-lg font-medium">What is Border?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Border is a blockchain-powered property rental platform that connects property owners with individuals
                looking for short-term accommodations. Our platform uses Solana blockchain technology to ensure secure,
                transparent transactions with minimal fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-border-works">
              <AccordionTrigger className="text-lg font-medium">How does Border work?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Property owners can list their properties during periods when they would otherwise be vacant. Renters
                can browse available properties and book them through our platform. All transactions are secured through
                the Solana blockchain, ensuring fast, secure payments with minimal fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="blockchain-benefits">
              <AccordionTrigger className="text-lg font-medium">
                What are the benefits of using blockchain?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Blockchain technology provides several benefits: enhanced security for transactions, reduced fees
                compared to traditional payment processors, faster payment processing, and increased transparency while
                maintaining privacy for both parties.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">For Property Owners</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-to-list">
              <AccordionTrigger className="text-lg font-medium">How do I list my property?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                To list your property, create an account and navigate to the Dashboard. Click on "Add Property" and
                follow the step-by-step instructions to complete your listing. You'll need to provide details about your
                property, set availability dates, and upload photos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="listing-fees">
              <AccordionTrigger className="text-lg font-medium">What fees does Border charge?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Border charges a 3% service fee to property owners for each booking. This fee covers payment processing,
                platform maintenance, and customer support. There are no upfront costs or monthly fees to list your
                property.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment-process">
              <AccordionTrigger className="text-lg font-medium">How do I get paid?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Payments are processed through the Solana blockchain. You'll need to connect a compatible wallet to
                receive payments. Funds are released to your wallet 24 hours after guest check-in to ensure everything
                is satisfactory.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">For Renters</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-to-book">
              <AccordionTrigger className="text-lg font-medium">How do I book a property?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Browse available properties on our platform, select your desired dates, and click "Reserve." You'll need
                to connect a Solana wallet to complete the payment process. Once your booking is confirmed, you'll
                receive all the necessary details for your stay.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancellation">
              <AccordionTrigger className="text-lg font-medium">What is the cancellation policy?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Cancellation policies vary by property. Each listing clearly displays the specific cancellation terms.
                In general, cancellations made 48 hours before check-in are eligible for a full refund. Always check the
                specific policy for your booking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="wallet-setup">
              <AccordionTrigger className="text-lg font-medium">How do I set up a wallet?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                To use Border, you'll need a Solana-compatible wallet like Phantom or Solflare. Visit our "Connect
                Wallet" page for step-by-step instructions on setting up a wallet and connecting it to our platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  )
}
