export enum FoodOrderStatusEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum UserRoleEnum {
  USER = "user",
  ADMIN = "admin",
}

export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export type CartDataTypes = {
  food: Food;
  quantity: number;
};

export type FoodOrderItem = {
  food: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
};

export type AllFoodOrders = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: FoodOrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  status: FoodOrderStatusEnum;
  paymentStatus: "pending" | "paid" | "failed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRoleEnum | string;
  address?: string;
};
