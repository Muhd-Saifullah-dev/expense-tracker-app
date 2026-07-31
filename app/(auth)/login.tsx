import React from "react";
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
import { Link, useRouter } from "expo-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "@/schemas/auth.schema";

import { useLogin } from "@/hooks/auth/useLogin.hook";
import { getErrorMessage } from "@/utils/get-error-message";
export default function Login() {
  const router = useRouter();

  const { mutate, isPending, error, reset } = useLogin();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
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
            <CardTitle className="text-3xl">Welcome Back</CardTitle>

            <CardDescription className="text-center">
              Login to manage your expenses
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="mb-4"
              onChangeText={(value) => {
                reset();
                setValue("email", value);
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
                setValue("password", value);
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
            <Link
              href="/forget-password"
              className="text-right text-primary text-base mt-3"
            >
              Forget password
            </Link>

            <Button
              className="mt-6"
              disabled={isPending}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>{isPending ? "Logging in..." : "Login"}</Text>
            </Button>

            <View className="flex-row justify-center mt-6">
              <Text className="text-muted-foreground">
                Don't have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text className="ml-2 text-primary font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
