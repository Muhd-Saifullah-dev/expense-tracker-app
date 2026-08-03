import React from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { changePasswordSchema, ChangePasswordForm } from "@/schemas/user.schema";
import { useUpdateUserPassword } from "@/hooks/user/use.user.hooks";

export default function ChangePasswordScreen() {
  const { mutate: changePassword, isPending } = useUpdateUserPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordForm) => {
    changePassword(
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <View className="flex-1 bg-background justify-center px-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <CardContent className="gap-5">
          <View>
            <Text className="mb-2 text-muted-foreground">
              Current Password
            </Text>

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter current password"
                />
              )}
            />

            {errors.password && (
              <Text className="mt-2 text-destructive">
                {errors.password.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-muted-foreground">
              New Password
            </Text>

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { value, onChange } }) => (
                <Input
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter new password"
                />
              )}
            />

            {errors.newPassword && (
              <Text className="mt-2 text-destructive">
                {errors.newPassword.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-muted-foreground">
              Confirm Password
            </Text>

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange } }) => (
                <Input
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm new password"
                />
              )}
            />

            {errors.confirmPassword && (
              <Text className="mt-2 text-destructive">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <Button
            disabled={isPending}
            onPress={handleSubmit(onSubmit)}
          >
            <Text>
              {isPending ? "Updating..." : "Change Password"}
            </Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}