import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <PortalHost />
          <Toast/>
        </>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
