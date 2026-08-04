
export type CreateTransactionData = {
  title: string;
  amount: number;
  note?: string | null;
  type: "INCOME" | "EXPENSE";
  categoryId?: number | null;
  date: string;
};
export type UpdateTransactionData = Partial<CreateTransactionData>;

export type TransactionQuery = {
  month?: number;
  year?: number;
  type?: "ALL" | "INCOME" | "EXPENSE";
  categoryId?: number;
  search?: string;
  limit?: number;
  cursor?: string;
};