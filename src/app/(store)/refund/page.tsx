export const metadata = {
  title: "Refund Policy | HibaStore",
};

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Refund Policy</h1>

      <div className="space-y-4">
        <p>Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</p>

        <h2 className="text-2xl font-bold mt-6 mb-3">Digital Products</h2>
        <p>
          Due to the nature of digital products, <strong>all sales of digital game cards and gift codes are final</strong>.
          Once a code has been delivered to you, it cannot be refunded, exchanged, or returned for any reason.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">Before Purchase</h2>
        <p>
          Please carefully review your order — including the platform, region, and amount — before completing your purchase.
          We are happy to answer any questions before you buy. Contact us via WhatsApp at{" "}
          <a href="https://wa.me/962781482011" className="text-blue-600 hover:underline">+962 78 136 7709</a> if you are unsure.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">Eligible Refund Cases</h2>
        <p>Refunds may be considered only in the following cases:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The code was not delivered to you due to our error.</li>
          <li>The code was invalid or already used at the time of delivery (verified by us).</li>
          <li>You were charged but the order was never processed.</li>
        </ul>
        <p>
          To request a refund under these conditions, contact us within <strong>24 hours</strong> of purchase
          via WhatsApp with your order details.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-3">Non-Refundable Situations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You changed your mind after receiving the code.</li>
          <li>You purchased the wrong product, region, or amount.</li>
          <li>The code was redeemed and used.</li>
          <li>You shared the code with someone else and it was used.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-3">Contact</h2>
        <p>
          For all refund inquiries, please contact us via WhatsApp at{" "}
          <a href="https://wa.me/962781482011" className="text-blue-600 hover:underline">+962 78 136 7709</a>.
        </p>
      </div>
    </div>
  );
}
