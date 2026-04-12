import { apiFetch } from "@/lib/api";
import { FoodOrderStatusEnum } from "@/constants";

type UpdateOrderPayload = {
  status?: FoodOrderStatusEnum;
  paymentStatus?: "pending" | "paid" | "failed";
};

export const updateMultipleOrder = (orderIds: string[], payload: UpdateOrderPayload): Promise<unknown[]> =>
  Promise.all(
    orderIds.map((id) =>
      apiFetch(`/api/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    ),
  );
