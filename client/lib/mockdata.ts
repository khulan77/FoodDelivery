import { AllFoodOrders, FoodOrderStatusEnum } from "@/types";

export const mockData: AllFoodOrders[] = [
  {
    _id: "6772231f2ef39e0ffbc0fcf2",
    user: {
      _id: "67722047cda689533b75309a",
      name: "Test User",
      email: "tugu@gmail.com",
    },
    items: [
      {
        food: {
          _id: "676e38797de641d3ad8dbb6c",
          name: "Fresh Salad",
          price: 7000,
          image:
            "https://www.healthyseasonalrecipes.com/wp-content/uploads/2022/06/healthy-cobb-salad-steps-sq-026.jpg",
        },
        quantity: 1,
        price: 7000,
      },
    ],
    totalAmount: 7000,
    deliveryAddress: "СБД, 12-р хороо",
    status: FoodOrderStatusEnum.PENDING,
    paymentStatus: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
