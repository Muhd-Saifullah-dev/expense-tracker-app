import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/schemas/auth.schema";

import { useResetPassword } from "@/hooks/auth/useResetPassword.hook";
import { getErrorMessage } from "@/utils/get-error-message";

export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const { mutate, isPending, error, reset } = useResetPassword();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    mutate({
      email,
      newPassword: data.newPassword,
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-background justify-center px-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-3xl">Reset Password</CardTitle>

            <CardDescription className="text-center">
              Create a new password for your account
            </CardDescription>

            <Text className="mt-2 text-primary font-semibold">{email}</Text>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="New Password"
              secureTextEntry
              value={watch("newPassword")}
              onChangeText={(value) => {
                reset();
                setValue("newPassword", value, {
                  shouldValidate: true,
                });
              }}
              className="mb-2"
            />

            {errors.newPassword && (
              <Text className="text-red-500 text-xs mb-3">
                {errors.newPassword.message}
              </Text>
            )}

            <Input
              placeholder="Confirm Password"
              secureTextEntry
              value={watch("confirmPassword")}
              onChangeText={(value) => {
                reset();
                setValue("confirmPassword", value, {
                  shouldValidate: true,
                });
              }}
            />

            {errors.confirmPassword && (
              <Text className="text-red-500 text-xs mt-2">
                {errors.confirmPassword.message}
              </Text>
            )}

            {error && (
              <Text className="text-red-500 text-xs mt-2">
                {getErrorMessage(error)}
              </Text>
            )}

            <Button
              className="mt-6"
              disabled={isPending}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>{isPending ? "Resetting..." : "Reset Password"}</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
