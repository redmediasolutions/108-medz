"use client";

import { Phone } from "lucide-react";
import Link from "next/link";

export default function PhoneLoginForm() {
  return (
    <form className="space-y-6">
      <div>
        <label className="text-sm font-medium">
          Phone Number
        </label>
        <div className="flex mt-1">
          <span className="px-4 py-3 border rounded-l-xl bg-gray-100">
            +91
          </span>
          <input
            type="tel"
            placeholder="98765 43210"
            className="w-full px-4 py-3 border rounded-r-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

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
  send OTP
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