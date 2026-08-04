import { Pressable, Text, View } from "react-native";
import { ChevronDown } from "lucide-react-native";

type MonthSelectorProps = {
  month: string;
  onPress: () => void;
};

export default function MonthSelector({
  month,
  onPress,
}: MonthSelectorProps) {
  return (
    <View className=" mt-4 px-4 py-3">
      <Pressable
        onPress={onPress}
        className="flex-row items-center justify-between rounded-xl bg-card border border-border px-4 py-3"
      >
        <Text className="text-lg font-semibold text-foreground">
          {month}
        </Text>

        <ChevronDown 
          size={20} 
          color="#94A3B8" 
        />
      </Pressable>
    </View>
  );
}