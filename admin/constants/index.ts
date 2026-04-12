import { ShoppingCart, UtensilsCrossed } from "lucide-react";

export enum FoodOrderStatusEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  OUT_FOR_DELIVERY = "out_for_delivery",
}

export const ADMIN_SIDEBAR_MENUS = [
  { value: "Orders", path: "/", Icon: ShoppingCart },
  { value: "Food Menu", path: "/food-menu", Icon: UtensilsCrossed },
];

export const STATUS_COLORS: Record<FoodOrderStatusEnum, string> = {
  [FoodOrderStatusEnum.PENDING]: "#F59E0B",
  [FoodOrderStatusEnum.CONFIRMED]: "#3B82F6",
  [FoodOrderStatusEnum.PREPARING]: "#8B5CF6",
  [FoodOrderStatusEnum.DELIVERED]: "#10B981",
  [FoodOrderStatusEnum.CANCELLED]: "#EF4444",
  [FoodOrderStatusEnum.OUT_FOR_DELIVERY]: "#F97316",
};
