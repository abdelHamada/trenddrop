"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/format";

export function CartClient() {
  const { lines, subtotal, shipping, tax, total, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          message="Add a few demo products to test the cart and checkout flow."
          actionHref="/products"
          actionLabel="Browse products"
        />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-normal text-ink">Shopping cart</h1>
          <p className="mt-3 text-slate-600">Review quantities before simulated checkout.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-4">
          {lines.map(({ product, quantity }) => (
            <article key={product.id} className="rounded-lg border border-line bg-white p-4 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-[132px_1fr_auto] sm:items-center">
                <Link href={`/products/${product.id}`} className="overflow-hidden rounded-md bg-slate-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={165}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-emerald">
                    {product.category}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-1 block text-lg font-bold text-ink hover:text-accent-blue"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-2 text-sm text-slate-500">
                    Supplier estimate: {product.estimatedShippingDays}-
                    {product.estimatedShippingDays + 4} business days
                  </p>
                  <p className="mt-2 font-semibold text-ink">{formatCurrency(product.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <div className="flex h-10 w-32 items-center justify-between rounded-md border border-line px-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-100"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(product.id, Math.min(product.stock, quantity + 1))}
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-100"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold text-ink">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping estimate</span>
              <span className="font-semibold text-ink">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tax estimate</span>
              <span className="font-semibold text-ink">{formatCurrency(tax)}</span>
            </div>
            <div className="border-t border-line pt-3">
              <div className="flex justify-between text-base">
                <span className="font-bold text-ink">Total</span>
                <span className="font-bold text-ink">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent-blue text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Continue to checkout
          </Link>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Payment is simulated for this portfolio demo. No live transaction is created.
          </p>
        </aside>
      </section>
    </div>
  );
}
