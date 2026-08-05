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
  type?: "ALL" | "INCOME" | "EXPENSE";
  categoryId?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  cursor?: string;
};


export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  category?: {
    id: string;
    name: string;
  };
}
