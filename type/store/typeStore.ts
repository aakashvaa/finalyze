interface TypeTransaction {
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: string;
  totalAmount: string;
}

interface TypeTransactionsStore {
  data: { transactions: TypeTransaction[]; currency: string; months: string[] };
  setTransactions: (data: {
    transactions: TypeTransaction[];
    currency: string;
    months: string[];
  }) => void;
}

interface TypeMapTransaction {
  credit: Record<string, { totalAmount: number; count: number }>;
  debit: Record<string, { totalAmount: number; count: number }>;
  investment: Record<string, { totalAmount: number; count: number }>;
  food: Record<string, { totalAmount: number; count: number }>;
  bill: Record<string, { totalAmount: number; count: number }>;
}

interface TypeMapTransactionStore {
  dataMap: TypeMapTransaction;
  setDataMap: (data: TypeMapTransaction) => void;
}

export type {
  TypeTransaction,
  TypeTransactionsStore,
  TypeMapTransaction,
  TypeMapTransactionStore,
};
