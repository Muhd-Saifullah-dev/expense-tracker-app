import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { login } from "@/services/auth.service";
import { saveTokens } from "@/storage/token.storage";
import { useAuthStore } from "@/store/auth.store";

export const useLogin = () => {
  const router = useRouter();

  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      console.log(response);
      const { accessToken, refreshToken, user } = response.data;

      await saveTokens(accessToken, refreshToken);

      setAuthUser(user);

      router.replace("/(root)/(tabs)");
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
