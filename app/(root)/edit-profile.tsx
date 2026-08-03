import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useGetUserProfile,
  useUpdateUserName,
} from "@/hooks/user/use.user.hooks";
import { router } from "expo-router";
import { EditProfileForm, editProfileSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  name: string;
};

export default function EditProfileScreen() {
  const { data, isLoading } = useGetUserProfile();
  const { mutate: updateName, isPending } = useUpdateUserName();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  const user = data?.data?.user;

  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const onSubmit = (data: EditProfileForm) => {
    updateName(data, {
      onSuccess: () => router.back(),
    });
  };
  return (
    <View className="flex-1 bg-background justify-center p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent className="gap-5">
          <View>
            <Text className="mb-2 text-muted-foreground">Email</Text>

            <Input value={user?.email} editable={false} />
          </View>

          <View>
            <Text className="mb-2 text-muted-foreground">Full Name</Text>

            <Input
              value={watch("name")}
              onChangeText={(text) =>
                setValue("name", text, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              placeholder="Enter your name"
            />
            {errors.name && (
              <Text className="text-destructive mt-2">
                {errors.name.message}
              </Text>
            )}
          </View>

          <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
            <Text>{isPending ? "Saving..." : "Save Changes"}</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
