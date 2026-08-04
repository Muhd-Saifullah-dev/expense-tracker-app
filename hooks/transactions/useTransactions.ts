import { useInfiniteQuery } from "@tanstack/react-query";
import { get_transaction } from "@/services/transaction.service";
import { TransactionQuery } from "@/types/transaction.type";

export const useTransactions = (params: TransactionQuery) => {
  return useInfiniteQuery({
    queryKey: ["transactions", params],

    queryFn: ({ pageParam }) =>
      get_transaction({
        ...params,
        cursor: pageParam,
      }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
  });
};
