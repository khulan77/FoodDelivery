"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { emailValidationSchema, handleSendPasswordResetMail, handleVerifyResetOtp } from "@/lib";
import { ForgotPasswordEmailCard } from "./ForgotPasswordEmailCard";
import { ConfirmEmail } from "./ConfirmEmail";
import { useRouter } from "next/navigation";

export const ForgotPassword = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      await handleSendPasswordResetMail(values);
      setCurrentStep(1);
    },
  });

  const handleNext = () => {
    formik.handleSubmit();
  };

  const handlePrevious = () => {
    setCurrentStep((previous) => previous - 1);
  };

  const handleVerifyOtp = async (otp: string) => {
    const data = await handleVerifyResetOtp({ email: formik.values.email, otp });
    if (data?.resetToken) {
      push(`/reset-password?token=${data.resetToken}`);
    }
  };

  const forgotPasswordEmailCardProps = {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
    handleNext: handleNext,
  };

  const confirmEmailProps = {
    handlePrevious: handlePrevious,
    email: formik.values.email,
    onVerify: handleVerifyOtp,
  };

  const StepComponents = [
    <ForgotPasswordEmailCard key={0} {...forgotPasswordEmailCardProps} />,
    <ConfirmEmail key={1} {...confirmEmailProps} />,
  ];

  return StepComponents[currentStep];
};
