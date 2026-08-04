import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import ScreenHeader from "@/components/ScreenHeader";
import MonthSelector from "@/components/transaction/MonthSelector";
import MonthPickerSheet from "@/components/transaction/MonthPicker";
import TransactionList from "@/components/transaction/TransactionList";
import { colors } from "@/constants/colors";
import TransactionSummary from "@/components/transaction/TransactionSummary";
import AddTransactionButton from "@/components/transaction/AddTransactionButton";
import TransactionFilter from "@/components/transaction/TransactionFilter";

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

export default function TransactionsScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
const [filter, setFilter] = useState("all");
  const [year, setYear] = useState(new Date().getFullYear());

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const monthLabel = `${months[selectedMonth]} ${year}`;

  const openPicker = () => {
    bottomSheetRef.current?.present();
  };

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonth(monthIndex);

    bottomSheetRef.current?.dismiss();

    // yahan baad mein API hit/refetch
  };

  return (
    <SafeAreaView   edges={["top"]} className="flex-1 bg-background">
      <ScreenHeader
        title="Transactions"
        Icon={Search}
        titleClassName="text-foreground"
        iconColor={colors.mutedForeground}
      />

      <MonthSelector month={monthLabel} onPress={openPicker} />

      <TransactionFilter
  selected={filter}
  onChange={setFilter}
/>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["55%"]}
        enablePanDownToClose
      >
        <MonthPickerSheet
          year={year}
          selectedMonth={selectedMonth}
          onYearChange={setYear}
          onSelectMonth={handleSelectMonth}
        />
      </BottomSheetModal>
      <TransactionSummary income={80000} expense={35000} />

      <TransactionList />
      <AddTransactionButton
  onExpense={() => {
    console.log("Open expense form");
  }}
  onIncome={() => {
    console.log("Open income form");
  }}
/>
    </SafeAreaView>
  );
}
