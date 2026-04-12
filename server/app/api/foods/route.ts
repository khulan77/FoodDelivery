import { FoodModel } from "@/models";
import { connectDB } from "@/lib/db";
import { requireAdmin, handleApiError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));

    const query: Record<string, unknown> = {};

    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    const [foods, total] = await Promise.all([
      FoodModel.find(query)
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      FoodModel.countDocuments(query),
    ]);

    return NextResponse.json({ foods, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    return handleApiError(error);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    requireAdmin(request);

    const { name, description, price, category, imageUrl } = await request.json();

    if (!name || price == null || !category) {
      return NextResponse.json({ error: "name, price, and category are required" }, { status: 400 });
    }

    const food = await FoodModel.create({ name, description, price, category, image: imageUrl });

    const populated = await food.populate("category", "name");

    return NextResponse.json({ message: "Food created", food: populated }, { status: 201 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
