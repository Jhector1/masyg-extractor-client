
import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <h2 className="text-xl font-semibold mb-2">Masyg PDF Extractor</h2>
      <p className="italic mb-6">Effective Date: 12/27/2024</p>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Welcome to Masyg Extractor</h3>
        <p className="mb-4">
          These Terms of Use ("Terms") govern your access to and use of Masyg PDF Extractor (the "App"). By
          accessing or using the App, you agree to comply with and be bound by these Terms. If you do not agree
          with these Terms, please refrain from using the App.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. Eligibility</h3>
        <ul className="list-disc ml-6">
          <li>Be at least 18 years of age or have the legal capacity to form a binding contract in your jurisdiction.</li>
          <li>Agree to comply with all applicable laws and regulations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2. Use of the App</h3>
        <div className="mb-4">
          <strong>Account Creation</strong>
          <p>
            You must create an account using Google OAuth2 Firebase to access the App’s features. By creating an
            account, you agree to provide accurate and complete information.
          </p>
        </div>
        <div className="mb-4">
          <strong>Permitted Use</strong>
          <p>
            You may use the App solely for lawful purposes and in compliance with these Terms. Any misuse of the App,
            including reverse engineering or reselling, is strictly prohibited.
          </p>
        </div>
        <div>
          <strong>Uploaded Content</strong>
          <p>
            You retain ownership of any files or text uploaded to the App for processing. By uploading, you grant us a
            temporary, limited right to process the content solely for the purpose of providing the requested services.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3. Payment and Subscription</h3>
        <div className="mb-4">
          <strong>Subscription Management</strong>
          <p>
            Subscriptions are managed through Stripe. By subscribing, you agree to Stripe’s Terms and Conditions and
            authorize us to charge your payment method.
          </p>
        </div>
        <div className="mb-4">
          <strong>Pricing Policy</strong>
          <p>
            The prices and features of our subscription plans are detailed within the App. We reserve the right to
            modify pricing with prior notice to subscribers.
          </p>
        </div>
        <div>
          <strong>Refunds</strong>
          <p>Refunds are provided solely at our discretion in accordance with our <Link style={{textDecoration:'underline'}} to={'/refund-policy'}>refund policy.</Link></p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">4. Privacy Policy</h3>
        <p>
          Your use of the App is also governed by our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>,
          which details how we collect, use, and protect your personal data.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">5. Intellectual Property</h3>
        <p>
          All intellectual property rights in the App, including software, content, and branding, belong to Masyg Extractor.
          Unauthorized reproduction or distribution of the App is prohibited.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">6. Disclaimer of Warranties</h3>
        <p>
          The App is provided "as is" and "as available," without warranties of any kind. We do not guarantee uninterrupted
          or error-free access to the App.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">7. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, Masyg Extractor shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of the App.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">8. Termination</h3>
        <p>
          We reserve the right to terminate or suspend your access to the App without prior notice for violations of these
          Terms or for any other reason deemed necessary.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">9. Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, without
          regard to its conflict of laws principles.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">10. Contact Us</h3>
        <p>Email: support@masyglink.com</p>
        <p>Phone: 773-690-7299</p>
      </section>
    </div>
  );
};

export default TermsOfUse;


