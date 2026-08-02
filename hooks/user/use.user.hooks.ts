import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";
import {
  get_user_profile,
  update_user_name,
  update_user_password,
} from "@/services/user.service";
import { showSuccess, showError } from "@/utils/toast";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: get_user_profile,
  });
};

export const useUpdateUserName = () => {
  return useMutation({
    mutationFn: update_user_name,

    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      showSuccess(response.message);
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message || "Failed to update profile");
    },
  });
};

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: update_user_password,

    onSuccess: (response) => {
      showSuccess(response.message);
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message || "Failed to update password");
    },
  });
};
