"use client";

import { useEffect, useMemo, useState } from "react";
import type { Order, OrderStatus } from "@/types/order";
import { readStorage, writeStorage } from "./storage";

const ORDER_KEY = "trenddrop-orders";

const seedOrders: Order[] = [
  {
    id: "TD-10284",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    customer: {
      firstName: "Maya",
      lastName: "Chen",
      email: "maya.demo@example.com",
      phone: "555-0198",
      address: "42 Sample Street",
      city: "Austin",
      state: "TX",
      postalCode: "78701",
      country: "United States"
    },
    items: [
      {
        productId: "voltstack-gan-charger",
        name: "VoltStack 45W GaN Charger",
        image: "/images/products/voltstack-gan-charger.svg",
        quantity: 2,
        price: 27.99,
        supplierCost: 12.1
      }
    ],
    status: "Shipped",
    subtotal: 55.98,
    shipping: 4.99,
    tax: 4.9,
    total: 65.87,
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString()
  },
  {
    id: "TD-10285",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    customer: {
      firstName: "Jordan",
      lastName: "Reed",
      email: "jordan.demo@example.com",
      phone: "555-0144",
      address: "18 Portfolio Ave",
      city: "Denver",
      state: "CO",
      postalCode: "80202",
      country: "United States"
    },
    items: [
      {
        productId: "snapcharge-magnetic-bank",
        name: "SnapCharge Magnetic Power Bank",
        image: "/images/products/snapcharge-magnetic-bank.svg",
        quantity: 1,
        price: 34.99,
        supplierCost: 14.8
      },
      {
        productId: "airloop-travel-organizer",
        name: "AirLoop Cable Organizer",
        image: "/images/products/airloop-travel-organizer.svg",
        quantity: 1,
        price: 18.99,
        supplierCost: 6.35
      }
    ],
    status: "Sent to Supplier",
    subtotal: 53.98,
    shipping: 4.99,
    tax: 4.72,
    total: 63.69,
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8).toISOString()
  }
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Seeded mock orders make the admin dashboard useful on the first run.
    setOrders(readStorage(ORDER_KEY, seedOrders));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) writeStorage(ORDER_KEY, orders);
  }, [isReady, orders]);

  function addOrder(order: Order) {
    setOrders((current) => {
      const next = [order, ...current];
      writeStorage(ORDER_KEY, next);
      return next;
    });
  }

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    setOrders((current) => {
      const next = current.map((order) => (order.id === orderId ? { ...order, status } : order));
      writeStorage(ORDER_KEY, next);
      return next;
    });
  }

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;
    const productCounts = new Map<string, number>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        productCounts.set(item.name, (productCounts.get(item.name) ?? 0) + item.quantity);
      });
    });

    const topProduct =
      Array.from(productCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "No orders yet";

    return { revenue, orderCount, topProduct };
  }, [orders]);

  return { orders, addOrder, updateOrderStatus, stats, isReady };
}
