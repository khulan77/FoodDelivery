import { apiFetch } from "@/lib/api";
import { FoodOrderStatusEnum } from "@/constants";

type UpdateOrderPayload = {
  status?: FoodOrderStatusEnum;
  paymentStatus?: "pending" | "paid" | "failed";
};

export const updateOrder = (orderId: string, payload: UpdateOrderPayload) =>
  apiFetch(`/api/orders/${orderId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
