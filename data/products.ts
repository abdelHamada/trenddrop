import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "pulse-mini-speaker",
    name: "Pulse Mini Bluetooth Speaker",
    category: "Audio",
    price: 29.99,
    compareAtPrice: 44.99,
    rating: 4.7,
    image: "/images/products/pulse-mini-speaker.svg",
    description:
      "A pocket-size wireless speaker with punchy sound, silicone grip, and all-day battery life for desks, dorms, and weekend trips.",
    supplierCost: 11.25,
    estimatedShippingDays: 9,
    stock: 48,
    tags: ["bluetooth", "portable", "audio"]
  },
  {
    id: "snapcharge-magnetic-bank",
    name: "SnapCharge Magnetic Power Bank",
    category: "Charging",
    price: 34.99,
    compareAtPrice: 59.99,
    rating: 4.8,
    image: "/images/products/snapcharge-magnetic-bank.svg",
    description:
      "Slim 10000mAh magnetic battery pack with pass-through charging and a folding stand for hands-free calls.",
    supplierCost: 14.8,
    estimatedShippingDays: 8,
    stock: 36,
    tags: ["magsafe", "power bank", "travel"]
  },
  {
    id: "halo-led-desk-mat",
    name: "Halo LED Desk Mat",
    category: "Desk Setup",
    price: 24.99,
    compareAtPrice: 39.99,
    rating: 4.5,
    image: "/images/products/halo-led-desk-mat.svg",
    description:
      "Extended water-resistant desk mat with stitched edges, soft glide surface, and soft edge lighting for a cleaner setup.",
    supplierCost: 8.7,
    estimatedShippingDays: 12,
    stock: 52,
    tags: ["desk", "rgb", "workspace"]
  },
  {
    id: "airloop-travel-organizer",
    name: "AirLoop Cable Organizer",
    category: "Travel",
    price: 18.99,
    compareAtPrice: 27.99,
    rating: 4.4,
    image: "/images/products/airloop-travel-organizer.svg",
    description:
      "Compact tech pouch with elastic loops, mesh pockets, and a padded shell for cables, adapters, earbuds, and cards.",
    supplierCost: 6.35,
    estimatedShippingDays: 10,
    stock: 63,
    tags: ["travel", "cables", "organizer"]
  },
  {
    id: "glowplug-smart-nightlight",
    name: "GlowPlug Smart Nightlight",
    category: "Smart Home",
    price: 21.99,
    compareAtPrice: 32.99,
    rating: 4.6,
    image: "/images/products/glowplug-smart-nightlight.svg",
    description:
      "Motion-aware plug-in nightlight with warm dimming, sunrise fade mode, and app-free touch controls.",
    supplierCost: 7.9,
    estimatedShippingDays: 11,
    stock: 41,
    tags: ["smart home", "lighting", "motion"]
  },
  {
    id: "clipon-webcam-light",
    name: "Clip-On Webcam Light",
    category: "Desk Setup",
    price: 19.99,
    compareAtPrice: 29.99,
    rating: 4.3,
    image: "/images/products/clipon-webcam-light.svg",
    description:
      "USB-powered video call light with adjustable warmth, brightness controls, and a stable clip for laptops and monitors.",
    supplierCost: 6.95,
    estimatedShippingDays: 7,
    stock: 29,
    tags: ["creator", "desk", "lighting"]
  },
  {
    id: "aeropod-cleaning-kit",
    name: "AeroPod Earbud Cleaning Kit",
    category: "Lifestyle",
    price: 12.99,
    compareAtPrice: 19.99,
    rating: 4.2,
    image: "/images/products/aeropod-cleaning-kit.svg",
    description:
      "Pocket cleaning kit with soft brushes, detail tips, and a microfiber pad for earbuds, keyboards, and phone ports.",
    supplierCost: 3.4,
    estimatedShippingDays: 6,
    stock: 82,
    tags: ["cleaning", "earbuds", "everyday carry"]
  },
  {
    id: "flexdock-phone-stand",
    name: "FlexDock Aluminum Phone Stand",
    category: "Desk Setup",
    price: 16.99,
    compareAtPrice: 24.99,
    rating: 4.6,
    image: "/images/products/flexdock-phone-stand.svg",
    description:
      "Adjustable aluminum stand with a weighted base, cable cutout, and silicone pads for phones and small tablets.",
    supplierCost: 5.2,
    estimatedShippingDays: 9,
    stock: 74,
    tags: ["phone stand", "desk", "aluminum"]
  },
  {
    id: "voltstack-gan-charger",
    name: "VoltStack 45W GaN Charger",
    category: "Charging",
    price: 27.99,
    compareAtPrice: 49.99,
    rating: 4.9,
    image: "/images/products/voltstack-gan-charger.svg",
    description:
      "Compact dual-port wall charger with GaN efficiency for phones, tablets, earbuds, handheld consoles, and light laptops.",
    supplierCost: 12.1,
    estimatedShippingDays: 8,
    stock: 33,
    tags: ["gan", "usb-c", "charger"]
  },
  {
    id: "nomad-sling-bottle",
    name: "Nomad Sling Bottle Strap",
    category: "Lifestyle",
    price: 14.99,
    compareAtPrice: 21.99,
    rating: 4.1,
    image: "/images/products/nomad-sling-bottle.svg",
    description:
      "Adjustable crossbody bottle strap with a zip pocket for keys, cards, and earbuds during errands or walks.",
    supplierCost: 4.15,
    estimatedShippingDays: 13,
    stock: 57,
    tags: ["outdoor", "lifestyle", "accessory"]
  },
  {
    id: "soundnest-sleep-earbuds",
    name: "SoundNest Sleep Earbuds",
    category: "Audio",
    price: 39.99,
    compareAtPrice: 69.99,
    rating: 4.7,
    image: "/images/products/soundnest-sleep-earbuds.svg",
    description:
      "Low-profile wireless earbuds shaped for side sleepers with soft tips, calming sound presets, and a compact case.",
    supplierCost: 17.55,
    estimatedShippingDays: 14,
    stock: 24,
    tags: ["audio", "sleep", "wireless"]
  },
  {
    id: "keyring-tracker-card",
    name: "KeyRing Tracker Card",
    category: "Travel",
    price: 22.99,
    compareAtPrice: 34.99,
    rating: 4.5,
    image: "/images/products/keyring-tracker-card.svg",
    description:
      "Thin item tracker with a loud alert tone, wallet-friendly shape, and replaceable battery for bags, keys, and passports.",
    supplierCost: 8.95,
    estimatedShippingDays: 10,
    stock: 44,
    tags: ["tracker", "travel", "everyday carry"]
  }
];

export const categories = Array.from(new Set(mockProducts.map((product) => product.category)));
