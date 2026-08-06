import { FlatList } from "react-native";

import BudgetItem from "./BudgetItem";
import { Budget } from "@/types/budget.type";



type Props = {
  budgets: Budget[];
  isLoading: boolean;
  onEdit: (budget: Budget) => void;
};
export default function BudgetList({
  budgets,
  isLoading,
  onEdit
}: Props) {
  if (isLoading) {
    return null; // Yahan baad me skeleton ya loader dikha dena
  }

  return (
    <FlatList
      data={budgets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <BudgetItem item={item} onPress={() => onEdit(item)} />
      )}
      contentContainerStyle={{
        padding: 20,
      }}
    />
  );
}