import "./globals.css";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { CartProvider } from "@/src/context/CartContext";
import { AuthProvider } from "@/src/context/AuthContext";
import Toast from "@/src/components/Toast";

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
        {/* 🔐 AUTH PROVIDER */}
        <AuthProvider>
          {/* 🛒 CART PROVIDER */}
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