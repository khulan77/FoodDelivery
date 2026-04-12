import { apiFetch } from "@/lib/api";

const fetchRawData = async () => {
  const [catRes, foodRes] = await Promise.all([
    apiFetch<{ categories: ServerCategory[] }>("/api/categories"),
    apiFetch<{ foods: ServerFood[] }>("/api/foods?limit=50"),
  ]);
  return { categories: catRes.categories, foods: foodRes.foods };
};

export const fetchFoodsWithCategories = async (): Promise<FoodCategory[]> => {
  const { categories, foods } = await fetchRawData();

  const map = new Map<string, FoodCategory>();

  for (const cat of categories) {
    map.set(cat._id, {
      _id: cat._id,
      categoryName: cat.name,
      count: 0,
      foods: [],
    });
  }

  for (const food of foods) {
    const catId = food.category?._id;

    if (!catId || !map.has(catId)) continue;

    const entry = map.get(catId)!;

    entry.foods.push({
      _id: food._id,
      price: food.price,
      foodName: food.name,
      image: food.image ?? "",
      createdAt: food.createdAt,
      updatedAt: food.updatedAt,
      ingredients: food.description ?? "",
    });
    entry.count++;
  }

  return Array.from(map.values());
};

export const fetchCategoriesWithCount = async (): Promise<CategoryWithCount[]> => {
  const { categories, foods } = await fetchRawData();

  const countMap = new Map<string, number>();
  for (const food of foods) {
    const id = food.category?._id;
    if (id) countMap.set(id, (countMap.get(id) ?? 0) + 1);
  }

  return categories.map((cat) => ({
    _id: cat._id,
    categoryName: cat.name,
    count: countMap.get(cat._id) ?? 0,
  }));
};
