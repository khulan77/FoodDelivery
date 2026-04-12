import { CategoryWithCount } from "@/components/admin/food-menu/DishesCategory";
import { axiosInstance } from "@/lib";
import { toast } from "sonner";

type ServerCategory = { _id: string; name: string };
type ServerFood = {
  _id: string;
  category: { _id: string; name: string };
};

export const fetchCategoriesWithCount = async (): Promise<{
  data: CategoryWithCount[];
  error: boolean;
}> => {
  try {
    const [catRes, foodRes] = await Promise.all([
      axiosInstance.get<{ categories: ServerCategory[] }>("/api/categories"),
      axiosInstance.get<{ foods: ServerFood[]; total: number }>("/api/foods?limit=200"),
    ]);

    const countMap = new Map<string, number>();
    for (const food of foodRes.data.foods ?? []) {
      const catId = food.category?._id;
      if (!catId) continue;
      countMap.set(catId, (countMap.get(catId) ?? 0) + 1);
    }

    const data: CategoryWithCount[] = (catRes.data.categories ?? []).map((c) => ({
      categoryName: c.name,
      count: countMap.get(c._id) ?? 0,
    }));

    return { data, error: false };
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error fetching categories: ${error.message}`);
    }
    return { data: [], error: true };
  }
};
