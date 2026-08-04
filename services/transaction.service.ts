import { API } from "@/constants/api";
import api from "@/lib/api";
import {
  CreateTransactionData,
  TransactionQuery,
  UpdateTransactionData,
} from "@/types/transaction.type";

export const update_transaction = async (
  id: string,
  data: UpdateTransactionData,
) => {
  const response = await api.patch(API.UPDATE_TRANSACTION(id), data);
  return response.data;
};

export const delete_transaction = async (id: string) => {
  const response = await api.delete(API.DELETE_TRANSACTION(id));
  return response.data;
};

export const create_transaction = async (data: CreateTransactionData) => {
  const response = await api.post(API.CREATE_TRANSACTION, data);
  return response.data
};

export const get_transaction=async(params:TransactionQuery)=>{
  const response=await api.get(API.GET_TRANSACTIONS,{params})
  return response.data
}
