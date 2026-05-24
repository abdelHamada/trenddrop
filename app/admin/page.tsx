import type { Metadata } from "next";
import { AdminClient } from "./admin-client";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage TrendDrop mock products and simulated orders."
};

export default function AdminPage() {
  return <AdminClient />;
}
