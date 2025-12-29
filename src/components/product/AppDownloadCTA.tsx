"use client";

import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function AppDownloadCTA() {
  return (
    <div className="mt-6 bg-gray-50 border rounded-xl p-5">
      <p className="text-sm font-medium mb-3">
        You can also order from our app
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Play Store */}
        <a
          href="https://play.google.com/store/apps/details?id=com.redmediasolutions.janman&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            text-sm font-medium
            transition
            hover:shadow-md
          "
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-primary)",
          }}
        >
          <FaGooglePlay className="text-lg" />
          Play Store
        </a>

        {/* App Store */}
        <a
          href="https://apps.apple.com/in/app/108-medz/id6755693988"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            text-sm font-medium
            transition
            hover:shadow-md
          "
          style={{
            backgroundColor: "var(--color-secondary)",
            color: "var(--color-primary)",
          }}
        >
          <FaApple className="text-lg" />
          App Store
        </a>
      </div>
    </div>
  );
}