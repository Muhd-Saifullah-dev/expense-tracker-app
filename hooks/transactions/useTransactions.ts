import { useInfiniteQuery } from "@tanstack/react-query";
import { get_transaction } from "@/services/transaction.service";
import { TransactionQuery } from "@/types/transaction.type";

export const useTransactions = (params: TransactionQuery) => {
  return useInfiniteQuery({
    queryKey: [
      "transactions",
      params.type,
      params.categoryId,
      params.startDate,
      params.endDate,
    ],

    queryFn: ({ pageParam }) =>
      get_transaction({
        ...params,
        cursor: pageParam,
      }),

    initialPageParam: undefined,

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,

    staleTime: 1000 * 60 * 5,
  });
};
