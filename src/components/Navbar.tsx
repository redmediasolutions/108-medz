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
    <header className="sticky top-0 z-50 bg-secondary/50 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20 gap-6">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/108-medz logo.jpg"
              alt="108 Medz"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-lg font-bold text-primary">
              108 MEDZ
            </span>
            <span className="text-xs text-gray-500 tracking-wide">
              YOUR HEALTH PARTNER
            </span>
          </div>
        </div>

        {/* SEARCH (DESKTOP) */}
        <div className="relative hidden md:block flex-1 max-w-2xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicines, health products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none shadow-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>

          {showDropdown && <SearchDropdown />}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6">

          {/* MOBILE SEARCH */}
          <button
            className="md:hidden text-xl text-gray-600"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            🔍
          </button>

          {/* ORDERS */}
          <button className="hidden md:flex flex-col items-center text-xs text-gray-600 hover:text-primary">
            <span>📄</span>
            Orders
          </button>

          {/* CART */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex flex-col items-center text-xs text-gray-600 hover:text-primary"
          >
            <span className="text-lg">🛒</span>
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-accent text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* PROFILE */}
          {!loading && user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col items-center text-xs text-gray-600 hover:text-primary"
              >
                <span>👤</span>
                Profile
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b">
                    {user.displayName ?? user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hidden md:flex flex-col items-center text-xs text-gray-600 hover:text-primary"
            >
              <span>👤</span>
              Login
            </button>
          )}

          {/* MOBILE MENU */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicines..."
            className="w-full border rounded-xl px-4 py-2"
          />
          {showDropdown && <SearchDropdown />}
        </div>
      )}
    </header>

    {/* ================= MOBILE MENU ================= */}
    {mobileMenu && (
      <div className="fixed inset-0 bg-black/40 z-50">
        <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-lg">
          <button
            className="text-xl mb-6"
            onClick={() => setMobileMenu(false)}
          >
            ✕
          </button>

          <nav className="flex flex-col gap-5 text-sm">
            {!loading && user && (
              <span className="font-medium">
                {user.displayName ?? user.email}
              </span>
            )}

            <Link href="/products" onClick={() => setMobileMenu(false)}>
              All Products
            </Link>

            {!loading && user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenu(false);
                  router.push("/login");
                }}
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