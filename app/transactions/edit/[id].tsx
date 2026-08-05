import React from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { SquarePen } from "lucide-react-native"
import ScreenHeader from "@/components/ScreenHeader";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { colors } from "@/constants/colors";
import { useSingleTransaction } from "@/hooks/transactions/useSingleTransaction";
import { useUpdateTransaction } from "@/hooks/transactions/useUpdateTransaction";
export default function EditTransaction() {
  const { id } = useLocalSearchParams<{ id: string }>();
const { mutateAsync: updateTransaction, isPending } = useUpdateTransaction();
  const { data, isLoading } = useSingleTransaction(id);

  const transaction = data?.data;

  const { control, handleSubmit } = useForm({
    values: {
      title: transaction?.title ?? "",
      amount: transaction?.amount?.toString() ?? "",
      note: transaction?.note ?? "",
    },
  });

  const onSubmit = (values: any) => {
      updateTransaction(
    {
      id,
      data: values,
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );
};

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator
          size="large"
          color={colors.foreground}
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenHeader title="Edit Transaction" Icon={SquarePen} />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Card className="bg-card">
          <CardContent className="p-5 gap-5">

            {/* Title */}
            <View>
              <Text className="mb-2 font-medium">
                Title
              </Text>

              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter title"
                    placeholderTextColor={colors.mutedForeground}
                  />
                )}
              />
            </View>

            {/* Amount */}
            <View>
              <Text className="mb-2 font-medium">
                Amount
              </Text>

              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    placeholder="0"
                    placeholderTextColor={colors.mutedForeground}
                  />
                )}
              />
            </View>

            {/* Note */}
            <View>
              <Text className="mb-2 font-medium">
                Note
              </Text>

              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="min-h-[100px] rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Write a note..."
                    placeholderTextColor={colors.mutedForeground}
                    multiline
                    textAlignVertical="top"
                  />
                )}
              />
            </View>

            <Button
              className="mt-2"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-primary-foreground font-semibold">
                Update Transaction
              </Text>
            </Button>

          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}