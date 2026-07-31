import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { MotiView } from "moti";

import { Text } from "@/components/ui/text";
import { getOnboardingCompleted } from "@/storage/onboarding.storage";
import { getAccessToken } from "@/storage/token.storage";

export default function Splash() {
  const router = useRouter();
  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Small delay for smooth UX
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const onboarding = await getOnboardingCompleted();

        if (!onboarding) {
          router.replace("/onboarding");
          return;
        }

        const token = await getAccessToken();

        if (token) {
          router.replace("/(root)/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.log(error);
        router.replace("/(auth)/login");
      }
    };

    bootstrap();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -12 }}
        transition={{
          type: "timing",
          duration: 500,
          loop: true,
          repeatReverse: true,
        }}
        className="h-40 w-40 rounded-3xl bg-primary items-center justify-center"
      >
        <Text className="text-7xl font-black text-white">ET</Text>
      </MotiView>
    </View>
  );
}
