import { axiosInstance } from "@/lib";
import { toast } from "sonner";

type CreateFoodPayload = {
  foodName: string;
  price: number;
  image?: string;
  ingredients?: string;
  category: string;
};

export const createFood = async (payload: CreateFoodPayload) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    toast.error("Authentication required");
    return undefined;
  }

  try {
    const response = await axiosInstance.post(
      "/api/foods",
      {
        name: payload.foodName,
        price: payload.price,
        imageUrl: payload.image,
        description: payload.ingredients,
        category: payload.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Cannot create food");
    }

    toast.success("Food created successfully");
    return response.data;
  } catch (error) {
    toast.error(`Error creating food: ${error}`);
    return undefined;
  }
};
