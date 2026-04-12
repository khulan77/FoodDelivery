const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

export const apiFetch = async <T = unknown>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getAuthToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    const err = error as { message?: string; error?: string };
    throw new Error(err.message ?? err.error ?? "Request failed");
  }

  return res.json() as Promise<T>;
};
