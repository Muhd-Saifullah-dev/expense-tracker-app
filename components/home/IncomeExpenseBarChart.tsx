import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function IncomeExpenseBarChart() {
  const data = [
    {
      value: 52000,
      label: "Jan",
      frontColor: "rgb(34,197,94)", // Income
    },
    {
      value: 34000,
      label: "Feb",
      frontColor: "rgb(239,68,68)", // Expense
    },
    {
      value: 61000,
      label: "Mar",
      frontColor: "rgb(34,197,94)",
    },
    {
      value: 41000,
      label: "Apr",
      frontColor: "rgb(239,68,68)",
    },
    {
      value: 58000,
      label: "May",
      frontColor: "rgb(34,197,94)",
    },
    {
      value: 45000,
      label: "Jun",
      frontColor: "rgb(239,68,68)",
    },
  ];

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
          data={data}
          height={220}
          barWidth={26}
          spacing={22}
          roundedTop
          roundedBottom
          hideRules={false}
          rulesColor="rgb(51,65,85)"
          xAxisColor="rgb(51,65,85)"
          yAxisColor="rgb(51,65,85)"
          yAxisTextStyle={{
            color: "rgb(148,163,184)",
            fontSize: 11,
          }}
          xAxisLabelTextStyle={{
            color: "rgb(148,163,184)",
            fontSize: 11,
          }}
          noOfSections={5}
          maxValue={70000}
          isAnimated
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