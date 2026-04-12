import { connectDB } from "@/lib/db";
import { UserModel, OTPModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { userId, otp } = await request.json();

    if (!userId || !otp) {
      return NextResponse.json({ error: "userId and otp are required" }, { status: 400 });
    }

    const otpRecord = await OTPModel.findOne({
      userId,
      type: "email_verification",
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json({ error: "OTP expired or not found. Please register again." }, { status: 400 });
    }

    if (otpRecord.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const user = await UserModel.findByIdAndUpdate(userId, { isVerified: true, $unset: { expiresAt: "" } }, { new: true });

    if (!user) {
      return NextResponse.json({ error: "User not found — registration may have expired" }, { status: 404 });
    }

    await OTPModel.deleteMany({ userId, type: "email_verification" });

    const payload = { userId: user._id.toString(), email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await UserModel.findByIdAndUpdate(userId, { refreshToken });

    return NextResponse.json({
      message: "Email verified successfully",
      accessToken,
      refreshToken,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
