import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import BalanceCard from "@/components/home/BalanceCard";
import IncomeExpenseCards from "@/components/home/IncomeExpenseCards";
import IncomeExpenseBarChart from "@/components/home/IncomeExpenseBarChart";
import BalanceTrendChart from "@/components/home/BalanceTrendChart";
import ExpenseCategoryDonut from "@/components/home/ExpenseCategoryDonut";
import RecentTransactions from "@/components/home/RecentTransactions";
import { useDashboard } from "@/hooks/useDashboard";
export default function HomeScreen() {
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const { data, isLoading } = useDashboard({
    month,
    year,
  });
  const dashboard = data?.data;
  console.log(dashboard?.balance, "das");
  return (
    <ScrollView
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 120,
      }}
    >
      <View className="gap-5">
        {/* Current Balance */}
        <BalanceCard data={dashboard?.balance} isLoading={isLoading} />

        {/* Income & Expense Summary */}
        <IncomeExpenseCards
          expense={dashboard?.balance?.expense ?? 0}
          income={dashboard?.balance?.income ?? 0}
        />

        {/* Income vs Expense */}
        <IncomeExpenseBarChart    data={dashboard?.incomeExpenseChart ?? []}
  isLoading={isLoading}/>

        {/* Balance Trend */}
        <BalanceTrendChart    data={dashboard?.balanceTrend ?? []}
  isLoading={isLoading}/>

        {/* Expense Categories */}
        <ExpenseCategoryDonut data={dashboard?.expenseCategories ?? []} isLoading={isLoading} />

        {/* Recent Transactions */}
        <RecentTransactions  data={dashboard?.recentTransactions ?? []}
  isLoading={isLoading} />
      </View>
    </ScrollView>
  );
}
