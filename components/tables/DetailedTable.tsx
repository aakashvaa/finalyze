import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TypeTransaction } from '@/type/store/typeStore'
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
          ? ' bg-black/[0.085] absolute  border-b-2 border-t-2 border-black/[0.05] '
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
      <TableBody>
        {transactions.map((transaction: TypeTransaction, index: number) => (
          <TableRow className="hover:bg-transparent " key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.description.split('@')[0]}</TableCell>
            <TableCell className="capitalize">{transaction.type}</TableCell>
            <TableCell className="text-right">
              <span
                className={
                  transaction.type === 'credit'
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }
              >
                {currency} {Math.abs(+transaction.amount).toFixed(2)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
