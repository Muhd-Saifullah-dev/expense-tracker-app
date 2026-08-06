import { API } from "@/constants/api";
import api from "@/lib/api";
import {
  BudgetQuery,
  CreateBudgetData,
  UpdateBudgetData,
} from "@/types/budget.type";

export const get_budget = async (params: BudgetQuery) => {
  const response = await api.get(API.GET_BUDGETS, {
    params,
  });

  return response.data;
};

export const get_single_budget = async (id: number) => {
  const response = await api.get(API.GET_SINGLE_BUDGET(id));
  return response.data;
};

export const create_budget = async (data: CreateBudgetData) => {
  const response = await api.post(API.CREATE_BUDGET, data);
  return response.data;
};

export const update_budget = async (
  id: number,
  data: UpdateBudgetData
) => {
  const response = await api.patch(
    API.UPDATE_BUDGET(id),
    data
  );

  return response.data;
};

export const delete_budget = async (id: number) => {
  const response = await api.delete(
    API.DELETE_BUDGET(id)
  );

  return response.data;
};