import { API } from "@/constants/api";
import api from "@/lib/api";
import { ChangeNamePayload, ChangePasswordPayload } from "@/types/user.type";

export const update_user_name = async (data: ChangeNamePayload) => {
  const response = await api.patch(API.USER_UPDATE_PROFILE_NAME, data);
  return response.data;
};

export const update_user_password = async (data: ChangePasswordPayload) => {
  const response = await api.patch(API.USER_CHANGE_PASSWORD, data);
  return response.data;
};

export const get_user_profile = async () => {
  const response = await api.get(API.USER_GET_PROFILE);
  return response.data;
};
