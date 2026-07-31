import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    // TODO: Call POST /auth/forgot-password
    router.push({
      pathname: "/verify-otp",
      params: { email },
    });
  };

  return (
    <View className="flex-1 bg-background px-6 justify-center">
      <Text className="text-3xl font-bold text-white mb-2">
        Forgot Password
      </Text>

      <Text className="text-gray-400 mb-8">
        Enter your email to receive an OTP.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="bg-card text-white rounded-xl px-4 py-4 mb-6"
      />

      <Pressable
        onPress={handleSendOtp}
        className="bg-primary rounded-xl py-4 items-center"
      >
        <Text className="text-white font-semibold text-base">
          Send OTP
        </Text>
      </Pressable>
    </View>
  );
}