import { connectDB } from "@/lib/db";
import { UserModel } from "@/models";
import { getAuthUser, handleApiError } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const authUser = getAuthUser(request);

    await UserModel.findByIdAndUpdate(authUser.userId, { $unset: { refreshToken: "" } });

    return NextResponse.json({ message: "Signed out successfully" });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
