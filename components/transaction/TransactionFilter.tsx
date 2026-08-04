import { Pressable, Text, View } from "react-native";

type Filter = {
  label: string;
  value: string;
};

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const filters: Filter[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Food",
    value: "food",
  },
  {
    label: "Salary",
    value: "salary",
  },
];


export default function TransactionFilter({
  selected,
  onChange,
}: Props) {

  return (
    <View className="flex-row flex-wrap gap-3 px-4 py-3">

      {filters.map((item) => {

        const active = selected === item.value;

        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            className={`
              rounded-full
              border
              px-4
              py-2
              ${
                active
                ? "border-primary bg-primary"
                : "border-border bg-card"
              }
            `}
          >

            <Text
              className={`
                font-medium
                ${
                  active
                  ? "text-white"
                  : "text-foreground"
                }
              `}
            >
              {item.label}
            </Text>

          </Pressable>
        );

      })}

    </View>
  );
}