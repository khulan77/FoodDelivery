import { connectDB } from "@/lib/db";
import { UserModel } from "@/models";
import { getAuthUser, handleApiError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const authUser = getAuthUser(request);

    const user = await UserModel.findById(authUser.userId).select("-password -refreshToken");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    await connectDB();

    const authUser = getAuthUser(request);

    const { updatedUserInfo } = await request.json();

    if (!updatedUserInfo || typeof updatedUserInfo !== "object") {
      return NextResponse.json({ error: "updatedUserInfo is required" }, { status: 400 });
    }

    const allowedFields = ["name"];
    const updateData: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (updatedUserInfo[key] !== undefined) updateData[key] = updatedUserInfo[key];
    }

    const user = await UserModel.findByIdAndUpdate(authUser.userId, updateData, { new: true }).select("-password -refreshToken");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated",
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
