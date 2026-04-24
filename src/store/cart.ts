import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (
    product: Product,
    options?: { size?: string; color?: string; quantity?: number }
  ) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const lineKey = (id: string, size?: string, color?: string) =>
  `${id}::${size ?? ""}::${color ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product, options = {}) =>
        set((state) => {
          const { size, color, quantity = 1 } = options;
          const targetKey = lineKey(product.id, size, color);
          const existing = state.items.find(
            (item) =>
              lineKey(item.product.id, item.selectedSize, item.selectedColor) ===
              targetKey
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                lineKey(item.product.id, item.selectedSize, item.selectedColor) ===
                targetKey
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                selectedSize: size,
                selectedColor: color,
              },
            ],
            isOpen: true,
          };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              lineKey(item.product.id, item.selectedSize, item.selectedColor) !==
              lineKey(productId, size, color)
          ),
        })),

      updateQuantity: (productId, quantity, size, color) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (item) =>
                    lineKey(
                      item.product.id,
                      item.selectedSize,
                      item.selectedColor
                    ) !== lineKey(productId, size, color)
                )
              : state.items.map((item) =>
                  lineKey(
                    item.product.id,
                    item.selectedSize,
                    item.selectedColor
                  ) === lineKey(productId, size, color)
                    ? { ...item, quantity }
                    : item
                ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "cascade-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const cartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, shipping, tax, total, itemCount };
};
