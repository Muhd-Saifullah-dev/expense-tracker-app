import { useQuery } from "@tanstack/react-query";
import { get_categories } from "@/services/category.service";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],

    queryFn: get_categories,

    staleTime: 1000 * 60 * 10, // 10 min
  });
};