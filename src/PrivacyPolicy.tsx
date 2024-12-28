const PrivacyPolicy = () => {
    return (
      <div className="privacy-policy max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-4">
          <strong>Effective Date:</strong> 12/27/2024
        </p>
  
        <p className="text-gray-700 leading-relaxed mb-8">
          Welcome to <strong>Masyg Extractor</strong> (the "App"). This Privacy Policy explains how we collect, use, and protect your information when you use our services, including Google OAuth2 Firebase for user authentication and Stripe for subscription management. By using the App, you agree to the practices described in this Privacy Policy.
        </p>
  
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">a. Account Information</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-6">
          <li>When you sign in using Google OAuth2 Firebase, we collect:</li>
          <ul className="list-circle pl-8">
            <li>Your name</li>
            <li>Email address</li>
            <li>Profile picture (if available)</li>
          </ul>
          <li>This information is used solely for account creation and authentication.</li>
        </ul>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">b. Subscription and Payment Information</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-6">
          <li>When you subscribe to our services using Stripe, we may collect:</li>
          <ul className="list-circle pl-8">
            <li>Payment details (e.g., credit/debit card information)</li>
            <li>Billing address</li>
            <li>Subscription status (active, trial, canceled, etc.)</li>
          </ul>
          <li>All payment details are processed securely by Stripe and are not stored on our servers.</li>
        </ul>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">c. Usage Data</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-6">
          <li>Technical information about your device, including:</li>
          <ul className="list-circle pl-8">
            <li>Device type, operating system, and browser type</li>
            <li>IP address</li>
            <li>App interactions and usage patterns</li>
          </ul>
        </ul>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">d. Uploaded Data</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-8">
          <li>Any text or files uploaded for keyword extraction are processed securely and are not permanently stored or shared.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-8 text-gray-600 mb-8">
          <li>To authenticate users through Google OAuth2 Firebase.</li>
          <li>To manage subscriptions, free trials, and payments via Stripe.</li>
          <li>To provide, maintain, and improve the App’s features and services.</li>
          <li>To monitor usage trends and enhance user experience.</li>
          <li>To send account-related notifications (e.g., subscription status, billing reminders).</li>
          <li>To comply with legal and regulatory requirements.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">a. Service Providers</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-6">
          <li>Google Firebase: Used for authentication and account management.</li>
          <li>Stripe: Used for payment processing and subscription management.</li>
          <li>Both providers adhere to strict data protection standards.</li>
        </ul>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">b. Legal Obligations</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-6">
          <li>When required by law or in response to valid legal requests (e.g., subpoenas or court orders).</li>
        </ul>
  
        <h3 className="text-xl font-semibold text-gray-700 mb-2">c. Business Transfers</h3>
        <ul className="list-disc pl-8 text-gray-600 mb-8">
          <li>If we undergo a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Storage and Security</h2>
        <ul className="list-disc pl-8 text-gray-600 mb-8">
          <li>User account data (via Firebase) and subscription data (via Stripe) are securely stored on their respective servers.</li>
          <li>Uploaded Data: Text or files uploaded for keyword extraction are temporarily processed and automatically deleted after use.</li>
          <li>Security Measures: We use encryption, access controls, and other industry-standard practices to safeguard your information.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <ul className="list-disc pl-8 text-gray-600">
          <li>
            <strong>Email:</strong> <a href="mailto:support@masyglink.com" className="text-blue-500">support@masyglink.com</a>
          </li>
          <li><strong>Phone:</strong> 773 690 7299</li>
        </ul>
      </div>
    );
  };
  
  export default PrivacyPolicy;
  