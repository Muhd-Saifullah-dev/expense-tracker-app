import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-background justify-center px-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-3xl">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-center">
              Login to manage your expenses
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="mb-4"
            />

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button className="mt-6">
              <Text>Login</Text>
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className="text-muted-foreground">
                Don't have an account?
              </Text>

              <TouchableOpacity onPress={()=>router.push("/(auth)/signup")}>
                <Text className="ml-2 text-primary font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}