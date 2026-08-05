import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ArrowLeftRight } from "lucide-react-native";

import ScreenHeader from "@/components/ScreenHeader";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import TransactionList from "@/components/transaction/TransactionList";
import TransactionFilterSheet from "@/components/transaction/TransactionFilterSheet";
import AddTransactionButton from "@/components/transaction/AddTransactionButton";
import { colors } from "@/constants/colors";
import { useTransactions } from "@/hooks/transactions/useTransactions";
import { TransactionQuery } from "@/types/transaction.type";
import { useRouter } from "expo-router";

export default function TransactionsScreen() {
  const router = useRouter();
  const filterSheetRef = useRef<BottomSheetModal>(null);

  const [filters, setFilters] = useState<TransactionQuery>({
    type: "ALL",
    categoryId: undefined,
    startDate: undefined,
    endDate: undefined,
  });
  const activeFilterCount =
    (filters.type !== "ALL" ? 1 : 0) +
    (filters.categoryId ? 1 : 0) +
    (filters.startDate && filters.endDate ? 1 : 0);
  const [appliedFilters, setAppliedFilters] = useState<TransactionQuery>({
    type: "ALL",
  });
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useTransactions(appliedFilters);

  const transactions = data?.pages.flatMap((page) => page.transactions) ?? [];

  console.log("pages", data?.pages.length);
  console.log("hasNextPage", hasNextPage);
  console.log("transactions", transactions.length);
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScreenHeader
        title="Transactions"
        Icon={ArrowLeftRight}
        titleClassName="text-foreground"
        iconColor={colors.mutedForeground}
      />

      <SearchBarWithFilter
        onPress={() => filterSheetRef.current?.present()}
        filterCount={activeFilterCount}
      />

      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
         onPress={(transaction) =>
    router.push(`/transactions/${transaction.id}`)
  }
      />

      <BottomSheetModal
        ref={filterSheetRef}
        snapPoints={["85%"]}
        enablePanDownToClose
      >
        <TransactionFilterSheet
          filters={filters}
          onChange={setFilters}
          onApply={() => {
            setAppliedFilters(filters);

            filterSheetRef.current?.dismiss();
          }}
          onReset={() => {
            setFilters({
              type: "ALL",
              categoryId: undefined,
              startDate: undefined,
              endDate: undefined,
            });

            refetch();
          }}
          onOpenStartDate={() => {}}
          onOpenEndDate={() => {}}
        />
      </BottomSheetModal>

      <AddTransactionButton
        onExpense={() => router.push("/transactions/create?type=EXPENSE")}
        onIncome={() => router.push("/transactions/create?type=INCOME")}
      />
    </SafeAreaView>
  );
}
