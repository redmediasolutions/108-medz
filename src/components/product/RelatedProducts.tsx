import Link from "next/link";
import Image from "next/image";
import { getRelatedProductsByCategory } from "@/src/lib/woocommerce";

export default async function RelatedProducts({
  product,
}: {
  product: any;
}) {
  const categoryId = product.categories?.[0]?.id;
  if (!categoryId) return null;

  const products = await getRelatedProductsByCategory(
    categoryId,
    product.id
  );

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-10 mb-6">
      <h3 className="text-xl font-semibold mb-6">
        Related Products
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p: any) => {
          const salt = p.meta_data?.find(
            (m: any) => m.key === "salt_composition"
          )?.value;

          return (
            <div
              key={p.id}
              className="
                bg-white rounded-xl shadow-sm
                hover:shadow-md transition
                flex flex-col p-4
              "
            >
              {/* IMAGE */}
              <Link href={`/products/${p.slug}`}>
                <div className="relative h-44 mb-4 bg-white rounded-lg overflow-hidden">
                  {p.images?.[0]?.src && (
                    <Image
                      src={p.images[0].src}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              </Link>

              {/* CONTENT */}
              <div className="flex flex-col flex-1">
                <Link href={`/products/${p.slug}`}>
                  <p className="text-sm font-medium line-clamp-2 mb-1">
                    {p.name}
                  </p>
                </Link>

                {salt && (
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {salt}
                  </p>
                )}

                <p className="text-sm font-semibold mt-auto">
                  ₹{p.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}