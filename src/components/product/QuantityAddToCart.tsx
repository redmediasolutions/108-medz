"use client";

import { useState } from "react";
import { useCart } from "@/src/context/CartContext";

export default function QuantityAddToCart({
  product,
}: {
  product: any;
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Quantity */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-lg"
        >
          −
        </button>

        <span className="px-4 py-2 text-sm font-medium">
          {qty}
        </span>

        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-3 py-2 text-lg"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: qty,
          })
        }
        className="
          flex items-center gap-2
          px-6 py-3
          rounded-lg
          text-white font-medium
        "
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}