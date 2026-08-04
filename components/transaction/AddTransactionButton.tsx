import { Pressable, Text, View } from "react-native";
import { Plus } from "lucide-react-native";
import { useState } from "react";

type Props = {
  onExpense: () => void;
  onIncome: () => void;
};

export default function AddTransactionButton({
  onExpense,
  onIncome,
}: Props) {

  const [open, setOpen] = useState(false);

  return (
    <View
      className="absolute bottom-2 right-6 items-end"
    >

     {open && (
  <View className="
    mb-3
    rounded-xl
    border
    border-border
    bg-card
    shadow-lg
    overflow-hidden
  ">

    <Pressable
      onPress={() => {
        setOpen(false);
        onExpense();
      }}
      className="px-6 py-3"
    >
      <Text className="font-semibold text-foreground">
        Expense
      </Text>
    </Pressable>


    <Pressable
      onPress={() => {
        setOpen(false);
        onIncome();
      }}
      className="px-6 py-3"
    >
      <Text className="font-semibold text-foreground">
        Income
      </Text>
    </Pressable>

  </View>
)}

      <Pressable
        onPress={() => setOpen(!open)}
        className="
          flex-row
          items-center
          gap-2
          rounded-full
          bg-primary
          px-5
          py-3
          shadow-lg
        "
      >

        <Plus size={22} color="white" />

        <Text className="font-semibold text-white">
          Add
        </Text>

      </Pressable>

    </View>
  );
}