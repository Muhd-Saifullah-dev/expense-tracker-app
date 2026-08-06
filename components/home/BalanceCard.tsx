import React from "react";
import { View } from "react-native";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

type Props = {
  data?: {
    income: number;
    expense: number;
    balance: number;
  };
  isLoading: boolean;
};
export default function BalanceCard({
  data,
  isLoading,
}: Props) {

   if (isLoading) return null;
 
  return (
    <Card className="mx-5 mt-5">
      <CardContent className="p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-muted-foreground text-sm">
              Total Balance
            </Text>

            <Text className="mt-1 text-3xl font-bold text-foreground">
              Rs. {data?.balance?.toLocaleString() ?? "0"}
            </Text>
          </View>

          <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Wallet color="white" size={28} />
          </View>
        </View>

        
      </CardContent>
    </Card>
  );
}