import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { resetPassword } from "@/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      showSuccess(data.message ?? "Password reset successfully");

      router.replace("/login");
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};
