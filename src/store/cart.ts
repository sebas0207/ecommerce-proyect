import { atom } from "nanostores";

export interface CartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

// Función para obtener los items del localStorage
const getStoredItems = () => {
  if (typeof window === 'undefined') return [];
  try {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error loading cart items:', error);
    return [];
  }
};

// Initialize the store with items from localStorage
export const cartItems = atom<CartItem[]>(getStoredItems());

// Subscribe to store changes and update localStorage
if (typeof window !== 'undefined') {
  cartItems.subscribe((value) => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(value));
      // Actualizar el contador en todas las instancias
      document.querySelectorAll('.cart-count').forEach(counter => {
        if (counter instanceof HTMLElement) {
          const itemCount = value.reduce((total, item) => total + item.quantity, 0);
          counter.textContent = itemCount.toString();
        }
      });
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  });
}

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