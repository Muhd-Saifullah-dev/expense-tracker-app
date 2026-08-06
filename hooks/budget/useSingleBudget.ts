import { useQuery } from "@tanstack/react-query";

import { get_single_budget } from "@/services/budget.service";

export const useSingleBudget = (id: number) => {
  return useQuery({
    queryKey: ["budget", id],
    queryFn: () => get_single_budget(id),
    enabled: !!id,
  });
};