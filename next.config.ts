import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ---------------- IMAGES ---------------- */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "janmanstore.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true, // ✅ IMPORTANT for Cloudflare
  },

  /* ---------------- EXPERIMENTAL ---------------- */
  experimental: {
    runtime: "edge", // ✅ Required for Cloudflare compatibility
  },
};

export default nextConfig;