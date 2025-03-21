import { atom } from "nanostores";

export interface CartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number; // Asegúrate de que price esté incluido
}

// Initialize the store with items from localStorage if available
const storedItems = typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;
export const cartItems = atom<CartItem[]>(storedItems ? JSON.parse(storedItems) : []);

// Subscribe to store changes and update localStorage
cartItems.subscribe((value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(value));
  }
});

export function addToCart(item: Omit<CartItem, "quantity">) {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((i) => i.id === item.id);

  if (existingItem) {
    cartItems.set(
      currentItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  } else {
    cartItems.set([...currentItems, { ...item, quantity: 1 }]);
  }
}

export function removeFromCart(itemId: number) {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((i) => i.id === itemId);

  if (existingItem) {
    if (existingItem.quantity > 1) {
      cartItems.set(
        currentItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      cartItems.set(currentItems.filter((i) => i.id !== itemId));
    }
  }
}

export function clearCart() {
  cartItems.set([]);
}