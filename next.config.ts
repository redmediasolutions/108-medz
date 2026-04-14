import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // ✅ REQUIRED for OpenNext

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "janmanstore.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;