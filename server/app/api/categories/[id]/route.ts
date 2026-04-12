import { connectDB } from "@/lib/db";
import { CategoryModel } from "@/models";
import { requireAdmin, handleApiError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    await connectDB();

    const category = await CategoryModel.findById(id);

    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    return NextResponse.json({ category });
  } catch (error) {
    return handleApiError(error);
  }
};

export const PUT = async (request: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    await connectDB();

    requireAdmin(request);

    const category = await CategoryModel.findById(id);

    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const { name, description } = await request.json();

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;

    await category.save();

    return NextResponse.json({ message: "Category updated", category });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    await connectDB();

    requireAdmin(request);

    const category = await CategoryModel.findById(id);

    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    await category.deleteOne();

    return NextResponse.json({ message: "Category deleted" });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
