import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { CartProvider } from "@/src/context/CartContext";
import { AuthProvider } from "@/src/context/AuthContext";
import Toast from "@/src/components/Toast";

/* 🔹 GLOBAL SEO */
export const metadata: Metadata = {
  title: {
    default: "108 Medz",
    template: "108 Medz",
  },
  description:
    "108Medz App offers a smarter way to save on healthcare. Discover a wide range of effective, high-quality medicines with the same active ingredients as major brands—delivered at significantly lower prices. With a focus on affordability and reliability, 108Medz ensures your well-being without compromise.",
  keywords: [
    "buy medicines online",
    "online medicine delivery",
    "online pharmacy india",
    "medicine delivery india",
    "pharmacy near me",
    "order medicines online",
    "online medical store",
    "generic medicines online",
    "prescription medicines online",
    "108 medz",
    "108 medz app",
    "trusted online pharmacy",
  ],
  metadataBase: new URL("https://108medz.in"),
  openGraph: {
    title: "108 Medz",
    description:
      "108Medz App offers a smarter way to save on healthcare. Discover a wide range of effective, high-quality medicines with the same active ingredients as major brands—delivered at significantly lower prices. With a focus on affordability and reliability, 108Medz ensures your well-being without compromise.",
    siteName: "108 Medz",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-slate-50 text-slate-900"
        suppressHydrationWarning
      >
        {/* 🔐 AUTH CONTEXT */}
        <AuthProvider>

          {/* 🛒 CART CONTEXT */}
          <CartProvider>

            {/* HEADER */}
            <Navbar />

            {/* PAGE CONTENT */}
            <main className="min-h-screen">
              {children}
            </main>

            {/* FOOTER */}
            <Footer />

            {/* GLOBAL TOAST */}
            <Toast />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}