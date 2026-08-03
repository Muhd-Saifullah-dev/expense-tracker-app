import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BalanceTrendChart() {
  const data = [
    { value: 1200, label: "Mon" },
    { value: 1800, label: "Tue" },
    { value: 1600, label: "Wed" },
    { value: 2400, label: "Thu" },
    { value: 2100, label: "Fri" },
    { value: 2900, label: "Sat" },
    { value: 3400, label: "Sun" },
  ];

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
      </CardHeader>

      <CardContent>
        <View className="items-center">
          <LineChart
  data={data}
  width={300}
  height={180}
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

  // 👇 Add these
  xAxisLabelTextStyle={{
    color: "#94A3B8", // muted-foreground
    fontSize: 12,
  }}
  yAxisTextStyle={{
    color: "#94A3B8",
    fontSize: 12,
  }}
  rulesColor="#334155"      // border color
  xAxisColor="#334155"
  yAxisColor="#334155"
/>
        </View>
      </CardContent>
    </Card>
  );
}