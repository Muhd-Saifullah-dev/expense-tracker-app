import { View, Text, Pressable, ScrollView } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { TransactionQuery } from "@/types/transaction.type";

const types = ["ALL", "INCOME", "EXPENSE"] as const;

const categories = [
  { id: undefined, name: "All" },
  { id: 1, name: "Food" },
  { id: 2, name: "Transport" },
  { id: 3, name: "Shopping" },
  { id: 4, name: "Bills" },
  { id: 5, name: "Entertainment" },
  { id: 6, name: "Health" },
  { id: 7, name: "Education" },
  { id: 8, name: "Travel" },
  { id: 9, name: "Gift" },
  { id: 10, name: "Other" },
];

type Filter = {
  type: string;
  categoryId: number | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};
type Props = {
  filters: TransactionQuery;
  onChange: (filters: TransactionQuery) => void;
  onApply: () => void;
  onReset: () => void;
  onOpenStartDate: () => void;
  onOpenEndDate: () => void;
};

export default function TransactionFilterSheet({
  filters,
  onChange,
  onApply,
  onReset,
  onOpenStartDate,
  onOpenEndDate,
}: Props) {
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <BottomSheetView className="flex-1  px-5 py-4">
      <Text className="text-xl font-bold text-center text-muted-foreground">
        Filter Transactions
      </Text>

      <ScrollView className="mt-6" showsVerticalScrollIndicator={false}>
        {/* Type */}
        <Text className="font-semibold text-muted-foreground mb-3">Type</Text>

        <View className="flex-row flex-wrap gap-3">
          {types.map((item) => {
            const active = filters.type === item;

            return (
              <Pressable
                key={item}
                onPress={() =>
                  onChange({
                    ...filters,
                    type: item,
                  })
                }
                className={`px-4 py-2 rounded-full ${
                  active ? "bg-primary" : "bg-card"
                }`}
              >
                <Text
                  className={`font-medium ${
                    active ? "text-white" : "text-foreground"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Date Range */}

        <Text className="font-semibold text-muted-foreground mt-8 mb-3">
          Date Range
        </Text>

        <Pressable
          onPress={() => setShowCalendar((prev) => !prev)}
          className="rounded-xl bg-card border border-border px-4 py-3"
        >
          <Text className="text-center font-medium text-foreground">
            {showCalendar ? "Hide Calendar" : "Select Date Range"}
          </Text>

          {filters.startDate && (
            <Text className="text-center text-xs text-muted-foreground mt-1">
              {filters.startDate}
              {filters.endDate ? ` → ${filters.endDate}` : ""}
            </Text>
          )}
        </Pressable>

        {showCalendar && (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <View
              style={{
                transform: [{ scale: 0.85 }],
              }}
            >
              <DateTimePicker
                mode="range"
                startDate={range.startDate}
                endDate={range.endDate}
                onChange={({ startDate, endDate }) => {
                  setRange({ startDate, endDate });

                  onChange({
                    ...filters,
                    startDate: startDate
                      ? dayjs(startDate).format("YYYY-MM-DD")
                      : undefined,
                    endDate: endDate
                      ? dayjs(endDate).format("YYYY-MM-DD")
                      : undefined,
                  });
                }}
                styles={{
                  today: {
                    borderColor: "#3B82F6",
                  },
                  selected: {
                    backgroundColor: "#3B82F6",
                  },
                  selected_label: {
                    color: "#fff",
                  },
                }}
              />
            </View>
          </View>
        )}
        {/* Categories */}

        <Text className="font-semibold text-muted-foreground  mb-3">
          Category
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {categories.map((item) => {
            const active = filters.categoryId === item.id;

            return (
              <Pressable
                key={item.name}
                onPress={() =>
                  onChange({
                    ...filters,
                    categoryId: item.id,
                  })
                }
                className={`px-4 py-2 rounded-full ${
                  active ? "bg-primary" : "bg-card"
                }`}
              >
                <Text
                  className={`font-medium ${
                    active ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View className="flex-row gap-3 mt-6">
        <Pressable
          onPress={() => {
            setRange({
              startDate: undefined,
              endDate: undefined,
            });

            onReset();
          }}
          className="flex-1 rounded-xl border border-border py-4"
        >
          <Text className="text-center font-semibold text-muted-foreground">
            Reset
          </Text>
        </Pressable>

        <Pressable
          onPress={onApply}
          className="flex-1 rounded-xl bg-primary py-4"
        >
          <Text className="text-center font-semibold text-white">Apply</Text>
        </Pressable>
      </View>
    </BottomSheetView>
  );
}
