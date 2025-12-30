export const runtime = "nodejs";

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/src/lib/woocommerce";
import RelatedProducts from "@/src/components/product/RelatedProducts";
import AppDownloadCTA from "@/src/components/product/AppDownloadCTA";
import QuantityAddToCart from "@/src/components/product/QuantityAddToCart";
import { getProductImage } from "@/src/utils/getProductImage";

/* -----------------------------------------
   SEO: META TAGS (TITLE, DESCRIPTION, OG)
------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | 108 Medz",
    };
  }

  const salt = product.meta_data?.find(
    (m: any) => m.key === "salt_composition"
  )?.value;

  return {
    title: product.name,
    description: salt
      ? `${product.name} – ${salt}. Buy online from 108 Medz.`
      : `Buy ${product.name} online from 108 Medz.`,
    openGraph: {
      title: product.name,
      description: salt
        ? `${product.name} – ${salt}`
        : product.name,
      images: [
        {
          url:
            product.images?.[0]?.src ||
            "/default-product.png",
        },
      ],
    },
  };
}

/* -----------------------------------------
   PAGE
------------------------------------------ */
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const category = product.categories?.[0]?.name;
  const saltComposition = product.meta_data?.find(
    (m: any) => m.key === "salt_composition"
  )?.value;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* SEO: STRUCTURED DATA (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: getProductImage(product),
            description:
              saltComposition || product.name,
            brand: {
              "@type": "Brand",
              name: "108 Medz",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability:
                "https://schema.org/InStock",
            },
          }),
        }}
      />

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="relative w-full h-[300px] flex items-center justify-center">
            <Image
              src={getProductImage(product)}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* DETAILS */}
        <div>
          {category && (
            <p className="text-sm text-blue-600 mb-1">
              {category}
            </p>
          )}

          <h1 className="text-2xl font-semibold mb-3">
            {product.name}
          </h1>

          <p className="text-2xl font-bold mb-3">
            ₹{product.price}
          </p>

          {saltComposition && (
            <p className="text-sm text-gray-600 mb-6">
              <span className="font-medium">
                Composition:
              </span>{" "}
              {saltComposition}
            </p>
          )}

          <QuantityAddToCart product={product} />
          <AppDownloadCTA />
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts product={product} />
    </section>
  );
}