import { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateBudget } from "@/hooks/budget/useCreateBudget";
import { useUpdateBudget } from "@/hooks/budget/useUpdateBudget";
import { useEffect, useState } from "react";
import { Budget } from "@/types/budget.type";
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { colors } from "@/constants/colors";
type Props = {
  budget?: Budget | null;
  month: number;
  year: number;
  onSuccess: () => void;
  onClose: () => void;
};

export default function BudgetBottomSheet({
  budget,
  month,
  year,
  onSuccess,
}: Props) {


  const [amount, setAmount] = useState("");
const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

useEffect(() => {
  if (budget) {
    setAmount(budget.amount.toString());
    setSelectedCategoryId(budget.category.id);
  } else {
    setAmount("");
    setSelectedCategoryId(null);
  }
}, [budget]);

  const createBudget = useCreateBudget();
  const updateBudget = useUpdateBudget();
const { data: categories = [] } = useCategories();



const options =
  categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  })) ?? [];

const selectedOption = categories.find(
  (c) => c.id === selectedCategoryId
)
  ? {
      value: String(selectedCategoryId),
      label: categories.find(
        (c) => c.id === selectedCategoryId
      )!.name,
    }
  : undefined;

const handleSubmit = () => {
  if (!selectedCategoryId) {
    return;
  }

  const payload = {
    amount: Number(amount),
    month,
    year,
    categoryId: selectedCategoryId,
  };

  if (budget) {
    updateBudget.mutate(
      {
        id: budget.id,
        data: payload,
      },
      { onSuccess }
    );
  } else {
    createBudget.mutate(payload, {
      onSuccess,
    });
  }
};
  return (
  <BottomSheetView className="flex-1 bg-background px-5 py-6">
  <Text className="text-2xl font-bold text-foreground mb-1">
    {budget ? "Update Budget" : "Create Budget"}
  </Text>

  <Text className="text-muted-foreground mb-6">
    Set a monthly budget for a category.
  </Text>

  <View className="gap-5">
    {/* Amount */}
    <View>
      <Text className="text-sm font-medium text-foreground mb-2">
        Budget Amount
      </Text>

      <Input
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        placeholderTextColor={colors.mutedForeground}
        keyboardType="numeric"
        className="h-12 bg-card border border-border rounded-xl px-4"
      />
    </View>

    {/* Category */}
    <View>
      <Text className="text-sm font-medium text-foreground mb-2">
        Category
      </Text>

      <Select
        value={selectedOption}
        onValueChange={(option) =>
          setSelectedCategoryId(option ? Number(option.value) : null)
        }
      >
        <SelectTrigger className="h-12 rounded-xl border border-border bg-card px-4">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>

        <SelectContent className="w-80 rounded-xl">
          <SelectGroup>
            {categories.map((category) => (
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
    </View>

    {/* Button */}
    <Button
      onPress={handleSubmit}
      className="h-12 rounded-xl bg-primary mt-2"
    >
      <Text className="text-primary-foreground font-semibold text-base">
        {budget ? "Update Budget" : "Save Budget"}
      </Text>
    </Button>
  </View>
</BottomSheetView>
  );
}