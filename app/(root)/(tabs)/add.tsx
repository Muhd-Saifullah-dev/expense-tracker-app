import React, { useMemo, useRef, useState } from "react";
import {  View } from "react-native";

import MonthYearPicker from "@/components/budget/MonthYearPicker";
import BudgetList from "@/components/budget/BudgetList";
import BudgetBottomSheet from "@/components/budget/BudgetBottomSheet";
import { Coins } from "lucide-react-native"
import { useBudgets } from "@/hooks/budget/useBudgets";
import { Budget } from "@/types/budget.type";
import BottomSheet from "@gorhom/bottom-sheet";
import ScreenHeader from "@/components/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function BudgetScreen() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
const bottomSheetRef = useRef<BottomSheet>(null);

const snapPoints = useMemo(() => ["50%"], []);
  const { data, isLoading, refetch } = useBudgets({
    month,
    year,
  });

  const openBottomSheet = (budget: Budget) => {
  setSelectedBudget(budget);
  bottomSheetRef.current?.expand();
};

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background" >
      <ScreenHeader title="Budget" titleClassName="text-foreground" iconColor={colors.mutedForeground} Icon={Coins }/>
      <MonthYearPicker
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />

  <Button
  className="mx-5 mt-4"
  onPress={() => {
    setSelectedBudget(null); // Create mode
    bottomSheetRef.current?.expand();
  }}
>
  <Text className="text-white">+ Add Budget</Text>
</Button>


      <BudgetList
        budgets={data?.data?.budgets || []}
  isLoading={isLoading}
  onEdit={openBottomSheet}
      />

   <BottomSheet
  ref={bottomSheetRef}
  index={-1}
  snapPoints={snapPoints}
  enablePanDownToClose
>
  <BudgetBottomSheet
    budget={selectedBudget}
  month={month}
  year={year}
  onSuccess={refetch}
  onClose={() => {
    setSelectedBudget(null);
    bottomSheetRef.current?.close();
  }}
  />
</BottomSheet>
    </SafeAreaView>
  );
}