import { apiFetch } from "@/lib/api";

type CreateFoodPayload = {
  foodName: string;
  price: number;
  image?: string;
  ingredients?: string;
  category: string;
};

export const createFood = (payload: CreateFoodPayload) =>
  apiFetch("/api/foods", {
    method: "POST",
    body: JSON.stringify({
      price: payload.price,
      name: payload.foodName,
      imageUrl: payload.image,
      category: payload.category,
      description: payload.ingredients,
    }),
  });
