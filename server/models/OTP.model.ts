import mongoose, { Schema, Model } from "mongoose";

export type OTPType = "email_verification" | "password_reset";

type OTP = {
  otp: string;
  type: OTPType;
  expiresAt: Date;
  userId: mongoose.Types.ObjectId;
};

const OTPSchema = new Schema<OTP>({
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["email_verification", "password_reset"], required: true },
});

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

OTPSchema.index({ userId: 1, type: 1 }, { unique: true });

export const OTPModel: Model<OTP> = (mongoose.models.OTP as Model<OTP>) ?? mongoose.model<OTP>("OTP", OTPSchema);
