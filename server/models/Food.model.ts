import { Schema, model, models, Model, Types } from "mongoose";

type Food = {
  name: string;
  price: number;
  image?: string;
  description?: string;
  isAvailable: boolean;
  category: Types.ObjectId;
};

const FoodSchema = new Schema<Food>(
  {
    image: { type: String },
    description: { type: String, trim: true },
    isAvailable: { type: Boolean, default: true },
    price: { type: Number, required: true, min: 0 },
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true },
);

FoodSchema.index({ category: 1 });

FoodSchema.index({ name: "text", description: "text" });

export const FoodModel: Model<Food> = models["Food"] ?? model<Food>("Food", FoodSchema);
