import { API } from "@/constants/api";
import api from "@/lib/api";

type DashboardQuery = {
  month?: number;
  year?: number;
};

export const get_dashboard = async ({
  month,
  year,
}: DashboardQuery = {}) => {
  const response = await api.get(API.GET_DASHBOARD, {
    params: {
      month,
      year,
    },
  });

  return response.data;
};