export type BudgetQuery = {
  month: number;
  year: number;
};

export type CreateBudgetData = {
  amount: number;
  month: number;
  year: number;
  categoryId: number;
};

export type UpdateBudgetData = {
  amount?: number;
  month?: number;
  year?: number;
  categoryId?: number;
};


export type Budget = {
  id: number;
  amount: number;
  month: number;
  year: number;
  userId: number;
  createdAt: string;
  updatedAt: string;

  category: {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
  };
};