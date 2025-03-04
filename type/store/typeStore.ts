import { NavbarType } from '..'

interface TypeTransaction {
  date: string
  description: string
  type: 'credit' | 'debit'
  amount: string
  tableName: NavbarType
  totalAmount: string
}

interface TypeTransactionsStore {
  data: { transactions: TypeTransaction[]; currency: string; months: string[] }
  setTransactions: (data: {
    transactions: TypeTransaction[]
    currency: string
    months: string[]
  }) => void
}

type TypeMapTransaction = {
  [K in NavbarType]: Record<string, { totalAmount: number; count: number }>
}

interface TypeMapTransactionStore {
  dataMap: TypeMapTransaction
  setDataMap: (data: TypeMapTransaction) => void
}

export type {
  TypeTransaction,
  TypeTransactionsStore,
  TypeMapTransaction,
  TypeMapTransactionStore,
}
