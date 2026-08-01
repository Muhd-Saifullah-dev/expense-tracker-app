import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

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
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from "@/schemas/auth.schema";

import {useForgetPassword } from "@/hooks/auth/useForgetPassword.hook";
import { getErrorMessage } from "@/utils/get-error-message";

export default function ForgetPasswordScreen() {
  const { mutate, isPending, error, reset } = useForgetPassword();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgetPasswordSchema) => {
    mutate(data);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-background justify-center px-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-3xl">
              Forgot Password
            </CardTitle>

            <CardDescription className="text-center">
              Enter your email to receive an OTP
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => {
                reset();
                setValue("email", value, {
                  shouldValidate: true,
                });
              }}
            />

            {errors.email && (
              <Text className="text-red-500 text-xs mb-3">
                {errors.email.message}
              </Text>
            )}

            {error && (
              <Text className="text-red-500 text-xs mb-3">
                {getErrorMessage(error)}
              </Text>
            )}

            <Button
              className="mt-4"
              disabled={isPending}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>
                {isPending ? "Sending..." : "Send OTP"}
              </Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}