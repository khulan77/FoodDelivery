import { FoodOrderStatusEnum } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";
export * from "./format-money";

type emailValidTypes = {
  errors?: { email?: string };
  values: { email: string };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmailValid = ({ errors, values }: emailValidTypes) => {
  return !!errors?.email || !values.email;
};

export const getMenuColor = (currentPath: string, menuPath: string) => {
  return (
    currentPath === menuPath &&
    "bg-primary rounded-full text-primary-foreground"
  );
};

export const getBorderColor = (status: FoodOrderStatusEnum) => {
  if (!status) return;

  const statusToColorMap: Partial<Record<FoodOrderStatusEnum, string>> = {
    [FoodOrderStatusEnum.PENDING]: "rgb(239, 68, 68)",
    [FoodOrderStatusEnum.CONFIRMED]: "rgb(59, 130, 246)",
    [FoodOrderStatusEnum.PREPARING]: "rgb(249, 115, 22)",
    [FoodOrderStatusEnum.OUT_FOR_DELIVERY]: "rgb(168, 85, 247)",
    [FoodOrderStatusEnum.DELIVERED]: "rgb(34, 197, 94)",
    [FoodOrderStatusEnum.CANCELLED]: "rgb(229, 231, 235)",
  };

  return statusToColorMap[status] ?? "rgb(229, 231, 235)";
};

export const getOptionStyles = (statusState: string, option: string) => {
  if (statusState === option) {
    return {
      backgroundColor: "rgb(254, 226, 226)", // light red
      border: "1px solid rgb(248, 113, 113)", // red-500
      color: "rgb(220, 38, 38)", // red-600
    };
  }
  return undefined;
};

export const formatDate = (date?: DateRange) =>
  date?.from
    ? `${format(date.from, "LLL dd, y")}${
        date.to ? ` - ${format(date.to, "LLL dd, y")}` : ""
      }`
    : "Pick a date";
