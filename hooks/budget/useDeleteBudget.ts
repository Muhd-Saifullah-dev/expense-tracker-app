import { useMutation, useQueryClient } from "@tanstack/react-query";

import { delete_budget } from "@/services/budget.service";
import { showError, showSuccess } from "@/utils/toast";

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => delete_budget(id),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });

      showSuccess(response?.message || "Budget deleted successfully.");
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message || "Something went wrong.");
    },
  });
};
