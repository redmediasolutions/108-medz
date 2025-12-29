
import type { Metadata } from "next";
import HomeClient from "@/src/app/HomeClient";

export const metadata: Metadata = {
  title: "108 Medz",
  description:
    "108Medz App offers a smarter way to save on healthcare. Discover a wide range of effective, high-quality medicines with the same active ingredients as major brands—delivered at significantly lower prices. With a focus on affordability and reliability, 108Medz ensures your well-being without compromise.",
  openGraph: {
    title: "108 Medz",
    description:
      "108Medz App offers a smarter way to save on healthcare. Discover a wide range of effective, high-quality medicines with the same active ingredients as major brands—delivered at significantly lower prices. With a focus on affordability and reliability, 108Medz ensures your well-being without compromise.",
    url: "https://108medz.com",
    siteName: "108 Medz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "108 Medz",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <HomeClient />;
}