export { apiFetch } from "./api";
export { fetcher } from "./fetcher";
export { cn, formatDate } from "./utils";

import { FoodOrderStatusEnum, STATUS_COLORS } from "@/constants";

export const getBorderColor = (status: FoodOrderStatusEnum): string => STATUS_COLORS[status] ?? "#71717A";

export const getOptionStyles = (current: FoodOrderStatusEnum, option: FoodOrderStatusEnum): React.CSSProperties =>
  current === option ? { backgroundColor: STATUS_COLORS[option], color: "#fff" } : {};

export const getMenuColor = (pathname: string, path: string): string => (pathname === path ? "bg-accent rounded-xl text-foreground" : "text-muted-foreground");
