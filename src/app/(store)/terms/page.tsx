export const metadata = {
  title: "Terms of Service | HibaStore",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <div className="space-y-4">
        <p>Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">1. About HibaStore</h2>
        <p>
          HibaStore is a digital marketplace based in Zarqa, Jordan, that sells digital game cards
          and gift codes. By using our website or services, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">2. Eligibility</h2>
        <p>
          You must be at least 18 years old, or have permission from a parent or legal guardian, to make a purchase.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">3. Orders & Payment</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All prices are listed in Jordanian Dinar (JOD) unless otherwise stated.</li>
          <li>Orders are confirmed only after payment is received and verified.</li>
          <li>We reserve the right to cancel any order at our discretion (e.g. pricing errors, fraud detection).</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-3">4. Delivery</h2>
        <p>
          Digital codes are typically delivered within minutes to a few hours via WhatsApp or email
          after payment confirmation. Delivery times may vary based on stock and the time of order.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">5. Refunds</h2>
        <p>
          All digital purchases are final once the code is delivered. Please see our{" "}
          <a href="/refund" className="text-blue-600 hover:underline">Refund Policy</a> for details.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">6. Use of Codes</h2>
        <p>
          Codes are intended for personal use only. You are responsible for redeeming the code on the
          correct platform and region. HibaStore is not responsible for codes used on incorrect accounts
          or platforms.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">7. Account Security</h2>
        <p>
          You are responsible for safeguarding any account information you use with our service.
          Do not share codes publicly — once shared, they may be redeemed by others.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">8. Limitation of Liability</h2>
        <p>
          HibaStore is not liable for any indirect, incidental, or consequential damages arising
          from the use of our service or products.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">9. Changes to Terms</h2>
        <p>
          We may update these terms at any time. Continued use of the website after changes
          constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">10. Contact</h2>
        <p>
          For questions about these terms, contact us via{" "}
          <a href="https://wa.me/962781482011" className="text-blue-600 hover:underline">WhatsApp (+962 78 136 7709)</a>.
        </p>
      </div>
    </div>
  );
}
