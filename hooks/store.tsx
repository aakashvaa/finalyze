"use client";

import { create } from "zustand";

// Define the Transaction type
export interface Transaction {
  date: string; // ISO 8601 format preferred for date strings
  description: string; // Description of the transaction
  type: "credit" | "debit"; // Specify if the transaction is a credit or a debit
  amount: string; // Amount involved in the transaction
  totalAmount: string;
}

// Define the shape of the store
interface TransactionsStore {
  data: { transactions: Transaction[]; currency: string; months: string[] }; // Store includes transactions, currency, and months
  setTransactions: (data: {
    transactions: Transaction[];
    currency: string;
    months: string[];
  }) => void; // Method to update transactions
}

// Create the zustand store
export const useTransactions = create<TransactionsStore>((set) => ({
  data: { transactions: [], currency: "", months: [] }, // Initial state with proper defaults
  setTransactions: (data) => set(() => ({ data })), // Update state with new data
}));
