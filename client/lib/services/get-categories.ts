import { axiosInstance } from "@/lib";
import { toast } from "sonner";

export type Category = {
  _id: string;
  categoryName: string;
};

export const fetchCategories = async (): Promise<{
  data: Category[];
  error: boolean;
}> => {
  try {
    const { data } = await axiosInstance.get<{ categories: { _id: string; name: string }[] }>(
      "/api/categories"
    );

    const normalized: Category[] = (data.categories ?? []).map((c) => ({
      _id: c._id,
      categoryName: c.name,
    }));

    return { data: normalized, error: false };
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error fetching categories: ${error.message}`);
    }
    return { data: [], error: true };
  }
};
