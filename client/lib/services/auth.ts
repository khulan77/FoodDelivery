import {
  LoginResponse,
  PasswordResetResponse,
  SendPasswordResetMail,
  SignUpTypes,
  VerifyEmailResponse,
} from "@/constants/auth";
import { axiosInstance } from "../axios-instance";
import { toast } from "sonner";

export const handleSignUp = async ({
  name,
  email,
  password,
}: SignUpTypes & { name: string }) => {
  try {
    const { data } = await axiosInstance.post<{ message: string; userId: string }>(
      "/api/auth/signup",
      { name, email, password }
    );
    if (data) {
      toast.success(data.message);
      return data;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Error signing up", { description: error.message });
    }
  }
};

export const handleVerifyEmail = async ({
  userId,
  otp,
}: {
  userId: string;
  otp: string;
}) => {
  try {
    const { data } = await axiosInstance.post<VerifyEmailResponse>(
      "/api/auth/verify-email",
      { userId, otp }
    );
    if (data) {
      toast.success(data.message);
      return data;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Invalid OTP", { description: error.message });
    }
  }
};

export const handleSignIn = async ({ email, password }: SignUpTypes) => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/api/auth/signin",
      { email, password }
    );
    toast.success(data?.message);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Error signing in", { description: error.message });
    }
  }
};

export const handleSendPasswordResetMail = async ({
  email,
}: SendPasswordResetMail) => {
  try {
    const { data } = await axiosInstance.post<PasswordResetResponse>(
      "/api/auth/forgot-password",
      { email }
    );
    toast.success(data?.message);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Error sending email", { description: error.message });
    }
  }
};

export const handleVerifyResetOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  try {
    const { data } = await axiosInstance.post<{
      message: string;
      resetToken: string;
    }>("/api/auth/verify-reset-otp", { email, otp });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Invalid OTP", { description: error.message });
    }
  }
};

export const handlePasswordReset = async ({
  resetToken,
  newPassword,
}: {
  resetToken: string | null;
  newPassword: string;
}) => {
  try {
    const { data } = await axiosInstance.post<PasswordResetResponse>(
      "/api/auth/reset-password",
      { resetToken, newPassword }
    );
    toast.success(data?.message);
    return { error: false, data };
  } catch (error) {
    toast.error("Error resetting password", {
      description: "Please try again",
    });
    return { error: true, data: undefined };
  }
};
