"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, PackageCheck, Plus, ShoppingCart, Star, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { formatCurrency } from "@/lib/format";
import { useProducts } from "@/lib/useProducts";
import { useCart } from "@/components/CartProvider";

export function ProductDetailClient({ productId }: { productId: string }) {
  const { products } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((item) => item.id === productId);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Product not found"
          message="This demo product does not exist or was removed from local admin storage."
          actionHref="/products"
          actionLabel="Back to products"
        />
      </div>
    );
  }

  function handleAddToCart() {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-line bg-slate-50">
            <Image
              src={product.image}
              alt={product.name}
              width={900}
              height={700}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[product.image, product.image, product.image].map((image, index) => (
              <div key={index} className="overflow-hidden rounded-md border border-line bg-slate-50">
                <Image
                  src={image}
                  alt={`${product.name} angle ${index + 1}`}
                  width={280}
                  height={210}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <Link href="/products" className="text-sm font-semibold text-accent-blue hover:text-blue-700">
            Back to catalog
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-accent-emerald">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="text-3xl font-bold text-ink">{formatCurrency(product.price)}</p>
            <p className="text-lg text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-slate-50 p-4">
              <Truck className="h-5 w-5 text-accent-blue" />
              <p className="mt-3 text-sm font-semibold text-ink">Supplier shipping estimate</p>
              <p className="mt-1 text-sm text-slate-500">
                {product.estimatedShippingDays}-{product.estimatedShippingDays + 4} business days
              </p>
            </div>
            <div className="rounded-lg border border-line bg-slate-50 p-4">
              <PackageCheck className="h-5 w-5 text-accent-emerald" />
              <p className="mt-3 text-sm font-semibold text-ink">Mock inventory</p>
              <p className="mt-1 text-sm text-slate-500">{product.stock} units available</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-12 w-36 items-center justify-between rounded-md border border-line bg-white px-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold text-ink">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
                className="grid h-9 w-9 place-items-center rounded-md text-slate-600 hover:bg-slate-100"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <ShoppingCart size={18} />
              {added ? "Added to cart" : "Add to cart"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink">Related products</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.length > 0
              ? related.map((item) => <ProductCard key={item.id} product={item} />)
              : products
                  .filter((item) => item.id !== product.id)
                  .slice(0, 4)
                  .map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
