"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/src/context/CartContext";

type Props = {
  products: any[];
  loading: boolean;
};

/* ---------- Helpers ---------- */

function getMetaValue(
  product: any,
  key: string
): string | null {
  const meta = product.meta_data?.find(
    (item: any) => item.key === key
  );
  return meta?.value ?? null;
}

/* ---------- Skeleton ---------- */

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
      <div className="h-36 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

/* ---------- Component ---------- */

export default function Products({ products, loading }: Props) {
  const { addToCart, cart } = useCart();

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map((p) => {
                const isInCart = cart.some(
                  (item) => item.id === p.id
                );

                const saltComposition = getMetaValue(
                  p,
                  "salt_composition"
                );

                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition block"
                  >
                    {/* IMAGE */}
                    <div className="relative h-36 bg-white rounded-t-xl overflow-hidden group">
                      {p.images?.[0]?.src && (
                        <Image
                          src={p.images[0].src}
                          alt={p.name}
                          fill
                          className="
                            object-contain
                            transition-transform duration-300 ease-out
                            group-hover:scale-105
                          "
                        />
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-4">
                      <h4 className="font-medium text-sm">
                        {p.name}
                      </h4>

                      {saltComposition && (
                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                          {saltComposition}
                        </p>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="font-semibold">
                          ₹{p.price}
                        </span>

                        <button
                          disabled={isInCart}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isInCart) {
                              addToCart({
                                id: p.id,
                                name: p.name,
                                price: Number(p.price),
                                quantity: 1,
                              });
                            }
                          }}
                          className={`
                            text-sm px-4 py-2 rounded-lg
                            transition-all duration-200
                            ${
                              isInCart
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "cursor-pointer hover:scale-105 hover:shadow-md active:scale-95"
                            }
                          `}
                          style={
                            !isInCart
                              ? {
                                  backgroundColor:
                                    "var(--color-secondary)",
                                  color:
                                    "var(--color-primary)",
                                }
                              : {}
                          }
                        >
                          {isInCart ? "Added" : "Add"}
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}