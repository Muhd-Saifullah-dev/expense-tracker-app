import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

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
  signupSchema,
  SignupSchema,
} from "@/schemas/auth.schema";

import { useSignup } from "@/hooks/auth/useSignup.hook";
import { getErrorMessage } from "@/utils/get-error-message";

export default function Signup() {
  const { mutate, isPending, error, reset } = useSignup();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignupSchema) => {
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
              Create Account
            </CardTitle>

            <CardDescription className="text-center">
              Sign up to start tracking your expenses
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              className="mb-2"
              onChangeText={(value) => {
                reset();
                setValue("name", value, {
                  shouldValidate: true,
                });
              }}
            />

            {errors.name && (
              <Text className="text-red-500 text-xs mb-3">
                {errors.name.message}
              </Text>
            )}

            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="mb-2"
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

            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => {
                reset();
                setValue("password", value, {
                  shouldValidate: true,
                });
              }}
            />

            {errors.password && (
              <Text className="text-red-500 text-xs mt-2">
                {errors.password.message}
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
              <Text>
                {isPending
                  ? "Creating Account..."
                  : "Create Account"}
              </Text>
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className="text-muted-foreground">
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
              >
                <Text className="ml-2 text-primary font-semibold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}