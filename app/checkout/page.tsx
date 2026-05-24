import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete a simulated TrendDrop checkout with mock fulfillment."
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
