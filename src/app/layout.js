import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";

import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

import SessionProvider from "@/components/SessionProvider"; // ← local client wrapper
import { CartProvider } from "@/components/cart/cart";     // ← এই ফাইলে অবশ্যই "use client" আছে

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Simple Shop",
  description: "A tiny Next.js demo shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <SessionProvider>
          <CartProvider>
            <Navbar RightSlot={<ThemeToggle />} />

            {/* চাইলে কন্টেইনার/প্যাডিং এখানেই রাখতে পারো */}
            <main>
              {children}
            </main>

            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
