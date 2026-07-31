import AppHHeader from "@/components/AppHHeader";
import { Tabs } from "expo-router";
import {
  House,
  ReceiptText,
  CirclePlus,
  ChartPie,
  User,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
  screenOptions={{
    headerShown: true,
    header:()=><AppHHeader/>,
    tabBarStyle: {
      backgroundColor: "#4F46E5",
      borderTopWidth: 0,
      elevation: 0, // Android shadow remove
    },
    tabBarActiveTintColor: "#FFFFFF",
    tabBarInactiveTintColor: "#C7D2FE",
  
  }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <ReceiptText color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => (
            <CirclePlus color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <ChartPie color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}