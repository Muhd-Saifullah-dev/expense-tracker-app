import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  UserPen,
  LockKeyhole,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { router } from "expo-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { useGetUserProfile } from "@/hooks/user/use.user.hooks";
import { ScrollView } from "react-native";
import { useLogout } from "@/hooks/auth/useLogout.hooks";

export default function ProfileScreen() {
  const { data, isLoading } = useGetUserProfile();
  const { mutate: logout, isPending } = useLogout();

  const user = data?.data?.user;

  const initials =
    user?.name
      ?.trim()
      .split(" ")
      .map((word: string) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
      }}
    >
      <View>
        {/* Profile */}
        <View className="items-center">
          <Avatar alt="" className="h-24 w-24">
            <AvatarFallback className="bg-primary items-center justify-center rounded-full">
              <Text className="text-white text-3xl font-bold">{initials}</Text>
            </AvatarFallback>
          </Avatar>

          <Text className="mt-4 text-2xl font-bold text-foreground">
            {user?.name}
          </Text>

          <Text className="mt-1 text-muted-foreground">{user?.email}</Text>
        </View>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>

          <CardContent className="gap-5">
            <View>
              <Text className="text-muted-foreground text-sm">Full Name</Text>
              <Text className="text-foreground text-lg font-semibold mt-1">
                {user?.name}
              </Text>
            </View>

            <View className="h-px bg-border" />

            <View>
              <Text className="text-muted-foreground text-sm">Email</Text>
              <Text className="text-foreground text-lg font-semibold mt-1">
                {user?.email}
              </Text>
            </View>
          </CardContent>
        </Card>

        <Card className="mt-8 mb-0">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <TouchableOpacity
              className="flex-row items-center justify-between px-5 py-4"
              onPress={() => router.push("/(root)/edit-profile")}
            >
              <View className="flex-row items-center gap-3">
                <UserPen size={20} color="#A5B4FC" />
                <Text className="text-foreground font-medium">
                  Edit Profile
                </Text>
              </View>

              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View className="h-px bg-border" />

            <TouchableOpacity
              className="flex-row items-center justify-between px-5 py-4"
              onPress={() => router.push("/(root)/change-password")}
            >
              <View className="flex-row items-center gap-3">
                <LockKeyhole size={20} color="#A5B4FC" />
                <Text className="text-foreground font-medium">
                  Change Password
                </Text>
              </View>

              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View className="h-px bg-border" />

            <TouchableOpacity
              disabled={isPending}
              onPress={() => logout()}
              className="flex-row items-center justify-between px-5 py-4"
            >
              <View className="flex-row items-center gap-3">
                <LogOut size={20} color="#EF4444" />
                <Text className="text-red-500 font-medium">
                  {" "}
                  {isPending ? "Logging out..." : "Logout"}
                </Text>
              </View>

              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
