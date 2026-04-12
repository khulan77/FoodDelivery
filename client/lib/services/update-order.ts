import { axiosInstance } from "@/lib";
import { FoodOrderStatusEnum } from "@/types";
import { toast } from "sonner";

type UpdateOrderPayload = {
  status?: FoodOrderStatusEnum;
  paymentStatus?: "pending" | "paid" | "failed";
};

export const updateOrder = async (
  id: string,
  payload: UpdateOrderPayload
): Promise<void> => {
  const token = localStorage.getItem("accessToken");

  try {
    await axiosInstance.put(`/api/orders/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    toast.success("Status updated successfully");
  } catch (error) {
    toast.error(`Failed to update status: ${error}`);
  }
};
