import { ORDER_STATUSES, PAYMENT_STATUSES } from "@/constants";
import { Schema, Model, models, model, Types } from "mongoose";

type OrderItem = {
  price: number;
  quantity: number;
  food: Types.ObjectId;
};

type Order = {
  notes?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  user: Types.ObjectId;
  deliveryAddress: string;
  paymentStatus: PaymentStatus;
};

const OrderItemSchema = new Schema<OrderItem>(
  {
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<Order>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (v: OrderItem[]) => v.length > 0,
        message: "Order must contain at least one item",
      },
    },
    notes: { type: String, trim: true },
    totalAmount: { type: Number, required: true, min: 0 },
    deliveryAddress: { type: String, required: true, trim: true },
    status: { type: String, enum: ORDER_STATUSES, default: "pending" },
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: "pending" },
  },
  { timestamps: true },
);

OrderSchema.index({ user: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const OrderModel: Model<Order> = models.Order ?? model<Order>("Order", OrderSchema);
