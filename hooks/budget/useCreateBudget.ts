import { useMutation, useQueryClient } from "@tanstack/react-query";

import { create_budget } from "@/services/budget.service";
import { CreateBudgetData } from "@/types/budget.type";
import { showError, showSuccess } from "@/utils/toast";

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetData) =>
      create_budget(data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });

      showSuccess(
        response?.message || "Budget created successfully."
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