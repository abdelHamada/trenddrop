import type { Metadata } from "next";
import { mockProducts } from "@/data/products";
import { ProductDetailClient } from "./product-detail-client";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts.find((item) => item.id === id);

  return {
    title: product ? product.name : "Product not found",
    description: product?.description ?? "TrendDrop product detail page."
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductDetailClient productId={id} />;
}
