import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypeTransaction } from "@/type/store/typeStore";
export default function DetailedTable({
  transactions,
  currency,
  toggleTable,
}: {
  transactions: TypeTransaction[];
  currency: string;
  toggleTable?: boolean;
}) {
  return (
    <Table
      className={`${toggleTable ? " bg-white absolute  border-b-2 border-t" : ""} cursor-default`}
    >
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: TypeTransaction, index: number) => (
          <TableRow key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.description.split("@")[0]}</TableCell>
            <TableCell className="capitalize">{transaction.type}</TableCell>
            <TableCell className="text-right">
              <span
                className={
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {currency} {Math.abs(+transaction.amount).toFixed(2)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
