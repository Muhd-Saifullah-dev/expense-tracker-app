import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  removeTokens,
} from "@/storage/token.storage";
import { useAuthStore } from "@/store/auth.store";
import { queryClient } from "./query-client";
import { router } from "expo-router";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_SERVER_BASE_URL,
  timeout: 10000,
});

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forget-password",
  "/auth/verify-otp",
  "/auth/reset-password",
  "/auth/refresh-token",
];

// ======================
// Request Interceptor
// ======================
api.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers.setAuthorization(`Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ======================
// Response Interceptor
// ======================
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Don't refresh for auth APIs
    if (authRoutes.some((route) => originalRequest.url?.includes(route))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/auth/refresh-token`,
          {
            refreshToken,
          },
        );

        // Agar backend wrapper use karta hai:
        // { data: { accessToken } }
        const accessToken =
          response.data.data?.accessToken ?? response.data.accessToken;

        if (!accessToken) {
          throw new Error("Access token not received");
        }

        await updateAccessToken(accessToken);

        originalRequest.headers.setAuthorization(`Bearer ${accessToken}`);

        return api(originalRequest);
      } catch (refreshError) {
        await removeTokens();

        // TODO:
        useAuthStore.getState().clearAuth();
        queryClient.clear();
        router.replace("/(auth)/login");
        // useAuthStore.getState().clearAuth();
        // queryClient.clear();
        // router.replace("/(auth)/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
