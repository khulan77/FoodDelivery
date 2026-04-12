import { axiosInstance } from "@/lib";
import { User } from "@/types";
import { toast } from "sonner";

export const updateCurrentUser = async (
  payload: Partial<User>
): Promise<User | undefined> => {
  const token = localStorage.getItem("accessToken");

  try {
    const { data } = await axiosInstance.patch<{ user: User }>(
      "/api/auth/me",
      { updatedUserInfo: payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data.user;
  } catch (error) {
    toast.error(`Failed to update: ${error}`);
    return undefined;
  }
};
