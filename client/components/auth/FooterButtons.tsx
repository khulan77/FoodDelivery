"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type FooterButtonsProps = {
  buttonDisable?: boolean;
  buttonText: string;
  handleClick?: () => void;
  loading?: boolean;
};

export const FooterButtons = ({
  buttonDisable,
  buttonText,
  handleClick,
  loading,
}: FooterButtonsProps) => {
  return (
    <div className="flex justify-between w-full gap-3">
      <Button
        type="submit"
        className="w-full"
        disabled={buttonDisable || loading}
        onClick={handleClick}
      >
        {loading && <Loader2 className="animate-spin" />}
        {buttonText}
      </Button>
    </div>
  );
};
