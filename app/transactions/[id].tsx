import { View, ActivityIndicator } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Pencil,
  Tag,
  Trash2,
  ScanLine,
} from "lucide-react-native";

import { useSingleTransaction } from "@/hooks/transactions/useSingleTransaction";
import { colors } from "@/constants/colors";
import ScreenHeader from "@/components/ScreenHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeleteTransaction } from "@/hooks/transactions/useDeleteTransaction";

export default function GetTransaction() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();
  const { data, isLoading, refetch } = useSingleTransaction(id);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.foreground} />
      </View>
    );
  }

  const transaction = data?.data;

  if (!transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text>Transaction not found.</Text>
      </View>
    );
  }

  const isIncome = transaction.type === "INCOME";

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader
        title="Transaction Details"
        titleClassName="text-foreground"
        Icon={ScanLine}
        iconColor={colors.mutedForeground}
      />

      <View className="px-4 py-6 items-center">
        <View
          className={`h-20 w-20 rounded-full items-center justify-center ${
            isIncome ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isIncome ? (
            <ArrowUpRight size={36} color="#22C55E" />
          ) : (
            <ArrowDownLeft size={36} color="#EF4444" />
          )}
        </View>

        <Text className="mt-4 text-3xl font-bold">
          Rs {Number(transaction.amount).toLocaleString()}
        </Text>

        <Text className="mt-2 text-xl font-semibold">{transaction.title}</Text>

        {transaction.note ? (
          <Text className="mt-1 text-center text-muted-foreground">
            {transaction.note}
          </Text>
        ) : null}
      </View>

      <Card className="mx-4">
        <CardContent className="gap-5 py-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Tag size={18} color={colors.mutedForeground} />
              <Text>Category</Text>
            </View>

            <Text>{transaction.category?.name ?? "Uncategorized"}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Calendar size={18} color={colors.mutedForeground} />
              <Text>Date</Text>
            </View>

            <Text>{new Date(transaction.date).toLocaleDateString()}</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text>Type</Text>

            <Text
              className={
                isIncome
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {transaction.type}
            </Text>
          </View>
        </CardContent>
      </Card>

      <View className="mt-auto gap-3 px-4 pb-8">
        <Button
          onPress={() => router.push(`/transactions/edit/${transaction.id}`)}
        >
          <View className="flex-row items-center gap-2">
            <Pencil size={18} color="white" />
            <Text className="text-white">Edit Transaction</Text>
          </View>
        </Button>

        <Button
          variant="destructive"
          disabled={isPending}
          onPress={() => {
            deleteTransaction(id);
            router.back();
          }}
        >
          <View className="flex-row items-center gap-2">
            <Trash2 size={18} color="white" />
            <Text className="text-white">
              {" "}
              {isPending ? "Deleting..." : "Delete Transaction"}
            </Text>
          </View>
        </Button>
      </View>
    </SafeAreaView>
  );
}
