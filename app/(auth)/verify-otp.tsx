import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
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

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const [otp, setOtp] = useState<string>("");

  const handleVerify = () => {
    console.log(otp);

    // POST /auth/verify-otp
    // {
    //   email,
    //   otp,
    // }

    router.push({
      pathname: "/reset-password",
      params: { email },
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
              onTextChange={setOtp}
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

            <Button onPress={handleVerify}>
              <Text>Verify OTP</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
