import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delete_transaction } from "@/services/transaction.service";
import { showError, showSuccess } from "@/utils/toast";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => delete_transaction(id),

    onSuccess: async (response, id) => {
      // list refresh
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      // single transaction cache remove
      await queryClient.removeQueries({
        queryKey: ["transaction", id],
      });

      showSuccess(
        response?.message || "Transaction deleted successfully"
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