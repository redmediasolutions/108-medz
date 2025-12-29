"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CartSidebar from "./CartSidebar";
import { useCart } from "@/src/context/CartContext";
import { useAuth } from "@/src/context/AuthContext";
import { getProductImage } from "@/src/utils/getProductImage";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const { user, loading, logout } = useAuth();

  /* ---------------- UI STATE ---------------- */
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* ---------------- SEARCH STATE ---------------- */
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  /* ---------------- CART COUNT ---------------- */
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* ---------------- SEARCH EFFECT (DESKTOP + MOBILE) ---------------- */
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    setMobileMenu(false);
    router.push("/");
  };

  /* ---------------- SEARCH RESULT LIST ---------------- */
  const SearchDropdown = () => (
    <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-auto">
      {searchLoading ? (
        <p className="p-4 text-sm text-gray-500">Searching…</p>
      ) : results.length === 0 ? (
        <p className="p-4 text-sm text-gray-500">No results found</p>
      ) : (
        results.map((p) => {
          const salt = p.meta_data?.find(
            (m: any) => m.key === "salt_composition"
          )?.value;

          return (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={() => {
                setQuery("");
                setShowDropdown(false);
                setSearchOpen(false);
              }}
              className="flex gap-3 p-3 hover:bg-slate-50 border-b last:border-b-0"
            >
              <Image
                src={getProductImage(p)}
                alt={p.name}
                width={40}
                height={40}
                className="object-contain"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{p.name}</p>
                {salt && (
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {salt}
                  </p>
                )}
                <p className="text-sm font-semibold">₹{p.price}</p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/108-medz logo.jpg"
              alt="108 Medz"
              width={36}
              height={36}
            />
            <span
              className="text-lg font-bold hidden sm:block"
              style={{ color: "var(--color-primary)" }}
            >
              108 Medz
            </span>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="relative hidden md:block w-1/2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicines..."
              className="w-full border rounded-lg px-4 py-2 text-sm"
              style={{ borderColor: "var(--color-primary)" }}
            />
            {showDropdown && <SearchDropdown />}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            {/* MOBILE SEARCH ICON */}
            <button
              className="md:hidden text-xl"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              🔍
            </button>

            {/* DESKTOP ALL PRODUCTS */}
            <Link
              href="/products"
              className="hidden md:block text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              All Products
            </Link>

            {/* DESKTOP AUTH */}
            {!loading && user && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-sm font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  Welcome, {user.displayName ?? user.email?.split("@")[0]} ▾
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {!loading && !user && (
              <button
                onClick={() => router.push("/login")}
                className="hidden md:block text-sm font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                Login
              </button>
            )}

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100"
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

            {/* HAMBURGER */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileMenu(true)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR + RESULTS */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicines..."
              className="w-full border rounded-lg px-4 py-2 text-sm"
              style={{ borderColor: "var(--color-primary)" }}
            />
            {showDropdown && <SearchDropdown />}
          </div>
        )}
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-5 shadow-lg">
            <button
              className="text-xl mb-6"
              onClick={() => setMobileMenu(false)}
            >
              ✕
            </button>

            <nav className="flex flex-col gap-4">
              {!loading && user && (
                <span className="text-sm font-medium">
                  Welcome, {user.displayName ?? user.email?.split("@")[0]}
                </span>
              )}

              <Link
                href="/products"
                onClick={() => setMobileMenu(false)}
                className="text-sm font-medium"
              >
                All Products
              </Link>

              {!loading && user ? (
                <button
                  onClick={handleLogout}
                  className="text-sm text-left"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    router.push("/login");
                  }}
                  className="text-sm text-left"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* ================= CART ================= */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}