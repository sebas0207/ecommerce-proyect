'use client'
import { useStore } from "@nanostores/react";
import { cartItems } from "../store/cart";

export default function CartCounter() {
  const items = useStore(cartItems);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <span
      class="relative top-1 left-6 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-xs cart-count"
    >
      {itemCount}
    </span>
  );
}
