import { apiFetch } from "@/lib/api";

export const createCategory = (payload: { categoryName: string }) =>
  apiFetch("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name: payload.categoryName }),
  });
