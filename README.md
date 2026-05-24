# TrendDrop

TrendDrop is a complete sample dropshipping-style ecommerce portfolio project built with Next.js App Router, TypeScript, Tailwind CSS, mock product data, localStorage cart state, simulated checkout, and a local admin dashboard.

This is a demo website only. It is not a live store, does not use real supplier APIs, does not collect real customer data, and does not process live payments.

## Features

- Home page with hero, featured products, category cards, trust badges, and call to action
- Product catalog with search, category filter, price filter, and sorting
- Product detail pages with images, quantity selector, supplier-style shipping estimate, and related products
- Cart stored in localStorage with quantity updates, remove actions, subtotal, shipping, tax, and total
- Checkout form with validation and simulated payment
- Order success page with order number, customer summary, mock fulfillment status, and estimated delivery date
- Admin dashboard with mock order management, product add/edit/delete, status updates, and stats cards
- Local mock product data with 12 sample products
- Responsive Tailwind UI suitable for a GitHub portfolio

## Tech Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Local mock data file first
- localStorage for cart, products, and mock orders
- No live payment provider by default

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
npm run start
```

Type-check the project:

```bash
npm run typecheck
```

## Environment Variables

Copy the example environment file if you need local overrides:

```bash
cp .env.example .env.local
```

The project does not require real API keys. If you later add Stripe Checkout, use Stripe test mode only and keep keys in environment variables:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_replace_me
STRIPE_SECRET_KEY=sk_test_replace_me
```

Never commit real secret keys.

## Folder Structure

```text
trenddrop/
  app/                 App Router pages and route-specific client views
  components/          Shared UI components and cart provider
  data/products.ts     Local mock product database
  lib/                 Formatting, localStorage, products, and orders helpers
  public/images/       Local demo product artwork
  types/               Product, cart, and order TypeScript types
```

## Demo Data

Product data lives in `data/products.ts`. Each mock product includes:

- `id`
- `name`
- `category`
- `price`
- `compareAtPrice`
- `rating`
- `image`
- `description`
- `supplierCost`
- `estimatedShippingDays`
- `stock`
- `tags`

Admin product edits and mock orders are saved in browser localStorage, so each browser has its own demo state. Use the reset button in the admin dashboard to restore the starter product catalog.

## Dropshipping Portfolio Disclaimer

TrendDrop is a sample dropshipping portfolio project. It demonstrates ecommerce UI, cart behavior, mock checkout, simulated fulfillment, and admin workflows without connecting to real suppliers, real customer databases, or live payment systems. Any customer names, order numbers, delivery dates, and fulfillment statuses are fake demo data.

## Payment Notes

The checkout button simulates a payment and creates a mock order locally. No card data is requested, stored, or transmitted. If payment functionality is expanded, use Stripe Checkout in test/sandbox mode only and load all keys from environment variables.
