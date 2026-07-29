import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-app-surface px-6 justify-center">
        <Card className="w-full shadow-card">
          {/* Logo */}
          <View className="items-center">
            <Text className="text-text-primary text-3xl font-bold mt-5">
              Welcome Back
            </Text>

            <Text className="text-text-secondary text-center mt-2">
              Login to manage your expenses
            </Text>
          </View>

          {/* Inputs */}
          <View className="mt-8">
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              className="h-14 bg-input-background"
            />

            <Input
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="h-14 mt-4 bg-input-background"
            />
          </View>

      

          {/* Login Button */}
          <TouchableOpacity
            className="
              bg-button-primary
              h-14
              rounded-full
              items-center
              justify-center
              mt-8
            "
          >
            <Text className="text-text-white text-lg font-bold">Login</Text>
          </TouchableOpacity>

          {/* Signup */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-text-secondary">Don't have an account?</Text>

            <TouchableOpacity>
              <Text className="text-brand-primary font-bold ml-2">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
