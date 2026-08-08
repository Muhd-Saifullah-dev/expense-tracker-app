import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Text } from "@/components/ui/text";

type ExpenseCategory = {
  id: number;
  name: string;
  color: string;
  icon: string;
  amount: number;
};

type Props = {
  data: ExpenseCategory[];
  isLoading?: boolean;
};

export default function ExpenseCategoryDonut({
  data,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <View className="h-[300px] items-center justify-center">
            {/* loading/skeleton */}
          </View>
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const pieData = data.map((item) => ({
    value: item.amount,
    color: item.color,
    text: `${Math.round((item.amount / total) * 100)}%`,
    label: item.name,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
      </CardHeader>

      <CardContent>
        <View className="items-center">
          <PieChart
            data={pieData}
            donut
            radius={90}
            innerRadius={55}
            showText
            textColor="white"
            textSize={12}
            focusOnPress
            centerLabelComponent={() => (
              <View className="items-center">
                <Text className="text-muted-foreground text-xl font-bold">
                  PKR
                </Text>

                <Text className="text-muted-foreground text-xs">
                  {total.toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>

        <View className="mt-6 gap-3">
          {data.map((item) => {
            const percentage =
              total > 0
                ? Math.round((item.amount / total) * 100)
                : 0;

            return (
              <View
                key={item.id}
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View
                    style={{
                      backgroundColor: item.color,
                    }}
                    className="mr-3 h-3 w-3 rounded-full"
                  />

                  <Text className="text-foreground">
                    {item.name}
                  </Text>
                </View>

                <Text className="text-muted-foreground">
                  {percentage}%
                </Text>
              </View>
            );
          })}
        </View>
      </CardContent>
    </Card>
  );
}