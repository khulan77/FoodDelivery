import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";
import { axiosInstance } from "@/lib";
import { toast } from "sonner";

type ServerCategory = { _id: string; name: string };
type ServerFood = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: { _id: string; name: string };
  createdAt?: string;
  updatedAt?: string;
};

export const fetchFoodsWithCategories = async (): Promise<{
  data: FoodCategory[];
  error: boolean;
}> => {
  try {
    const [catRes, foodRes] = await Promise.all([
      axiosInstance.get<{ categories: ServerCategory[] }>("/api/categories"),
      axiosInstance.get<{ foods: ServerFood[]; total: number }>("/api/foods?limit=200"),
    ]);

    const map = new Map<string, FoodCategory>();

    for (const cat of catRes.data.categories ?? []) {
      map.set(cat._id, {
        _id: cat._id,
        categoryName: cat.name,
        count: 0,
        foods: [],
      });
    }

    for (const food of foodRes.data.foods ?? []) {
      const catId = food.category?._id;
      if (!catId || !map.has(catId)) continue;
      const entry = map.get(catId)!;
      entry.foods.push({
        _id: food._id,
        foodName: food.name,
        price: food.price,
        image: food.image ?? "",
        ingredients: food.description ?? "",
        createdAt: food.createdAt,
        updatedAt: food.updatedAt,
      });
      entry.count++;
    }

    return { data: Array.from(map.values()), error: false };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    toast.error(`Error fetching foods: ${errorMessage}`);
    return { data: [], error: true };
  }
};
