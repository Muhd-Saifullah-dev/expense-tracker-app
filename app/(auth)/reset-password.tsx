import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

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

export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  console.log("email in reset password", email);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleResetPassword = async () => {
    console.log("button")
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO:
    // await api.post("/auth/reset-password", {
    //   email,
    //   newPassword,
    // });

    router.replace("/(auth)/login");
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
              value={newPassword}
              onChangeText={setNewPassword}
              className="mb-4"
            />

            <Input
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Button className="mt-6" onPress={handleResetPassword}>
              <Text>Reset Password</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
