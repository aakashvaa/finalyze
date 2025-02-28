import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TypeTransaction } from '@/type/store/typeStore'
import { useState } from 'react'
import DetailedTableRow from './DetailedTableRow'
export default function DetailedTable({
  transactions,
  currency,
  toggleTable,
}: {
  transactions: TypeTransaction[]
  currency: string
  toggleTable?: boolean
}) {
  return (
    <Table
      className={`${
        toggleTable
          ? ' bg-black/[0.085]  absolute  border-b-2 border-t-2 border-black/[0.05] overflow-hidden '
          : ''
      } cursor-default`}
    >
      <TableHeader>
        <TableRow className="hover:bg-transparent ">
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative overflow-hidden z-10">
        {transactions.map((transaction: TypeTransaction, index: number) => (
          <DetailedTableRow transaction={transaction} currency={currency} />
        ))}
      </TableBody>
    </Table>
  )
}
