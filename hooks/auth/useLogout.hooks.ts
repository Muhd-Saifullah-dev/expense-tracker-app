import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { logout } from "@/services/auth.service";
import { queryClient } from "@/lib/query-client";
import { removeTokens } from "@/storage/token.storage";
import { useAuthStore } from "@/store/auth.store";
import { showError, showSuccess } from "@/utils/toast";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,

    onSuccess: async (response) => {
      // Remove tokens
      await removeTokens();

      // Clear auth state
      useAuthStore.getState().clearAuth();

      // Clear React Query cache
      queryClient.clear();

      showSuccess(response.message);

      // Navigate to login
      router.replace("/(auth)/login");
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message || "Logout failed");
    },
  });
};