import { Apple, Play } from "lucide-react";

export default function AppDownloadCTA() {
  return (
    <div className="mt-6">
      <p className="text-sm mb-3">
        You can also place orders through our app
      </p>

      <div className="flex gap-4">
        {/* App Store */}
        <button
          className="
            flex items-center gap-2
            bg-black text-white
            px-4 py-2 rounded-lg
            text-sm
          "
        >
          <Apple size={18} />
          App Store
        </button>

        {/* Play Store */}
        <button
          className="
            flex items-center gap-2
            bg-black text-white
            px-4 py-2 rounded-lg
            text-sm
          "
        >
          <Play size={18} />
          Google Play
        </button>
      </div>
    </div>
  );
}