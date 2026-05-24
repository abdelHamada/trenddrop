export type ProductCategory =
  | "Audio"
  | "Desk Setup"
  | "Charging"
  | "Travel"
  | "Smart Home"
  | "Lifestyle";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice: number;
  rating: number;
  image: string;
  description: string;
  supplierCost: number;
  estimatedShippingDays: number;
  stock: number;
  tags: string[];
};
