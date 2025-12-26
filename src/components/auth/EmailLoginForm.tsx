"use client";

import { Mail, Lock, Eye } from "lucide-react";
import Link from "next/link";

export default function EmailLoginForm() {
  return (
    <form className="space-y-5">
      {/* Email */}
      <div>
        <label className="text-sm font-medium">
          Email Address
        </label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium">
          Password
        </label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <Eye className="absolute right-3 top-3.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Remember / Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>
        <button
          type="button"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          Forgot password?
        </button>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="
    w-full
    py-3
    rounded-xl
    font-medium
    text-white
    transition
    active:scale-[0.98]
    hover:opacity-95
  "
        style={{
          backgroundColor: "var(--color-primary)",
        }}
      >
        Sign In
      </button>

      <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}

<Link href="/signup">
  <button
    type="button"
    className="text-sm font-medium hover:underline"
    style={{ color: "var(--color-primary)" }}
  >
    Sign up now
  </button>
</Link>
      </p>
    </form>
  );
}