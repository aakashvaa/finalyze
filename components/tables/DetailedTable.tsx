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
import { cn } from '@/lib/utils'
export default function DetailedTable({
  transactions,
  setSelectedTransactions,
  type,
  toggleTable,
}: {
  transactions: TypeTransaction[]
  setSelectedTransactions: (data: TypeTransaction[]) => void
  type: NavbarType
  toggleTable?: boolean
}) {
  console.log(transactions)

  return (
    <Table
      className={cn(
        toggleTable
          ? ' bg-black/[0.085] rounded-md absolute  overflow-hidden '
          : '',
        'cursor-default '
      )}
    >
      <TableHeader>
        <TableRow className="hover:bg-transparent bg-transparent ">
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative overflow-hidden z-10">
        {transactions.map((transaction: TypeTransaction, index: number) => (
          <DetailedTableRow
            key={`${type}-${index}`}
            setSelectedTransactions={setSelectedTransactions}
            type={type}
            selectedTransactions={transactions}
            transaction={transaction}
          />
        ))}
      </TableBody>
    </Table>
  )
}
