import { View } from "react-native";
import { FileText } from "lucide-react-native";
import { Text } from "../ui/text";

export default function EmptyTransaction() {
  return (
    <View className="flex-1 items-center justify-center px-6 py-10">

      <View className="mb-4 rounded-full bg-card p-5">
        <FileText 
          size={40} 
          color="#94A3B8"
        />
      </View>


      <Text className="text-lg font-semibold text-foreground">
        No transactions yet
      </Text>


      <Text className="mt-2 text-center text-sm text-muted-foreground">
        Start adding your income and expenses to track your money.
      </Text>

    </View>
  );
}