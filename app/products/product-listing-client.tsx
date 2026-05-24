"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/useProducts";
import { formatCurrency } from "@/lib/format";

type SortMode = "featured" | "price-asc" | "price-desc" | "rating-desc";

export function ProductListingClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const { products, categories } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(75);
  const [sort, setSort] = useState<SortMode>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesQuery =
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
        const matchesCategory = category === "All" || product.category === category;
        const matchesPrice = product.price <= maxPrice;
        return matchesQuery && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rating-desc") return b.rating - a.rating;
        return b.compareAtPrice - b.price - (a.compareAtPrice - a.price);
      });
  }, [category, maxPrice, products, query, sort]);

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-emerald">
            Product catalog
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            Affordable gadget finds
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Search, filter, and sort mock products from a local data source. No supplier APIs are
            connected.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px_190px]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, tags, or descriptions"
                className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="sr-only">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
              >
                <option value="All">All categories</option>
                {categories.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-md border border-line px-3 py-2">
              <span className="flex items-center justify-between text-xs font-semibold text-slate-500">
                Max price <span>{formatCurrency(maxPrice)}</span>
              </span>
              <input
                type="range"
                min="10"
                max="75"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-2 w-full accent-blue-600"
              />
            </label>

            <label>
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
              >
                <option value="featured">Featured savings</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating-desc">Rating: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-500">
          <p>{filteredProducts.length} products found</p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} />
            <span>Local filters</span>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="No products match those filters"
              message="Try a broader search, raise the max price, or switch categories."
            />
          </div>
        )}
      </section>
    </div>
  );
}
