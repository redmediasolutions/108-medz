import type { MetadataRoute } from "next";
import { getProducts } from "@/src/lib/woocommerce";
export const dynamic = 'force-dynamic';
const SITE_URL = "https://108medz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const products = await getProducts();

    const productUrls = products.map((product: any) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: product.date_modified
        ? new Date(product.date_modified)
        : new Date(),
    }));

    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
      },
      {
        url: `${SITE_URL}/products`,
        lastModified: new Date(),
      },
      ...productUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation failed:", error);

    // Fallback sitemap (VERY IMPORTANT)
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
      },
    ];
  }
}