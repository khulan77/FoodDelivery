import { connectDB } from "@/lib/db";
import { CategoryModel } from "@/models";
import { requireAdmin, handleApiError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const categories = await CategoryModel.find().sort({ name: 1 });

    return NextResponse.json({ categories });
  } catch (error) {
    return handleApiError(error);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    requireAdmin(request);

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const category = await CategoryModel.create({ name, description });

    return NextResponse.json({ message: "Category created", category }, { status: 201 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
