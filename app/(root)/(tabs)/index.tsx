import React from "react";
import { ScrollView,View } from "react-native";

import BalanceCard from "@/components/home/BalanceCard";
import IncomeExpenseCards from "@/components/home/IncomeExpenseCards";
import IncomeExpenseBarChart from "@/components/home/IncomeExpenseBarChart";
import BalanceTrendChart from "@/components/home/BalanceTrendChart";
import ExpenseCategoryDonut from "@/components/home/ExpenseCategoryDonut";
import RecentTransactions from "@/components/home/RecentTransactions";

export default function HomeScreen() {
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

      <View className="gap-5" >
      {/* Current Balance */}
      <BalanceCard />

      {/* Income & Expense Summary */}
      <IncomeExpenseCards />

      {/* Income vs Expense */}
      <IncomeExpenseBarChart />

      {/* Balance Trend */}
      <BalanceTrendChart />

      {/* Expense Categories */}
      <ExpenseCategoryDonut />

      {/* Recent Transactions */}
      <RecentTransactions />
      </View>
    </ScrollView>
  );
}