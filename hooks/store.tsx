'use client'

import {
  TypeMapTransaction,
  TypeMapTransactionStore,
  TypeTransactionsStore,
} from '@/type/store/typeStore'
import { navbars } from '@/utils/constant'
import { create } from 'zustand'

export const useMapTransaction = create<TypeMapTransactionStore>((set) => ({
  dataMap: Object.fromEntries(
    navbars.slice(1).map((key) => [key, {}])
  ) as TypeMapTransaction,
  setDataMap: (data: TypeMapTransaction) =>
    set((state) => ({ ...state, dataMap: data })),
}))

// Create the zustand store
export const useTransactions = create<TypeTransactionsStore>((set) => ({
  data: { transactions: [], currency: '', months: [] }, // Initial state with proper defaults
  setTransactions: (data) => set(() => ({ data })), // Update state with new data
}))
