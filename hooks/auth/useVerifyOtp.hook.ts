import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { verifyOtp } from "@/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";

export const useVerifyOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: (data, variables) => {
      showSuccess(data.message ?? "OTP verified successfully");

      router.push({
        pathname: "/reset-password",
        params: {
          email: variables.email,
        },
      });
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message ?? "Invalid OTP");
    },
  });
};
