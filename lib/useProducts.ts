"use client";

import { useEffect, useMemo, useState } from "react";
import { mockProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { readStorage, writeStorage } from "./storage";

const PRODUCT_KEY = "trenddrop-products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Local storage acts as the mock database for this portfolio demo.
    setProducts(readStorage(PRODUCT_KEY, mockProducts));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) writeStorage(PRODUCT_KEY, products);
  }, [isReady, products]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products]
  );

  function saveProduct(product: Product) {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) return current.map((item) => (item.id === product.id ? product : item));
      return [product, ...current];
    });
  }

  function deleteProduct(productId: string) {
    setProducts((current) => current.filter((item) => item.id !== productId));
  }

  function resetProducts() {
    setProducts(mockProducts);
  }

  return { products, categories, saveProduct, deleteProduct, resetProducts, isReady };
}
