import { axiosInstance } from "@/lib";
import { toast } from "sonner";

export const createCategory = async (payload: { categoryName: string }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    toast.error("Authentication required");
    return undefined;
  }

  try {
    const response = await axiosInstance.post(
      "/api/categories",
      { name: payload.categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Cannot create category");
    }

    toast.success("Category created successfully");
    return response.data;
  } catch (error) {
    toast.error(`Error creating category: ${error}`);
    return undefined;
  }
};
