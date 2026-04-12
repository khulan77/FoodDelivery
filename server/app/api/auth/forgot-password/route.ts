import { connectDB } from "@/lib/db";
import { generateOTP } from "@/utils";
import { UserModel, OTPModel } from "@/models";
import { sendPasswordResetEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

const GENERIC_MSG = "If that email is registered, an OTP has been sent.";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase(), isVerified: true });
    if (!user) {
      return NextResponse.json({ message: GENERIC_MSG });
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const otp = generateOTP();

    await OTPModel.findOneAndUpdate({ userId: user._id, type: "password_reset" }, { otp, expiresAt }, { upsert: true, new: true });

    await sendPasswordResetEmail(user.email, user.name, otp);

    return NextResponse.json({ message: GENERIC_MSG });
  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
};
