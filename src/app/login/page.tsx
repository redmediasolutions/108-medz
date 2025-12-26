"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/src/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      router.push("/"); // redirect after login
    } catch (err: any) {
      setError("Invalid email or password");
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
          className="
            w-full border rounded-lg px-4 py-2 mb-3
            text-sm focus:outline-none
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="
            w-full border rounded-lg px-4 py-2 mb-2
            text-sm focus:outline-none
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* FORGOT PASSWORD */}
        <div className="text-right mb-4">
          <button
            type="button"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
            onClick={() => alert("Forgot password – next step")}
          >
            Forgot password?
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-xs mb-3">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full py-2 rounded-lg
            text-white font-medium
            transition
          "
          style={{
            backgroundColor: "var(--color-primary)",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGN UP LINK */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}