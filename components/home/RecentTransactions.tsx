import React from "react";
import { View } from "react-native";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

const transactions = [
  {
    id: 1,
    title: "Salary",
    category: "Income",
    amount: 50000,
    type: "income",
    date: "Today",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    amount: 3200,
    type: "expense",
    date: "Today",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Subscription",
    amount: 1100,
    type: "expense",
    date: "Yesterday",
  },
  {
    id: 4,
    title: "Freelance",
    category: "Income",
    amount: 12000,
    type: "income",
    date: "Yesterday",
  },
];

export default function RecentTransactions() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {transactions.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center justify-between px-5 py-4">
              <View className="flex-row items-center">
                <View
                  className={`h-11 w-11 rounded-full items-center justify-center ${
                    item.type === "income"
                      ? "bg-green-500/15"
                      : "bg-red-500/15"
                  }`}
                >
                  {item.type === "income" ? (
                    <ArrowDownLeft size={20} color="#22C55E" />
                  ) : (
                    <ArrowUpRight size={20} color="#EF4444" />
                  )}
                </View>

                <View className="ml-3">
                  <Text className="text-foreground font-semibold">
                    {item.title}
                  </Text>

                  <Text className="text-muted-foreground text-xs mt-1">
                    {item.category} • {item.date}
                  </Text>
                </View>
              </View>

              <Text
                className={`font-bold ${
                  item.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.type === "income" ? "+" : "-"}Rs{" "}
                {item.amount.toLocaleString()}
              </Text>
            </View>

            {index !== transactions.length - 1 && (
              <View className="h-px bg-border mx-5" />
            )}
          </View>
        ))}
      </CardContent>
    </Card>
  );
}