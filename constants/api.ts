export const API = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  VERIFY_OTP: "/auth/verify-otp",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
  // user profile
  USER_GET_PROFILE: "/user/profile",
  USER_UPDATE_PROFILE_NAME: "/user/profile",
  USER_CHANGE_PASSWORD: "/user/change-password",

  //transaction
  GET_TRANSACTIONS: "/transactions",
  CREATE_TRANSACTION: "/transactions",

  UPDATE_TRANSACTION: (id: string) => `/transactions/${id}`,
  DELETE_TRANSACTION: (id: string) => `/transactions/${id}`,
  GET_SINGLE_TRANSACTION: (id: string) => `/transactions/${id}`,


  // budget
   GET_BUDGETS: "/budgets",
  CREATE_BUDGET: "/budgets",
  UPDATE_BUDGET: (id: number) => `/budgets/${id}`,
  DELETE_BUDGET: (id: number) => `/budgets/${id}`,
  GET_SINGLE_BUDGET: (id: number) => `/budgets/${id}`,

  // dashboard
  GET_DASHBOARD:"/dashboard"
};
