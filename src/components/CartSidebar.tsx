"use client";

import { useCart } from "@/src/context/CartContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSidebar({ isOpen, onClose }: Props) {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 && (
            <p className="text-center text-gray-500">
              Your cart is empty
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-gray-50 p-4 rounded-xl"
            >
              {/* Image (optional placeholder) */}
              <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg" />

              <div className="flex-1">
                <h4 className="font-medium text-sm">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-600 mb-2">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 text-lg"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-lg"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t px-6 py-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <button
            className="w-full mt-4 py-3 rounded-lg font-medium text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}