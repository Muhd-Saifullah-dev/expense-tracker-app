import { View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import ScreenHeader from "@/components/ScreenHeader";
import { SquarePlus } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import AppModal from "@/components/AppModal";
import { useCreateTransaction } from "@/hooks/transactions/useCreateTransaction";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/category.type";
import { router, useLocalSearchParams } from "expo-router";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export default function CreateTransaction() {
  const { mutate, isPending } = useCreateTransaction();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { type } = useLocalSearchParams<{
    type: "INCOME" | "EXPENSE";
  }>();
  const [date, setDate] = useState<DateType>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const { data: categories } = useCategories();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const options =
    categories?.map((category: Category) => ({
      value: String(category.id),
      label: category.name,
    })) ?? [];

  const selectedOption = categories?.find(
    (c: Category) => c.id === selectedCategoryId,
  )
    ? {
        value: String(selectedCategoryId),
        label: categories.find((c: Category) => c.id === selectedCategoryId)!
          .name,
      }
    : undefined;
  const handleSave = () => {
    const payload = {
      title,
      amount: Number(amount),
      note: note || null,
      type,

      // expense ke liye category
      categoryId: type === "EXPENSE" ? selectedCategoryId : null,

      date: dayjs(date as Date).format("YYYY-MM-DD"),
    };

    mutate(payload);
    router.back();
  };

  console.log(type, "type inn create");

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScreenHeader
        title="Add Expense"
        titleClassName="text-white"
        Icon={SquarePlus}
        iconColor={colors.mutedForeground}
      />

      <Card className="mx-5 mt-6 bg-card">
        <CardContent className="px-4 py-5">
          {/* Title */}
          <Text className="mb-2 text-foreground">Title</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g Food"
            placeholderTextColor={colors.mutedForeground}
            className="bg-background rounded-xl px-4 py-3 text-foreground"
          />

          {/* Amount */}
          <Text className="mt-4 mb-2 text-foreground">Amount</Text>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.mutedForeground}
            className="bg-background rounded-xl px-4 py-3 text-foreground"
          />
          {type === "EXPENSE" && (
            <>
              <Text className="mt-4 mb-2 text-foreground">Category</Text>

              <Select
                className="w-full"
                value={selectedOption}
                onValueChange={(option) => {
                  setSelectedCategoryId(option ? Number(option.value) : null);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent className="w-80">
                  <SelectGroup>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
                        label={category.name}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
          {/* Date */}
          <Text className="mt-4 mb-2 text-foreground">Date</Text>

          <Pressable
            onPress={() => setShowCalendar((prev) => !prev)}
            className="bg-background rounded-xl px-4 py-3"
          >
            <Text>{dayjs(date as Date).format("YYYY-MM-DD")}</Text>
          </Pressable>

          {showCalendar && (
            <AppModal
              visible={showCalendar}
              onClose={() => setShowCalendar(false)}
            >
              <DateTimePicker
                mode="single"
                date={date}
                onChange={({ date }) => {
                  setDate(date);
                  setShowCalendar(false);
                }}
                containerHeight={220}
                containerStyle={{
                  width: 260,
                  padding: 0,
                }}
                styles={{
                  day_label: {
                    fontSize: 12,
                  },
                  month_label: {
                    fontSize: 13,
                  },
                  year_label: {
                    fontSize: 12,
                  },
                  weekday_label: {
                    fontSize: 10,
                  },
                }}
              />
            </AppModal>
          )}

          {/* Note */}
          <Text className="mt-4 mb-2 text-foreground">Note</Text>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Optional note"
            placeholderTextColor={colors.mutedForeground}
            multiline
            className="bg-background rounded-xl px-4 py-3 text-foreground h-24"
          />

          <Pressable
            onPress={handleSave}
            className="bg-primary rounded-xl py-4 mt-6"
          >
            <Text className="text-center text-white font-semibold">
              Save {type === "EXPENSE" ? "Expense" : "Income"}
            </Text>
          </Pressable>
        </CardContent>
      </Card>
    </SafeAreaView>
  );
}
