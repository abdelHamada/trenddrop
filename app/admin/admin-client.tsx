"use client";

import Image from "next/image";
import { Edit3, Package, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { formatCurrency, formatDate } from "@/lib/format";
import { useOrders } from "@/lib/useOrders";
import { useProducts } from "@/lib/useProducts";
import type { OrderStatus } from "@/types/order";
import type { Product, ProductCategory } from "@/types/product";

const statuses: OrderStatus[] = ["Pending", "Sent to Supplier", "Shipped", "Delivered"];
const fallbackImage = "/images/products/pulse-mini-speaker.svg";

const emptyProduct: Product = {
  id: "",
  name: "",
  category: "Desk Setup",
  price: 19.99,
  compareAtPrice: 29.99,
  rating: 4.5,
  image: fallbackImage,
  description: "",
  supplierCost: 7.5,
  estimatedShippingDays: 10,
  stock: 25,
  tags: ["demo"]
};

export function AdminClient() {
  const { products, saveProduct, deleteProduct, resetProducts } = useProducts();
  const { orders, updateOrderStatus, stats, isReady } = useOrders();
  const [editingProduct, setEditingProduct] = useState<Product>(emptyProduct);
  const [formError, setFormError] = useState("");

  const margin = useMemo(() => {
    const retail = products.reduce((sum, product) => sum + product.price, 0);
    const supplier = products.reduce((sum, product) => sum + product.supplierCost, 0);
    return retail > 0 ? ((retail - supplier) / retail) * 100 : 0;
  }, [products]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingProduct.name.trim() || !editingProduct.description.trim()) {
      setFormError("Name and description are required.");
      return;
    }

    const productId = editingProduct.id || slugify(editingProduct.name);
    saveProduct({
      ...editingProduct,
      id: productId,
      image: editingProduct.image || fallbackImage,
      tags: editingProduct.tags.length ? editingProduct.tags : ["demo"]
    });
    setEditingProduct(emptyProduct);
    setFormError("");
  }

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-emerald">
            Local admin dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink">
            Mock store operations
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Manage local product data, inspect simulated orders, and update fake fulfillment status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Revenue" value={formatCurrency(stats.revenue)} />
          <Stat label="Orders" value={String(stats.orderCount)} />
          <Stat label="Top product" value={stats.topProduct} />
          <Stat label="Avg margin" value={`${margin.toFixed(1)}%`} />
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[420px_1fr]">
          <form onSubmit={handleSubmit} className="h-fit rounded-lg border border-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-ink">
                {editingProduct.id ? "Edit product" : "Add product"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(emptyProduct);
                  setFormError("");
                }}
                className="grid h-10 w-10 place-items-center rounded-md border border-line text-slate-600 transition hover:bg-slate-50"
                aria-label="Reset product form"
              >
                <Plus size={17} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <AdminField label="Name" value={editingProduct.name} onChange={(value) => setEditingProduct({ ...editingProduct, name: value })} />
              <label className="block">
                <span className="text-sm font-semibold text-ink">Category</span>
                <select
                  value={editingProduct.category}
                  onChange={(event) => setEditingProduct({ ...editingProduct, category: event.target.value as ProductCategory })}
                  className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
                >
                  {["Audio", "Desk Setup", "Charging", "Travel", "Smart Home", "Lifestyle"].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminNumber label="Price" value={editingProduct.price} onChange={(value) => setEditingProduct({ ...editingProduct, price: value })} />
                <AdminNumber label="Compare at" value={editingProduct.compareAtPrice} onChange={(value) => setEditingProduct({ ...editingProduct, compareAtPrice: value })} />
                <AdminNumber label="Supplier cost" value={editingProduct.supplierCost} onChange={(value) => setEditingProduct({ ...editingProduct, supplierCost: value })} />
                <AdminNumber label="Stock" value={editingProduct.stock} onChange={(value) => setEditingProduct({ ...editingProduct, stock: Math.round(value) })} />
                <AdminNumber label="Rating" value={editingProduct.rating} step="0.1" onChange={(value) => setEditingProduct({ ...editingProduct, rating: value })} />
                <AdminNumber label="Shipping days" value={editingProduct.estimatedShippingDays} onChange={(value) => setEditingProduct({ ...editingProduct, estimatedShippingDays: Math.round(value) })} />
              </div>
              <AdminField label="Image path" value={editingProduct.image} onChange={(value) => setEditingProduct({ ...editingProduct, image: value })} />
              <label className="block">
                <span className="text-sm font-semibold text-ink">Description</span>
                <textarea
                  value={editingProduct.description}
                  onChange={(event) => setEditingProduct({ ...editingProduct, description: event.target.value })}
                  rows={4}
                  className="mt-2 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <AdminField
                label="Tags, comma separated"
                value={editingProduct.tags.join(", ")}
                onChange={(value) =>
                  setEditingProduct({
                    ...editingProduct,
                    tags: value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                  })
                }
              />
              {formError ? <p className="text-sm font-semibold text-red-600">{formError}</p> : null}
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-blue text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Save size={17} />
                Save product
              </button>
            </div>
          </form>

          <div className="space-y-8">
            <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-ink">Products</h2>
                <button
                  type="button"
                  onClick={resetProducts}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <RotateCcw size={16} />
                  Reset mock products
                </button>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b border-line text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-3 pr-4">Product</th>
                      <th className="py-3 pr-4">Category</th>
                      <th className="py-3 pr-4">Price</th>
                      <th className="py-3 pr-4">Stock</th>
                      <th className="py-3 pr-4">Margin</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-line last:border-0">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={64}
                              height={48}
                              className="h-12 w-16 rounded-md border border-line bg-slate-50 object-cover"
                            />
                            <div>
                              <p className="font-semibold text-ink">{product.name}</p>
                              <p className="text-xs text-slate-500">{product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-slate-600">{product.category}</td>
                        <td className="py-4 pr-4 font-semibold text-ink">{formatCurrency(product.price)}</td>
                        <td className="py-4 pr-4 text-slate-600">{product.stock}</td>
                        <td className="py-4 pr-4 text-slate-600">
                          {(((product.price - product.supplierCost) / product.price) * 100).toFixed(1)}%
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingProduct(product)}
                              className="grid h-9 w-9 place-items-center rounded-md border border-line text-slate-600 transition hover:bg-slate-50"
                              aria-label={`Edit ${product.name}`}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(product.id)}
                              className="grid h-9 w-9 place-items-center rounded-md border border-line text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-ink">Mock orders</h2>
              {!isReady ? (
                <p className="mt-5 text-sm text-slate-500">Loading local orders...</p>
              ) : orders.length === 0 ? (
                <div className="mt-5 rounded-md border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                  No mock orders yet.
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {orders.map((order) => (
                    <article key={order.id} className="rounded-lg border border-line p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-ink">{order.id}</h3>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">
                            {order.customer.firstName} {order.customer.lastName} - {order.customer.email}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-ink">{formatCurrency(order.total)}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {order.items.map((item) => (
                              <span key={item.productId} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                <Package size={13} />
                                {item.quantity} x {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <label className="block min-w-52">
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Status
                          </span>
                          <select
                            value={order.status}
                            onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                            className="mt-2 h-10 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-normal text-ink">{value}</p>
    </div>
  );
}

function AdminField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function AdminNumber({
  label,
  value,
  step = "1",
  onChange
}: {
  label: string;
  value: number;
  step?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
