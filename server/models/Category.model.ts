import { Schema, Model, model, models } from "mongoose";

type Category = {
  name: string;
  description?: string;
};

const CategorySchema = new Schema<Category>(
  {
    description: { type: String, trim: true },
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

export const CategoryModel: Model<Category> = models["Category"] ?? model<Category>("Category", CategorySchema);
