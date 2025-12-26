"use client";

import { useEffect, useState } from "react";

export default function Toast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      setMessage(e.detail);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 2500);
    };

    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        px-5 py-3 rounded-lg shadow-lg
        text-sm text-white
        animate-slide-in
      "
      style={{
        backgroundColor: "var(--color-primary)",
      }}
    >
      {message}
    </div>
  );
}