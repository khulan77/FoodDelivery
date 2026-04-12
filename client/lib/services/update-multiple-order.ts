import { axiosInstance } from "@/lib";
import { FoodOrderStatusEnum } from "@/types";
import { toast } from "sonner";

type UpdateOrderPayload = {
  status?: FoodOrderStatusEnum;
  paymentStatus?: "pending" | "paid" | "failed";
};

export const updateMultipleOrder = async (
  ids: string[],
  updateData: UpdateOrderPayload
): Promise<void> => {
  const token = localStorage.getItem("accessToken");

  try {
    await Promise.all(
      ids.map((id) =>
        axiosInstance.put(
          `/api/orders/${id}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
      )
    );

    toast.success(`${ids.length} orders updated successfully`);
  } catch (error) {
    toast.error(`Failed to update selected orders: ${error}`);
  }
};
