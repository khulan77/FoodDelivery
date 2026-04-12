import { connectDB } from "@/lib/db";
import { UserModel, OTPModel } from "@/models";
import { generateResetToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "email and otp are required" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase(), isVerified: true });
    if (!user) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const otpRecord = await OTPModel.findOne({
      userId: user._id,
      type: "password_reset",
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord || otpRecord.otp !== otp) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    await otpRecord.deleteOne();

    const resetToken = generateResetToken(user._id.toString());

    return NextResponse.json({ message: "OTP verified", resetToken });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
