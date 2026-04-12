import { axiosInstance } from "@/lib";
import { toast } from "sonner";

type OrderItem = {
  foodId: string;
  quantity: number;
};

type CreateOrderPayload = {
  items: OrderItem[];
  deliveryAddress: string;
  notes?: string;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    toast.error("Please log in to place an order");
    return undefined;
  }

  try {
    const response = await axiosInstance.post("/api/orders", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 201) {
      throw new Error("Cannot create order");
    }

    return response.data;
  } catch (error) {
    toast.error(`Error creating order: ${error}`);
    return undefined;
  }
};
