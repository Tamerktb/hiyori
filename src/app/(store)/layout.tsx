import type { ReactNode } from "react";
import Link from "next/link";

export default function StoreLayout({ children }: { children: ReactNode }) {
  const whatsappLink = "https://wa.me/962781367709";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>

      <footer className="border-t bg-zinc-50 dark:bg-zinc-900 mt-16">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">HibaStore</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Your trusted source for digital game cards in Jordan. Fast delivery, competitive prices.</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">📍 Zarqa, Jordan</p>
            </div>
            <div>
              <h3 className="font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/shop" className="hover:underline">Shop</Link></li>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:underline">Refund Policy</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:underline">📱 WhatsApp: +962 78 136 7709</a></li>
                <li><a href="https://www.facebook.com/share/1App5Bfp2S/" target="_blank" rel="noopener noreferrer" className="hover:underline">📘 Facebook Page</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} HibaStore. All rights reserved.</p>
            <p className="mt-1">Based in Zarqa, Jordan 🇯🇴</p>
          </div>
        </div>
      </footer>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg z-50 flex items-center justify-center text-2xl" aria-label="Contact on WhatsApp">💬</a>
    </div>
  );
}