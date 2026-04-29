export const metadata = {
  title: "Privacy Policy | HibaStore",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-4">
        <p>Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">1. Information We Collect</h2>
        <p>
          When you use HibaStore, we may collect the following information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contact information (name, phone number, email) when you place an order or message us.</li>
          <li>Payment-related information (we do not store full payment details — payments are processed externally).</li>
          <li>Communication history (WhatsApp messages, Facebook messages) for order processing and support.</li>
          <li>Basic technical data (browser type, IP address) for site security and analytics.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To process and deliver your orders.</li>
          <li>To respond to your questions and provide customer support.</li>
          <li>To improve our services and prevent fraud.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-3">3. Sharing of Information</h2>
        <p>
          We do <strong>not</strong> sell or share your personal information with third parties for marketing purposes.
          We may share information only when required by law.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">4. Data Security</h2>
        <p>
          We take reasonable steps to protect your information from unauthorized access. However,
          no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">5. Cookies</h2>
        <p>
          Our website may use cookies to improve user experience. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">6. Your Rights</h2>
        <p>
          You may request to access, update, or delete any personal information we hold about you by contacting us.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">7. Contact</h2>
        <p>
          For privacy-related questions, contact us via{" "}
          <a href="https://wa.me/962781367709" className="text-blue-600 hover:underline">WhatsApp (+962 78 136 7709)</a>.
        </p>
      </div>
    </div>
  );
}
