import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { OtpInput } from "react-native-otp-entry";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { verifyOtpSchema, VerifyOtpSchema } from "@/schemas/auth.schema";

import { useVerifyOtp } from "@/hooks/auth/useVerifyOtp.hook";

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const { mutate, isPending } = useVerifyOtp();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerifyOtpSchema>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: VerifyOtpSchema) => {
    mutate({
      email,
      otp: data.otp,
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
            <CardTitle className="text-3xl">Verify OTP</CardTitle>

            <CardDescription className="text-center">
              Enter the verification code sent to
            </CardDescription>

            <Text className="mt-2 text-primary font-semibold">{email}</Text>
          </CardHeader>

          <CardContent>
            <OtpInput
              numberOfDigits={6}
              focusColor="#4F46E5"
              onTextChange={(value) =>
                setValue("otp", value, {
                  shouldValidate: true,
                })
              }
              theme={{
                containerStyle: {
                  marginBottom: 24,
                },
                pinCodeContainerStyle: {
                  width: 48,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: "#0F172A",
                  borderColor: "#334155",
                },
                focusedPinCodeContainerStyle: {
                  borderColor: "#4F46E5",
                },
                pinCodeTextStyle: {
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: "700",
                },
              }}
            />

            {errors.otp && (
              <Text className="text-red-500 text-xs mb-3">
                {errors.otp.message}
              </Text>
            )}

            <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
              <Text>{isPending ? "Verifying..." : "Verify OTP"}</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
