"use client";

import { User, Mail, Phone, Lock, Eye } from "lucide-react";

export default function SignupForm() {
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 border rounded-xl mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 border rounded-xl mt-1"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 border rounded-xl mt-1"
        />
      </div>

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
            className="w-full px-4 py-3 border rounded-r-xl"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Create a strong password"
          className="w-full px-4 py-3 border rounded-xl mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          className="w-full px-4 py-3 border rounded-xl mt-1"
        />
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
 Create Account
</button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 font-medium">
          Sign in
        </a>
      </p>
    </form>
  );
}