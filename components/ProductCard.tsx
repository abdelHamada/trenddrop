"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="glow-card product-pop group rounded-lg border border-line bg-white p-3 shadow-sm hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="relative z-10 block overflow-hidden rounded-md bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          width={520}
          height={420}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110 group-hover:saturate-125"
          priority={false}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-emerald shadow-sm backdrop-blur">
          Trending
        </span>
      </Link>
      <div className="relative z-10 mt-4 space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-emerald">
              {product.category}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="mt-2 block min-h-12 text-base font-semibold text-ink transition hover:text-accent-blue"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-ink">{formatCurrency(product.price)}</p>
            <p className="text-sm text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="shine-button grid h-10 w-10 place-items-center rounded-md bg-accent-blue text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-soft"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
