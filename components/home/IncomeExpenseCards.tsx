import React from "react";
import { View } from "react-native";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function IncomeExpenseCards() {
  return (
    <View className="gap-4">
      {/* Balance */}
     

      {/* Income & Expense */}
      <View className="flex-row gap-4">
        {/* Income */}
        <Card className="flex-1">
          <CardContent className="items-center py-5">
            <View className="h-12 w-12 rounded-full bg-green-500/20 items-center justify-center">
              <TrendingUp size={24} color="#22C55E" />
            </View>

            <Text className="text-muted-foreground mt-3">
              Income
            </Text>

            <Text className="text-green-500 text-xl font-bold mt-1">
              Rs. 80,000
            </Text>
          </CardContent>
        </Card>

        {/* Expense */}
        <Card className="flex-1">
          <CardContent className="items-center py-5">
            <View className="h-12 w-12 rounded-full bg-red-500/20 items-center justify-center">
              <TrendingDown size={24} color="#EF4444" />
            </View>

            <Text className="text-muted-foreground mt-3">
              Expense
            </Text>

            <Text className="text-red-500 text-xl font-bold mt-1">
              Rs. 31,500
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}