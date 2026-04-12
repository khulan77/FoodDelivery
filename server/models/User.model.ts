import bcrypt from "bcryptjs";
import { Schema, Model, model, models } from "mongoose";

type User = {
  name: string;
  email: string;
  password: string;
  expiresAt?: Date;
  isVerified: boolean;
  refreshToken?: string;
  role: "user" | "admin";
  comparePassword(candidate: string): Promise<boolean>;
};

const UserSchema = new Schema<User>(
  {
    expiresAt: { type: Date },
    refreshToken: { type: String },
    isVerified: { type: Boolean, default: false },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);

UserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, sparse: true });

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const UserModel: Model<User> = (models.User as Model<User>) ?? model<User>("User", UserSchema);
