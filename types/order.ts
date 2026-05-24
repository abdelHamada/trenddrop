import type { Product } from "./product";

export type OrderStatus = "Pending" | "Sent to Supplier" | "Shipped" | "Delivered";

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  supplierCost: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
};

export type CartLine = {
  product: Product;
  quantity: number;
};
