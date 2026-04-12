import { apiFetch } from "./api";

export const fetcher = <T = unknown>(path: string): Promise<T> => apiFetch<T>(path);
