import { apiFetch } from "@/lib/api";

export type OrdersResponse = {
  page: number;
  total: number;
  pages: number;
  orders: AllFoodOrders[];
};

export const fetchAllOrders = (): Promise<OrdersResponse> => apiFetch<OrdersResponse>("/api/orders?limit=50");
