"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicCardHeader } from "@/components/card";
import { BackButton } from "@/components/button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type OtpVerificationBoxProps = {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onBack: () => void;
};

export const OtpVerificationBox = ({
  email,
  onVerify,
  onBack,
}: OtpVerificationBoxProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    setLoading(true);
    await onVerify(otp);
    setLoading(false);
  };

  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <BackButton handleClick={onBack} />

      <DynamicCardHeader
        title="Verify your email"
        description={`We sent a 6-digit code to ${email}. Enter it below.`}
      />

      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            {loading ? "Verifying..." : "Verify & Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
