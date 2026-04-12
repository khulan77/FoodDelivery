"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicCardHeader } from "@/components/card";
import { BackButton } from "@/components/button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleSendPasswordResetMail } from "@/lib";

type ConfirmEmailProps = {
  email: string;
  handlePrevious: () => void;
  onVerify: (otp: string) => Promise<void>;
};

export const ConfirmEmail = ({ email, handlePrevious, onVerify }: ConfirmEmailProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    await handleSendPasswordResetMail({ email });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    setLoading(true);
    await onVerify(otp);
    setLoading(false);
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <BackButton handleClick={handlePrevious} />

      <div>
        <DynamicCardHeader title="Check your email" />
        <p className="text-muted-foreground text-sm">
          We sent a 6-digit code to <span className="text-primary font-medium">{email}</span>.
          Enter it below to reset your password.
        </p>
      </div>

      <CardContent className="p-0 flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
          <Button
            type="submit"
            disabled={otp.length !== 6 || loading}
            className="w-full rounded-full bg-red-500"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
        <Button variant="link" className="p-0 text-sm" onClick={handleResend}>
          Resend code
        </Button>
      </CardContent>
    </Card>
  );
};
