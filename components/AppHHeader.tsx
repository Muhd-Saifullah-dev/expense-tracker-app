import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useGetUserProfile } from "@/hooks/user/use.user.hooks";

export default function AppHeader() {
  const router = useRouter();

  const { data, isLoading } = useGetUserProfile();

  const user = data?.data?.user;

  const initials =
    user?.name
      ?.trim()
      .split(" ")
      .map((word: string) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-primary border-b border-white/10"
    >
      <View className="flex-row items-center justify-between px-5 py-4">
        {/* Left */}
        <View className="flex-row items-center flex-1">
          <View className="h-12 w-12 rounded-2xl bg-white items-center justify-center shadow-sm">
            <Text className="text-primary text-lg font-extrabold">ET</Text>
          </View>

          <View className="ml-3">
            <Text className="text-white/70 text-xs">
              Welcome back 👋
            </Text>

            <Text
              numberOfLines={1}
              className="text-white text-lg font-bold"
            >
              {isLoading ? "Loading..." : user?.name ?? "Expense Tracker"}
            </Text>
          </View>
        </View>

        {/* Right */}
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="h-10 w-10 rounded-full bg-white/10 items-center justify-center active:opacity-70">
            <Bell size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(root)/(tabs)/profile")}
          >
            <Avatar
              alt={user?.name || "User"}
              className="h-11 w-11 border-2 border-white/20"
            >
              <AvatarFallback className="bg-white items-center justify-center rounded-full">
                <Text className="text-primary font-extrabold text-sm">
                  {initials}
                </Text>
              </AvatarFallback>
            </Avatar>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}