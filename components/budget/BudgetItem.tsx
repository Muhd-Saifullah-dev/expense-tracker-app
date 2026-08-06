import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { Budget } from "@/types/budget.type";

type Props = {
  item: Budget;
  onPress: () => void;
};

export default function BudgetItem({ item, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-primary text-foreground rounded-xl p-4 mb-4 flex-row justify-between items-center"
    >
      <View>
        <Text className="font-semibold text-muted-foreground">
          {item.category.name}
        </Text>

        <Text className="text-foreground mt-1">
          Rs {item.amount.toLocaleString()}
        </Text>
      </View>

      <ChevronRight size={20} color={colors.mutedForeground} />
    </Pressable>
  );
}
