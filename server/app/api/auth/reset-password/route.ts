import { connectDB } from "@/lib/db";
import { UserModel } from "@/models";
import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: "resetToken and newPassword are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    let payload: { userId: string };
    try {
      payload = verifyToken(resetToken);
    } catch {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.password = newPassword;
    user.refreshToken = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully. Please sign in." });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
