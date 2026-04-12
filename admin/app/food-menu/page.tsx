import { DishesCategory, AdminFoodsSection } from "@/app/food-menu/_components";

export default function AdminFoodMenu() {
  return (
    <div className="w-full bg-secondary flex flex-col gap-5 h-full p-6">
      <DishesCategory />

      <AdminFoodsSection />
    </div>
  );
}
