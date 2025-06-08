export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: April 13, 2025</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Introduction</h2>
          <p>
            Border ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you have
            read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Information We Collect</h2>
          <p>We may collect information about you in various ways, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, billing address, and payment
              details when you register for an account or list a property.
            </li>
            <li>
              <strong>Property Information:</strong> Details about properties you list, including address, photos,
              amenities, and availability.
            </li>
            <li>
              <strong>Transaction Information:</strong> Records of bookings, payments, and communications between hosts
              and guests.
            </li>
            <li>
              <strong>Usage Information:</strong> How you interact with our platform, including pages visited, features
              used, and time spent.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type, operating system, and other technical
              details.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining our services</li>
            <li>Processing transactions and sending related information</li>
            <li>Responding to your inquiries and support requests</li>
            <li>Improving our platform and user experience</li>
            <li>Sending you marketing communications (with your consent)</li>
            <li>Ensuring compliance with our terms and policies</li>
            <li>Protecting against fraudulent or illegal activity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-burnt-orange dark:text-mustard">Blockchain Technology</h2>
          <p>
            Border utilizes blockchain technology for certain aspects of our service. Information stored on the
            blockchain is inherently immutable and transparent. We take precautions to ensure that personal information
            is not directly stored on the blockchain, but transaction hashes and smart contract interactions may be
            publicly visible.
          </p>
        </section>
      </div>
    </div>
  )
}
