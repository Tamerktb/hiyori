export const metadata = {
  title: "About Us | HibaStore",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">About HibaStore</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>
          Welcome to <strong>HibaStore</strong> — Jordan's trusted destination for digital game cards
          and gaming gift cards at competitive prices.
        </p>

        <p>
          Based in Zarqa, Jordan, we specialize in providing fast, reliable delivery of digital codes
          for popular games and platforms. Our goal is to make gaming more affordable and accessible
          to players across Jordan and the wider region.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Why Choose HibaStore?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Competitive Prices</strong> — Better rates than official stores.</li>
          <li><strong>Fast Delivery</strong> — Codes delivered quickly via WhatsApp.</li>
          <li><strong>Local Payment Methods</strong> — Convenient options for Jordanian customers.</li>
          <li><strong>Customer Support</strong> — Reach us anytime via WhatsApp or Facebook.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-3">Get in Touch</h2>
        <p>
          Have a question? Contact us on{" "}
          <a href="https://wa.me/962781482011" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            WhatsApp (+962 78 136 7709)
          </a>{" "}
          or visit our{" "}
          <a href="https://www.facebook.com/share/1App5Bfp2S/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Facebook page
          </a>.
        </p>
      </div>
    </div>
  );
}
