"use client";

import { useEffect, useState } from "react";
import { Category, fetchCategories } from "@/lib/services/get-categories";
import { FoodsWithCategories } from "./FoodsWithCategories";

export const FoodCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchCategories();
      if (error) return;

      setCategories(data);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  if (!categories.length)
    return <p className="text-white">No categories found</p>;

  return (
    <div>
      <div className="flex flex-col my-8 gap-9">
        <div className="text-3xl font-semibold text-white">Categories</div>
        <div className="flex gap-2 flex-nowrap">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="flex items-center px-5 py-1 rounded-full bg-background"
            >
              <div>{category?.categoryName}</div>
            </div>
          ))}
        </div>
      </div>
      <FoodsWithCategories />
    </div>
  );
};
