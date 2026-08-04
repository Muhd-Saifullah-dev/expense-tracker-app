import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update_transaction } from "@/services/transaction.service";
import { UpdateTransactionData } from "@/types/transaction.type";
import { showError, showSuccess } from "@/utils/toast";

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionData;
    }) => update_transaction(id, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      showSuccess(
        response?.message || "Transaction updated successfully",
      );
    },

    onError: (error: any) => {
      showError(
        error?.response?.data?.message ||
          "Something went wrong",
      );
    },
  });
};