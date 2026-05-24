import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccessClient } from "./order-success-client";

export const metadata: Metadata = {
  title: "Order Success",
  description: "TrendDrop simulated order confirmation."
};

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessClient />
    </Suspense>
  );
}
