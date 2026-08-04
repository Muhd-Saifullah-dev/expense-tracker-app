import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_transaction } from "@/services/transaction.service";
import { CreateTransactionData } from "@/types/transaction.type";
import { showError, showSuccess } from "@/utils/toast";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionData) => create_transaction(data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      showSuccess(
        response?.message || "Transaction created successfully in hook",
      );
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || "Something went wrong");
    },
  });
};
