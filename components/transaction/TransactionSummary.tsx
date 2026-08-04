import { View } from "react-native";
import { Card, CardContent } from "../ui/card";
import { Text } from "../ui/text";

type TransactionSummaryProps = {
  income: number;
  expense: number;
};

export default function TransactionSummary({
  income,
  expense,
}: TransactionSummaryProps) {

  const balance = income - expense;

  return (
    <Card className="mx-4 mt-2  mb-4 bg-card">
      <CardContent className="p-4">

        <View className="flex-row justify-between mb-4">

          <View>
            <Text className="text-sm text-muted-foreground">
              Income
            </Text>

            <Text className="text-xl font-bold text-green-500">
              Rs {income}
            </Text>
          </View>


          <View>
            <Text className="text-sm text-muted-foreground">
              Expense
            </Text>

            <Text className="text-xl font-bold text-red-500">
              Rs {expense}
            </Text>
          </View>

        </View>


        <View className="border-t border-border pt-3">

          <Text className="text-sm text-muted-foreground">
            Balance
          </Text>

          <Text className="text-2xl font-bold text-foreground">
            Rs {balance}
          </Text>

        </View>


      </CardContent>
    </Card>
  );
}