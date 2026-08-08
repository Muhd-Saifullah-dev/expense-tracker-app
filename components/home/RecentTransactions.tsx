import React from "react";
import { View } from "react-native";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Text } from "@/components/ui/text";

type Transaction = {
  id: string;
  title: string;
  amount: string;
  note: string | null;
  type: "EXPENSE" | "INCOME";
  date: string;
  category: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
};

type Props = {
  data: Transaction[];
  isLoading?: boolean;
};

export default function RecentTransactions({
  data,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <View className="h-[300px] items-center justify-center">
            {/* loading/skeleton */}
          </View>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {data.length === 0 ? (
          <View className="items-center justify-center py-10">
            <Text className="text-muted-foreground">
              No recent transactions
            </Text>
          </View>
        ) : (
          data.map((item, index) => {
            const isIncome = item.type === "INCOME";

            return (
              <View key={item.id}>
                <View className="flex-row items-center justify-between px-5 py-4">
                  {/* Left side */}
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`h-11 w-11 rounded-full items-center justify-center ${
                        isIncome
                          ? "bg-green-500/15"
                          : "bg-red-500/15"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowDownLeft
                          size={20}
                          color="#22C55E"
                        />
                      ) : (
                        <ArrowUpRight
                          size={20}
                          color="#EF4444"
                        />
                      )}
                    </View>

                    <View className="ml-3 flex-1">
                      <Text
                        className="text-foreground font-semibold"
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>

                      <Text className="text-muted-foreground text-xs mt-1">
                        {item.category?.name} •{" "}
                        {formatDate(item.date)}
                      </Text>
                    </View>
                  </View>

                  {/* Amount */}
                  <Text
                    className={`font-bold ml-2 ${
                      isIncome
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {isIncome ? "+" : "-"}Rs{" "}
                    {Number(item.amount).toLocaleString()}
                  </Text>
                </View>

                {index !== data.length - 1 && (
                  <View className="h-px bg-border mx-5" />
                )}
              </View>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

function formatDate(date: string) {
  const transactionDate = new Date(date);

  return transactionDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}