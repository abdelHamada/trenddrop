import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { mockProducts } from "@/data/products";
import { formatCurrency } from "@/lib/format";

const featured = mockProducts.slice(0, 4);
const categoryCards = [
  {
    title: "Desk Setup",
    description: "Cleaner charging, lighting, stands, and everyday workspace upgrades.",
    href: "/products?category=Desk%20Setup"
  },
  {
    title: "Travel Tech",
    description: "Compact organizers, trackers, and power accessories for carry-on life.",
    href: "/products?category=Travel"
  },
  {
    title: "Audio Finds",
    description: "Affordable speakers and earbuds with strong demo margins.",
    href: "/products?category=Audio"
  }
];

export default function HomePage() {
  const heroProduct = mockProducts[1];

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-emerald">
              Demo dropshipping storefront
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-normal text-ink sm:text-6xl">
              TrendDrop
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Affordable tech gadgets and lifestyle accessories presented as a polished portfolio
              ecommerce experience with mock products, simulated fulfillment, and a local admin flow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent-blue px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Shop demo products <ArrowRight size={18} />
              </Link>
              <Link
                href="/admin"
                className="inline-flex h-12 items-center justify-center rounded-md border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50"
              >
                View admin dashboard
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
              <div>
                <p className="font-bold text-ink">12+</p>
                <p className="text-slate-500">Mock products</p>
              </div>
              <div>
                <p className="font-bold text-ink">0</p>
                <p className="text-slate-500">Live payments</p>
              </div>
              <div>
                <p className="font-bold text-ink">100%</p>
                <p className="text-slate-500">Demo data</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
            <div className="overflow-hidden rounded-md bg-slate-50">
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                width={720}
                height={540}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-accent-emerald">Featured deal</p>
                <h2 className="mt-1 text-xl font-bold text-ink">{heroProduct.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-ink">{formatCurrency(heroProduct.price)}</p>
                <p className="text-sm text-slate-400 line-through">
                  {formatCurrency(heroProduct.compareAtPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Featured products"
            title="Fast-moving demo inventory"
            description="Curated gadget accessories with realistic margins, stock levels, ratings, and supplier estimates."
          />
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-blue-700"
          >
            Browse all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Categories"
            title="Built for browsing"
            description="The catalog includes the discovery patterns a real ecommerce shopper expects."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categoryCards.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="rounded-lg border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="text-xl font-bold text-ink">{category.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-blue">
                  Explore <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, label: "Sandbox only", text: "No real payments or API secrets." },
            { icon: PackageCheck, label: "Mock fulfillment", text: "Orders are sent to a fake supplier queue." },
            { icon: Truck, label: "Shipping estimates", text: "Supplier-style delivery windows on every item." },
            { icon: BadgeCheck, label: "Portfolio ready", text: "Reusable components and clean TypeScript." }
          ].map((badge) => (
            <div key={badge.label} className="rounded-lg border border-line bg-white p-5">
              <badge.icon className="h-6 w-6 text-accent-emerald" />
              <h3 className="mt-4 font-semibold text-ink">{badge.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{badge.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 text-white sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              Portfolio demo
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal">Explore the full buying flow.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Add products to cart, submit a simulated checkout, then manage the mock order from the
              admin dashboard.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-semibold text-ink transition hover:bg-slate-100"
          >
            Start shopping <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
