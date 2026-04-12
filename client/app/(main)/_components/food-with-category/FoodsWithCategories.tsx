"use client";

import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";
import { FoodCard } from "@/components/food";
import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { useEffect, useState } from "react";

export const FoodsWithCategories = () => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<
    FoodCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchFoodsWithCategories();
      if (error) return;

      setFoodsWithCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  if (!foodsWithCategories?.length) return null;

  const nonEmptyCategories = foodsWithCategories.filter(
    (category) => category?.foods?.length > 0
  );

  return (
    <div className="flex flex-col gap-6">
      {nonEmptyCategories?.map((category, index) => (
        <div key={index} className="flex flex-col gap-[54px] rounded-xl">
          <p className="text-3xl font-semibold text-white">
            {category?.categoryName}
          </p>
          <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {category?.foods.map((food) => {
              return (
                <div key={food?._id}>
                  <FoodCard
                    foodName={food?.foodName}
                    price={food?.price}
                    image={food?.image}
                    ingredients={food?.ingredients}
                    _id={food?._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
