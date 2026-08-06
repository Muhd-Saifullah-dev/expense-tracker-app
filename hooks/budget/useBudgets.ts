import { useQuery } from "@tanstack/react-query";

import { get_budget } from "@/services/budget.service";
import { BudgetQuery } from "@/types/budget.type";

export const useBudgets = (params: BudgetQuery) => {
  return useQuery({
    queryKey: ["budgets", params],
    queryFn: () => get_budget(params),
  });
};