import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

type Props = {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

export default function MonthYearPicker({
  month,
  year,
  onMonthChange,
  onYearChange,
}: Props) {
  return (
    <View className="px-5 py-4 flex-row justify-between bg-foreground mt-4 text-primary-foreground items-center">
      <Pressable
        onPress={() => {
          if (month === 0) {
            onMonthChange(11);
            onYearChange(year - 1);
          } else {
            onMonthChange(month - 1);
          }
        }}
      >
        <ChevronLeft size={22} />
      </Pressable>

      <Text className="text-lg font-bold">
        {months[month]} {year}
      </Text>

      <Pressable
        onPress={() => {
          if (month === 11) {
            onMonthChange(0);
            onYearChange(year + 1);
          } else {
            onMonthChange(month + 1);
          }
        }}
      >
        <ChevronRight size={22} />
      </Pressable>
    </View>
  );
}