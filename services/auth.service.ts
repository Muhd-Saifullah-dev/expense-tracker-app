import { api } from "@/lib/api";
import { API } from "@/constants/api";
import {
  ForgetPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  SignupPayload,
  VerifyOtpPayload,
} from "@/types/auth.type";

export const login = async (data: LoginPayload) => {
  const response = await api.post(API.LOGIN, data);
  return response.data;
};

export const signup = async (data: SignupPayload) => {
  const response = await api.post(API.SIGNUP, data);
  return response.data;
};

export const forgetPassword = async (data: ForgetPasswordPayload) => {
  const response = await api.post(API.FORGET_PASSWORD, data);
  return response.data;
};

export const verifyOtp = async (data: VerifyOtpPayload) => {
  const response = await api.post(API.VERIFY_OTP, data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await api.post(API.RESET_PASSWORD, data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(API.LOGOUT);
  return response.data;
};
