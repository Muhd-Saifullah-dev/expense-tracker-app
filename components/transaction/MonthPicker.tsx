import { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Props = {
  year: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onSelectMonth: (month: number) => void;
};

export default function MonthPickerSheet({
  year,
  selectedMonth,
  onYearChange,
  onSelectMonth,
}: Props) {
  return (
    <BottomSheetView className="p-5">
      <Text className="text-xl font-bold text-foreground text-center">
        Select Month
      </Text>

      {/* Year Selector */}
      <View className="flex-row items-center justify-between mt-6">
        <Pressable onPress={() => onYearChange(year - 1)}>
          <ChevronLeft size={24} color="#94A3B8" />
        </Pressable>

        <Text className="text-lg font-bold text-muted-foreground ">{year}</Text>

        <Pressable onPress={() => onYearChange(year + 1)}>
          <ChevronRight size={24} color="#94A3B8" />
        </Pressable>
      </View>

      {/* Months */}
      <View className="flex-row flex-wrap justify-between mt-6">
        {months.map((month, index) => {
          const active = selectedMonth === index;

          return (
            <Pressable
              key={month}
              onPress={() => onSelectMonth(index)}
              className={`
                w-[31%] 
                rounded-xl 
                py-3 
                mb-3
                ${active ? "bg-primary" : "bg-card"}
              `}
            >
              <Text
                className={`
                  text-center font-medium
                  ${active ? "text-white" : "text-foreground"}
                `}
              >
                {month.slice(0, 3)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </BottomSheetView>
  );
}
