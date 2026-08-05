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

    onSuccess: async (response, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["transaction", variables.id],
      });

      showSuccess(
        response?.message || "Transaction updated successfully"
      );
    },

    onError: (error: any) => {
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    },
  });
};