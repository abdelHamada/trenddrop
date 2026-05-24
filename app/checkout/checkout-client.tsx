"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { useCart } from "@/components/CartProvider";
import { formatCurrency, getEstimatedDelivery } from "@/lib/format";
import { useOrders } from "@/lib/useOrders";
import type { CustomerInfo, Order } from "@/types/order";

type FormErrors = Partial<Record<keyof CustomerInfo, string>>;

const emptyCustomer: CustomerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States"
};

export function CheckoutClient() {
  const router = useRouter();
  const { lines, subtotal, shipping, tax, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Checkout needs cart items"
          message="Your demo cart is empty. Add a product before testing the simulated checkout."
          actionHref="/products"
          actionLabel="Browse products"
        />
      </div>
    );
  }

  function setField(field: keyof CustomerInfo, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    const required: (keyof CustomerInfo)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
      "country"
    ];

    required.forEach((field) => {
      if (!customer[field].trim()) nextErrors[field] = "Required";
    });

    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      nextErrors.email = "Enter a valid email";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const maxShippingDays = Math.max(...lines.map((line) => line.product.estimatedShippingDays));
    const order: Order = {
      id: `TD-${Math.floor(10000 + Math.random() * 89999)}`,
      createdAt: new Date().toISOString(),
      customer,
      items: lines.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        image: product.image,
        quantity,
        price: product.price,
        supplierCost: product.supplierCost
      })),
      status: "Sent to Supplier",
      subtotal,
      shipping,
      tax,
      total,
      estimatedDelivery: getEstimatedDelivery(maxShippingDays)
    };

    window.setTimeout(() => {
      addOrder(order);
      clearCart();
      router.push(`/order-success?order=${order.id}`);
    }, 600);
  }

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-normal text-ink">Checkout</h1>
          <p className="mt-3 text-slate-600">Simulated payment and mock supplier fulfillment only.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">Customer info</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" value={customer.firstName} error={errors.firstName} onChange={(value) => setField("firstName", value)} />
              <Field label="Last name" value={customer.lastName} error={errors.lastName} onChange={(value) => setField("lastName", value)} />
              <Field label="Email" type="email" value={customer.email} error={errors.email} onChange={(value) => setField("email", value)} />
              <Field label="Phone" value={customer.phone} error={errors.phone} onChange={(value) => setField("phone", value)} />
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ink">Shipping address</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Street address" value={customer.address} error={errors.address} onChange={(value) => setField("address", value)} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" value={customer.city} error={errors.city} onChange={(value) => setField("city", value)} />
                <Field label="State" value={customer.state} error={errors.state} onChange={(value) => setField("state", value)} />
                <Field label="Postal code" value={customer.postalCode} error={errors.postalCode} onChange={(value) => setField("postalCode", value)} />
              </div>
              <Field label="Country" value={customer.country} error={errors.country} onChange={(value) => setField("country", value)} />
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-none" />
              <p>
                The payment button below is simulated. For a real Stripe test checkout, use
                environment variables and Stripe test-mode keys only.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CreditCard size={18} />
            {isSubmitting ? "Simulating payment..." : `Simulate payment ${formatCurrency(total)}`}
          </button>
        </form>

        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Order summary</h2>
          <div className="mt-5 space-y-4">
            {lines.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between gap-4 text-sm">
                <div>
                  <p className="font-semibold text-ink">{product.name}</p>
                  <p className="text-slate-500">Qty {quantity}</p>
                </div>
                <p className="font-semibold text-ink">{formatCurrency(product.price * quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
            <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
            <SummaryLine label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} />
            <SummaryLine label="Tax estimate" value={formatCurrency(tax)} />
            <SummaryLine label="Total" value={formatCurrency(total)} strong />
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  error,
  type = "text",
  onChange
}: {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-blue-100"
      />
      {error ? <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

function SummaryLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={strong ? "font-bold text-ink" : "text-slate-500"}>{label}</span>
      <span className={strong ? "font-bold text-ink" : "font-semibold text-ink"}>{value}</span>
    </div>
  );
}
