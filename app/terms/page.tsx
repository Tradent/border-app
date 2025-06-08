export default function TermsOfServicePage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Terms of Service</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: April 13, 2025</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you and Border regarding
            your access to and use of the Border website, mobile application, and related services (collectively, the
            "Platform").
          </p>
          <p>
            By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these
            Terms, you may not access or use the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Eligibility</h2>
          <p>
            You must be at least 18 years old and able to form legally binding contracts to access and use our Platform.
            By using our Platform, you represent and warrant that you meet these requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Account Registration</h2>
          <p>
            To access certain features of our Platform, you must register for an account. You agree to provide accurate,
            current, and complete information during the registration process and to update such information to keep it
            accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">
            Listing and Booking Properties
          </h2>
          <p>
            <strong>For Hosts:</strong> When listing a property, you agree to provide complete and accurate information
            about the property, including its location, features, availability, and any rules or restrictions. You
            represent and warrant that you have the right to list the property and that the listing does not violate any
            agreements with third parties.
          </p>
          <p>
            <strong>For Guests:</strong> When booking a property, you agree to respect the property and comply with any
            rules set by the host. You are responsible for your conduct during your stay and for any damage caused to
            the property.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Blockchain Transactions</h2>
          <p>
            Our Platform utilizes blockchain technology for certain transactions. You acknowledge that blockchain
            transactions are irreversible and that Border is not responsible for any errors or losses resulting from
            incorrect wallet addresses or other user errors.
          </p>
        </section>
      </div>
    </div>
  )
}
