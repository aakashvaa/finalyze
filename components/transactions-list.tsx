"use client";

import { useTransactions } from "@/hooks/use-transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionsList() {
  const { transactions } = useTransactions();

  if (!transactions.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Extracted Transactions</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
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
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
