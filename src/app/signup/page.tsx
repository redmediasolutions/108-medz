"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail } from "@/src/lib/auth";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      await signupWithEmail(email, password);
      router.push("/"); // redirect after signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl p-6 shadow">
        {/* LOGO */}
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          108 Medz
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full border rounded-lg px-4 py-2 mb-3 text-sm focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-xs mb-3">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white font-medium transition"
          style={{
            backgroundColor: "var(--color-primary)",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}