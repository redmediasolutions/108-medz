import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "janmanstore.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true, // ✅ keep this
  },
};

export default nextConfig;