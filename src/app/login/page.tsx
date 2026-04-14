"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [reqId, setReqId] = useState<string | null>(null);

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 SEND OTP
  const handleSendOtp = async () => {
    setError("");

    if (!phone) {
      setError("Enter mobile number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://us-central1-medz-9eda1.cloudfunctions.net/sendMsg91Otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: phone }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setReqId(data.reqId);
        setStep("otp");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 VERIFY OTP
  const handleVerifyOtp = async () => {
    setError("");

    if (otp.length < 4) {
      setError("Enter valid OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://us-central1-medz-9eda1.cloudfunctions.net/verifyMsg91Otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: phone,
            otp,
            reqId,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid OTP");
        return;
      }

      // ✅ Save token (optional)
      localStorage.setItem("token", data.token);

      // ✅ Redirect after login
      router.push("/");
    } catch (e) {
      setError("Verification failed");
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

        {/* STEP 1: PHONE */}
        {step === "phone" && (
          <>
            <p className="text-sm mb-2 text-gray-600">
              Enter your WhatsApp number
            </p>

            <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
              <span className="font-bold mr-2">+91</span>
              <input
                type="tel"
                placeholder="Mobile number"
                className="w-full outline-none text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-2 rounded-lg text-white font-medium"
              style={{
                backgroundColor: "var(--color-primary)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === "otp" && (
          <>
            <p className="text-sm mb-2 text-gray-600">
              Enter OTP sent to +91 {phone}
            </p>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              className="
                w-full border rounded-lg px-4 py-3 mb-4
                text-center text-lg tracking-widest
                focus:outline-none
              "
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-2 rounded-lg text-white font-medium mb-3"
              style={{
                backgroundColor: "#36B44A",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              onClick={() => setStep("phone")}
              className="text-sm text-gray-500 underline w-full"
            >
              Change number
            </button>
          </>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-xs mt-3 text-center">
            {error}
          </p>
        )}

        {/* SIGN UP */}
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