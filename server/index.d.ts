type TokenPayload = {
  email: string;
  userId: string;
  role: "user" | "admin";
};

type AuthError = {
  status: number;
  message: string;
};

type Params = { params: Promise<{ id: string }> };

type PaymentStatus = "pending" | "paid" | "failed";

type OrderStatus = "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
