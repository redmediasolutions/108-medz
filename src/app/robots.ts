import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/login",
          "/signup",
          "/cart",
          "/checkout",
        ],
      },
    ],
    sitemap: "https://108medz.com/sitemap.xml",
  };
}