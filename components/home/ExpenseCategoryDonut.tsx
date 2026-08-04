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

export default function ExpenseCategoryDonut() {
  const pieData = [
    {
      value: 35,
      color: "#4F46E5",
      text: "35%",
      label: "Food",
    },
    {
      value: 25,
      color: "#10B981",
      text: "25%",
      label: "Transport",
    },
    {
      value: 20,
      color: "#F59E0B",
      text: "20%",
      label: "Shopping",
    },
    {
      value: 20,
      color: "#EF4444",
      text: "20%",
      label: "Bills",
    },
  ];

  return (
    <Card className="mt-5">
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
                  18,500
                </Text>
              </View>
            )}
          />
        </View>

        <View className="mt-6 gap-3">
          {pieData.map((item) => (
            <View
              key={item.label}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center">
                <View
                  style={{ backgroundColor: item.color }}
                  className="h-3 w-3 rounded-full mr-3"
                />

                <Text className="text-foreground">
                  {item.label}
                </Text>
              </View>

              <Text className="text-muted-foreground">
                {item.value}%
              </Text>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}