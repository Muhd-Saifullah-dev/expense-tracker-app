import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";

type Props = {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
  isLoading: boolean;
};

export default function IncomeExpenseBarChart({
  data,
  isLoading,
}: Props) {
  if (isLoading || !data?.length) return null;

  const incomeData = data.map((item) => ({
  value: item.income,
  label: item.month,
  frontColor: "#22C55E",
}));

const expenseData = data.map((item) => ({
  value: item.expense,
  frontColor: "#EF4444",
}));
const chartData = data.flatMap((item) => [
  {
    value: item.income,
    label: item.month,
    frontColor: "#22C55E",
    spacing: 4,
  },
  {
    value: item.expense,
    frontColor: "#EF4444",
    spacing: 20, // next month se gap
  },
]);

const maxValue = Math.max(
  ...data.flatMap((item) => [item.income, item.expense])
);
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>

        <Text className="text-muted-foreground text-sm">
          Monthly comparison
        </Text>
      </CardHeader>

      <CardContent>
     <BarChart
  data={chartData}
  isAnimated
  height={220}

  // Increase overall width
  barWidth={24}          // pehle 18 tha
  spacing={45}           // groups ke darmiyan gap
  initialSpacing={20}
  endSpacing={20}

  roundedTop
  noOfSections={5}
  maxValue={maxValue * 1.1}

  yAxisTextStyle={{
    color: "rgb(148,163,184)",
    fontSize: 11,
  }}
  xAxisLabelTextStyle={{
    color: "rgb(148,163,184)",
    fontSize: 11,
  }}
/>

        <View className="flex-row justify-center gap-8 mt-6">
          <View className="flex-row items-center gap-2">
            <View className="w-3 h-3 rounded-full bg-green-500" />
            <Text className="text-muted-foreground">Income</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="w-3 h-3 rounded-full bg-red-500" />
            <Text className="text-muted-foreground">Expense</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}