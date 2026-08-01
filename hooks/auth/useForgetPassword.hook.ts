import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { forgetPassword } from "@/services/auth.service";
import { showError, showSuccess } from "@/utils/toast";

export const useForgetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: forgetPassword,

    onSuccess: (data, variables) => {
      console.log(data.message);
      showSuccess("Success", data.message ?? "OTP sent successfully");

      router.push({
        pathname: "/verify-otp",
        params: {
          email: variables.email,
        },
      });
    },

    onError: (error: any) => {
      showError(
        "Error",
        error?.response?.data?.message ?? "Something went wrong",
      );
    },
  });
};
