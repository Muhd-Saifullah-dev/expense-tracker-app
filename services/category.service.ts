import api from "@/lib/api";
import { Category } from "@/types/category.type";

export const get_categories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");

  return response.data.data.categories;
};