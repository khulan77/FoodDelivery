import { axiosInstance } from "@/lib";
import { AllFoodOrders } from "@/types";

type OrdersResponse = {
  orders: AllFoodOrders[];
  total: number;
  page: number;
  pages: number;
};

export const fetchAllOrders = async (): Promise<AllFoodOrders[]> => {
  const token = localStorage.getItem("accessToken");

  if (!token) return [];

  try {
    const { data } = await axiosInstance.get<OrdersResponse>("/api/orders?limit=50", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.orders ?? [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
