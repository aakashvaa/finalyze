import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TypeTransaction } from '@/type/store/typeStore'

import DetailedTableRow from './DetailedTableRow'
import { NavbarType } from '@/type'
export default function DetailedTable({
  transactions,
  currency,
  type,
  toggleTable,
}: {
  transactions: TypeTransaction[]
  currency: string
  type: NavbarType
  toggleTable?: boolean
}) {
  console.log(transactions)

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
          <DetailedTableRow
            type={type}
            transaction={transaction}
            currency={currency}
          />
        ))}
      </TableBody>
    </Table>
  )
}
