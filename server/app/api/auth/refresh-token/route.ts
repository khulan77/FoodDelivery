import { connectDB } from "@/lib/db";
import { UserModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: "refreshToken is required" }, { status: 400 });
    }

    let payload;
    try {
      payload = verifyToken(refreshToken);
    } catch {
      return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
    }

    const user = await UserModel.findOne({ _id: payload.userId, refreshToken });
    if (!user) {
      return NextResponse.json({ error: "Refresh token revoked or invalid" }, { status: 401 });
    }

    const newPayload = { userId: user._id.toString(), email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    await UserModel.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

    return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
