import { useMutation, useQueryClient } from "@tanstack/react-query";

import { update_budget } from "@/services/budget.service";
import { UpdateBudgetData } from "@/types/budget.type";
import { showError, showSuccess } from "@/utils/toast";

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateBudgetData;
    }) => update_budget(id, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });

      showSuccess(
        response?.message || "Budget updated successfully."
      );
    },

    onError: (error: any) => {
      showError(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    },
  });
};