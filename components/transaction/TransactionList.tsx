import { FlatList } from "react-native";
import TransactionCard from "./TransactionCard";

const transactions = [
  {
    id: "1",
    title: "Food",
    category: "Restaurant",
    amount: 1200,
    type: "expense",
    date: "Today",
  },
  {
    id: "2",
    title: "Salary",
    category: "Job",
    amount: 80000,
    type: "income",
    date: "1 August 2026",
  },
    {
    id: "3",
    title: "Salary",
    category: "Job",
    amount: 80000,
    type: "income",
    date: "1 August 2026",
  },
    {
    id: "4",
    title: "Salary",
    category: "Job",
    amount: 80000,
    type: "income",
    date: "1 August 2026",
  },
    {
    id: "5",
    title: "Salary",
    category: "Job",
    amount: 80000,
    type: "income",
    date: "1 August 2026",
  },
];


export default function TransactionList() {

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={{
        padding:16
      }}
      renderItem={({item})=>(
        <TransactionCard
          title={item.title}
          category={item.category}
          amount={item.amount}
          type={item.type as "income" | "expense"}
          date={item.date}
        />
      )}
    />
  );
}