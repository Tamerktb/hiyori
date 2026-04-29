export const metadata = {
  title: "Contact Us | HibaStore",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Contact HibaStore</h1>

      <p className="text-lg mb-8">
        We're here to help! Reach out to us through any of the channels below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
          href="https://wa.me/962781367709"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-8 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
        >
          <div className="text-5xl mb-4">📱</div>
          <h2 className="text-xl font-bold mb-2">WhatsApp</h2>
          <p className="text-zinc-600 dark:text-zinc-400">+962 78 136 7709</p>
          <p className="text-sm text-green-600 mt-2">Click to chat</p>
        </a>

        
          href="https://www.facebook.com/share/1App5Bfp2S/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-8 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
        >
          <div className="text-5xl mb-4">📘</div>
          <h2 className="text-xl font-bold mb-2">Facebook</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Visit our page</p>
          <p className="text-sm text-blue-600 mt-2">Click to open</p>
        </a>
      </div>

      <div className="mt-10 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <h3 className="font-bold text-lg mb-2">📍 Location</h3>
        <p>Zarqa, Jordan 🇯🇴</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          We operate online and deliver digital codes via WhatsApp.
        </p>
      </div>
    </div>
  );
}
