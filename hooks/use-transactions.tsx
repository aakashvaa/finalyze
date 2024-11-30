"use client";

import { create } from "zustand";

// Define the Transaction type
interface Transaction {
  date: string; // ISO 8601 format preferred for date strings
  description: string; // Description of the transaction
  amount: number; // Amount involved in the transaction
  type: "credit" | "debit"; // Specify if the transaction is a credit or a debit
}

// Define the shape of the store
interface TransactionsStore {
  transactions: Transaction[]; // Array of transactions
  setTransactions: (transactions: Transaction[]) => void; // Method to update transactions
}

// Create the zustand store
export const useTransactions = create<TransactionsStore>((set) => ({
  transactions: [], // Initial state: empty transactions array
  setTransactions: (transactions) => set(() => ({ transactions })), // Update transactions state
}));
