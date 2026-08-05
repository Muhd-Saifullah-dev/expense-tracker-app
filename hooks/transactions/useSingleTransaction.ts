import { useQuery } from "@tanstack/react-query";
import { get_single_transaction } from "@/services/transaction.service";

export const useSingleTransaction = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => get_single_transaction(id),
    enabled: !!id,
  });
};