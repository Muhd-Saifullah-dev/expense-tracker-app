import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  data: {
    label: string;
    value: number;
  }[];
  isLoading?: boolean;
};

export default function BalanceTrendChart({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
        </CardHeader>

        <CardContent>
          <View className="h-[220px] items-center justify-center">
            {/* loading/skeleton */}
          </View>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Balance Trend</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <View className="h-[190px] items-center overflow-hidden">
          <LineChart
            data={data}
            width={300}
            height={170}
            areaChart
            curved
            color="#4F46E5"
            startFillColor="#4F46E5"
            endFillColor="#4F46E5"
            startOpacity={0.3}
            endOpacity={0.05}
            thickness={3}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            spacing={42}
            initialSpacing={10}
            noOfSections={4}
            xAxisLabelTextStyle={{
              color: "#94A3B8",
              fontSize: 12,
            }}
            yAxisTextStyle={{
              color: "#94A3B8",
              fontSize: 12,
            }}
            rulesColor="#334155"
            xAxisColor="#334155"
            yAxisColor="#334155"
          />
        </View>
      </CardContent>
    </Card>
  );
}
