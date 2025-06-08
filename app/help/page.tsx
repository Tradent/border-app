import { Button } from "@/components/ui/button"

export default function HelpCenterPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Help Center</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">How do I list my property?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To list your property, create an account and navigate to the Dashboard. Click on "Add Property" and
                follow the step-by-step instructions to complete your listing.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">How do payments work?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Border uses secure blockchain technology for all transactions. Payments are processed through our
                platform, and funds are released to property owners after guests check in.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">What if I need to cancel a booking?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our cancellation policy varies depending on the property. Each listing clearly displays the cancellation
                terms. In general, cancellations made 48 hours before check-in are eligible for a full refund.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Contact Support</h2>
          <p className="mb-4">
            Need additional help? Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-burnt-orange hover:bg-mustard text-white">Email Support</Button>
            <Button
              variant="outline"
              className="border-burnt-orange text-burnt-orange hover:bg-burnt-light dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark/30"
            >
              Live Chat
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
