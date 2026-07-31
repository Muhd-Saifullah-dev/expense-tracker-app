import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";

export default function AppHeader() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="bg-primary">
      <View className="flex-row items-center justify-between px-5 py-3">
        {/* Logo */}
        <View className="flex-row items-center gap-3 ">
          <View className="w-11 h-11 rounded-xl bg-white items-center justify-center">
            <Text className="text-primary text-xl font-black">ET</Text>
          </View>

          <View>
            <Text className="text-white text-lg font-bold">
              Expense Tracker
            </Text>
            <Text className="text-white/80 text-xs">
              Manage your finances
            </Text>
          </View>
        </View>

        {/* Right Side */}
        <View className="flex-row items-center gap-4">
          <TouchableOpacity>
            <Bell size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(root)/(tabs)/profile")}
          >
            <Avatar
              alt="Profile"
              className="h-10 w-10 border-2 border-white"
            >
              <AvatarImage
                source={{
                  uri: "https://github.com/mrzachnugent.png",
                }}
              />
              <AvatarFallback>
                <Text>ZN</Text>
              </AvatarFallback>
            </Avatar>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}