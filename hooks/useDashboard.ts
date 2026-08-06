import { useQuery } from "@tanstack/react-query";

import { get_dashboard } from "@/services/dashboard.service";

type DashboardQuery = {
  month?: number;
  year?: number;
};

export const useDashboard = ({
  month,
  year,
}: DashboardQuery = {}) => {
  return useQuery({
    queryKey: ["dashboard", month, year],

    queryFn: () =>
      get_dashboard({
        month,
        year,
      }),

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};