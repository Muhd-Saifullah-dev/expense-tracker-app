import { FlatList, Text } from "react-native";
import TransactionCard from "./TransactionCard";
import { Loader2 } from "lucide-react-native";
import type { Transaction } from "@/types/transaction.type";
type Props = {
  transactions: any[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  onPress: (transaction: Transaction) => void;
};

export default function TransactionList({
   transactions,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onPress
}: Props) {

  if (isLoading) {
    return (
      <Text className="text-center text-white mt-10">
        <Loader2 color={"#fff"} size={50} className="animate-spin"/>
      </Text>
    );
  }
  return (
     <FlatList className="flex-1 px-4 "
      data={transactions}

      keyExtractor={(item) => item.id}

      onEndReached={() => {
        console.log("END REACHED");

        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}

      onEndReachedThreshold={0.5}

      ListFooterComponent={
        isFetchingNextPage ? (
          <Text className="text-center py-4">
            Loading more...
          </Text>
        ) : null
      }

      renderItem={({item})=>(
        <TransactionCard
          title={item.title}
          category={item.category?.name ?? "Income"}
          amount={Number(item.amount)}
          type={item.type.toLowerCase() as "income"|"expense"}
          date={new Date(item.date).toLocaleDateString()}
          onPress={() => onPress(item)}
        />
      )}
    />
  );
}