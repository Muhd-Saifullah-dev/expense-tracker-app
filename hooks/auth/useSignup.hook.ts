import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { signup } from "@/services/auth.service";
import { saveTokens } from "@/storage/token.storage";
import { useAuthStore } from "@/store/auth.store";

export const useSignup = () => {
  const router = useRouter();

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: signup,

    onSuccess: async (response) => {
      const { accessToken, refreshToken, user } = response.data;

      // Save Tokens
      await saveTokens(accessToken, refreshToken);

      // Save User
      setAuthUser(user);

      // Navigate
      router.replace("/(root)/(tabs)");
    },
  });
};
