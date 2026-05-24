import type { Metadata } from "next";
import { CartClient } from "./cart-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your TrendDrop demo cart before simulated checkout."
};

export default function CartPage() {
  return <CartClient />;
}
