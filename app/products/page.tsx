import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListingClient } from "./product-listing-client";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse TrendDrop demo tech gadgets and lifestyle accessories."
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductListingClient />
    </Suspense>
  );
}
