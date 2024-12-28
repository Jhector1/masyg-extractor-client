
import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Money-Back Guarantee</h2>
        <p className="mb-4">
          We are committed to customer satisfaction and offer a 7-day money-back guarantee. If you are not completely satisfied
          with the service within 7 days of purchase, you may request a full refund. No questions asked.
        </p>
        <p className="mb-4">
          After the 7-day period, the subscription price is <strong>$30.95 + applicable taxes</strong>, with auto-renewal enabled.
          Billing occurs every 4 weeks. You may cancel your subscription at any time to prevent further charges.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How to Request a Refund</h2>
        <p className="mb-4">
          To request a refund or for assistance with cancellation, please contact our support team through one of the following methods:
        </p>
        <ul className="list-disc ml-6">
          <li>Email: <a href="mailto:support@masyglink.com" className="text-blue-600 underline">support@masyglink.com</a></li>
          <li>Phone: <a href="tel:+17736907299" className="text-blue-600 underline">+1 (773) 690-7299</a></li>
        </ul>
        <p className="mt-4">
          Please include your account details and a brief explanation of your request to expedite processing. Refunds typically
          take 3-5 business days to process once approved.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cancellation Policy</h2>
        <p className="mb-4">
          You have the right to cancel your subscription at any time. To avoid being charged for the next billing cycle, cancellations
          must be made before your current subscription period ends. Upon cancellation, you will retain access to the service
          until the end of your billing period.
        </p>
        <p className="mb-4">
          Note: Refunds will not be issued for partial subscription periods beyond the 7-day money-back guarantee window.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
        <p className="mb-4">
          The subscription price of $35.95 is subject to applicable taxes based on your location. Auto-renewal ensures uninterrupted
          access to our services, but you can disable auto-renewal at any time in your account settings.
        </p>
        <p>
          If you have any questions about our refund or cancellation policies, please do not hesitate to reach out to our support
          team for assistance.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          For further inquiries, please contact:
        </p>
        <ul className="list-disc ml-6">
          <li>Email: <a href="mailto:support@masyglink.com" className="text-blue-600 underline">support@masyglink.com</a></li>
          <li>Phone: <a href="tel:+17736907299" className="text-blue-600 underline">+1 (773) 690-7299</a></li>
        </ul>
      </section>
    </div>
  );
};

export default RefundPolicy;


