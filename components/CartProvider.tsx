"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { Product } from "@/types/product";
import type { CartLine } from "@/types/order";
import { readStorage, writeStorage } from "@/lib/storage";

type StoredCartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CART_KEY = "trenddrop-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readStorage(CART_KEY, [] as StoredCartItem[]));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) writeStorage(CART_KEY, items);
  }, [isReady, items]);

  const lines = useMemo<CartLine[]>(() => {
    return items.map((item) => ({ product: item.product, quantity: item.quantity }));
  }, [items]);

  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.0875;
  const total = subtotal + shipping + tax;
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity }];

      return current.map((item) =>
        item.product.id === product.id
          ? { product, quantity: Math.min(product.stock, item.quantity + quantity) }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      shipping,
      tax,
      total,
      addItem,
      updateQuantity,
      removeItem,
      clearCart
    }),
    [lines, itemCount, subtotal, shipping, tax, total, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
