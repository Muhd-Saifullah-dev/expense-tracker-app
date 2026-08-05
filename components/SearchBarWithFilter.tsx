import { Search, SlidersHorizontal } from "lucide-react-native";
import { Pressable, View, Text } from "react-native";

type Props = {
  onPress: () => void;
   filterCount: number;
};

export default function SearchBarWithFilter({
  onPress,
   filterCount,
}: Props) {
  return (
    <View className="flex-row p-4 items-center gap-3">
      <Pressable
        onPress={onPress}
        className="flex-1 h-12 flex-row items-center rounded-xl bg-card px-4"
      >
        <Search size={20} color="#94A3B8" />

        <Text className="ml-3 flex-1 text-muted-foreground">
          Filter transactions
        </Text>
      </Pressable>

      <Pressable
        onPress={onPress}
        className="h-12 w-12 items-center justify-center rounded-xl bg-primary"
      >
        <SlidersHorizontal size={20} color="white" />
          {filterCount > 0 && (
          <View
            className="
              absolute
              -top-2
              -right-2
              h-5
              w-5
              rounded-full
              bg-red-500
              items-center
              justify-center
            "
          >
            <Text className="text-white text-xs font-bold">
              {filterCount}
            </Text>
          </View>
        )}

      </Pressable>
    </View>
  );
}