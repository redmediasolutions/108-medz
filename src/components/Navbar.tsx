"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartSidebar from "./CartSidebar";
import { useCart } from "@/src/context/CartContext";
import { useAuth } from "@/src/context/AuthContext";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useCart();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/108-medz logo.jpg"
              alt="108 Medz Logo"
              width={40}
              height={40}
            />
            <span
              className="text-xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              108 Medz
            </span>
          </div>

          {/* SEARCH */}
          <input
            className="w-1/2 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--color-primary)" }}
            placeholder="Search medicines..."
          />

          {/* ACTIONS */}
          <div className="flex items-center gap-4 relative">

            {/* AUTH */}
            {!loading && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Welcome,{" "}
                    {user.displayName ??
                      user.email?.split("@")[0]}
                    <span>▾</span>
                  </button>

                  {/* DROPDOWN */}
                  {menuOpen && (
                    <div className="
                      absolute right-0 mt-2 w-36
                      bg-white border rounded-lg shadow-md
                    ">
                      <button
                        onClick={handleLogout}
                        className="
                          w-full px-4 py-2 text-left text-sm
                          hover:bg-slate-100
                        "
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className="text-sm font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  Login
                </button>
              )
            )}

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100"
            >
              🛒
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}