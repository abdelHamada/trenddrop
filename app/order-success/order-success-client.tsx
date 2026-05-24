"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, PackageCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/EmptyState";
import { formatCurrency, formatDate } from "@/lib/format";
import { useOrders } from "@/lib/useOrders";

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const { orders, isReady } = useOrders();
  const order = orders.find((entry) => entry.id === orderId);

  if (!isReady) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-8 text-slate-500 shadow-sm">
          Loading confirmation...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Order not found"
          message="This mock order is not available in local storage."
          actionHref="/products"
          actionLabel="Back to products"
        />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <CheckCircle2 className="h-12 w-12 text-accent-emerald" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent-emerald">
                Demo order confirmed
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-normal text-ink">
                Order {order.id}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <PackageCheck className="mt-1 h-5 w-5 text-accent-emerald" />
              <div>
                <h2 className="text-xl font-bold text-ink">Fulfillment status</h2>
                <p className="mt-2 text-slate-600">
                  Mock fulfillment status: <strong>{order.status}</strong>
                </p>
                <p className="mt-1 text-slate-600">
                  Estimated delivery date: <strong>{formatDate(order.estimatedDelivery)}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">Items</h2>
            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={72}
                    className="h-20 w-24 rounded-md border border-line bg-slate-50 object-cover"
                  />
                  <div className="flex flex-1 justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-ink">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Customer summary</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-ink">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
            <p>
              {order.customer.address}, {order.customer.city}, {order.customer.state}{" "}
              {order.customer.postalCode}
            </p>
          </div>
          <div className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
            <Line label="Subtotal" value={formatCurrency(order.subtotal)} />
            <Line label="Shipping" value={order.shipping === 0 ? "Free" : formatCurrency(order.shipping)} />
            <Line label="Tax" value={formatCurrency(order.tax)} />
            <Line label="Total" value={formatCurrency(order.total)} strong />
          </div>
          <Link
            href="/admin"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-ink text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            View in admin
          </Link>
        </aside>
      </section>
    </div>
  );
}

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={strong ? "font-bold text-ink" : "text-slate-500"}>{label}</span>
      <span className={strong ? "font-bold text-ink" : "font-semibold text-ink"}>{value}</span>
    </div>
  );
}
