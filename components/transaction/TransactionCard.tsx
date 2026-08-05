import { Card, CardContent } from "../ui/card";
import { Text } from "../ui/text";
import { Pressable, View } from "react-native";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";

type TransactionCardProps = {
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
   onPress: () => void;
};

export default function TransactionCard({
  title,
  category,
  amount,
  type,
  date,
  onPress
}: TransactionCardProps) {

  const isIncome = type === "income";

  return (
    <Pressable onPress={onPress}>
    <Card className="mb-2 bg-card">

      <CardContent className="flex-row items-center justify-between px-3 py-2.5">

        {/* Left */}
        <View className="flex-row items-center gap-3">

          <View className="h-9 w-9 items-center justify-center rounded-full bg-secondary">

            {
              isIncome ? (
                <ArrowUpRight
                  size={18}
                  color="#22C55E"
                />
              ) : (
                <ArrowDownLeft
                  size={18}
                  color="#EF4444"
                />
              )
            }

          </View>


          <View>

            <Text className="font-semibold text-foreground">
              {title}
            </Text>


            <Text className="text-xs text-muted-foreground">
              {category} • {date}
            </Text>

          </View>

        </View>


        {/* Amount */}
        <Text
          className={`text-sm font-bold ${
            isIncome
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"} Rs {amount}
        </Text>


      </CardContent>

    </Card>
    </Pressable>
  );
}