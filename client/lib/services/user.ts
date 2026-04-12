import { axiosInstance } from "../axios-instance";

type MeResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};

export const getCurrentUser = async (token: string | false | null) => {
  if (!token) return undefined;

  try {
    const { data } = await axiosInstance.get<MeResponse>("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch {
    return undefined;
  }
};
