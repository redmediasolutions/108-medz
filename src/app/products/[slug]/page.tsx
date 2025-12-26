import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/src/lib/woocommerce";
import RelatedProducts from "@/src/components/product/RelatedProducts";
import AppDownloadCTA from "@/src/components/product/AppDownloadCTA";
import QuantityAddToCart from "@/src/components/product/QuantityAddToCart";

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
      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="relative w-full h-[420px] flex items-center justify-center">
            <Image
              src={product.images?.[0]?.src || "/placeholder.png"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="
        object-contain
        transition-transform duration-300
      "
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
              <span className="font-medium">Composition:</span>{" "}
              {saltComposition}
            </p>
          )}

          {/* QTY + ADD */}
          <QuantityAddToCart product={product} />

          {/* APP CTA */}
          <AppDownloadCTA />
        </div>
      </div>

      {/* RELATED */}
      <RelatedProducts product={product} />
    </section>
  );
}